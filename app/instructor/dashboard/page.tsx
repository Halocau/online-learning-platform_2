"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  BookOpen, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Eye, 
  Edit, 
  BarChart3,
  LayoutDashboard,
  GraduationCap,
  UserCheck,
  CreditCard,
  Bell,
  Wallet,
  ChevronRight,
  Settings
} from "lucide-react"

// Custom Sidebar Component
function InstructorSidebar({ activeTab, setActiveTab, router }: { activeTab: string, setActiveTab: (tab: string) => void, router: any }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Khóa học', icon: BookOpen },
    { id: 'students', label: 'Học viên', icon: Users },
    { id: 'revenue', label: 'Doanh thu', icon: DollarSign },
    { id: 'payments', label: 'Thanh toán', icon: CreditCard },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'wallet', label: 'Ví tiền', icon: Wallet },
  ]

  const myCourses = [
    { id: 'react', title: 'Khóa học React của tôi', icon: '/react-course.png' },
    { id: 'nodejs', title: 'Khóa học Node.js của tôi', icon: '/nodejs-course.jpg' },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">EduPlatform</h2>
            <p className="text-sm text-gray-500">Giảng viên</p>
          </div>
        </div>
      </div>

      {/* Menu chính */}
      <div className="p-4">
        <p className="text-xs font-medium text-gray-500 uppercase mb-3">Menu chính</p>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'courses') {
                    router.push('/instructor/create-course')
                  } else {
                    setActiveTab(item.id)
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
                {item.id === 'courses' && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Khóa học của tôi */}
      <div className="p-4 flex-1">
        <p className="text-xs font-medium text-gray-500 uppercase mb-3">Khóa học của tôi</p>
        <div className="space-y-2">
          {myCourses.map((course) => (
            <button
              key={course.id}
              className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 rounded overflow-hidden">
                <img 
                  src={course.icon} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-gray-700 flex-1">{course.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg hover:bg-gray-50 transition-colors">
          <Settings className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-700">Cài đặt</span>
        </button>
      </div>
    </div>
  )
}

export default function InstructorDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const router = useRouter()

  // Mock data
  const stats = {
    totalCourses: 8,
    totalStudents: 1250,
    totalRevenue: 45000000,
    monthlyGrowth: 12,
  }

  const courses = [
    {
      id: 1,
      title: "React Fundamentals",
      students: 450,
      revenue: 15000000,
      status: "published",
      rating: 4.8,
      thumbnail: "/react-course.png",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      students: 320,
      revenue: 12000000,
      status: "published",
      rating: 4.9,
      thumbnail: "/javascript-course.png",
    },
    {
      id: 3,
      title: "Node.js Backend",
      students: 280,
      revenue: 10000000,
      status: "published",
      rating: 4.7,
      thumbnail: "/nodejs-course.jpg",
    },
    {
      id: 4,
      title: "UI/UX Design Basics",
      students: 200,
      revenue: 8000000,
      status: "draft",
      rating: 0,
      thumbnail: "/design-course-concept.png",
    },
  ]

  const students = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Học viên ${i + 1}`,
    email: `student${i + 1}@example.com`,
    joinedDate: `2024-01-${String(20 - i).padStart(2, '0')}`,
    course: courses[i % courses.length].title,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=student${i + 1}`,
    progress: Math.floor(Math.random() * 100),
  }))

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng khóa học</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalCourses}</div>
                  <p className="text-xs text-muted-foreground">+2 từ tháng trước</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng học viên</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{stats.monthlyGrowth}% từ tháng trước</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(stats.totalRevenue / 1000000).toFixed(1)}M VNĐ</div>
                  <p className="text-xs text-muted-foreground">+15% từ tháng trước</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tăng trưởng</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{stats.monthlyGrowth}%</div>
                  <p className="text-xs text-muted-foreground">So với tháng trước</p>
                </CardContent>
              </Card>
            </div>

            {/* Course Management */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Khóa học của tôi
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => router.push('/instructor/create-course')}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Tạo khóa học
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={course.thumbnail} 
                            alt={course.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div>
                            <p className="font-semibold">{course.title}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <span>{course.students} học viên</span>
                              <Badge variant={course.status === "published" ? "default" : "secondary"}>
                                {course.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Học viên mới nhất</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.slice(0, 5).map((student) => (
                      <div key={student.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.course}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{student.joinedDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'students':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Quản lý học viên</h2>
              <p className="text-gray-600">Danh sách tất cả học viên đã đăng ký khóa học của bạn</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Danh sách học viên ({students.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{student.course}</p>
                        <p className="text-sm text-gray-600">Tiến độ: {student.progress}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'revenue':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Báo cáo doanh thu</h2>
              <p className="text-gray-600">Theo dõi doanh thu từ các khóa học</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Doanh thu tháng này</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">15.2M VNĐ</div>
                  <p className="text-sm text-gray-600">+12% so với tháng trước</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Doanh thu năm nay</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">145M VNĐ</div>
                  <p className="text-sm text-gray-600">+25% so với năm trước</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Trung bình/khóa học</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">5.6M VNĐ</div>
                  <p className="text-sm text-gray-600">Từ {stats.totalCourses} khóa học</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Thông báo</h2>
              <p className="text-gray-600">Theo dõi các hoạt động và thông báo mới</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Thông báo gần đây</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 1, title: "Học viên mới đăng ký", message: "Nguyễn Văn An đã đăng ký khóa React Fundamentals", time: "2 phút trước" },
                    { id: 2, title: "Đánh giá mới", message: "Khóa học JavaScript nhận được đánh giá 5 sao", time: "1 giờ trước" },
                    { id: 3, title: "Thanh toán thành công", message: "Bạn đã nhận được 2.5M VNĐ từ khóa Node.js", time: "3 giờ trước" },
                    { id: 4, title: "Câu hỏi mới", message: "Có 3 câu hỏi mới trong diễn đàn", time: "5 giờ trước" },
                  ].map((notification) => (
                    <div key={notification.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                        </div>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'wallet':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Ví tiền</h2>
              <p className="text-gray-600">Quản lý số dư và giao dịch</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Số dư khả dụng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">12.5M VNĐ</div>
                  <Button className="mt-4 w-full">Rút tiền</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Giao dịch gần đây</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { amount: "+2.5M VNĐ", description: "Bán khóa Node.js", date: "Hôm nay" },
                      { amount: "+1.8M VNĐ", description: "Bán khóa React", date: "Hôm qua" },
                      { amount: "-500K VNĐ", description: "Rút tiền", date: "2 ngày trước" },
                    ].map((transaction, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-600">{transaction.date}</p>
                        </div>
                        <p className={`font-medium ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Chức năng đang được phát triển...</p>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <InstructorSidebar activeTab={activeTab} setActiveTab={setActiveTab} router={router} />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}