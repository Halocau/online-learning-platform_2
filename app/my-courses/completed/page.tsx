"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Award, Download, Star, Users, Clock, BookOpen, CheckCircle } from "lucide-react"
import Link from "next/link"

const completedCourses = [
  {
    id: 5,
    title: "HTML & CSS Cơ Bản",
    instructor: "Võ Thị Lan",
    thumbnail: "/html-css-course.jpg",
    rating: 4.5,
    students: 3200,
    duration: "8 giờ",
    category: "Frontend",
    completedDate: "2025-09-15",
    certificate: true,
    finalScore: 92,
    totalLessons: 16,
    reviewGiven: true
  },
  {
    id: 6,
    title: "Git & GitHub Mastery",
    instructor: "Nguyễn Đức Minh",
    thumbnail: "/git-course.jpg",
    rating: 4.8,
    students: 1850,
    duration: "6 giờ",
    category: "Tools",
    completedDate: "2025-08-28",
    certificate: true,
    finalScore: 88,
    totalLessons: 12,
    reviewGiven: false
  },
  {
    id: 7,
    title: "Responsive Web Design",
    instructor: "Trần Minh Khôi",
    thumbnail: "/responsive-course.jpg",
    rating: 4.6,
    students: 2100,
    duration: "10 giờ",
    category: "Frontend",
    completedDate: "2025-07-20",
    certificate: true,
    finalScore: 95,
    totalLessons: 20,
    reviewGiven: true
  },
  {
    id: 8,
    title: "JavaScript Cơ Bản",
    instructor: "Phạm Văn Hùng",
    thumbnail: "/js-basic-course.jpg",
    rating: 4.7,
    students: 4500,
    duration: "12 giờ",
    category: "JavaScript",
    completedDate: "2025-06-10",
    certificate: true,
    finalScore: 90,
    totalLessons: 24,
    reviewGiven: true
  },
  {
    id: 9,
    title: "Database Fundamentals",
    instructor: "Lê Thị Mai",
    thumbnail: "/database-course.jpg",
    rating: 4.4,
    students: 1200,
    duration: "14 giờ",
    category: "Database",
    completedDate: "2025-05-15",
    certificate: false,
    finalScore: 85,
    totalLessons: 28,
    reviewGiven: false
  }
]

export default function CompletedCoursesPage() {
  const totalCompletedCourses = completedCourses.length
  const certificatesEarned = completedCourses.filter(course => course.certificate).length
  const averageScore = Math.round(completedCourses.reduce((sum, course) => sum + course.finalScore, 0) / completedCourses.length)

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
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/my-courses">
                    Khóa học của tôi
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Đã hoàn thành</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{totalCompletedCourses}</p>
                    <p className="text-sm text-gray-600">Khóa học hoàn thành</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold">{certificatesEarned}</p>
                    <p className="text-sm text-gray-600">Chứng chỉ đạt được</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{averageScore}%</p>
                    <p className="text-sm text-gray-600">Điểm trung bình</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Khóa học đã hoàn thành</h1>
                  <p className="text-gray-600 mt-2">Những thành tựu bạn đã đạt được</p>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {completedCourses.length} khóa học
                </Badge>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                {completedCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:w-48 h-32 lg:h-auto relative">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Hoàn thành
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <Badge variant="outline" className="mb-2">
                                {course.category}
                              </Badge>
                              <CardTitle className="text-xl mb-2 line-clamp-2">
                                {course.title}
                              </CardTitle>
                              <p className="text-gray-600 mb-3">
                                Bởi {course.instructor}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span>{course.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  <span>{course.students.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{course.duration}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="bg-green-50 p-3 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-green-900">
                                  Điểm cuối khóa:
                                </span>
                                <span className="text-lg font-bold text-green-700">
                                  {course.finalScore}%
                                </span>
                              </div>
                              <div className="flex justify-between text-sm text-green-700">
                                <span>Hoàn thành: {new Date(course.completedDate).toLocaleDateString('vi-VN')}</span>
                                <span>{course.totalLessons} bài học</span>
                              </div>
                            </div>

                            {course.certificate && (
                              <div className="flex items-center gap-2 text-yellow-600">
                                <Award className="w-4 h-4" />
                                <span className="text-sm font-medium">Đã nhận chứng chỉ</span>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-3 mt-4">
                            <Link href={`/courses/${course.id}`} className="flex-1">
                              <Button variant="outline" className="w-full">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Xem lại
                              </Button>
                            </Link>
                            {course.certificate && (
                              <Button variant="outline">
                                <Download className="w-4 h-4 mr-2" />
                                Tải chứng chỉ
                              </Button>
                            )}
                            {!course.reviewGiven && (
                              <Button>
                                <Star className="w-4 h-4 mr-2" />
                                Đánh giá
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {completedCourses.length === 0 && (
                <div className="text-center py-12">
                  <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Chưa hoàn thành khóa học nào
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Hoàn thành các khóa học để nhận chứng chỉ và mở khóa thành tựu mới
                  </p>
                  <Link href="/my-courses/active">
                    <Button>
                      Tiếp tục học tập
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
