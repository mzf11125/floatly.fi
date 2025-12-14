'use client';

import { ConnectButton, useCurrentAccount } from '@iota/dapp-kit';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, Copy, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { formatIotaAddress } from '@/lib/wallet-config';

/**
 * Wallet connection button component
 * Shows connect button when disconnected, wallet info dropdown when connected
 */

export function WalletButton() {
  const currentAccount = useCurrentAccount();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    if (!currentAccount?.address) return;

    try {
      await navigator.clipboard.writeText(currentAccount.address);
      setCopied(true);
      toast({
        title: 'Address copied',
        description: 'Wallet address copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: 'Copy failed',
        description: 'Failed to copy address to clipboard',
        variant: 'destructive',
      });
    }
  };

  // If not connected, show dapp-kit's ConnectButton
  if (!currentAccount) {
    return (
      <ConnectButton
        connectText={
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
          </div>
        }
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      />
    );
  }

  // If connected, show wallet dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Wallet className="h-4 w-4" />
          <span className="hidden sm:inline">
            {formatIotaAddress(currentAccount.address)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopyAddress} className="cursor-pointer">
          {copied ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          <span>{copied ? 'Copied!' : 'Copy Address'}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <ConnectButton
          connectText="Disconnect"
          className="w-full"
        >
          <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Disconnect</span>
          </DropdownMenuItem>
        </ConnectButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
