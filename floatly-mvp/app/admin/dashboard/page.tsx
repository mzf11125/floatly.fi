"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Search,
  TrendingUp,
  Users,
  XCircle,
  Eye,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold">Floatly Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">Admin</Badge>
            <Button variant="ghost" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Overview Stats */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Platform Overview</h1>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Deployed</span>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-3xl font-bold mb-1">$3.2M</div>
                <div className="text-sm text-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+$284k this month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Active Loans</span>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-3xl font-bold mb-1">156</div>
                <div className="text-sm text-muted-foreground">$468k outstanding</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Default Rate</span>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-3xl font-bold mb-1 text-success">4.8%</div>
                <div className="text-sm text-muted-foreground">Below 5% target</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Merchants</span>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-3xl font-bold mb-1">1,247</div>
                <div className="text-sm text-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+89 this month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <span className="font-semibold text-destructive">8 Late Payments</span>
                </div>
                <p className="text-sm text-muted-foreground">Loans overdue by 7+ days requiring attention</p>
              </CardContent>
            </Card>

            <Card className="border-chart-4/50 bg-chart-4/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-5 w-5 text-chart-4" />
                  <span className="font-semibold text-chart-4">12 Pending Reviews</span>
                </div>
                <p className="text-sm text-muted-foreground">New loan applications awaiting approval</p>
              </CardContent>
            </Card>

            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary">89% Utilization</span>
                </div>
                <p className="text-sm text-muted-foreground">Capital efficiently deployed across pools</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="applications">Applications (12)</TabsTrigger>
            <TabsTrigger value="active">Active Loans (156)</TabsTrigger>
            <TabsTrigger value="collections">Collections (8)</TabsTrigger>
            <TabsTrigger value="merchants">Merchants (1,247)</TabsTrigger>
          </TabsList>

          {/* Pending Applications */}
          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Pending Applications</CardTitle>
                    <CardDescription>Review and approve loan applications</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search applications..." className="pl-9 w-64" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewing">Reviewing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {[
                    {
                      id: "APP-2847",
                      merchant: "Fashion Forward Store",
                      amount: 3500,
                      term: 60,
                      revenue: 12000,
                      months: 14,
                      rating: 4.8,
                      risk: "low",
                      applied: "2 hours ago",
                    },
                    {
                      id: "APP-2846",
                      merchant: "Tech Accessories Hub",
                      amount: 5000,
                      term: 90,
                      revenue: 18000,
                      months: 8,
                      rating: 4.5,
                      risk: "medium",
                      applied: "5 hours ago",
                    },
                    {
                      id: "APP-2845",
                      merchant: "Beauty Essentials",
                      amount: 2000,
                      term: 30,
                      revenue: 8500,
                      months: 18,
                      rating: 4.9,
                      risk: "low",
                      applied: "1 day ago",
                    },
                    {
                      id: "APP-2844",
                      merchant: "Home Decor Paradise",
                      amount: 4200,
                      term: 60,
                      revenue: 9200,
                      months: 6,
                      rating: 4.2,
                      risk: "high",
                      applied: "1 day ago",
                    },
                  ].map((app, idx) => (
                    <div key={idx} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-lg">{app.merchant}</span>
                            <Badge variant="secondary" className="text-xs">
                              {app.id}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className={
                                app.risk === "low"
                                  ? "bg-success/10 text-success border-success/20"
                                  : app.risk === "medium"
                                    ? "bg-chart-4/10 text-chart-4 border-chart-4/20"
                                    : "bg-destructive/10 text-destructive border-destructive/20"
                              }
                            >
                              {app.risk} risk
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Loan Amount</div>
                              <div className="font-semibold">${app.amount.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Term</div>
                              <div className="font-semibold">{app.term} days</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Monthly Revenue</div>
                              <div className="font-semibold">${app.revenue.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Operating</div>
                              <div className="font-semibold">{app.months} months</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                            <span>Store Rating: {app.rating}/5.0</span>
                            <span>•</span>
                            <span>Applied {app.applied}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                          <Button size="sm" className="bg-success hover:bg-success/90 text-white">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Loans */}
          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Loans</CardTitle>
                    <CardDescription>Monitor ongoing loans and repayment status</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search loans..." className="pl-9 w-64" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="current">Current</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                        <SelectItem value="at-risk">At Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {[
                    {
                      id: "LOAN-1923",
                      merchant: "Fashion Forward Store",
                      amount: 3000,
                      remaining: 450,
                      progress: 85,
                      nextPayment: "Dec 20",
                      status: "current",
                      salesTrend: "stable",
                    },
                    {
                      id: "LOAN-1894",
                      merchant: "Tech Accessories Hub",
                      amount: 2500,
                      remaining: 1000,
                      progress: 60,
                      nextPayment: "Dec 18",
                      status: "current",
                      salesTrend: "up",
                    },
                    {
                      id: "LOAN-1867",
                      merchant: "Beauty Essentials",
                      amount: 4000,
                      remaining: 320,
                      progress: 92,
                      nextPayment: "Dec 15",
                      status: "current",
                      salesTrend: "stable",
                    },
                    {
                      id: "LOAN-1845",
                      merchant: "Home Decor Paradise",
                      amount: 1500,
                      remaining: 825,
                      progress: 45,
                      nextPayment: "Dec 22",
                      status: "current",
                      salesTrend: "down",
                    },
                    {
                      id: "LOAN-1834",
                      merchant: "Sports Equipment Pro",
                      amount: 3500,
                      remaining: 2975,
                      progress: 15,
                      nextPayment: "Overdue (Dec 12)",
                      status: "late",
                      salesTrend: "down",
                    },
                  ].map((loan, idx) => (
                    <div key={idx} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-lg">{loan.merchant}</span>
                            <Badge variant="secondary" className="text-xs">
                              {loan.id}
                            </Badge>
                            {loan.status === "current" ? (
                              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Current
                              </Badge>
                            ) : (
                              <Badge
                                variant="secondary"
                                className="bg-destructive/10 text-destructive border-destructive/20"
                              >
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Late
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-3">
                            <div>
                              <div className="text-muted-foreground">Original Amount</div>
                              <div className="font-semibold">${loan.amount.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Remaining</div>
                              <div className="font-semibold">${loan.remaining.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Progress</div>
                              <div className="font-semibold">{loan.progress}%</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Next Payment</div>
                              <div
                                className={`font-semibold ${loan.status === "late" ? "text-destructive" : "text-foreground"}`}
                              >
                                {loan.nextPayment}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Sales Trend</div>
                              <div className="font-semibold flex items-center gap-1">
                                {loan.salesTrend === "up" && <TrendingUp className="h-3 w-3 text-success" />}
                                {loan.salesTrend === "down" && <AlertTriangle className="h-3 w-3 text-destructive" />}
                                <span className="capitalize">{loan.salesTrend}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          {loan.status === "late" && (
                            <Button size="sm" variant="destructive">
                              Contact
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Collections */}
          <TabsContent value="collections" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Collections Queue</CardTitle>
                <CardDescription>Manage late payments and defaults</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {[
                    {
                      id: "LOAN-1834",
                      merchant: "Sports Equipment Pro",
                      amount: 3500,
                      remaining: 2975,
                      daysLate: 8,
                      stage: "Stage 2",
                      lastContact: "2 days ago",
                      attempts: 3,
                    },
                    {
                      id: "LOAN-1789",
                      merchant: "Gadget World",
                      amount: 2800,
                      remaining: 2240,
                      daysLate: 15,
                      stage: "Stage 3",
                      lastContact: "5 days ago",
                      attempts: 7,
                    },
                    {
                      id: "LOAN-1756",
                      merchant: "Fashion Outlet",
                      amount: 4500,
                      remaining: 3600,
                      daysLate: 22,
                      stage: "Stage 3",
                      lastContact: "1 week ago",
                      attempts: 12,
                    },
                  ].map((loan, idx) => (
                    <div key={idx} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-lg">{loan.merchant}</span>
                            <Badge variant="secondary" className="text-xs">
                              {loan.id}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className={
                                loan.daysLate < 14
                                  ? "bg-chart-4/10 text-chart-4 border-chart-4/20"
                                  : "bg-destructive/10 text-destructive border-destructive/20"
                              }
                            >
                              {loan.daysLate} days late
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                            <div>
                              <div className="text-muted-foreground">Amount Due</div>
                              <div className="font-semibold text-destructive">${loan.remaining.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Collection Stage</div>
                              <div className="font-semibold">{loan.stage}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Last Contact</div>
                              <div className="font-semibold">{loan.lastContact}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Contact Attempts</div>
                              <div className="font-semibold">{loan.attempts}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            View History
                          </Button>
                          <Button size="sm">Contact Merchant</Button>
                          <Button size="sm" variant="destructive">
                            Escalate
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-muted">
              <CardHeader>
                <CardTitle className="text-base">Collection Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div>
                  <span className="font-semibold">Stage 1 (1-7 days):</span> Automated friendly reminder via SMS/email
                </div>
                <div>
                  <span className="font-semibold">Stage 2 (8-14 days):</span> Personal outreach, understand situation,
                  offer payment plan
                </div>
                <div>
                  <span className="font-semibold">Stage 3 (15-30 days):</span> Formal notice, credit score impact
                  warning, negotiation
                </div>
                <div>
                  <span className="font-semibold">Stage 4 (30+ days):</span> Mark as default, engage collection partner,
                  legal consideration
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Merchants */}
          <TabsContent value="merchants" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Merchant Directory</CardTitle>
                    <CardDescription>View all registered merchants</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search merchants..." className="pl-9 w-64" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Merchants</SelectItem>
                        <SelectItem value="active">Active Loans</SelectItem>
                        <SelectItem value="completed">Completed Loans</SelectItem>
                        <SelectItem value="new">New Applicants</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {[
                    {
                      name: "Fashion Forward Store",
                      id: "MER-2847",
                      platform: "Shopify",
                      joined: "Sep 2024",
                      loans: 3,
                      totalBorrowed: 6500,
                      creditScore: 720,
                      status: "active",
                    },
                    {
                      name: "Tech Accessories Hub",
                      id: "MER-1923",
                      platform: "Shopify",
                      joined: "Oct 2024",
                      loans: 2,
                      totalBorrowed: 4500,
                      creditScore: 680,
                      status: "active",
                    },
                    {
                      name: "Beauty Essentials",
                      id: "MER-2156",
                      platform: "Tokopedia",
                      joined: "Aug 2024",
                      loans: 4,
                      totalBorrowed: 8200,
                      creditScore: 760,
                      status: "completed",
                    },
                    {
                      name: "Home Decor Paradise",
                      id: "MER-3341",
                      platform: "Lazada",
                      joined: "Nov 2024",
                      loans: 1,
                      totalBorrowed: 1500,
                      creditScore: 620,
                      status: "active",
                    },
                  ].map((merchant, idx) => (
                    <div key={idx} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-lg">{merchant.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {merchant.id}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className={
                                merchant.status === "active"
                                  ? "bg-success/10 text-success border-success/20"
                                  : "bg-muted"
                              }
                            >
                              {merchant.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Platform</div>
                              <div className="font-semibold">{merchant.platform}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Member Since</div>
                              <div className="font-semibold">{merchant.joined}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Total Loans</div>
                              <div className="font-semibold">{merchant.loans}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Total Borrowed</div>
                              <div className="font-semibold">${merchant.totalBorrowed.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Credit Score</div>
                              <div
                                className={`font-semibold ${
                                  merchant.creditScore >= 700
                                    ? "text-success"
                                    : merchant.creditScore >= 650
                                      ? "text-chart-4"
                                      : "text-destructive"
                                }`}
                              >
                                {merchant.creditScore}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
