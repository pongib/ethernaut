import { ethers } from "hardhat"

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const contractAddress = "0x5F9FcfCd923b0326C9d9d6769a0Fd794d6A78b38"
  const abi = [
    {
      inputs: [],
      name: "Fal1out",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
      signature: "0x6fab5ddf",
    },
    {
      inputs: [],
      name: "allocate",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
      signature: "0xabaa9916",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "allocator",
          type: "address",
        },
      ],
      name: "allocatorBalance",
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
      signature: "0xffd40b56",
    },
    {
      inputs: [],
      name: "collectAllocations",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x8aa96f38",
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
      inputs: [
        {
          internalType: "address payable",
          name: "allocator",
          type: "address",
        },
      ],
      name: "sendAllocation",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xa2dea26f",
    },
  ]
  const contract = await ethers.getContractAt(abi, contractAddress)
  const tx = await contract.Fal1out({
    value: ethers.utils.parseEther("0.000001"),
  })
  const receipt = await tx.wait()
  console.log(
    `tx at https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
  )

  console.log(`who is owner ${await contract.owner()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
