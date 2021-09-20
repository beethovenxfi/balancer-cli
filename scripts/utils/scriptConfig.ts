export type ScriptContractName = 'Authorizer' | 'Vault' | 'Timelock' | 'ProtocolFeesCollector';

type ContractAddress = Record<string, string>;

type ScriptConfigContent = {
  contractAddresses: {
    Authorizer: string;
    Vault: string;
    Timelock: string;
    ProtocolFeesCollector: string;
  } & Record<string, string>;
  accountAddresses: {
    deployer: string;
    admin: string;
    feeCollector: string;
  };
  // authorizerAddress: string;
  // vaultAddress: string;
  // timelockAddress: string;
  // adminAddress: string;
  // deployerAddress: string;
  // withdrawalAdminAddress: string;
};

type ScriptConfig = Record<number, ScriptConfigContent>;

export const scriptConfig: ScriptConfig = {
  250: {
    contractAddresses: {
      Authorizer: '0x974D3FF709D84Ba44cde3257C0B5B0b14C081Ce9',
      ProtocolFeesCollector: '0xC6920d3a369E7c8BD1A22DbE385e11d1F7aF948F',
      Vault: '0x20dd72Ed959b6147912C2e529F0a0C651c33c9ce',
      Timelock: '0x12c615406F20eDcBDa50888f9fd6734dC4836417',
    },
    accountAddresses: {
      deployer: '0x4fbe899d37fb7514adf2f41B0630E018Ec275a0C',
      admin: '0xca206C8c897d9930AA6E94cF03eB2E5393B65e30',
      feeCollector: '0x011314d4359abA2fde15Fe28ACCaf877F4e4C0E4',
    },
    // timelockAddress: '0x12c615406F20eDcBDa50888f9fd6734dC4836417',
  },
  4: {
    contractAddresses: {
      Authorizer: '0x974D3FF709D84Ba44cde3257C0B5B0b14C081Ce9',
      ProtocolFeesCollector: '0x45384d59dA6748d7C21200c80893634d5CA980CD',
      Vault: '0xF07513C68C55A31337E3b58034b176A15Dce16eD',
      Timelock: '0xCEE3b7cb8996AE9Cd433f68884A16b61ca8a1FD8',
    },
    accountAddresses: {
      deployer: '0x4fbe899d37fb7514adf2f41B0630E018Ec275a0C',
      admin: '0xca206C8c897d9930AA6E94cF03eB2E5393B65e30',
      feeCollector: '0x011314d4359abA2fde15Fe28ACCaf877F4e4C0E4',
    },
    // authorizerAddress: '0x974D3FF709D84Ba44cde3257C0B5B0b14C081Ce9',
    // vaultAddress: '0xF07513C68C55A31337E3b58034b176A15Dce16eD',
    // timelockAddress: '0xCEE3b7cb8996AE9Cd433f68884A16b61ca8a1FD8',
    // adminAddress: '0xca206C8c897d9930AA6E94cF03eB2E5393B65e30',
    // deployerAddress: '0x4fbe899d37fb7514adf2f41B0630E018Ec275a0C',
    // withdrawalAdminAddress: '0x011314d4359abA2fde15Fe28ACCaf877F4e4C0E4',
  },
};
