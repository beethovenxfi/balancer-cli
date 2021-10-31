import { ethers } from 'hardhat';
import { stdout } from '../utils/stdOut';
import { BigNumber } from 'ethers';

export type PoolType = 'WeightedPool' | 'StablePool';

export async function setPoolPaused(poolType: PoolType, address: string, paused: boolean, gnosis = true) {
  const [deployer, admin] = await ethers.getSigners();
  const pool = await ethers.getContractAt(poolType, address);
  if (gnosis) {
    stdout.printInfo(`\nContract: ${pool.address}`);
    stdout.printInfo(`Data: ${pool.interface.encodeFunctionData('setPaused', [paused])}`);
  } else {
    const tx = await pool.connect(admin).setPaused(paused);
    const receipt = await tx.wait();
    return receipt.transactionHash;
  }
}

export async function changeSwapFeePercentage(
  poolType: PoolType,
  address: string,
  feePercentage: BigNumber,
  gnosis = true
) {
  const [deployer, admin] = await ethers.getSigners();

  const pool = await ethers.getContractAt(poolType, address);
  if (gnosis) {
    stdout.printInfo(`\nContract: ${pool.address}`);
    stdout.printInfo(`Data: ${pool.interface.encodeFunctionData('setSwapFeePercentage', [feePercentage])}`);
  }
}
