import { ethers, network } from 'hardhat';
import { scriptConfig } from '../../cli-config';

const config = scriptConfig[network.config.chainId!];

async function grantDefaultAdmin() {
  const authorizer = await ethers.getContractAt('Authorizer', config.contractAddresses.Authorizer);

  console.log('granting default admin to admin');
  const roles = [await authorizer.DEFAULT_ADMIN_ROLE()];
  await authorizer.grantRoles(roles, config.accountAddresses.admin);
  console.log('done');
}

grantDefaultAdmin()
  .then(() => {
    console.log('granted default admin');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
