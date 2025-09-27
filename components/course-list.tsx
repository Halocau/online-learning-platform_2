"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Users, Star } from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  category: string
  level: string
  price: number
  thumbnail: string
  status: string
  createdAt: string
  updatedAt: string
  sections?: any[]
}

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    // Load courses from localStorage
    const savedCourses = localStorage.getItem("courses")
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses))
    }
  }, [])

  const getCategoryLabel = (category: string) => {
    const categories: { [key: string]: string } = {
      programming: "Lập trình",
      design: "Thiết kế",
      business: "Kinh doanh",
      marketing: "Marketing",
      language: "Ngoại ngữ",
    }
    return categories[category] || category
  }

  const getLevelLabel = (level: string) => {
    const levels: { [key: string]: string } = {
      beginner: "Cơ bản",
      intermediate: "Trung cấp",
      advanced: "Nâng cao",
    }
    return levels[level] || level
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Khóa học của tôi</h1>
        <p className="text-muted-foreground">Quản lý và theo dõi các khóa học bạn đã tạo</p>
      </div>

      {courses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Chưa có khóa học nào</h3>
            <p className="text-muted-foreground text-center mb-4">Bắt đầu tạo khóa học đầu tiên của bạn</p>
            <Button>Tạo khóa học mới</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                <CardDescription className="line-clamp-3">{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Badge variant="secondary">{getCategoryLabel(course.category)}</Badge>
                  <Badge variant="outline">{getLevelLabel(course.level)}</Badge>
                  <Badge variant={course.status === "published" ? "default" : "secondary"}>
                    {course.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {course.sections?.reduce(
                          (total, section) =>
                            total +
                            (section.lectures?.reduce(
                              (sectionTotal: number, lecture: any) => sectionTotal + (lecture.duration || 0),
                              0,
                            ) || 0),
                          0,
                        ) || 0}{" "}
                        phút
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>0 học viên</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>5.0</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">
                    {course.price > 0 ? `${course.price.toLocaleString()} VNĐ` : "Miễn phí"}
                  </div>
                  <Button variant="outline" size="sm">
                    Chỉnh sửa
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
