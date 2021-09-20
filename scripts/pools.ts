import dotenv from 'dotenv';
import commander from 'commander';
import { stdout } from './utils/stdOut';
import inquirer from 'inquirer';
import { printNetwork } from './utils/network';
import { setPoolPaused } from './contract-interaction/pools';

dotenv.config();

const program = new commander.Command('pools');

async function main() {
  program
    .command('pause')
    .description('pause a pool')
    .action(async () => {
      await printNetwork();
      const answers = await inquirer.prompt([
        {
          name: 'confirmed',
          type: 'confirm',
          message: 'Do you really want to PAUSE a pool?',
        },
        {
          name: 'type',
          type: 'list',
          choices: ['WeightedPool', 'StablePool'],
          message: 'pool type',
        },
        {
          name: 'address',
          type: 'input',
          message: 'pool address',
        },
      ]);
      if (answers.confirmed) {
        stdout.printStep(`Pausing ${answers.type} on ${answers.address}`);
        const txHash = await setPoolPaused(answers.type, answers.address, true);
        stdout.printStepDone(`done with tx ${txHash}`);
      }
    });

  program
    .command('resume')
    .description('resume a pool')
    .action(async () => {
      await printNetwork();
      const answers = await inquirer.prompt([
        {
          name: 'confirmed',
          type: 'confirm',
          message: 'Do you really want to RESUME a pool?',
        },
        {
          name: 'type',
          type: 'list',
          choices: ['WeightedPool', 'StablePool'],
          message: 'pool type',
        },
        {
          name: 'address',
          type: 'input',
          message: 'pool address',
        },
      ]);
      if (answers.confirmed) {
        stdout.printStep(`Resuming ${answers.type} on ${answers.address}`);
        const txHash = await setPoolPaused(answers.type, answers.address, false);
        stdout.printStepDone(`done with tx ${txHash}`);
      }
    });

  await program.parseAsync(process.argv);
}

main().catch((error) => {
  stdout.printError(error.message, error);
  process.exit(1);
});
