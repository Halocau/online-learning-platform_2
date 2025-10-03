"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Wallet, Plus, Minus, CreditCard, DollarSign, TrendingUp, TrendingDown, Gift, ArrowUpRight, ArrowDownLeft, History } from "lucide-react"
import { useState } from "react"

const transactions = [
  {
    id: 1,
    type: "expense",
    title: "Mua khóa học React Fundamentals",
    amount: -1500000,
    date: "2025-09-28",
    time: "14:30",
    status: "completed",
    category: "Khóa học",
    method: "Ví SkillUp"
  },
  {
    id: 2,
    type: "income",
    title: "Nạp tiền vào ví",
    amount: 2000000,
    date: "2025-09-27",
    time: "10:15",
    status: "completed",
    category: "Nạp tiền",
    method: "Chuyển khoản ngân hàng"
  },
  {
    id: 3,
    type: "expense",
    title: "Mua khóa học JavaScript Advanced",
    amount: -1200000,
    date: "2025-09-25",
    time: "16:45",
    status: "completed",
    category: "Khóa học",
    method: "Ví SkillUp"
  },
  {
    id: 4,
    type: "income",
    title: "Hoàn tiền khóa học",
    amount: 800000,
    date: "2025-09-24",
    time: "09:20",
    status: "completed",
    category: "Hoàn tiền",
    method: "Ví SkillUp"
  },
  {
    id: 5,
    type: "income",
    title: "Thưởng hoàn thành khóa học",
    amount: 50000,
    date: "2025-09-23",
    time: "18:00",
    status: "completed",
    category: "Thưởng",
    method: "Ví SkillUp"
  },
  {
    id: 6,
    type: "expense",
    title: "Mua khóa học Node.js Backend",
    amount: -1800000,
    date: "2025-09-20",
    time: "11:30",
    status: "completed",
    category: "Khóa học",
    method: "Ví SkillUp"
  },
  {
    id: 7,
    type: "income",
    title: "Nạp tiền vào ví",
    amount: 3000000,
    date: "2025-09-18",
    time: "13:15",
    status: "completed",
    category: "Nạp tiền",
    method: "Thẻ tín dụng"
  }
]

export default function WalletPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const currentBalance = 1450000
  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = Math.abs(transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0))
  const thisMonthSpending = 4500000

  const getTransactionIcon = (type: string, category: string) => {
    if (type === "income") {
      if (category === "Nạp tiền") return ArrowDownLeft
      if (category === "Hoàn tiền") return TrendingUp
      if (category === "Thưởng") return Gift
      return Plus
    } else {
      return ArrowUpRight
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount).replace('₫', 'VNĐ')
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Ví tiền</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Wallet Balance Card */}
          <Card className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 mb-2">Số dư hiện tại</p>
                  <p className="text-3xl font-bold">{formatCurrency(currentBalance)}</p>
                  <p className="text-blue-100 text-sm mt-2">Ví SkillUp</p>
                </div>
                <div className="text-right">
                  <Wallet className="w-12 h-12 text-blue-200 mb-4" />
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      Nạp tiền
                    </Button>
                    <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-blue-600">
                      <CreditCard className="w-4 h-4 mr-1" />
                      Rút tiền
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Cards */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
                    <p className="text-sm text-gray-600">Tổng thu nhập</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <TrendingDown className="w-8 h-8 text-red-600" />
                  <div>
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpense)}</p>
                    <p className="text-sm text-gray-600">Tổng chi tiêu</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(thisMonthSpending)}</p>
                    <p className="text-sm text-gray-600">Chi tiêu tháng này</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <History className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{transactions.length}</p>
                    <p className="text-sm text-gray-600">Giao dịch</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Lịch sử giao dịch</h1>
                  <p className="text-gray-600 mt-2">Theo dõi tất cả các giao dịch của bạn</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedPeriod === "week" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod("week")}
                  >
                    Tuần này
                  </Button>
                  <Button
                    variant={selectedPeriod === "month" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod("month")}
                  >
                    Tháng này
                  </Button>
                  <Button
                    variant={selectedPeriod === "year" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod("year")}
                  >
                    Năm này
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {transactions.map((transaction) => {
                  const IconComponent = getTransactionIcon(transaction.type, transaction.category)
                  const isIncome = transaction.type === "income"

                  return (
                    <Card key={transaction.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-full ${isIncome ? 'bg-green-50' : 'bg-red-50'
                            }`}>
                            <IconComponent className={`w-5 h-5 ${isIncome ? 'text-green-600' : 'text-red-600'
                              }`} />
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">
                              {transaction.title}
                            </h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                              <span>{new Date(transaction.date).toLocaleDateString('vi-VN')} • {transaction.time}</span>
                              <Badge variant="outline" className="text-xs">
                                {transaction.category}
                              </Badge>
                              <span>{transaction.method}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className={`text-lg font-bold ${isIncome ? 'text-green-600' : 'text-red-600'
                              }`}>
                              {isIncome ? '+' : ''}{formatCurrency(transaction.amount)}
                            </p>
                            <Badge
                              variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {transaction.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <div className="text-center mt-8">
                <Button variant="outline">
                  Xem thêm giao dịch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
