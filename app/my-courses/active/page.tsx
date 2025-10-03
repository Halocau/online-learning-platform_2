"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Play, Clock, BookOpen, Star, Users } from "lucide-react"
import Link from "next/link"

const activeCourses = [
  {
    id: 1,
    title: "React Fundamentals - Từ Cơ Bản Đến Nâng Cao",
    instructor: "Nguyễn Văn An",
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    thumbnail: "/react-course.png",
    rating: 4.8,
    students: 1250,
    duration: "12 giờ",
    category: "Frontend",
    lastWatched: "2025-09-27",
    nextLesson: "React Hooks - useEffect",
    timeLeft: "4 giờ 30 phút",
    currentLessonId: 9
  },
  {
    id: 2,
    title: "JavaScript ES6+ Advanced",
    instructor: "Lê Minh Hoàng",
    progress: 30,
    totalLessons: 18,
    completedLessons: 5,
    thumbnail: "/javascript-course.png",
    rating: 4.7,
    students: 2100,
    duration: "10 giờ",
    category: "JavaScript",
    lastWatched: "2025-09-25",
    nextLesson: "Async/Await và Promises",
    timeLeft: "7 giờ 15 phút",
    currentLessonId: 6
  },
  {
    id: 3,
    title: "Node.js Backend Development",
    instructor: "Trần Thị Bảo",
    progress: 45,
    totalLessons: 30,
    completedLessons: 14,
    thumbnail: "/nodejs-course.jpg",
    rating: 4.9,
    students: 890,
    duration: "15 giờ",
    category: "Backend",
    lastWatched: "2025-09-26",
    nextLesson: "Express.js Middleware",
    timeLeft: "8 giờ 45 phút",
    currentLessonId: 15
  },
  {
    id: 4,
    title: "Python cho Data Science",
    instructor: "Phạm Minh Tuấn",
    progress: 75,
    totalLessons: 22,
    completedLessons: 17,
    thumbnail: "/python-course.jpg",
    rating: 4.6,
    students: 1580,
    duration: "14 giờ",
    category: "Data Science",
    lastWatched: "2025-09-28",
    nextLesson: "Machine Learning cơ bản",
    timeLeft: "3 giờ 30 phút",
    currentLessonId: 18
  }
]

export default function ActiveCoursesPage() {
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
                  <BreadcrumbPage>Đang học</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Khóa học đang học</h1>
                  <p className="text-gray-600 mt-2">Tiếp tục hành trình học tập của bạn</p>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {activeCourses.length} khóa học
                </Badge>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                {activeCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:w-64 h-48 lg:h-auto">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
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
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span>Tiến độ: {course.completedLessons}/{course.totalLessons} bài</span>
                                <span className="font-semibold">{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                            </div>

                            <div className="bg-blue-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-blue-900 mb-1">
                                Bài tiếp theo:
                              </p>
                              <p className="text-sm text-blue-700">{course.nextLesson}</p>
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>Lần cuối xem: {new Date(course.lastWatched).toLocaleDateString('vi-VN')}</span>
                              <span>Còn lại: {course.timeLeft}</span>
                            </div>
                          </div>

                          <div className="flex gap-3 mt-4">
                            <Link href={`/courses/${course.id}/lesson/${course.currentLessonId}`} className="flex-1">
                              <Button className="w-full">
                                <Play className="w-4 h-4 mr-2" />
                                Tiếp tục học
                              </Button>
                            </Link>
                            <Link href={`/courses/${course.id}`}>
                              <Button variant="outline">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Chi tiết
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {activeCourses.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Chưa có khóa học nào đang học
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Khám phá và đăng ký các khóa học mới để bắt đầu hành trình học tập
                  </p>
                  <Link href="/courses">
                    <Button>
                      Khám phá khóa học
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
