export type ScriptContractName = 'Authorizer' | 'Vault' | 'Timelock' | 'ProtocolFeesCollector';

type CliConfigContent = {
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
  tokenAddresses: { symbol: string; address: string; decimals: number }[];
};

type CliConfig = Record<number, CliConfigContent>;

export const scriptConfig: CliConfig = {
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
    tokenAddresses: [
      {
        symbol: 'WBTC',
        decimals: 8,
        address: '0x321162cd933e2be498cd2267a90534a804051b11',
      },
      { symbol: 'USDC', decimals: 6, address: '0x04068da6c83afcfa0e13ba15a6696662335d5b75' },
      { symbol: 'fUSDT', decimals: 6, address: '0x049d68029688eabf473097a2fc38ef61633a3c7a' },
      { symbol: 'WETH', decimals: 18, address: '0x74b23882a30290451A17c44f4F05243b6b58C76d' },
      { symbol: 'LINK', decimals: 18, address: '0xb3654dc3d10ea7645f8319668e8f54d2574fbdc8' },
      { symbol: 'DAI', decimals: 18, address: '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e' },
      { symbol: 'SPIRIT', decimals: 18, address: '0x5cc61a78f164885776aa610fb0fe1257df78e59b' },
      { symbol: 'BOO', decimals: 18, address: '0x841fad6eae12c286d1fd18d1d525dffa75c7effe' },
      { symbol: 'SCREAM', decimals: 18, address: '0xe0654C8e6fd4D733349ac7E09f6f23DA256bF475' },
      { symbol: 'TAROT', decimals: 18, address: '0xc5e2b037d30a390e62180970b3aa4e91868764cd' },
      { symbol: 'STEAK', decimals: 18, address: '0x05848b832e872d9edd84ac5718d58f21fd9c9649' },
      { symbol: 'ICE', decimals: 18, address: '0xf16e81dce15b08f326220742020379b855b87df9' },
      { symbol: 'WFTM', decimals: 18, address: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83' },
      { symbol: 'ANY', decimals: 18, address: '0xddcb3ffd12750b45d32e084887fdf1aabab34239' },
      { symbol: 'CRV', decimals: 18, address: '0x1E4F97b9f9F913c46F1632781732927B9019C68b' },
      { symbol: 'SPELL', decimals: 18, address: '0x468003b688943977e6130f4f68f23aad939a1040' },
      { symbol: 'BEETS', decimals: 18, address: '0xF24Bcf4d1e507740041C9cFd2DddB29585aDCe1e' },
    ],
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
    tokenAddresses: [],
  },
};
