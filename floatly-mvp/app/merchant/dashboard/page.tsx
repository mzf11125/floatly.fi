import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, Calendar, DollarSign, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function MerchantDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold">Floatly</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">sarah@fashionstore.com</span>
            <Button variant="ghost" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, Sarah!</h1>
          <p className="text-muted-foreground">Manage your loans and track your credit score</p>
        </div>

        {/* Credit Score Card */}
        <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Your Credit Score</span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-primary">720</span>
                  <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                    +45 this month
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Excellent! You qualify for better rates and higher loan amounts.
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Payment History</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Credit Utilization</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-2">Available Credit</div>
                  <div className="text-3xl font-bold">${"4,500"}</div>
                  <p className="text-sm text-muted-foreground mt-1">Based on your sales history and credit score</p>
                </div>
                <Button size="lg" className="w-full md:w-auto" asChild>
                  <Link href="/merchant/apply">
                    Apply for New Loan
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Borrowed</div>
                  <div className="text-2xl font-bold">${"6,500"}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Loans Completed</div>
                  <div className="text-2xl font-bold">3</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-chart-4/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-chart-4" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Active Loans</div>
                  <div className="text-2xl font-bold">1</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-chart-2/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">On-Time Rate</div>
                  <div className="text-2xl font-bold">100%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Loans */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Active Loans</h2>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">$3,000 Inventory Loan</CardTitle>
                  <CardDescription>Issued on Nov 15, 2024</CardDescription>
                </div>
                <Badge className="bg-chart-4/10 text-chart-4 border-chart-4/20">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Remaining Balance</div>
                  <div className="text-2xl font-bold">${"450"}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Next Payment</div>
                  <div className="text-2xl font-bold">Dec 20</div>
                  <div className="text-sm text-muted-foreground">$225 due</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Interest Rate</div>
                  <div className="text-2xl font-bold">12%</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Repayment Progress</span>
                  <span className="font-medium">85% Complete</span>
                </div>
                <Progress value={85} className="h-3" />
              </div>

              <div className="flex gap-3">
                <Button>Make Payment</Button>
                <Button variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loan History */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Loan History</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[
                  { amount: 2000, date: "Nov 1, 2024", status: "Paid in full", duration: "30 days" },
                  { amount: 1500, date: "Oct 1, 2024", status: "Paid in full", duration: "60 days" },
                  { amount: 1000, date: "Sep 1, 2024", status: "Paid in full", duration: "30 days" },
                ].map((loan, idx) => (
                  <div key={idx} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        </div>
                        <div>
                          <div className="font-semibold">${loan.amount.toLocaleString()} Loan</div>
                          <div className="text-sm text-muted-foreground">{loan.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="bg-success/10 text-success border-success/20 mb-1">
                          {loan.status}
                        </Badge>
                        <div className="text-sm text-muted-foreground">{loan.duration}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
