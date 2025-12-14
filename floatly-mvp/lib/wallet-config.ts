import { createNetworkConfig } from '@iota/dapp-kit';
import { getFullnodeUrl } from '@iota/iota-sdk/client';
import { type IotaClientOptions } from '@iota/iota-sdk/client';

/**
 * IOTA Network Configuration for Wallet Integration
 * Currently configured for testnet only
 * Future: Add mainnet support with network switching capability
 */

export const NETWORK_CONFIG = {
  testnet: {
    url: getFullnodeUrl('testnet'),
    name: 'IOTA Testnet',
    chainId: 'iota:testnet',
  },
  // Future mainnet configuration
  // mainnet: {
  //   url: getFullnodeUrl('mainnet'),
  //   name: 'IOTA Mainnet',
  //   chainId: 'iota:mainnet',
  // },
};

// Current active network (testnet only for now)
export const ACTIVE_NETWORK = 'testnet' as const;

// Create network config for dapp-kit
const { networkConfig, useNetworkVariable, useNetworkVariables } = createNetworkConfig({
  testnet: {
    url: NETWORK_CONFIG.testnet.url,
  },
  // Future: Add mainnet
  // mainnet: {
  //   url: NETWORK_CONFIG.mainnet.url,
  // },
});

export { networkConfig, useNetworkVariable, useNetworkVariables };

// IOTA client options
export const iotaClientOptions: IotaClientOptions = {
  url: NETWORK_CONFIG[ACTIVE_NETWORK].url,
};

// Smart contract package IDs (from env)
export const CONTRACTS = {
  notarization: process.env.NEXT_PUBLIC_IOTA_NOTARIZATION_PKG_ID || '',
  identity: process.env.NEXT_PUBLIC_IOTA_IDENTITY_PKG_ID || '',
};

// Wallet configuration
export const WALLET_CONFIG = {
  appName: 'Floatly',
  appUrl: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
  // Supported wallet types: Browser extensions + WalletConnect for mobile
  preferredWallets: [
    'IOTA Wallet', // Browser extension
    'Sui Wallet', // Compatible wallet
  ],
  requiredFeatures: ['standard:connect', 'standard:events'],
};

// Helper to check if wallet is configured
export const isWalletConfigured = () => {
  return !!(CONTRACTS.notarization && CONTRACTS.identity);
};

// Display utilities
export const formatIotaAddress = (address: string, chars: number = 6): string => {
  if (!address) return '';
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

export const formatBalance = (balance: bigint | string, decimals: number = 9): string => {
  const balanceBigInt = typeof balance === 'string' ? BigInt(balance) : balance;
  const divisor = BigInt(10 ** decimals);
  const whole = balanceBigInt / divisor;
  const fraction = balanceBigInt % divisor;
  
  return `${whole}.${fraction.toString().padStart(decimals, '0').slice(0, 4)}`;
};
