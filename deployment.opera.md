
# Fantom opera balancer V2 configuration
## Accounts
We have 3 accounts currently, the deployer, the admin and the fee collector

### Deployer  - 0x4fbe899d37fb7514adf2f41B0630E018Ec275a0C 
used only for deployments

### Admin - 0xca206C8c897d9930AA6E94cF03eB2E5393B65e30
Is the admin of the timelock & can also pause the vault & all pools.

### FeeCollector - 0x011314d4359abA2fde15Fe28ACCaf877F4e4C0E4
Can withdraw the collected protocol fees

## Timelock - 0x12c615406F20eDcBDa50888f9fd6734dC4836417
The timelock contract is the only role holder of all user critical actions like setting fees & granting/revoking roles

## Accounts with default admin role
Accounts which have the default admin role can grant/revoke roles. After the rollout is complete and everything works 
only the timelock should have the default admin role.

Current Accounts with default admin role
- [x] deployer
- [x] admin 
- [x] timelock contract 

## Deployment tasks
- [x] grant default admin to **admin** [#0x5d012f911e8a90d516b23fe519884e391212f95b8ce63ec9ea5e5cb2857f8bb1](https://ftmscan.com/tx/0x5d012f911e8a90d516b23fe519884e391212f95b8ce63ec9ea5e5cb2857f8bb1) 
- [x] grant **admin** Vault - setPaused [#0xeb6e25703b6e52f4ef0be5065a001775b22b081eb70e3af3dd2d291ea7a7999e](https://ftmscan.com/tx/0xeb6e25703b6e52f4ef0be5065a001775b22b081eb70e3af3dd2d291ea7a7999e#eventlog)
- [x] grant **admin** ProtocolFeesCollector - setFlashLoanFeePercentage [#0x6de7201511eb849dc27be82b92ca9360fd086763c580439ed8e963a1ba4d2f19](https://ftmscan.com/tx/0x6de7201511eb849dc27be82b92ca9360fd086763c580439ed8e963a1ba4d2f19)
- [x] grant **feeCollector** ProtocolFeesCollector - withdrawCollectedFees [#0x49c2cc577647be8ffaaef3e929f5c1f82eca373faba4a9f7e0150cc3d4d99361](https://ftmscan.com/tx/0x49c2cc577647be8ffaaef3e929f5c1f82eca373faba4a9f7e0150cc3d4d99361) 
- [x] grant default admin role to **timelock** [#0x4b4102b74c2e77e286cb34b78c3fa5f26624c42b3649e948fa1df47335540dbc](https://ftmscan.com/tx/0x4b4102b74c2e77e286cb34b78c3fa5f26624c42b3649e948fa1df47335540dbc)
- [x] grant **timelock** ProtocolFeesCollector - setFlashLoanFeePercentage [#0x10df35b2f0046de49d40c6bc189588ffa7015f03f96e52fb5466a2afb4d1fb11](https://ftmscan.com/tx/0x10df35b2f0046de49d40c6bc189588ffa7015f03f96e52fb5466a2afb4d1fb11)
- [x] grant **admin** ProtocolFeesCollector - setSwapFeePercentage [#0x1e8b7a68a5e9f384eba7d19d8c9f0803f642f998aaa9a5bdd1a778ec0ea573ad](https://ftmscan.com/tx/0x1e8b7a68a5e9f384eba7d19d8c9f0803f642f998aaa9a5bdd1a778ec0ea573ad)
- [x] grant **timelock** ProtocolFeesCollector - setSwapFeePercentage [#0x0b090b6ceacf456b17839b6119416eb7e00a62c1bfd99a32d41f4a8418eeaadb](https://ftmscan.com/tx/0x0b090b6ceacf456b17839b6119416eb7e00a62c1bfd99a32d41f4a8418eeaadb)
- [x] grant **timelock** Vault = setAuthorizer [#0xc8228d4ba59bf5bb6f91252c8dfc438994652d10f4077c4e532e090d4566329c](https://ftmscan.com/tx/0xc8228d4ba59bf5bb6f91252c8dfc438994652d10f4077c4e532e090d4566329c)
- [x] set protocol swap fee to 15 % [#0x2cae7dbc0ef64f4660a8befa5274177b08b66122bfc99f157904ef0c60e87cb3](https://ftmscan.com/tx/0x2cae7dbc0ef64f4660a8befa5274177b08b66122bfc99f157904ef0c60e87cb3)
- [ ] set protocol flash loan fee to X %
- [x] grant **admin** WeightedPool - setPaused [#0x06a33a06200c149f98404cac2d97ca0ec7dcfaea1e7638c5d6cefd4af0008296](https://ftmscan.com/tx/0x06a33a06200c149f98404cac2d97ca0ec7dcfaea1e7638c5d6cefd4af0008296)
- [x] grant **admin** StablePool - setPaused [#0x161be67c1687ecca5b74be78477019f67cdaaa89f11c80810b7a0e1e499f6a87](https://ftmscan.com/tx/0x161be67c1687ecca5b74be78477019f67cdaaa89f11c80810b7a0e1e499f6a87)
- [ ] revoke **admin** - setFlashLoanFeePercentage & setFlashLoanFeePercentage from admin
- [ ] revoke default admin from **admin** & **deployer**

## Log
```shell
 beethoven-balancer-scripts git:(main) ✗ yarn authorizer manage-roles
yarn run v1.22.10
$ ts-node -r dotenv/config --transpile-only scripts/authorizer.ts manage-roles
? chose role action grant
? Contract name Vault
? comma seperated list of roles setPaused
? grantee address 0xca206C8c897d9930AA6E94cF03eB2E5393B65e30
? use timelock No
grant roles setPaused for Vault to 0xca206C8c897d9930AA6E94cF03eB2E5393B65e30...done!
✨  Done in 17.88s.
➜  beethoven-balancer-scripts git:(main) ✗ yarn authorizer manage-roles
yarn run v1.22.10
$ ts-node -r dotenv/config --transpile-only scripts/authorizer.ts manage-roles
? chose role action grant
? Contract name ProtocolFeesCollector
? comma seperated list of roles setFlashLoanFeePercentage,setFlashLoanFeePercentage
? grantee address 0xca206C8c897d9930AA6E94cF03eB2E5393B65e30
? use timelock No
grant roles setFlashLoanFeePercentage,setFlashLoanFeePercentage for ProtocolFeesCollector to 0xca206C8c897d9930AA6E94cF03eB2E5393B65e30...done!
✨  Done in 38.87s.
➜  beethoven-balancer-scripts git:(main) ✗ yarn authorizer manage-roles
yarn run v1.22.10
$ ts-node -r dotenv/config --transpile-only scripts/authorizer.ts manage-roles
? chose role action grant
? Contract name ProtocolFeesCollector
? comma seperated list of roles withdrawCollectedFees
? grantee address 0x011314d4359abA2fde15Fe28ACCaf877F4e4C0E4
? use timelock No
grant roles withdrawCollectedFees for ProtocolFeesCollector to 0x011314d4359abA2fde15Fe28ACCaf877F4e4C0E4...done!
✨  Done in 48.32s.
➜  beethoven-balancer-scripts git:(main) ✗ yarn authorizer manage-default-admin
yarn run v1.22.10
$ ts-node -r dotenv/config --transpile-only scripts/authorizer.ts manage-default-admin
? chose role action grant
? admin account address 0x12c615406F20eDcBDa50888f9fd6734dC4836417
? use timelock No
grant default admin to 0x12c615406F20eDcBDa50888f9fd6734dC4836417}...done!
✨  Done in 31.22s.
➜  beethoven-balancer-scripts git:(main) ✗ yarn authorizer manage-roles        
yarn run v1.22.10
$ ts-node -r dotenv/config --transpile-only scripts/authorizer.ts manage-roles
? chose role action grant
? Contract name ProtocolFeesCollector
? comma seperated list of roles setFlashLoanFeePercentage,setFlashLoanFeePercentage
? grantee address 0x12c615406F20eDcBDa50888f9fd6734dC4836417
? use timelock No
grant roles setFlashLoanFeePercentage,setFlashLoanFeePercentage for ProtocolFeesCollector to 0x12c615406F20eDcBDa50888f9fd6734dC4836417...done!
✨  Done in 21.43s.

## granted 2 times setFlashLoanFeePercentage ! Granting setSwapFeePercentage ...

➜  beethoven-balancer-scripts git:(main) ✗ yarn authorizer manage-roles
yarn run v1.22.10
$ ts-node -r dotenv/config --transpile-only scripts/authorizer.ts manage-roles
? chose role action grant
? Contract name ProtocolFeesCollector
? comma seperated list of roles setSwapFeePercentage
? grantee address 0xca206C8c897d9930AA6E94cF03eB2E5393B65e30
? use timelock No
grant roles setSwapFeePercentage for ProtocolFeesCollector to 0xca206C8c897d9930AA6E94cF03eB2E5393B65e30...done!
✨  Done in 57.10s.
➜  beethoven-balancer-scripts git:(main) ✗ yarn authorizer manage-roles
yarn run v1.22.10
$ ts-node -r dotenv/config --transpile-only scripts/authorizer.ts manage-roles
? chose role action grant
? Contract name ProtocolFeesCollector
? comma seperated list of roles setSwapFeePercentage
? grantee address 0x12c615406F20eDcBDa50888f9fd6734dC4836417
? use timelock No
grant roles setSwapFeePercentage for ProtocolFeesCollector to 0x12c615406F20eDcBDa50888f9fd6734dC4836417...done!
✨  Done in 36.03s.

```