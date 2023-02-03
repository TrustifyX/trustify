require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("./tasks")
import dotenv from "dotenv"
dotenv.config()

export default {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    hyperspace: {
      chainId: 3141,
      url: "https://api.hyperspace.node.glif.io/rpc/v1",
      accounts: [process.env.PRIVATE_KEY],
  },
  },
};
