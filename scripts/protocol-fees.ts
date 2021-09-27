import dotenv from 'dotenv';
import commander from 'commander';
import inquirer from 'inquirer';
import { stdout } from './utils/stdOut';
import {
  changeProtocolFlashLoanFeePercentage,
  changeProtocolSwapFeePercentage,
  getCollectedProtocolFees,
  getCurrentProtocolFees,
  timelocked_changeProtocolFlashLoanFeePercentage,
  timelocked_changeProtocolSwapFeePercentage,
  withdrawCollectedProtocolFees,
} from './contract-interaction/protocol-fees';
import { getProtocolFeesCollectorAddress } from './contract-interaction/vault';
import { timelockQueueQuestions } from './utils/timelock';
import { bn } from './utils/numbers';
import { printNetwork } from './utils/network';

dotenv.config();

const program = new commander.Command('protocol-fees');

async function main() {
  program
    .command('contract-address')
    .description('list collected protocol fees')
    .action(async () => {
      await printNetwork();
      stdout.printInfo(`ProtocolFeesCollector address: ${await getProtocolFeesCollectorAddress()}`);
    });

  program
    .command('list-collected-fees')
    .description('list collected protocol fees')
    .action(async () => {
      await printNetwork();
      const answers = await inquirer.prompt([
        {
          name: 'tokens',
          type: 'input',
          message: 'comma seperated list of token addresses',
          validate: (input) => input?.length > 0,
        },
      ]);
      stdout.printInfo(`Collected protocol fees: \n ${await getCollectedProtocolFees(answers.tokens.split(','))}`);
    });

  program
    .command('list-fee-percentages')
    .description('list protocol fee percentages')
    .action(async () => {
      await printNetwork();
      const { flashLoandFee, swapFee } = await getCurrentProtocolFees();
      stdout.printInfo(`Current protocol swap fee percentage (1e16 = 1%): ${swapFee}`);
      stdout.printInfo(`Current protocol flash loand fee percentage (1e16 = 1%): ${flashLoandFee}`);
    });

  program
    .command('set-swap-fee-percentage')
    .description('set protocol swap fee percentage (20 => 20%)')
    .action(async () => {
      await printNetwork();
      const answers = await inquirer.prompt([
        {
          name: 'value',
          type: 'number',
          message: 'protocol swap fee percentage (20 => 20%)',
        },
        ...timelockQueueQuestions,
      ]);
      if (answers.timelock) {
        stdout.printStep(`Queuing setting protocol swap fee percentage to ${answers.value} on eta ${answers.eta}`);
        const txHash = await timelocked_changeProtocolSwapFeePercentage(bn(answers.value * 1e16), answers.eta, 'queue');
        stdout.printStepDone(`done with ${txHash}`);
      } else {
        stdout.printStep(`setting protocol swap fee percentage to ${answers.value}`);
        const txHash = await changeProtocolSwapFeePercentage(bn(answers.value * 1e16).toString());
        stdout.printStepDone(`done with ${txHash}`);
      }
    });

  program
    .command('set-flash-loan-fee-percentage')
    .description('set protocol flash loan fee percentage (20 => 20%)')
    .action(async () => {
      await printNetwork();
      const answers = await inquirer.prompt([
        {
          name: 'value',
          type: 'number',
          message: 'protocol flash loan fee percentage (20 => 20%)',
        },
        ...timelockQueueQuestions,
      ]);
      if (answers.timelock) {
        stdout.printStep(`Queue setting protocol flash loan fee percentage to ${answers.value} on eta ${answers.eta}`);
        const txHash = await timelocked_changeProtocolFlashLoanFeePercentage(
          bn(answers.value * 1e16),
          answers.eta,
          'queue'
        );
        stdout.printStepDone(`done with tx ${txHash}`);
      } else {
        stdout.printStep(`setting protocol flash loan fee percentage to ${answers.value}`);
        const txHash = await changeProtocolFlashLoanFeePercentage(bn(answers.value * 1e16));
        stdout.printStepDone(`done with ${txHash}`);
      }
    });

  program
    .command('withdraw-all-collected-fees')
    .description('withdraw collected fees')
    .action(async () => {
      await printNetwork();
      const answers = await inquirer.prompt([
        {
          name: 'tokens',
          type: 'input',
          message: 'comma seperated list of token addresses',
          validate: (input) => input?.length > 0,
        },
        {
          name: 'recipient',
          type: 'input',
          message: 'address of recipient',
          validate: (input) => input?.length > 0,
        },
      ]);

      stdout.printStep(`Withdrawing all collected fees`);
      const tokens = answers.tokens.split(',');
      const tokenAmounts = await getCollectedProtocolFees(tokens);
      const txHash = await withdrawCollectedProtocolFees(tokens, tokenAmounts, answers.recipient);
      stdout.printStepDone(`done with tx ${txHash}`);
      stdout.printStepDone();
    });
  await program.parseAsync(process.argv);
}

main().catch((error) => {
  stdout.printError(error.message, error);
  process.exit(1);
});
