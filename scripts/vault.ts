import dotenv from 'dotenv';
import commander from 'commander';
import { stdout } from './utils/stdOut';
import { getProtocolFeesCollectorAddress, setVaultPaused } from './contract-interaction/vault';
import inquirer from 'inquirer';
import { printNetwork } from './utils/network';

dotenv.config();

const program = new commander.Command('vault');

async function main() {
  program
    .command('protocol-fee-collector-address')
    .description('print the protocol fee collector address')
    .action(async () => {
      await printNetwork();
      stdout.printInfo(`ProtocolFeesCollector address: ${await getProtocolFeesCollectorAddress()}`);
    });

  program
    .command('pause')
    .description('pause the vault')
    .action(async () => {
      await printNetwork();
      const answers = await inquirer.prompt([
        {
          name: 'confirmed',
          type: 'confirm',
          message: 'Do you really want to PAUSE the vault?',
        },
      ]);
      if (answers.confirmed) {
        stdout.printStep('Pausing vault');
        const txHash = await setVaultPaused(true);
        stdout.printStepDone(`done with tx ${txHash}`);
      }
    });

  program
    .command('resume')
    .description('resume the vault')
    .action(async () => {
      await printNetwork();
      const answers = await inquirer.prompt([
        {
          name: 'confirmed',
          type: 'confirm',
          message: 'Do you really want to Resume the vault?',
        },
      ]);
      if (answers.confirmed) {
        stdout.printStep('Resuming vault');
        const txHash = await setVaultPaused(false);
        stdout.printStepDone(`done with tx ${txHash}`);
      }
    });

  program
    .command('batch-swap')
    .description('execute batch swap')
    .action(async () => {
      await printNetwork();
      const answers = await inquirer.prompt([
        {
          name: 'assets',
          type: 'input',
          message: 'comma seperated list of tokens',
        },
        {
          name: 'limits',
          type: 'input',
          message: 'comma seperated list of limits of the tokens to send to vault',
        },
      ]);
      if (answers.confirmed) {
        stdout.printStep('Resuming vault');
        const txHash = await setVaultPaused(false);
        stdout.printStepDone(`done with tx ${txHash}`);
      }
    });

  await program.parseAsync(process.argv);
}

main().catch((error) => {
  stdout.printError(error.message, error);
  process.exit(1);
});
