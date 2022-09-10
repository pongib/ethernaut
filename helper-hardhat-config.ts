import { ethers } from "hardhat"

export interface networkConfigItem {
  ethUsdPriceFeed?: string
  blockConfirmation?: number
  chainId?: number
  name?: string
  subscriptionId?: string
  gasLane?: string
  keepersUpdateInterval?: string
  raffleEntranceFee?: string
  callbackGasLimit?: string
  vrfCoordinatorV2?: string
  verifyBlockNumber?: number
  fundAmount?: string
  waitBlockConfirmations?: number
  ethPriceFeedAddress?: string
}

export interface networkConfigInfo {
  [key: number]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
  31337: {
    chainId: 31337,
    name: "localhost",
    subscriptionId: "1",
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
    keepersUpdateInterval: "30",
    raffleEntranceFee: "100000000000000000", // 0.1 ETH
    callbackGasLimit: "500000", // 500,000 gas
    fundAmount: "1000000000000000000000",
    waitBlockConfirmations: 1,
  },
  4: {
    ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    blockConfirmation: 6,
    chainId: 4,
    name: "rinkeby",
    subscriptionId: "10660",
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
    keepersUpdateInterval: "30",
    raffleEntranceFee: "100000000000000000", // 0.1 ETH
    callbackGasLimit: "500000", // 500,000 gas
    vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
    verifyBlockNumber: 6,
    waitBlockConfirmations: 6,
    ethPriceFeedAddress: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
  },
  5: {
    ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    blockConfirmation: 6,
    chainId: 4,
    name: "goerli",
    subscriptionId: "1093",
    gasLane:
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15", // 30 gwei
    keepersUpdateInterval: "30",
    raffleEntranceFee: "100000000000000000", // 0.1 ETH
    callbackGasLimit: "2500000", // 500,000 gas
    vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
    verifyBlockNumber: 6,
    waitBlockConfirmations: 6,
    ethPriceFeedAddress: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
  },
}

export const developmentChainId = [31337]

export const DECIMALS = "18"
export const INITIAL_PRICE = "200000000000000000000"

export const frontEndAbiFile = "../next-lottery/constants/abi.json"
export const frontEndContractsFile =
  "../next-lottery/constants/contractAddress.json"
