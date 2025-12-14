'use client';

import { Transaction } from '@iota/iota-sdk/transactions';
import { useWallet } from './useWallet';
import { useIotaClient } from '@iota/dapp-kit';
import { CONTRACTS } from '@/lib/wallet-config';
import { useToast } from './use-toast';
import { useState, useCallback } from 'react';

/**
 * Hook for interacting with IOTA Notarization smart contract
 * Provides methods to create, verify, and query notarizations
 */

export interface NotarizationData {
  documentHash: string;
  metadata?: string;
  timestamp?: number;
}

export interface NotarizationResult {
  digest: string;
  objectId: string;
  timestamp: number;
}

export function useNotarization() {
  const { isConnected, address, signAndExecute } = useWallet();
  const iotaClient = useIotaClient();
  const { toast } = useToast();
  const [isNotarizing, setIsNotarizing] = useState(false);

  /**
   * Create a new notarization on-chain
   */
  const createNotarization = useCallback(
    async (data: NotarizationData): Promise<NotarizationResult | null> => {
      if (!isConnected || !address) {
        toast({
          title: 'Wallet not connected',
          description: 'Please connect your wallet to create a notarization',
          variant: 'destructive',
        });
        return null;
      }

      if (!CONTRACTS.notarization) {
        toast({
          title: 'Contract not configured',
          description: 'Notarization contract address is missing',
          variant: 'destructive',
        });
        return null;
      }

      setIsNotarizing(true);

      try {
        const tx = new Transaction();

        // Call the notarization contract's create_notarization function
        // Adjust this based on your actual smart contract module and function names
        tx.moveCall({
          target: `${CONTRACTS.notarization}::notarization::create_notarization`,
          arguments: [
            tx.pure.string(data.documentHash),
            tx.pure.string(data.metadata || ''),
          ],
        });

        const result = await signAndExecute(tx);

        toast({
          title: 'Notarization created',
          description: `Document has been notarized on-chain`,
        });

        return {
          digest: result.digest,
          objectId: result.effects?.created?.[0]?.reference?.objectId || '',
          timestamp: Date.now(),
        };
      } catch (error: any) {
        console.error('Notarization error:', error);
        toast({
          title: 'Notarization failed',
          description: error?.message || 'Failed to create notarization',
          variant: 'destructive',
        });
        return null;
      } finally {
        setIsNotarizing(false);
      }
    },
    [isConnected, address, signAndExecute, toast]
  );

  /**
   * Verify a notarization exists on-chain
   */
  const verifyNotarization = useCallback(
    async (objectId: string): Promise<boolean> => {
      try {
        const object = await iotaClient.getObject({
          id: objectId,
          options: {
            showContent: true,
            showOwner: true,
          },
        });

        return object.data !== null;
      } catch (error) {
        console.error('Verification error:', error);
        return false;
      }
    },
    [iotaClient]
  );

  /**
   * Get notarization details by object ID
   */
  const getNotarization = useCallback(
    async (objectId: string) => {
      try {
        const object = await iotaClient.getObject({
          id: objectId,
          options: {
            showContent: true,
            showOwner: true,
            showPreviousTransaction: true,
          },
        });

        if (!object.data) {
          return null;
        }

        return {
          objectId: object.data.objectId,
          owner: object.data.owner,
          content: object.data.content,
          digest: object.data.digest,
        };
      } catch (error) {
        console.error('Get notarization error:', error);
        return null;
      }
    },
    [iotaClient]
  );

  /**
   * Get all notarizations owned by the current wallet
   */
  const getMyNotarizations = useCallback(
    async (): Promise<any[]> => {
      if (!address) {
        return [];
      }

      try {
        const objects = await iotaClient.getOwnedObjects({
          owner: address,
          filter: {
            StructType: `${CONTRACTS.notarization}::notarization::Notarization`,
          },
          options: {
            showContent: true,
            showOwner: true,
          },
        });

        return objects.data.map((obj) => obj.data).filter(Boolean);
      } catch (error) {
        console.error('Get my notarizations error:', error);
        return [];
      }
    },
    [address, iotaClient]
  );

  /**
   * Query notarizations by document hash
   */
  const queryByDocumentHash = useCallback(
    async (documentHash: string): Promise<any[]> => {
      try {
        // Note: This requires indexing support or event queries
        // Adjust based on your smart contract's event emissions
        const events = await iotaClient.queryEvents({
          query: {
            MoveEventType: `${CONTRACTS.notarization}::notarization::NotarizationCreated`,
          },
        });

        // Filter events by document hash
        const filtered = events.data.filter((event: any) => {
          return event.parsedJson?.document_hash === documentHash;
        });

        return filtered;
      } catch (error) {
        console.error('Query by hash error:', error);
        return [];
      }
    },
    [iotaClient]
  );

  return {
    // State
    isNotarizing,
    isConnected,
    contractAddress: CONTRACTS.notarization,

    // Methods
    createNotarization,
    verifyNotarization,
    getNotarization,
    getMyNotarizations,
    queryByDocumentHash,
  };
}

/**
 * Helper hook to compute document hash from file
 */
export function useDocumentHash() {
  const [isHashing, setIsHashing] = useState(false);

  const computeHash = useCallback(async (file: File): Promise<string> => {
    setIsHashing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    } catch (error) {
      console.error('Hash computation error:', error);
      throw error;
    } finally {
      setIsHashing(false);
    }
  }, []);

  return {
    computeHash,
    isHashing,
  };
}
