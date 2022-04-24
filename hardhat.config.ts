import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";

dotenv.config();

function createLocalHostConfig() {
  const url = "http://localhost:8545";
  const mnemonic =
    "test test test test test test test test test test test junk";
  return {
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic,
      path: "m/44'/60'/0'/0",
    },
    url,
    blockGasLimit: 30000000,
    allowUnlimitedContractSize: true,
  };
}

const config: HardhatUserConfig = {
  typechain: {
    outDir: "typechain",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
          metadata: {
            useLiteralContent: true,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.5.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
          evmVersion: "byzantium",
        },
      },
    ],
  },
  defaultNetwork: "localhost",
  networks: {
    localhost: createLocalHostConfig(),
    hardhat: {
      blockGasLimit: 30000000,
      allowUnlimitedContractSize: true,
    }
  },
  mocha: {
    timeout: 600000,
  }
};

export default config;
