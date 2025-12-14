'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { WalletButton } from "@/components/WalletButton"
import { useWallet } from "@/hooks/useWallet"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Wallet } from "lucide-react"

export default function SignupPage() {
  const { isConnected, address, signMessage } = useWallet();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('merchant');

  const handleTraditionalSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement API call to backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const data = await response.json();
      
      // Store JWT token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast({
        title: 'Account created successfully',
        description: 'Welcome to Floatly!',
      });

      // Redirect based on user role
      if (role === 'merchant') {
        router.push('/merchant/dashboard');
      } else if (role === 'investor') {
        router.push('/investor/dashboard');
      } else {
        router.push('/');
      }
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error?.message || 'Could not create account',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletSignup = async () => {
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
        throw new Error('Failed to get registration nonce');
      }

      const { nonce } = await nonceResponse.json();

      // Step 2: Sign the nonce with wallet
      const message = `Sign this message to create a Floatly account.\n\nNonce: ${nonce}\nAddress: ${address}`;
      const signature = await signMessage(message);

      // Step 3: Create account with wallet signature
      const registerResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/wallet/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, signature, nonce, role, name: name || 'Wallet User' }),
      });

      if (!registerResponse.ok) {
        const error = await registerResponse.json();
        throw new Error(error.message || 'Wallet registration failed');
      }

      const data = await registerResponse.json();

      // Store JWT token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast({
        title: 'Account created successfully',
        description: 'Welcome to Floatly!',
      });

      // Redirect based on user role
      if (role === 'merchant') {
        router.push('/merchant/dashboard');
      } else if (role === 'investor') {
        router.push('/investor/dashboard');
      } else {
        router.push('/');
      }
    } catch (error: any) {
      console.error('Wallet signup error:', error);
      toast({
        title: 'Wallet registration failed',
        description: error?.message || 'Failed to create account with wallet',
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
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Join Floatly to access capital or earn yield</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Role Selection */}
          <div className="space-y-3">
            <Label>I am a...</Label>
            <RadioGroup value={role} onValueChange={setRole}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="merchant" id="merchant" />
                <Label htmlFor="merchant" className="font-normal cursor-pointer">
                  Merchant seeking capital
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="investor" id="investor" />
                <Label htmlFor="investor" className="font-normal cursor-pointer">
                  Investor/Liquidity Provider
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Wallet Signup */}
          <div className="space-y-3">
            <div className="flex items-center justify-center">
              <WalletButton />
            </div>
            {isConnected && (
              <Button 
                variant="outline" 
                className="w-full gap-2" 
                onClick={handleWalletSignup}
                disabled={isLoading}
              >
                <Wallet className="h-4 w-4" />
                Sign up with Wallet
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

          {/* Traditional Signup */}
          <form onSubmit={handleTraditionalSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="Sarah Johnson" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                minLength={8}
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            By creating an account, you agree to our{" "}
            <Link href="#" className="underline">
              Terms of Service
            </Link>
            {" and "}
            <Link href="#" className="underline">
              Privacy Policy
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
