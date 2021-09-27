import { ethers, network } from 'hardhat';
import { scriptConfig, ScriptContractName } from '../../cli-config';
import { manageTimelockTransaction, TimelockTransactionAction } from './time-lock-transactions';
import { actionId } from '../utils/contracts';
import { ZERO_ADDRESS } from '../utils/numbers';

type RoleAction = 'grant' | 'revoke';

const config = scriptConfig[network.config.chainId!];

export async function timelocked_manageRoles(
  contractName: ScriptContractName,
  contractAddress: string,
  roles: string[],
  to: string,
  roleAction: RoleAction,
  eta: number,
  action: TimelockTransactionAction
) {
  const [deployer, managementAdmin] = await ethers.getSigners();
  const contract = await ethers.getContractAt(contractName, contractAddress);

  const encodedRoles = [];
  for (const role of roles) {
    encodedRoles.push(await actionId(contract, role));
  }

  return manageTimelockTransaction(
    managementAdmin,
    {
      targetContract: {
        name: 'Authorizer',
        address: config.contractAddresses.Authorizer,
      },
      eta,
      value: 0,
      targetFunction: {
        identifier: roleAction === 'grant' ? 'grantRoles' : 'revokeRoles',
        args: [encodedRoles, to],
      },
    },
    action
  );
}

export async function timelocked_manageDefaultAdmin(
  address: string,
  eta: number,
  tla: TimelockTransactionAction,
  roleAction: RoleAction
) {
  const [deployer, managementAdmin] = await ethers.getSigners();
  const authorizer = await ethers.getContractAt('Authorizer', config.contractAddresses.Authorizer);
  const defaultRole = await authorizer.DEFAULT_ADMIN_ROLE();

  return await manageTimelockTransaction(
    managementAdmin,
    {
      targetContract: {
        name: 'Authorizer',
        address: config.contractAddresses.Authorizer,
      },
      eta,
      value: 0,
      targetFunction: {
        identifier: roleAction === 'grant' ? 'grantRoles' : 'revokeRoles',
        args: [[defaultRole], address],
      },
    },
    tla
  );
}

export async function manageDefaultAdmin(address: string, roleAction: RoleAction) {
  const [deployer, admin] = await ethers.getSigners();
  const authorizer = await ethers.getContractAt('Authorizer', config.contractAddresses.Authorizer);

  const roles = [await authorizer.DEFAULT_ADMIN_ROLE()];
  let tx;
  if (roleAction === 'grant') {
    tx = await authorizer.connect(admin).grantRoles(roles, address);
  } else {
    tx = await authorizer.connect(admin).revokeRoles(roles, address);
  }
  const receipt = await tx.wait();
  return receipt.transactionHash;
}

export async function manageRoles(
  contractName: ScriptContractName,
  contractAddress: string,
  roles: string[],
  grantee: string,
  action: RoleAction
) {
  const [deployer, admin] = await ethers.getSigners();
  const authorizer = await ethers.getContractAt('Authorizer', config.contractAddresses.Authorizer);

  const contract = await ethers.getContractAt(contractName, contractAddress);

  const encodedRoles = [];
  for (const role of roles) {
    encodedRoles.push(await actionId(contract, role));
  }

  let tx;
  if (action === 'grant') {
    tx = await authorizer.connect(admin).grantRoles(encodedRoles, grantee);
  } else {
    tx = await authorizer.connect(admin).revokeRoles(encodedRoles, grantee);
  }
  const receipt = tx.wait();
  return receipt.transactionHash;
}

export async function canPerform(contractName: string, contractAddress: string, granteeAddress: string, role: string) {
  const authorizer = await ethers.getContractAt('Authorizer', config.contractAddresses.Authorizer);
  const contract = await ethers.getContractAt(contractName, contractAddress);
  const encodedRole = await actionId(contract, role);
  return authorizer.canPerform(encodedRole, granteeAddress, ZERO_ADDRESS);
}
