"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Store, FileText, CreditCard, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function LoanApplication() {
  const [step, setStep] = useState(1)
  const [loanAmount, setLoanAmount] = useState("3000")
  const [term, setTerm] = useState("60")

  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  const calculateFee = (amount: string, termDays: string) => {
    const amt = Number.parseInt(amount) || 0
    const rate = termDays === "30" ? 0.1 : termDays === "60" ? 0.12 : 0.15
    return Math.round(amt * rate)
  }

  const fee = calculateFee(loanAmount, term)
  const totalRepayment = (Number.parseInt(loanAmount) || 0) + fee

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold">Floatly</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Loan Application</h1>
            <Badge variant="secondary">
              Step {step} of {totalSteps}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />

          <div className="grid grid-cols-4 gap-2 mt-4">
            {[
              { num: 1, label: "Store", icon: Store },
              { num: 2, label: "Loan Details", icon: FileText },
              { num: 3, label: "Verification", icon: CreditCard },
              { num: 4, label: "Review", icon: CheckCircle2 },
            ].map(({ num, label, icon: Icon }) => (
              <div
                key={num}
                className={`flex flex-col items-center gap-2 p-2 rounded-lg ${
                  num === step
                    ? "bg-primary/10 text-primary"
                    : num < step
                      ? "bg-success/10 text-success"
                      : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Connect Store */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Connect Your Store</CardTitle>
              <CardDescription>We need to verify your sales history to determine your eligibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <Button variant="outline" className="h-auto py-6 justify-start bg-transparent" size="lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#96bf48] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      S
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-base">Connect Shopify</div>
                      <div className="text-sm text-muted-foreground">Sync your Shopify store data</div>
                    </div>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5" />
                </Button>

                <Button variant="outline" className="h-auto py-6 justify-start bg-transparent" size="lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#f15922] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      T
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-base">Connect Tokopedia</div>
                      <div className="text-sm text-muted-foreground">Sync your Tokopedia store data</div>
                    </div>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5" />
                </Button>

                <Button variant="outline" className="h-auto py-6 justify-start bg-transparent" size="lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#0f146d] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      L
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-base">Connect Lazada</div>
                      <div className="text-sm text-muted-foreground">Sync your Lazada store data</div>
                    </div>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5" />
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or enter manually</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="store-url">Store URL</Label>
                  <Input id="store-url" placeholder="https://yourstore.myshopify.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthly-revenue">Average Monthly Revenue ($)</Label>
                  <Input id="monthly-revenue" type="number" placeholder="5000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="months-operating">Months Operating</Label>
                  <Input id="months-operating" type="number" placeholder="12" />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button size="lg" onClick={() => setStep(2)}>
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Loan Details */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>Choose your loan amount and repayment term</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Loan Amount Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="loan-amount">Loan Amount</Label>
                  <span className="text-2xl font-bold text-primary">
                    ${Number.parseInt(loanAmount).toLocaleString()}
                  </span>
                </div>
                <Input
                  id="loan-amount"
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>$500</span>
                  <span>$5,000</span>
                </div>
              </div>

              {/* Repayment Term */}
              <div className="space-y-3">
                <Label>Repayment Term</Label>
                <RadioGroup value={term} onValueChange={setTerm}>
                  <div className="grid gap-3">
                    <label
                      htmlFor="term-30"
                      className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        term === "30" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="30" id="term-30" />
                        <div>
                          <div className="font-semibold">30 Days</div>
                          <div className="text-sm text-muted-foreground">10% fee</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${(Number.parseInt(loanAmount) * 0.1).toFixed(0)} fee</div>
                      </div>
                    </label>

                    <label
                      htmlFor="term-60"
                      className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        term === "60" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="60" id="term-60" />
                        <div>
                          <div className="font-semibold">60 Days</div>
                          <div className="text-sm text-muted-foreground">12% fee</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${(Number.parseInt(loanAmount) * 0.12).toFixed(0)} fee</div>
                      </div>
                    </label>

                    <label
                      htmlFor="term-90"
                      className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        term === "90" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="90" id="term-90" />
                        <div>
                          <div className="font-semibold">90 Days</div>
                          <div className="text-sm text-muted-foreground">15% fee</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${(Number.parseInt(loanAmount) * 0.15).toFixed(0)} fee</div>
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </div>

              {/* Loan Purpose */}
              <div className="space-y-2">
                <Label htmlFor="purpose">Loan Purpose</Label>
                <Select defaultValue="inventory">
                  <SelectTrigger id="purpose">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inventory">Inventory Purchase</SelectItem>
                    <SelectItem value="marketing">Marketing Campaign</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Summary Card */}
              <Card className="bg-muted/50 border-2">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Loan Amount</span>
                      <span className="font-semibold">${Number.parseInt(loanAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Fee ({term === "30" ? "10" : term === "60" ? "12" : "15"}%)
                      </span>
                      <span className="font-semibold">${fee.toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Total Repayment</span>
                      <span className="font-bold text-primary">${totalRepayment.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between gap-3">
                <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
                <Button size="lg" onClick={() => setStep(3)}>
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Verification */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Verification</CardTitle>
              <CardDescription>We need a few documents to verify your identity and business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" placeholder="Sarah Johnson" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" placeholder="Fashion Forward Store" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+62 812 3456 7890" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="id-upload">Government ID</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <div className="text-muted-foreground">
                    <div className="mb-2">Click to upload or drag and drop</div>
                    <div className="text-sm">PNG, JPG or PDF (max. 5MB)</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-reg">Business Registration (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <div className="text-muted-foreground">
                    <div className="mb-2">Click to upload or drag and drop</div>
                    <div className="text-sm">PNG, JPG or PDF (max. 5MB)</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="disbursement">Disbursement Method</Label>
                <RadioGroup defaultValue="bank">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="font-normal cursor-pointer">
                      Bank Transfer (1-2 business days)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="crypto" id="crypto" />
                    <Label htmlFor="crypto" className="font-normal cursor-pointer">
                      Stablecoin (USDT/USDC) - Instant
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="account">Bank Account / Wallet Address</Label>
                <Input id="account" placeholder="Enter account number or wallet address" />
              </div>

              <div className="flex justify-between gap-3">
                <Button variant="outline" size="lg" onClick={() => setStep(2)}>
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
                <Button size="lg" onClick={() => setStep(4)}>
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Review & Submit */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
              <CardDescription>Please review your application before submitting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Loan Summary */}
              <div>
                <h3 className="font-semibold mb-3">Loan Details</h3>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loan Amount</span>
                    <span className="font-semibold">${Number.parseInt(loanAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Term</span>
                    <span className="font-semibold">{term} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fee</span>
                    <span className="font-semibold">${fee.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total Repayment</span>
                    <span className="font-bold text-primary">${totalRepayment.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Business Info */}
              <div>
                <h3 className="font-semibold mb-3">Business Information</h3>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Store</span>
                    <span className="font-medium">Shopify Store Connected</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Business Name</span>
                    <span className="font-medium">Fashion Forward Store</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Revenue</span>
                    <span className="font-medium">$12,000</span>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="border-2 border-border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Loan Agreement</h3>
                <div className="text-sm text-muted-foreground space-y-2 max-h-40 overflow-y-auto">
                  <p>By submitting this application, you agree to the following terms:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>You authorize Floatly to verify your business information and sales data</li>
                    <li>
                      You agree to repay the total amount of ${totalRepayment.toLocaleString()} over {term} days
                    </li>
                    <li>Late payments may incur additional fees and affect your credit score</li>
                    <li>You understand that loan funds are deployed via smart contracts on IOTA EVM</li>
                    <li>All loan terms and repayments are recorded on-chain for transparency</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="agree" className="h-4 w-4" />
                <Label htmlFor="agree" className="font-normal text-sm cursor-pointer">
                  I have read and agree to the loan agreement and terms of service
                </Label>
              </div>

              <div className="flex justify-between gap-3">
                <Button variant="outline" size="lg" onClick={() => setStep(3)}>
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
                <Button size="lg" asChild>
                  <Link href="/merchant/dashboard">
                    Submit Application
                    <CheckCircle2 className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">What happens next?</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ We will review your application within 24 hours</li>
                  <li>✓ {"You'll receive an email with the decision"}</li>
                  <li>✓ Upon approval, funds will be disbursed to your account</li>
                  <li>✓ You can track everything in your dashboard</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
