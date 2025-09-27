"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Award, TrendingUp, Play, Star } from "lucide-react"

export default function DashboardPage() {
  // Mock data for demonstration
  const stats = {
    enrolledCourses: 5,
    completedCourses: 2,
    totalHours: 45,
    certificates: 2,
  }

  const recentCourses = [
    {
      id: 1,
      title: "React Fundamentals",
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      instructor: "John Doe",
      thumbnail: "/react-course.png",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Node.js Backend Development",
      progress: 40,
      totalLessons: 25,
      completedLessons: 10,
      instructor: "Jane Smith",
      thumbnail: "/nodejs-course.jpg",
      rating: 4.9,
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      progress: 90,
      totalLessons: 15,
      completedLessons: 14,
      instructor: "Mike Johnson",
      thumbnail: "/design-course-concept.png",
      rating: 4.7,
    },
  ]

  return (
    <SidebarProvider>
      <AppSidebar userRole="customer" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Khóa học đã đăng ký</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.enrolledCourses}</div>
                <p className="text-xs text-muted-foreground">+2 từ tháng trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Khóa học hoàn thành</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedCourses}</div>
                <p className="text-xs text-muted-foreground">+1 từ tháng trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng giờ học</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalHours}h</div>
                <p className="text-xs text-muted-foreground">+12h tuần này</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chứng chỉ</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.certificates}</div>
                <p className="text-xs text-muted-foreground">Đạt được</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="md:col-span-2 lg:col-span-2">
              <CardHeader>
                <CardTitle>Khóa học gần đây</CardTitle>
                <CardDescription>Tiếp tục học các khóa học bạn đã đăng ký</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-20 h-14 object-cover rounded"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm">{course.title}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-muted-foreground">{course.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Giảng viên: {course.instructor}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Progress value={course.progress} className="w-20" />
                          <span className="text-xs text-muted-foreground">{course.progress}%</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {course.completedLessons}/{course.totalLessons} bài
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Play className="h-4 w-4 mr-1" />
                      Tiếp tục
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hoạt động gần đây</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Hoàn thành bài "React Hooks"</p>
                    <p className="text-xs text-muted-foreground">2 giờ trước</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Bắt đầu khóa "Node.js Advanced"</p>
                    <p className="text-xs text-muted-foreground">1 ngày trước</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Nhận chứng chỉ "React Fundamentals"</p>
                    <p className="text-xs text-muted-foreground">3 ngày trước</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Tham gia diễn đàn "JavaScript Tips"</p>
                    <p className="text-xs text-muted-foreground">1 tuần trước</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
