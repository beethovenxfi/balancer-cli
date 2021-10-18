import { scriptConfig } from '../../cli-config';
import { network, ethers } from 'hardhat';
import { stdout } from '../utils/stdOut';

const config = scriptConfig[network.config.chainId!];

export async function getProtocolFeesCollectorAddress(): Promise<string> {
  const vault = await ethers.getContractAt('Vault', config.contractAddresses.Vault);
  return vault.getProtocolFeesCollector();
}

export async function setVaultPaused(paused: boolean, gnosis = true) {
  const [deployer, admin] = await ethers.getSigners();
  const vault = await ethers.getContractAt('Vault', config.contractAddresses.Vault);

  if (gnosis) {
    stdout.printInfo(`\nContract: ${vault.address}`);
    stdout.printInfo(`Data: ${vault.interface.encodeFunctionData('setPaused', [paused])}`);
  } else {
    const tx = await vault.connect(admin).setPaused(paused);
    const receipt = await tx.wait();
    return receipt.transactionHash;
  }
}
