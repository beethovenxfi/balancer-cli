import dotenv from 'dotenv';
import commander from 'commander';
import inquirer from 'inquirer';
import { stdout } from './utils/stdOut';
import {
  canPerform,
  manageDefaultAdmin,
  manageRoles,
  timelocked_manageDefaultAdmin,
  timelocked_manageRoles,
} from './contract-interaction/authorizer';
import { timelockQueueQuestions } from './utils/timelock';
import { printNetwork } from './utils/network';
import { scriptConfig } from '../cli-config';
import { network } from 'hardhat';

dotenv.config();

const config = scriptConfig[network.config.chainId!];

const program = new commander.Command('authorizer');

const roleActionQuestion = {
  name: 'roleAction',
  type: 'list',
  message: 'chose role action',
  choices: ['grant', 'revoke'],
};

async function main() {
  program
    .command('manage-roles')
    .description('manage roles')
    .action(async () => {
      await printNetwork();
      const answers = await inquirer.prompt([
        roleActionQuestion,
        {
          name: 'contract',
          type: 'list',
          message: 'Contract name',
          choices: ['Authorizer', 'ProtocolFeesCollector', 'Vault', 'WeightedPool', 'StablePool'],
        },
        {
          name: 'contractAddress',
          type: 'input',
          message: 'Contract address',
          when: (answers) => ['WeightedPool', 'StablePool'].includes(answers.contract),
        },
        {
          name: 'roles',
          type: 'input',
          message: 'comma seperated list of roles',
          validate: (input) => input?.length > 0,
        },
        {
          name: 'grantee',
          type: 'input',
          message: 'grantee address',
        },
        ...timelockQueueQuestions,
      ]);
      const contractAddress = answers.contractAddress ?? config.contractAddresses[answers.contract];

      if (answers.timelock) {
        stdout.printStep(
          `Queue ${answers.roleAction} roles ${answers.roles} for ${answers.contract} to ${answers.grantee} on eta ${answers.eta}`
        );
        const txHash = await timelocked_manageRoles(
          answers.contract,
          contractAddress,
          answers.roles.split(','),
          answers.grantee,
          answers.roleAction,
          answers.eta,
          'queue'
        );
        stdout.printStepDone(`done with tx ${txHash}`);
      } else {
        stdout.printStep(`grant roles ${answers.roles} for ${answers.contract} to ${answers.grantee}`);
        const txHash = await manageRoles(
          answers.contract,
          contractAddress,
          answers.roles.split(','),
          answers.grantee,
          'grant'
        );
        stdout.printStepDone(`done with tx ${txHash}`);
      }
    });

  program
    .command('manage-default-admin')
    .description('Manages default admin role')
    .action(async () => {
      await printNetwork();
      const answers = await inquirer.prompt([
        roleActionQuestion,
        {
          name: 'address',
          type: 'input',
          message: 'admin account address',
        },
        ...timelockQueueQuestions,
      ]);
      if (answers.timelock) {
        stdout.printStep(`Queuing ${answers.roleAction} default admin to ${answers.address} on eta ${answers.eta}`);
        const txHash = await timelocked_manageDefaultAdmin(answers.address, answers.eta, 'queue', answers.roleAction);
        stdout.printStepDone(`done with tx ${txHash}`);
      } else {
        stdout.printStep(`${answers.roleAction} default admin to ${answers.address}}`);
        const txHash = await manageDefaultAdmin(answers.address, answers.roleAction);
        stdout.printStepDone(`done with tx ${txHash}`);
      }
    });

  program
    .command('can-perform')
    .description('check if address can perform action')
    .action(async () => {
      await printNetwork();
      const answers = await inquirer.prompt([
        {
          name: 'contract',
          type: 'list',
          message: 'Contract name',
          choices: ['Authorizer', 'ProtocolFeesCollector', 'Vault', 'WeightedPool', 'StablePool'],
        },
        {
          name: 'contractAddress',
          type: 'input',
          message: 'Contract address',
          when: (answers) => ['WeightedPool', 'StablePool'].includes(answers.contract),
        },
        {
          name: 'granteeAddress',
          type: 'input',
          message: 'grantee address',
        },
        {
          name: 'role',
          type: 'input',
          message: 'role',
        },
      ]);
      const contractAddress = answers.contractAddress ?? config.contractAddresses[answers.contract];
      stdout.printInfo(
        `${answers.granteeAddress} has role ${answers.role}: ${await canPerform(
          answers.contract,
          contractAddress,
          answers.granteeAddress,
          answers.role
        )}`
      );
    });

  await program.parseAsync(process.argv);
}

main().catch((error) => {
  stdout.printError(error.message, error);
  process.exit(1);
});
