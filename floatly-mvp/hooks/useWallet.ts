'use client';

import { useCurrentAccount, useSignAndExecuteTransaction, useIotaClient } from '@iota/dapp-kit';
import { Transaction } from '@iota/iota-sdk/transactions';
import { useState, useEffect, useCallback } from 'react';
import { formatIotaAddress, formatBalance, ACTIVE_NETWORK } from '@/lib/wallet-config';
import { useToast } from '@/hooks/use-toast';

/**
 * Custom hook for IOTA wallet interactions
 * Wraps @iota/dapp-kit hooks with additional functionality
 */

export interface WalletState {
  // Connection state
  isConnected: boolean;
  address: string | null;
  formattedAddress: string | null;
  
  // Balance
  balance: string | null;
  formattedBalance: string | null;
  isLoadingBalance: boolean;
  
  // Network
  network: string;
  
  // Transaction methods
  signAndExecute: (transaction: Transaction) => Promise<any>;
  signMessage: (message: string) => Promise<string>;
  
  // Utility
  refreshBalance: () => Promise<void>;
}

export function useWallet(): WalletState {
  const currentAccount = useCurrentAccount();
  const iotaClient = useIotaClient();
  const { mutateAsync: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const { toast } = useToast();
  
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  const address = currentAccount?.address || null;
  const isConnected = !!currentAccount;

  // Fetch balance when account changes
  const refreshBalance = useCallback(async () => {
    if (!address) {
      setBalance(null);
      return;
    }

    try {
      setIsLoadingBalance(true);
      const balanceData = await iotaClient.getBalance({ owner: address });
      setBalance(balanceData.totalBalance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(null);
    } finally {
      setIsLoadingBalance(false);
    }
  }, [address, iotaClient]);

  useEffect(() => {
    refreshBalance();
  }, [refreshBalance]);

  // Sign and execute transaction
  const signAndExecute = useCallback(
    async (transaction: Transaction) => {
      if (!currentAccount) {
        toast({
          title: 'Wallet not connected',
          description: 'Please connect your wallet to continue',
          variant: 'destructive',
        });
        throw new Error('Wallet not connected');
      }

      try {
        const result = await signAndExecuteTransaction({
          transaction: transaction as any,
          chain: `iota:${ACTIVE_NETWORK}`,
        });

        toast({
          title: 'Transaction successful',
          description: `Transaction digest: ${result.digest}`,
        });

        // Refresh balance after transaction
        await refreshBalance();

        return result;
      } catch (error: any) {
        console.error('Transaction error:', error);
        toast({
          title: 'Transaction failed',
          description: error?.message || 'Unknown error occurred',
          variant: 'destructive',
        });
        throw error;
      }
    },
    [currentAccount, signAndExecuteTransaction, toast, refreshBalance]
  );

  // Sign message for authentication
  const signMessage = useCallback(
    async (message: string): Promise<string> => {
      if (!currentAccount) {
        throw new Error('Wallet not connected');
      }

      try {
        // Use the wallet's signPersonalMessage feature
        const encoder = new TextEncoder();
        const messageBytes = encoder.encode(message);
        
        // Note: This requires wallet support for personal message signing
        // Different wallets may have different APIs
        const signature = await (currentAccount as any).signPersonalMessage?.({
          message: messageBytes,
        });

        if (!signature) {
          throw new Error('Wallet does not support message signing');
        }

        return signature.signature;
      } catch (error: any) {
        console.error('Message signing error:', error);
        toast({
          title: 'Signing failed',
          description: error?.message || 'Failed to sign message',
          variant: 'destructive',
        });
        throw error;
      }
    },
    [currentAccount, toast]
  );

  return {
    isConnected,
    address,
    formattedAddress: address ? formatIotaAddress(address) : null,
    balance,
    formattedBalance: balance ? formatBalance(balance) : null,
    isLoadingBalance,
    network: ACTIVE_NETWORK,
    signAndExecute,
    signMessage,
    refreshBalance,
  };
}

// Hook for checking if wallet is ready for transactions
export function useWalletReady() {
  const { isConnected, balance } = useWallet();
  const hasBalance = balance && BigInt(balance) > BigInt(0);
  
  return {
    isReady: isConnected && hasBalance,
    isConnected,
    hasBalance: !!hasBalance,
  };
}
