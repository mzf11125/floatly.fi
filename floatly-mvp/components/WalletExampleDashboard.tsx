'use client';

import { WalletButton } from '@/components/WalletButton';
import { WalletInfo, WalletInfoCompact } from '@/components/WalletInfo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/useWallet';
import { useNotarization, useDocumentHash } from '@/hooks/useNotarization';
import { useState } from 'react';
import { Upload, FileCheck, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/**
 * Example component demonstrating wallet integration usage
 * Shows how to connect wallet, display info, and interact with smart contracts
 */

export function WalletExampleDashboard() {
  const { isConnected } = useWallet();
  const { createNotarization, isNotarizing, getMyNotarizations } = useNotarization();
  const { computeHash, isHashing } = useDocumentHash();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notarizations, setNotarizations] = useState<any[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleNotarize = async () => {
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        description: 'Please select a file to notarize',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Compute document hash
      const hash = await computeHash(selectedFile);
      
      // Create notarization on-chain
      const result = await createNotarization({
        documentHash: hash,
        metadata: JSON.stringify({
          filename: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type,
        }),
      });

      if (result) {
        toast({
          title: 'Success!',
          description: `Document notarized. Object ID: ${result.objectId}`,
        });
        setSelectedFile(null);
        // Refresh list
        loadNotarizations();
      }
    } catch (error: any) {
      console.error('Notarization error:', error);
    }
  };

  const loadNotarizations = async () => {
    const myNotarizations = await getMyNotarizations();
    setNotarizations(myNotarizations);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Wallet Integration Example</h1>
          <p className="text-muted-foreground">
            Demonstrating IOTA wallet connect with dapp-kit
          </p>
        </div>
        <div className="flex items-center gap-3">
          <WalletInfoCompact />
          <WalletButton />
        </div>
      </div>

      {!isConnected ? (
        <Card>
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>
              Connect your IOTA wallet to interact with the blockchain
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <WalletButton />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Wallet Info Card */}
          <WalletInfo />

          {/* Notarization Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Document Notarization
              </CardTitle>
              <CardDescription>
                Notarize documents on the IOTA blockchain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-primary transition-colors"
                >
                  <Upload className="h-5 w-5" />
                  <span>
                    {selectedFile ? selectedFile.name : 'Click to select file'}
                  </span>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>

              <Button
                onClick={handleNotarize}
                disabled={!selectedFile || isNotarizing || isHashing}
                className="w-full"
              >
                {isNotarizing || isHashing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isHashing ? 'Computing hash...' : 'Notarizing...'}
                  </>
                ) : (
                  <>
                    <FileCheck className="mr-2 h-4 w-4" />
                    Notarize Document
                  </>
                )}
              </Button>

              <div className="text-xs text-muted-foreground">
                <p>📝 How it works:</p>
                <ol className="list-decimal list-inside space-y-1 mt-2">
                  <li>Select a document to notarize</li>
                  <li>Compute SHA-256 hash of the document</li>
                  <li>Submit hash to IOTA blockchain</li>
                  <li>Receive immutable proof of existence</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* My Notarizations Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Notarizations</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadNotarizations}
                  disabled={isNotarizing}
                >
                  Refresh
                </Button>
              </div>
              <CardDescription>
                Documents you've notarized on the blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              {notarizations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileCheck className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No notarizations yet</p>
                  <p className="text-sm">Notarize your first document above</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {notarizations.map((notarization, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">Notarization #{index + 1}</p>
                        <p className="text-sm text-muted-foreground">
                          Object ID: {notarization.objectId}
                        </p>
                      </div>
                      <FileCheck className="h-5 w-5 text-green-500" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Network</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">IOTA Testnet</div>
            <p className="text-xs text-muted-foreground">
              Mainnet support coming soon
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Supported Wallets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              <div>✅ IOTA Wallet (Browser Extension)</div>
              <div>✅ Sui Wallet (Compatible)</div>
              <div>✅ WalletConnect (Mobile)</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              <div>✅ Wallet Connect</div>
              <div>✅ Sign Messages</div>
              <div>✅ Execute Transactions</div>
              <div>✅ Smart Contract Calls</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
