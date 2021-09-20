# Timelock transactions

## Set protocol flash loan percentage
```shell
➜  beethoven-balancer-scripts git:(main) ✗ yarn protocol-fees set-flash-loan-fee-percentage
yarn run v1.22.10
$ ts-node -r dotenv/config --transpile-only scripts/protocol-fees.ts set-flash-loan-fee-percentage
? protocol swap fee percentage 20
? use timelock Yes
? eta when to grant (default 48h + 10min) 1631980776
? Timelock transaction type queue
queue setting protocol flash loan fee percentage to 20 on eta 1631980776...done!
✨  Done in 14.26s.
```