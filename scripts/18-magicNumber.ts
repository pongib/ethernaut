import { ethers } from "hardhat"

const provider = new ethers.providers.JsonRpcProvider(
  process.env.GOERLI_RPC_URL
)

const main = async () => {
  const [deployer] = await ethers.getSigners()
  const targetAddress = "0x907Ed6357b1e9d654340775108ab7f3e75207da1"
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
          name: "_solver",
          type: "address",
        },
      ],
      name: "setSolver",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x1f879433",
    },
    {
      inputs: [],
      name: "solver",
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
      signature: "0x49a7a26d",
    },
  ]

  const target = await ethers.getContractAt(targetAbi, targetAddress)

  // deploy first
  // const deployData = "0x33600055600a8060106000396000f3fe602a60005260206000f3"

  // const tx = await deployer.sendTransaction({
  //   data: deployData,
  //   gasLimit: 1000000,
  // })

  const solverAddress = "0xf63Bb3Be53c37533E376974609Caa7Ed809Ea2bD"

  const tx = await target.setSolver(solverAddress)

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

  const deployed = await ethers.getContractAt(
    ["function whatIsTheMeaningOfLife() public view returns (uint256)"],
    solverAddress
  )
  console.log((await deployed.whatIsTheMeaningOfLife()).toString())

  console.log(await target.solver())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
