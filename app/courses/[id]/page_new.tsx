"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Star, Clock, BookOpen, Play, Users } from "lucide-react"
import Link from "next/link"

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  // Mock user data - in real app this would come from authentication context
  const currentUser = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    avatar: "/placeholder-user.jpg"
  }

  // Course data based on ID with first lesson info
  const courseData = {
    1: {
      id: 1,
      title: "React Fundamentals",
      description: "Học React từ cơ bản đến nâng cao với các dự án thực tế. Khóa học bao gồm các khái niệm về components, hooks, state management và routing.",
      instructor: { name: "Nguyễn Văn An" },
      price: 1500000,
      originalPrice: 2000000,
      rating: 4.8,
      students: 1250,
      duration: "12 giờ",
      category: "Lập trình Frontend",
      thumbnail: "/react-course.png",
      firstLessonId: 1,
      totalLessons: 24
    },
    2: {
      id: 2,
      title: "Node.js Backend Development",
      description: "Xây dựng API và backend services với Node.js, Express, và MongoDB. Học cách tạo RESTful APIs, authentication, và deployment.",
      instructor: { name: "Trần Thị Bảo" },
      price: 1800000,
      originalPrice: 2500000,
      rating: 4.9,
      students: 890,
      duration: "15 giờ",
      category: "Lập trình Backend",
      thumbnail: "/nodejs-course.jpg",
      firstLessonId: 1,
      totalLessons: 30
    },
    3: {
      id: 3,
      title: "JavaScript ES6+ Advanced",
      description: "Nắm vững JavaScript hiện đại với ES6+, async/await, modules, và các design patterns. Từ cơ bản đến nâng cao.",
      instructor: { name: "Lê Minh Hoàng" },
      price: 1200000,
      originalPrice: 1800000,
      rating: 4.7,
      students: 2100,
      duration: "10 giờ",
      category: "Lập trình JavaScript",
      thumbnail: "/javascript-course.png",
      firstLessonId: 1,
      totalLessons: 18
    }
  }
  
  const course = courseData[parseInt(params.id) as keyof typeof courseData] || courseData[1]

  return (
    <>
      <Header user={currentUser} />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8 px-4 max-w-6xl">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-2">{course.category}</Badge>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{course.description}</p>
            
            <div className="flex justify-center items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
                  ))}
                </div>
                <span className="font-semibold">{course.rating}</span>
                <span className="text-gray-600">({course.students.toLocaleString()} học viên)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{course.totalLessons} bài học</span>
              </div>
            </div>
            
            <img src={course.thumbnail} alt={course.title} className="w-full max-w-2xl mx-auto h-64 object-cover rounded-lg shadow-lg mb-8" />
            
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <div className="flex justify-center items-center gap-3 mb-2">
                    <span className="text-3xl font-bold text-blue-600">
                      {course.price.toLocaleString("vi-VN")} VNĐ
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      {course.originalPrice.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">30 ngày đảm bảo hoàn tiền</p>
                </div>

                <div className="flex gap-3 mb-4">
                  <Link href={`/courses/${course.id}/lesson/${course.firstLessonId}`} className="flex-1">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Play className="w-4 h-4 mr-2" />
                      Bắt đầu học
                    </Button>
                  </Link>
                  <Button variant="outline" className="flex-1">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Thêm vào giỏ hàng
                  </Button>
                </div>

                <div className="text-sm text-gray-600">
                  <p>Giảng viên: <strong>{course.instructor.name}</strong></p>
                  <p>Thời lượng: <strong>{course.duration}</strong></p>
                  <p>Đánh giá: <strong>{course.rating}/5</strong></p>
                  <p>Tổng bài học: <strong>{course.totalLessons} bài</strong></p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-left max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Chi tiết khóa học</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin khóa học</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>Danh mục:</strong> {course.category}</p>
                      <p><strong>Thời lượng:</strong> {course.duration}</p>
                      <p><strong>Giảng viên:</strong> {course.instructor.name}</p>
                      <p><strong>Học viên:</strong> {course.students.toLocaleString()}</p>
                      <p><strong>Đánh giá:</strong> {course.rating}/5 ⭐</p>
                      <p><strong>Tổng bài học:</strong> {course.totalLessons} bài</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Nội dung học</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{course.description}</p>
                    <div className="mt-4">
                      <Link href={`/courses/${course.id}/lesson/${course.firstLessonId}`}>
                        <Button className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Xem bài học đầu tiên
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Bạn sẽ học được gì?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p>✅ Nắm vững các khái niệm cơ bản</p>
                      <p>✅ Xây dựng dự án thực tế</p>
                      <p>✅ Best practices trong ngành</p>
                      <p>✅ Chuẩn bị cho công việc</p>
                    </div>
                    <div className="space-y-2">
                      <p>✅ Hiểu sâu về framework/library</p>
                      <p>✅ Debugging và troubleshooting</p>
                      <p>✅ Performance optimization</p>
                      <p>✅ Deployment và production</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Link href="/cart">
                <Button variant="outline" className="mr-4">
                  ← Quay lại giỏ hàng
                </Button>
              </Link>
              <Link href={`/courses/${course.id}/lesson/${course.firstLessonId}`}>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Play className="w-4 h-4 mr-2" />
                  Bắt đầu học ngay
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}