import { ethers, network } from 'hardhat';
import { scriptConfig } from '../../cli-config';
import { BigNumber } from 'ethers';
import { manageTimelockTransaction, TimelockTransactionAction } from './time-lock-transactions';

const config = scriptConfig[network.config.chainId!];

export async function getCurrentProtocolFees(): Promise<{ swapFee: BigNumber; flashLoandFee: BigNumber }> {
  const feesCollector = await ethers.getContractAt(
    'ProtocolFeesCollector',
    config.contractAddresses.ProtocolFeesCollector
  );
  return {
    flashLoandFee: await feesCollector.getFlashLoanFeePercentage(),
    swapFee: await feesCollector.getSwapFeePercentage(),
  };
}

export async function getCollectedProtocolFees(tokens: string[]) {
  const feesCollector = await ethers.getContractAt(
    'ProtocolFeesCollector',
    config.contractAddresses.ProtocolFeesCollector
  );
  return feesCollector.getCollectedFeeAmounts(tokens);
}

// swap fee percentage where 1e16 = 1%
export async function timelocked_changeProtocolSwapFeePercentage(
  swapFeePercentage: BigNumber,
  eta: number,
  type: TimelockTransactionAction
) {
  const [_, managementAdmin] = await ethers.getSigners();

  return manageTimelockTransaction(
    managementAdmin,
    {
      targetContract: {
        name: 'ProtocolFeesCollector',
        address: config.contractAddresses.ProtocolFeesCollector,
      },
      eta,
      value: 0,
      targetFunction: {
        identifier: 'setSwapFeePercentage',
        args: [swapFeePercentage],
      },
    },
    type
  );
}

// percentage where 1e16 = 1%
export async function timelocked_changeProtocolFlashLoanFeePercentage(
  flashLoanFeePercentage: BigNumber,
  eta: number,
  type: TimelockTransactionAction
) {
  const [_, managementAdmin] = await ethers.getSigners();

  return manageTimelockTransaction(
    managementAdmin,
    {
      targetContract: {
        name: 'ProtocolFeesCollector',
        address: config.contractAddresses.ProtocolFeesCollector,
      },
      eta,
      value: 0,
      targetFunction: {
        identifier: 'setFlashLoanFeePercentage',
        args: [flashLoanFeePercentage],
      },
    },
    type
  );
}

export async function changeProtocolSwapFeePercentage(feePercentage: string) {
  const [deployer, admin] = await ethers.getSigners();
  const feesCollector = await ethers.getContractAt(
    'ProtocolFeesCollector',
    config.contractAddresses.ProtocolFeesCollector
  );

  const tx = await feesCollector.connect(admin).setSwapFeePercentage(feePercentage);
  const receipt = await tx.wait();
  return receipt.transactionHash;
}

export async function changeProtocolFlashLoanFeePercentage(feePercentage: BigNumber) {
  const [deployer, admin] = await ethers.getSigners();
  const feesCollector = await ethers.getContractAt(
    'ProtocolFeesCollector',
    config.contractAddresses.ProtocolFeesCollector
  );

  const tx = await feesCollector.connect(admin).setFlashLoanFeePercentage(feePercentage);
  const receipt = await tx.wait();
  return receipt.transactionHash;
}

export async function withdrawCollectedProtocolFees(tokens: string[], amounts: number[], recipient: string) {
  const [_, _1, feeCollector] = await ethers.getSigners();

  const feesCollector = await ethers.getContractAt(
    'ProtocolFeesCollector',
    config.contractAddresses.ProtocolFeesCollector
  );
  const tx = await feesCollector.connect(feeCollector).withdrawCollectedFees(tokens, amounts, recipient);
  const receipt = await tx.wait();
  return receipt.transactionHash;
}
