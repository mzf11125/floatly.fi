"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  DollarSign,
  Users,
  PieChart,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const earningsData = [
  { date: "Nov 1", earnings: 120 },
  { date: "Nov 8", earnings: 280 },
  { date: "Nov 15", earnings: 450 },
  { date: "Nov 22", earnings: 720 },
  { date: "Nov 29", earnings: 980 },
  { date: "Dec 6", earnings: 1247 },
]

export default function InvestorDashboard() {
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
            <Button variant="outline" size="sm">
              0x7a9f...3d2e
            </Button>
            <Button variant="ghost" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Portfolio Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Portfolio Overview</h1>
              <p className="text-muted-foreground">Track your investments and earnings</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <ArrowDownLeft className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
              <Button>
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Add Funds
              </Button>
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Deployed</span>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-3xl font-bold mb-1">$50,000</div>
                <div className="text-sm text-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+$5,000 this month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Earned</span>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-3xl font-bold mb-1">$1,247</div>
                <div className="text-sm text-muted-foreground">Since Nov 1, 2024</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Current APY</span>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-3xl font-bold mb-1 text-success">11.8%</div>
                <div className="text-sm text-muted-foreground">Weighted average</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Active Loans</span>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-3xl font-bold mb-1">75</div>
                <div className="text-sm text-muted-foreground">Across 2 pools</div>
              </CardContent>
            </Card>
          </div>

          {/* Earnings Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Cumulative Earnings</CardTitle>
              <CardDescription>Your earnings over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={earningsData}>
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Pools Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Pools</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Indonesia Pool */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🇮🇩</span>
                    <CardTitle>Indonesia Conservative</CardTitle>
                  </div>
                  <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20">Active</Badge>
                </div>
                <CardDescription>Low-risk merchants with proven track record</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Your Investment</div>
                    <div className="text-2xl font-bold">$30,000</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Current APY</div>
                    <div className="text-2xl font-bold text-success">9.2%</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Active Loans</div>
                    <div className="text-xl font-semibold">47</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Default Rate</div>
                    <div className="text-xl font-semibold text-success">2.1%</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Utilization Rate</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Earned This Month</span>
                    <span className="font-semibold text-success">+$230</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Earned</span>
                    <span className="font-semibold">$720</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Adjust Amount
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Philippines Pool */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🇵🇭</span>
                    <CardTitle>Philippines Balanced</CardTitle>
                  </div>
                  <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20">Active</Badge>
                </div>
                <CardDescription>Moderate risk with higher returns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Your Investment</div>
                    <div className="text-2xl font-bold">$20,000</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Current APY</div>
                    <div className="text-2xl font-bold text-success">14.5%</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Active Loans</div>
                    <div className="text-xl font-semibold">28</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Default Rate</div>
                    <div className="text-xl font-semibold text-chart-4">4.8%</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Utilization Rate</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Earned This Month</span>
                    <span className="font-semibold text-success">+$242</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Earned</span>
                    <span className="font-semibold">$527</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Adjust Amount
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Available Pools */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Available Pools</h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  <div className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">🇹🇭</span>
                        <div>
                          <div className="font-semibold">Thailand Aggressive</div>
                          <div className="text-sm text-muted-foreground">Higher risk, higher returns</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-success">16.8% APY</div>
                        <div className="text-sm text-muted-foreground">Min: $1,000</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">🇻🇳</span>
                        <div>
                          <div className="font-semibold">Vietnam Balanced</div>
                          <div className="text-sm text-muted-foreground">Emerging market opportunities</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-success">13.2% APY</div>
                        <div className="text-sm text-muted-foreground">Min: $1,000</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activity Tabs */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Activity</h2>
          <Tabs defaultValue="loans" className="space-y-4">
            <TabsList>
              <TabsTrigger value="loans">Active Loans</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="loans" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Loans (75)</CardTitle>
                  <CardDescription>Monitor individual merchant loans in your portfolio</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {[
                      {
                        merchant: "Fashion Store ID-2847",
                        amount: 3000,
                        progress: 85,
                        status: "on-track",
                        nextPayment: "Dec 20",
                        apy: 12,
                      },
                      {
                        merchant: "Tech Accessories PH-1923",
                        amount: 2500,
                        progress: 60,
                        status: "on-track",
                        nextPayment: "Dec 18",
                        apy: 14.5,
                      },
                      {
                        merchant: "Beauty Products ID-5621",
                        amount: 4000,
                        progress: 92,
                        status: "on-track",
                        nextPayment: "Dec 15",
                        apy: 9.2,
                      },
                      {
                        merchant: "Home Decor PH-3341",
                        amount: 1500,
                        progress: 45,
                        status: "on-track",
                        nextPayment: "Dec 22",
                        apy: 14.5,
                      },
                      {
                        merchant: "Sports Equipment ID-7834",
                        amount: 3500,
                        progress: 15,
                        status: "late",
                        nextPayment: "Overdue",
                        apy: 9.2,
                      },
                    ].map((loan, idx) => (
                      <div key={idx} className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="font-semibold mb-1">{loan.merchant}</div>
                            <div className="text-sm text-muted-foreground">${loan.amount.toLocaleString()} loan</div>
                          </div>
                          <div className="text-right">
                            {loan.status === "on-track" ? (
                              <Badge variant="secondary" className="bg-success/10 text-success border-success/20 mb-1">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                On Track
                              </Badge>
                            ) : (
                              <Badge
                                variant="secondary"
                                className="bg-destructive/10 text-destructive border-destructive/20 mb-1"
                              >
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Late
                              </Badge>
                            )}
                            <div className="text-sm text-muted-foreground mt-1">Next: {loan.nextPayment}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <Progress value={loan.progress} className="h-2" />
                          </div>
                          <div className="text-sm font-medium w-16 text-right">{loan.progress}%</div>
                          <div className="text-sm text-muted-foreground">{loan.apy}% APY</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your deposits, withdrawals, and earnings</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {[
                      {
                        type: "earnings",
                        description: "Philippines Pool Earnings",
                        amount: 242,
                        date: "Dec 14, 2024",
                        time: "10:23 AM",
                      },
                      {
                        type: "earnings",
                        description: "Indonesia Pool Earnings",
                        amount: 230,
                        date: "Dec 14, 2024",
                        time: "10:23 AM",
                      },
                      {
                        type: "deposit",
                        description: "Deposit to Philippines Pool",
                        amount: 5000,
                        date: "Dec 12, 2024",
                        time: "2:45 PM",
                      },
                      {
                        type: "earnings",
                        description: "Loan Repayment - Fashion Store",
                        amount: 360,
                        date: "Dec 10, 2024",
                        time: "9:15 AM",
                      },
                      {
                        type: "withdraw",
                        description: "Withdrawal to Wallet",
                        amount: -2000,
                        date: "Dec 8, 2024",
                        time: "3:30 PM",
                      },
                    ].map((tx, idx) => (
                      <div key={idx} className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                tx.type === "earnings"
                                  ? "bg-success/10"
                                  : tx.type === "deposit"
                                    ? "bg-primary/10"
                                    : "bg-muted"
                              }`}
                            >
                              {tx.type === "earnings" && <TrendingUp className="h-5 w-5 text-success" />}
                              {tx.type === "deposit" && <ArrowUpRight className="h-5 w-5 text-primary" />}
                              {tx.type === "withdraw" && <ArrowDownLeft className="h-5 w-5 text-muted-foreground" />}
                            </div>
                            <div>
                              <div className="font-semibold">{tx.description}</div>
                              <div className="text-sm text-muted-foreground">
                                {tx.date} at {tx.time}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`text-right ${tx.amount > 0 ? "text-success" : "text-foreground"} font-semibold`}
                          >
                            {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Allocation</CardTitle>
                    <CardDescription>Distribution across pools</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-chart-1" />
                          Indonesia Conservative
                        </span>
                        <span className="font-semibold">60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-chart-2" />
                          Philippines Balanced
                        </span>
                        <span className="font-semibold">40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Risk Metrics</CardTitle>
                    <CardDescription>Portfolio health indicators</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                        <span className="font-medium">Default Rate</span>
                      </div>
                      <span className="font-bold text-success">3.2%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="font-medium">Avg Loan Duration</span>
                      </div>
                      <span className="font-bold text-primary">52 days</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-chart-4/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-chart-4" />
                        <span className="font-medium">Merchant Diversity</span>
                      </div>
                      <span className="font-bold text-chart-4">75 merchants</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
