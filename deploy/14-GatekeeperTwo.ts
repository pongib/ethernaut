import { developmentChainId, networkConfig } from "../helper-hardhat-config"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import verify from "../utils/verify"
import { DeployFunction } from "hardhat-deploy/dist/types"

const ContractDeploy: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { deployments, network, ethers } = hre
  const { deploy, log } = deployments
  const [deployer] = await ethers.getSigners()

  const args: any[] = ["0x47E6D4F9e42cfFe7B1e42A1A9Bb39F80d0F70604"]

  const chainId = network.config.chainId!
  const contract = await deploy("GatekeeperTwo", {
    from: deployer.address,
    args,
    log: true,
    waitConfirmations: networkConfig[chainId].waitBlockConfirmations,
  })
  log("------ Deploy Completed -----")
  // if (!developmentChainId.includes(chainId) && process.env.ETHERSCAN_API_KEY) {
  //   log("------ Verify -----")
  //   await verify(coinFlip.address, args)
  // }
}

export default ContractDeploy
ContractDeploy.tags = ["gatekeeperTwo", "all", "main"]
