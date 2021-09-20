import { ethers } from 'hardhat';

export type PoolType = 'WeightedPool' | 'StablePool';

export async function setPoolPaused(poolType: PoolType, address: string, paused: boolean) {
  const [deployer, admin] = await ethers.getSigners();
  const pool = await ethers.getContractAt(poolType, address);
  const tx = await pool.connect(admin).setPaused(paused);
  const receipt = await tx.wait();
  return receipt.transactionHash;
}
