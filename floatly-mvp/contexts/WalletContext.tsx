'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IotaClientProvider, WalletProvider as DappKitWalletProvider } from '@iota/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { networkConfig, ACTIVE_NETWORK } from '@/lib/wallet-config';

/**
 * Wallet Context for managing IOTA wallet connection state
 * Wraps @iota/dapp-kit providers and exposes wallet functionality
 */

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  network: string;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <IotaClientProvider networks={networkConfig} defaultNetwork={ACTIVE_NETWORK}>
        <DappKitWalletProvider autoConnect>
          <WalletContextProvider>{children}</WalletContextProvider>
        </DappKitWalletProvider>
      </IotaClientProvider>
    </QueryClientProvider>
  );
}

function WalletContextProvider({ children }: WalletProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize wallet state
    setIsLoading(false);
  }, []);

  const value: WalletContextType = {
    isConnected,
    address,
    balance,
    network: ACTIVE_NETWORK,
    isLoading,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWalletContext() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
}
