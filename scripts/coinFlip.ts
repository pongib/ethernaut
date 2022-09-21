import { ethers } from "hardhat"
import { CoinFlip } from "../typechain-types"

const bn = ethers.BigNumber

const provider = new ethers.providers.JsonRpcProvider(
  process.env.RINKEBY_RPC_URL
)

const getBlockHash = async (blockNumber: number) => {
  console.log(`In blockNumber ${blockNumber}`)
  return (await provider.getBlock(blockNumber)).hash
}

const main = async () => {
  const factor =
    "57896044618658097711785492504343953926634992332820282019728792003956564819968"
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0x42639CDC1A0c0B89021D87Fdf1F3c7d3ef47375b"
  const abi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "consecutiveWins",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
      signature: "0xe6f334d7",
    },
    {
      inputs: [
        {
          internalType: "bool",
          name: "_guess",
          type: "bool",
        },
      ],
      name: "flip",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x1d263f67",
    },
  ]
  const target = await ethers.getContractAt(abi, targetAddress)

  const coinFlip: CoinFlip = await ethers.getContract("CoinFlip")

  // const blockNumber = await provider.getBlockNumber()
  // console.log(`Block number at ${blockNumber}`)
  // const numerator = bn.from(await getBlockHash(11418497))
  // const denominator = bn.from(factor)
  // const result = numerator.div(denominator)
  // console.log(`
  //   numerator: ${numerator.toString()}
  //   denominator: ${denominator.toString()}
  //   result: ${result.toString()}
  // `)

  const tx = await coinFlip.guessFlip(targetAddress, { gasLimit: 100000 })
  const receipt = await tx.wait()

  console.log(
    `tx at https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
  )

  console.log(
    `
      guess ${receipt.events![0].args!.guess}
      blockNumber ${receipt.events![0].args!.blockNumber}
    `
  )

  console.log(
    `Current consecutive wins owner ${await target.consecutiveWins()}`
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
