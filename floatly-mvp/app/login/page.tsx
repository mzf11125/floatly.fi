'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { WalletButton } from "@/components/WalletButton"
import { useWallet } from "@/hooks/useWallet"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Wallet } from "lucide-react"

export default function LoginPage() {
  const { isConnected, address, signMessage } = useWallet();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleTraditionalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement API call to backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store JWT token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast({
        title: 'Login successful',
        description: 'Welcome back to Floatly',
      });

      // Redirect based on user role
      if (data.user.role === 'merchant') {
        router.push('/merchant/dashboard');
      } else if (data.user.role === 'investor') {
        router.push('/investor/dashboard');
      } else if (data.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error?.message || 'Invalid email or password',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletLogin = async () => {
    if (!isConnected || !address) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet first',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Request a nonce from backend
      const nonceResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/wallet/nonce`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });

      if (!nonceResponse.ok) {
        throw new Error('Failed to get authentication nonce');
      }

      const { nonce } = await nonceResponse.json();

      // Step 2: Sign the nonce with wallet
      const message = `Sign this message to authenticate with Floatly.\n\nNonce: ${nonce}\nAddress: ${address}`;
      const signature = await signMessage(message);

      // Step 3: Verify signature and login
      const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/wallet/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, signature, nonce }),
      });

      if (!loginResponse.ok) {
        throw new Error('Wallet authentication failed');
      }

      const data = await loginResponse.json();

      // Store JWT token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast({
        title: 'Wallet login successful',
        description: 'Welcome back to Floatly',
      });

      // Redirect based on user role
      if (data.user.role === 'merchant') {
        router.push('/merchant/dashboard');
      } else if (data.user.role === 'investor') {
        router.push('/investor/dashboard');
      } else if (data.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    } catch (error: any) {
      console.error('Wallet login error:', error);
      toast({
        title: 'Wallet login failed',
        description: error?.message || 'Failed to authenticate with wallet',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold">Floatly</span>
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your Floatly account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Wallet Login */}
          <div className="space-y-3">
            <div className="flex items-center justify-center">
              <WalletButton />
            </div>
            {isConnected && (
              <Button 
                variant="outline" 
                className="w-full gap-2" 
                onClick={handleWalletLogin}
                disabled={isLoading}
              >
                <Wallet className="h-4 w-4" />
                Sign in with Wallet
              </Button>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Traditional Login */}
          <form onSubmit={handleTraditionalLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
          <div className="text-center text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Forgot password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
