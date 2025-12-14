import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, TrendingUp, Shield, Zap, Check } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold">Floatly</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#merchants" className="text-foreground/80 hover:text-foreground transition-colors">
              For Merchants
            </Link>
            <Link href="#investors" className="text-foreground/80 hover:text-foreground transition-colors">
              For Investors
            </Link>
            <Link href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
              How It Works
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-sm">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-accent-foreground">Connecting crypto liquidity to real businesses</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-balance tracking-tight">
            Inventory Capital in <span className="text-primary">24 Hours</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            {
              "Access $500-$5,000 working capital for your e-commerce business. No credit check required. Funded by crypto investors earning 8-15% APY."
            }
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="text-lg px-8 h-14" asChild>
              <Link href="/merchant/apply">
                Apply for Capital
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 h-14 bg-transparent" asChild>
              <Link href="/investor/dashboard">Earn 8-15% APY</Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-success" />
              <span>{"<10% default rate"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-success" />
              <span>24-hour approval</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-success" />
              <span>Real business backing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">$3M+</div>
              <div className="text-sm text-muted-foreground mt-2">Capital Deployed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">1,000+</div>
              <div className="text-sm text-muted-foreground mt-2">Merchants Funded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">12.5%</div>
              <div className="text-sm text-muted-foreground mt-2">Average APY</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{"<5%"}</div>
              <div className="text-sm text-muted-foreground mt-2">Default Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* For Merchants Section */}
      <section id="merchants" className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">For E-Commerce Merchants</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get the inventory capital you need to scale your business, fast.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Fast Approval</h3>
                <p className="text-muted-foreground">
                  Connect your Shopify store and get approved in 24 hours. No lengthy applications or credit checks.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" />
                    <span>6+ months sales history required</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" />
                    <span>$5k+ monthly revenue</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" />
                    <span>Active store in last 30 days</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Flexible Terms</h3>
                <p className="text-muted-foreground">
                  {"Choose loan amounts from $500-$5,000 with 30, 60, or 90-day terms. Only 8-15% fees."}
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" />
                    <span>No hidden fees</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" />
                    <span>Pay early without penalty</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" />
                    <span>Build on-chain credit</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Build Credit</h3>
                <p className="text-muted-foreground">
                  Each successful repayment improves your credit score for better rates and higher limits.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" />
                    <span>Better rates over time</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" />
                    <span>Higher loan amounts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" />
                    <span>Instant approval after 3 loans</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link href="/merchant/apply">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* For Investors Section */}
      <section id="investors" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold">For Liquidity Providers</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Earn real-world yield on your stablecoins, backed by productive business activity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="text-2xl font-semibold">Higher Returns</h3>
                  <p className="text-muted-foreground">
                    Earn 8-15% APY on USDT/USDC compared to 4-6% in traditional DeFi protocols.
                  </p>
                  <div className="bg-muted rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Conservative Pool</span>
                      <span className="font-semibold text-success">9.2% APY</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Balanced Pool</span>
                      <span className="font-semibold text-success">12.5% APY</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Aggressive Pool</span>
                      <span className="font-semibold text-success">14.8% APY</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="text-2xl font-semibold">Real Business Backing</h3>
                  <p className="text-muted-foreground">
                    Your capital is deployed to verified e-commerce merchants with proven sales history.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <div className="font-medium">Verified Sales Data</div>
                        <div className="text-sm text-muted-foreground">All merchants verified via platform APIs</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <div className="font-medium">Diversified Risk</div>
                        <div className="text-sm text-muted-foreground">Capital spread across 50+ merchants</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <div className="font-medium">Transparent Tracking</div>
                        <div className="text-sm text-muted-foreground">Monitor all loans on-chain in real-time</div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button size="lg" asChild>
                <Link href="/investor/dashboard">
                  Start Earning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">How Floatly Works</h2>
            <p className="text-xl text-muted-foreground">A simple three-step process connecting capital to commerce</p>
          </div>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl shrink-0">
                1
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-2">Merchant Applies</h3>
                <p className="text-muted-foreground">
                  E-commerce merchant connects their Shopify/Tokopedia store and applies for inventory capital. Approval
                  based on sales history, not credit score.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl shrink-0">
                2
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-2">Smart Contract Deployment</h3>
                <p className="text-muted-foreground">
                  Upon approval, a smart contract is deployed on IOTA with loan terms. Liquidity pool funds are
                  automatically allocated to the merchant.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl shrink-0">
                3
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-2">Repayment & Returns</h3>
                <p className="text-muted-foreground">
                  Merchant repays over 30-90 days via stablecoins or bank transfer. Liquidity providers earn their yield
                  while merchant builds credit history.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Ready to Get Started?</h2>
            <p className="text-xl text-primary-foreground/80">
              Join thousands of merchants accessing capital and investors earning real-world yield.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" variant="secondary" className="text-lg px-8 h-14" asChild>
                <Link href="/merchant/apply">Apply for Capital</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 h-14 bg-transparent hover:bg-primary-foreground/10 border-primary-foreground/20"
                asChild
              >
                <Link href="/investor/dashboard">Start Investing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">F</span>
                </div>
                <span className="text-xl font-bold">Floatly</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting crypto liquidity to e-commerce merchants across Southeast Asia.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Merchants</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/merchant/apply" className="hover:text-foreground transition-colors">
                    Apply for Capital
                  </Link>
                </li>
                <li>
                  <Link href="/merchant/dashboard" className="hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Investors</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/investor/dashboard" className="hover:text-foreground transition-colors">
                    Liquidity Pools
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Risk Management
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 Floatly. All rights reserved. Built on IOTA EVM.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
