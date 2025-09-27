"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  BookOpen,
  DollarSign,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock data
  const stats = [
    {
      title: "Tổng người dùng",
      value: "12,345",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Khóa học",
      value: "456",
      change: "+8%",
      trend: "up",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Doanh thu tháng",
      value: "₫2.5M",
      change: "+15%",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Đơn hàng",
      value: "1,234",
      change: "+5%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-orange-600",
    },
  ]

  const recentUsers = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      role: "Học viên",
      status: "active",
      joinDate: "2025-01-20",
      courses: 3,
      avatar: "/user1.jpg",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@email.com",
      role: "Giảng viên",
      status: "active",
      joinDate: "2025-01-19",
      courses: 12,
      avatar: "/user2.jpg",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@email.com",
      role: "Học viên",
      status: "suspended",
      joinDate: "2025-01-18",
      courses: 1,
      avatar: "/user3.jpg",
    },
  ]

  const recentCourses = [
    {
      id: 1,
      title: "React Advanced Patterns",
      instructor: "John Doe",
      students: 234,
      revenue: "₫1.2M",
      status: "published",
      createdAt: "2025-01-20",
    },
    {
      id: 2,
      title: "Vue.js Masterclass",
      instructor: "Jane Smith",
      students: 156,
      revenue: "₫800K",
      status: "draft",
      createdAt: "2025-01-19",
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      instructor: "Mike Johnson",
      students: 89,
      revenue: "₫450K",
      status: "review",
      createdAt: "2025-01-18",
    },
  ]

  const recentReports = [
    {
      id: 1,
      type: "spam",
      content: "Bài viết spam trong diễn đàn",
      reporter: "User123",
      reported: "Spammer456",
      status: "pending",
      createdAt: "2 giờ trước",
    },
    {
      id: 2,
      type: "inappropriate",
      content: "Nội dung không phù hợp trong khóa học",
      reporter: "Student789",
      reported: "Instructor101",
      status: "resolved",
      createdAt: "1 ngày trước",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "published":
      case "resolved":
        return "bg-green-500"
      case "suspended":
      case "pending":
        return "bg-yellow-500"
      case "banned":
      case "rejected":
        return "bg-red-500"
      case "draft":
      case "review":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Hoạt động"
      case "suspended":
        return "Tạm khóa"
      case "banned":
        return "Bị cấm"
      case "published":
        return "Đã xuất bản"
      case "draft":
        return "Bản nháp"
      case "review":
        return "Đang duyệt"
      case "pending":
        return "Chờ xử lý"
      case "resolved":
        return "Đã giải quyết"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <Link href="/" className="text-2xl font-bold text-foreground">
                EduPlatform Admin
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/">Xem trang chính</Link>
              </Button>
              <Avatar>
                <AvatarImage src="/admin-avatar.jpg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bảng điều khiển Admin</h1>
          <p className="text-muted-foreground">Quản lý và giám sát hoạt động của nền tảng</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg w-fit">
          {[
            { id: "overview", label: "Tổng quan" },
            { id: "users", label: "Người dùng" },
            { id: "courses", label: "Khóa học" },
            { id: "reports", label: "Báo cáo" },
            { id: "analytics", label: "Thống kê" },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className="rounded-md"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {stat.change} so với tháng trước
                        </p>
                      </div>
                      <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Người dùng mới</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/users">Xem tất cả</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(user.status)}>{getStatusText(user.status)}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{user.joinDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Courses */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Khóa học mới</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/courses">Xem tất cả</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentCourses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {course.instructor} • {course.students} học viên
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(course.status)}>{getStatusText(course.status)}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{course.revenue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reports */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Báo cáo cần xử lý
                </CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/reports">Xem tất cả</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{report.content}</p>
                        <p className="text-sm text-muted-foreground">
                          Báo cáo bởi {report.reporter} • {report.createdAt}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(report.status)}>{getStatusText(report.status)}</Badge>
                        <Button variant="outline" size="sm">
                          Xử lý
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm người dùng..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="suspended">Tạm khóa</SelectItem>
                  <SelectItem value="banned">Bị cấm</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Filter className="mr-2 h-4 w-4" />
                Lọc
              </Button>
            </div>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>Danh sách người dùng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{user.role}</Badge>
                            <Badge className={getStatusColor(user.status)}>{getStatusText(user.status)}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-green-600 bg-transparent">
                          <UserCheck className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                          <UserX className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Tìm kiếm khóa học..." className="pl-10" />
              </div>
              <Button>Thêm khóa học mới</Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quản lý khóa học</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{course.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Giảng viên: {course.instructor} • {course.students} học viên • {course.revenue}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getStatusColor(course.status)}>{getStatusText(course.status)}</Badge>
                          <span className="text-xs text-muted-foreground">{course.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Báo cáo vi phạm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium">{report.content}</p>
                          <p className="text-sm text-muted-foreground">
                            Loại: {report.type} • Báo cáo bởi: {report.reporter} • Đối tượng: {report.reported}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{report.createdAt}</p>
                        </div>
                        <Badge className={getStatusColor(report.status)}>{getStatusText(report.status)}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Xem chi tiết
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Chấp nhận
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                          Từ chối
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Người dùng hoạt động</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">8,456</div>
                  <p className="text-sm text-muted-foreground">+12% so với tuần trước</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Khóa học hoàn thành</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">1,234</div>
                  <p className="text-sm text-muted-foreground">+8% so với tuần trước</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tỷ lệ hoàn thành</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">78%</div>
                  <p className="text-sm text-muted-foreground">+3% so với tuần trước</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Biểu đồ thống kê</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  [Biểu đồ thống kê sẽ được hiển thị ở đây]
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
