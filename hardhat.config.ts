import dotenv from 'dotenv';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';

// import { hardhatBaseConfig } from '@balancer-labs/v2-common';
import { name } from './package.json';

import { task } from 'hardhat/config';
import { TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';
// import overrideQueryFunctions from '@balancer-labs/v2-helpers/plugins/overrideQueryFunctions';

dotenv.config();

const DEPLOYER_PRIVATE_KEY =
  process.env.DEPLOYER_PRIVATE_KEY || '0000000000000000000000000000000000000000000000000000000000000000';
const INFURA_KEY = process.env.INFURA_KEY || '0000000000000000000000000000000000000000000000000000000000000000';
const ADMIN_PRIVATE_KEY =
  process.env.ADMIN_PRIVATE_KEY || '0000000000000000000000000000000000000000000000000000000000000000';

const FEE_COLLECTOR_PRIVATE_KEY =
  process.env.FEE_COLLECTOR_PRIVATE_KEY || '0000000000000000000000000000000000000000000000000000000000000000';

// task(TASK_COMPILE).setAction(overrideQueryFunctions);

export default {
  solidity: {
    //   compilers: hardhatBaseConfig.compilers,
    version: '0.7.1',
    compilers: {
      version: '0.7.1',
      settings: {
        optimizer: {
          enabled: true,
          runs: 9999,
        },
      },
    },
    //   overrides: {
    //     ...hardhatBaseConfig.overrides(name),
    //     'contracts/Timelock.sol': {
    //       version: '0.6.12',
    //       settings: {
    //         optimizer: {
    //           enabled: true,
    //           runs: 9999,
    //         },
    //       },
    //     },
    //   },
  },
  networks: {
    opera: {
      chainId: 250,
      url: `https://rpc.ftm.tools/`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`, `0x${ADMIN_PRIVATE_KEY}`, `0x${FEE_COLLECTOR_PRIVATE_KEY}`], // Using private key instead of mnemonic
    },
    rinkeby: {
      chainId: 4,
      url: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`, `0x${ADMIN_PRIVATE_KEY}`, `0x${FEE_COLLECTOR_PRIVATE_KEY}`], // Using private key instead of mnemonic
      saveDeployments: true,
    },
  },
};
