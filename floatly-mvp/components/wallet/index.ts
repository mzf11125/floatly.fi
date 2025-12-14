/**
 * Wallet Components and Hooks - Export Index
 * Import everything wallet-related from this file for convenience
 */

// Components
export { WalletButton } from './WalletButton';
export { WalletInfo, WalletInfoCompact } from './WalletInfo';
export { WalletExampleDashboard } from './WalletExampleDashboard';

// Context
export { WalletProvider, useWalletContext } from '@/contexts/WalletContext';

// Hooks
export { useWallet, useWalletReady } from '@/hooks/useWallet';
export { useNotarization, useDocumentHash } from '@/hooks/useNotarization';

// Configuration & Utilities
export {
  NETWORK_CONFIG,
  ACTIVE_NETWORK,
  CONTRACTS,
  WALLET_CONFIG,
  networkConfig,
  useNetworkVariable,
  useNetworkVariables,
  formatIotaAddress,
  formatBalance,
  isWalletConfigured,
} from '@/lib/wallet-config';

/**
 * Usage Examples:
 * 
 * // Basic wallet connection
 * import { WalletButton, useWallet } from '@/components/wallet';
 * 
 * function MyComponent() {
 *   const { isConnected, address, balance } = useWallet();
 *   return <WalletButton />;
 * }
 * 
 * // Smart contract interaction
 * import { useNotarization, useDocumentHash } from '@/components/wallet';
 * 
 * function NotarizeDoc() {
 *   const { createNotarization } = useNotarization();
 *   const { computeHash } = useDocumentHash();
 *   // ... use hooks
 * }
 * 
 * // Display wallet info
 * import { WalletInfo, WalletInfoCompact } from '@/components/wallet';
 * 
 * // Full card
 * <WalletInfo />
 * 
 * // Compact for navbar
 * <WalletInfoCompact />
 */
