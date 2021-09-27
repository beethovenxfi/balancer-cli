# Balancer scripts
This is a small cli package to interact with the balancer contracts.

Usage:

run `yarn install`

create `.env` file with at least
```dotenv
MAINNET=opera
HARDHAT_NETWORK=rinkeby
```
The `HARDHAT_NETWORK` defines to which network you go and is required. Add the `MAINNET` 
to enable an additional confirmation on actions performed on the mainnet.

See `hardhat.config.ts` to see how you configure the accounts for write actions

see `package.json` for available scripts.

## CLI

```shell
yarn authorizer [options] [command]

Options:
-h, --help            display help for command

Commands:
manage-roles          manage roles
manage-default-admin  Manages default admin role
can-perform           check if address can perform action
help [command]        display help for command
```

```shell
yarn protocol-fees [options] [command]

Options:
  -h, --help                     display help for command

Commands:
  contract-address               print contract address
  list-collected-fees            list collected protocol fees
  list-fee-percentages           list protocol fee percentages
  set-swap-fee-percentage        set protocol swap fee percentage (20 => 20%)
  set-flash-loan-fee-percentage  set protocol flash loan fee percentage (20 => 20%)
  withdraw-all-collected-fees    withdraw collected fees
  help [command]                 display help for command

```

```shell
 timelock [options] [command]

Options:
  -h, --help            display help for command

Commands:
  set-pending-admin     set pending timelock admin
  accept-pending-admin  accept pending timelock admin
  current-admin         get current timelock admin
  list-settings         list current timelock settings
  list-transactions     list all transaction
  execute               execute transaction
  help [command]        display help for command

```

```shell
yarn vault [options] [command]

Options:
  -h, --help                      display help for command

Commands:
  protocol-fee-collector-address  print the protocol fee collector address
  pause                           pause the vault
  resume                          resume the vault
  batch-swap                      execute batch swap
  help [command]                  display help for command
```

```shell
yarn pools [options] [command]

Options:
  -h, --help      display help for command

Commands:
  pause           pause a pool
  resume          resume a pool
  help [command]  display help for command

```
