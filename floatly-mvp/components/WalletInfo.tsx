'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useWallet } from '@/hooks/useWallet';
import { Wallet, TrendingUp, Network } from 'lucide-react';
import { NETWORK_CONFIG } from '@/lib/wallet-config';

/**
 * Wallet info display component
 * Shows connected wallet address, balance, and network information
 */

export function WalletInfo() {
  const { isConnected, address, formattedAddress, formattedBalance, isLoadingBalance, network } = useWallet();

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Not Connected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Connect your IOTA wallet to view your balance and interact with the platform.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Info
          </div>
          <Badge variant="outline" className="gap-1">
            <Network className="h-3 w-3" />
            {NETWORK_CONFIG[network as keyof typeof NETWORK_CONFIG]?.name || 'Unknown'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Address */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Address</p>
          <div className="flex items-center gap-2">
            <code className="text-sm bg-muted px-2 py-1 rounded">
              {formattedAddress}
            </code>
          </div>
        </div>

        {/* Balance */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Balance</p>
          <div className="flex items-center gap-2">
            {isLoadingBalance ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-2xl font-bold">
                  {formattedBalance || '0.0000'} IOTA
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Network Info */}
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            Connected to {NETWORK_CONFIG[network as keyof typeof NETWORK_CONFIG]?.name || 'Unknown Network'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Full address: <code className="text-xs">{address}</code>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Compact version for header/navbar
export function WalletInfoCompact() {
  const { isConnected, formattedBalance, isLoadingBalance } = useWallet();

  if (!isConnected) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md">
      <TrendingUp className="h-4 w-4 text-green-500" />
      {isLoadingBalance ? (
        <Skeleton className="h-4 w-20" />
      ) : (
        <span className="text-sm font-medium">
          {formattedBalance || '0.0000'} IOTA
        </span>
      )}
    </div>
  );
}
