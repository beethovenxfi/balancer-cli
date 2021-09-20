import { scriptConfig } from '../utils/scriptConfig';
import { network, ethers } from 'hardhat';

const config = scriptConfig[network.config.chainId!];

export async function getProtocolFeesCollectorAddress(): Promise<string> {
  const vault = await ethers.getContractAt('Vault', config.contractAddresses.Vault);
  return vault.getProtocolFeesCollector();
}

export async function setVaultPaused(paused: boolean): Promise<string> {
  const [deployer, admin] = await ethers.getSigners();
  const vault = await ethers.getContractAt('Vault', config.contractAddresses.Vault);
  const tx = await vault.connect(admin).setPaused(paused);
  const receipt = await tx.wait();
  return receipt.transactionHash;
}
