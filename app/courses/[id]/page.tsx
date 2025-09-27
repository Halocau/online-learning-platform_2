import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Star, Clock, BookOpen, Award, Play, Smartphone, Infinity, ChevronRight } from "lucide-react"
import Link from "next/link"

// Mock course data - in real app this would come from API/database
const getCourseData = (id: string) => {
  const courses = {
    "1": {
      id: 1,
      title: "React Fundamentals - Từ Cơ Bản Đến Nâng Cao",
      description:
        "Khóa học React toàn diện giúp bạn nắm vững từ những khái niệm cơ bản đến các kỹ thuật nâng cao. Xây dựng ứng dụng web hiện đại với React, JSX, Hooks, State Management và nhiều hơn nữa.",
      instructor: {
        name: "John Doe",
        title: "Senior Frontend Developer",
        avatar: "/instructor-avatar.jpg",
        rating: 4.9,
        students: 15000,
        courses: 12,
      },
      price: 1500000,
      originalPrice: 2000000,
      rating: 4.8,
      students: 1250,
      duration: "12 giờ",
      lessons: 45,
      level: "Cơ bản",
      category: "Lập trình",
      thumbnail: "/react-course.png",
      language: "Tiếng Việt",
      lastUpdated: "Tháng 1, 2025",
      features: [
        "12 giờ video theo yêu cầu",
        "45 bài học",
        "5 dự án thực hành",
        "Truy cập trọn đời",
        "Truy cập trên mobile và TV",
        "Chứng chỉ hoàn thành",
      ],
      curriculum: [
        {
          title: "Giới thiệu về React",
          lessons: 8,
          duration: "2 giờ",
          items: [
            { title: "React là gì?", duration: "15:30", type: "video", free: true },
            { title: "Cài đặt môi trường", duration: "20:45", type: "video", free: true },
            { title: "JSX cơ bản", duration: "18:20", type: "video" },
            { title: "Components và Props", duration: "25:10", type: "video" },
            { title: "Bài tập thực hành", duration: "30:00", type: "exercise" },
          ],
        },
        {
          title: "State và Event Handling",
          lessons: 12,
          duration: "3 giờ",
          items: [
            { title: "useState Hook", duration: "22:15", type: "video" },
            { title: "Event Handling", duration: "18:30", type: "video" },
            { title: "Conditional Rendering", duration: "16:45", type: "video" },
            { title: "Lists và Keys", duration: "20:20", type: "video" },
            { title: "Dự án Todo App", duration: "45:00", type: "project" },
          ],
        },
        {
          title: "Advanced Hooks",
          lessons: 15,
          duration: "4 giờ",
          items: [
            { title: "useEffect Hook", duration: "28:30", type: "video" },
            { title: "useContext Hook", duration: "25:15", type: "video" },
            { title: "useReducer Hook", duration: "30:45", type: "video" },
            { title: "Custom Hooks", duration: "35:20", type: "video" },
            { title: "Dự án Weather App", duration: "60:00", type: "project" },
          ],
        },
      ],
      requirements: [
        "Kiến thức cơ bản về HTML, CSS và JavaScript",
        "Hiểu biết về ES6+ features",
        "Máy tính có thể chạy Node.js",
        "Tinh thần học hỏi và thực hành",
      ],
      whatYouLearn: [
        "Xây dựng ứng dụng React từ đầu",
        "Hiểu rõ về JSX và Virtual DOM",
        "Sử dụng thành thạo React Hooks",
        "Quản lý state hiệu quả",
        "Xử lý events và forms",
        "Tích hợp API và fetch data",
        "Deploy ứng dụng lên production",
        "Best practices và performance optimization",
      ],
      reviews: [
        {
          id: 1,
          user: "Nguyễn Văn A",
          avatar: "/user1.jpg",
          rating: 5,
          date: "2 tuần trước",
          comment: "Khóa học rất chi tiết và dễ hiểu. Giảng viên giải thích rất rõ ràng, từ cơ bản đến nâng cao.",
        },
        {
          id: 2,
          user: "Trần Thị B",
          avatar: "/user2.jpg",
          rating: 5,
          date: "1 tháng trước",
          comment: "Tuyệt vời! Sau khóa học này tôi đã có thể tự tin làm việc với React trong dự án thực tế.",
        },
      ],
    },
  }

  return courses[id as keyof typeof courses] || null
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const course = getCourseData(params.id)

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy khóa học</h1>
          <Button asChild>
            <Link href="/courses">Quay lại danh sách khóa học</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <Link href="/" className="text-2xl font-bold text-foreground">
                EduPlatform
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Trang chủ
              </Link>
              <Link href="/courses" className="text-muted-foreground hover:text-foreground transition-colors">
                Khóa học
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Course Hero */}
      <section className="bg-gradient-to-r from-background to-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline">{course.category}</Badge>
                <Badge variant="secondary">{course.level}</Badge>
              </div>

              <h1 className="text-4xl font-bold mb-4 text-balance">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{course.description}</p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{course.rating}</span>
                  <span className="text-muted-foreground">({course.students.toLocaleString()} học viên)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <span>{course.lessons} bài học</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={course.instructor.avatar || "/placeholder.svg"}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium">{course.instructor.name}</p>
                  <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                </div>
              </div>
            </div>

            {/* Course Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <div className="relative">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Button size="sm" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Play className="h-4 w-4 mr-2" />
                    Xem trước
                  </Button>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl font-bold text-primary">{(course.price / 1000000).toFixed(1)}M VNĐ</span>
                    <span className="text-lg text-muted-foreground line-through">
                      {(course.originalPrice / 1000000).toFixed(1)}M VNĐ
                    </span>
                    <Badge className="bg-red-500">
                      -{Math.round((1 - course.price / course.originalPrice) * 100)}%
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-6">
                    <AddToCartButton
                      courseId={course.id}
                      courseTitle={course.title}
                      price={course.price}
                      className="w-full"
                    />
                    <Button variant="outline" className="w-full bg-transparent">
                      Mua ngay
                    </Button>
                  </div>

                  <div className="text-center text-sm text-muted-foreground mb-4">Hoàn tiền 100% trong 30 ngày</div>

                  <Separator className="mb-4" />

                  <div className="space-y-3">
                    <h4 className="font-semibold">Khóa học bao gồm:</h4>
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                          {feature.includes("video") && <Play className="h-2 w-2" />}
                          {feature.includes("Truy cập") && <Infinity className="h-2 w-2" />}
                          {feature.includes("mobile") && <Smartphone className="h-2 w-2" />}
                          {feature.includes("Chứng chỉ") && <Award className="h-2 w-2" />}
                          {!feature.includes("video") &&
                            !feature.includes("Truy cập") &&
                            !feature.includes("mobile") &&
                            !feature.includes("Chứng chỉ") && <BookOpen className="h-2 w-2" />}
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle>Bạn sẽ học được gì</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.whatYouLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      </div>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Curriculum */}
            <Card>
              <CardHeader>
                <CardTitle>Nội dung khóa học</CardTitle>
                <p className="text-muted-foreground">
                  {course.curriculum.length} phần • {course.lessons} bài học • {course.duration} tổng thời lượng
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.curriculum.map((section, index) => (
                    <div key={index} className="border rounded-lg">
                      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4" />
                          <span className="font-medium">{section.title}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {section.lessons} bài • {section.duration}
                        </div>
                      </div>

                      <div className="px-4 pb-4">
                        <div className="space-y-2">
                          {section.items.slice(0, 3).map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center justify-between py-2 px-4 hover:bg-muted/30 rounded"
                            >
                              <div className="flex items-center gap-2">
                                {item.type === "video" && <Play className="h-4 w-4 text-muted-foreground" />}
                                {item.type === "exercise" && <BookOpen className="h-4 w-4 text-muted-foreground" />}
                                {item.type === "project" && <Award className="h-4 w-4 text-muted-foreground" />}
                                <span className="text-sm">{item.title}</span>
                                {item.free && (
                                  <Badge variant="outline" className="text-xs">
                                    Miễn phí
                                  </Badge>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">{item.duration}</span>
                            </div>
                          ))}
                          {section.items.length > 3 && (
                            <div className="text-center py-2">
                              <Button variant="ghost" size="sm">
                                Xem thêm {section.items.length - 3} bài
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Yêu cầu</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Đánh giá từ học viên</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {course.reviews.map((review) => (
                    <div key={review.id} className="flex gap-4">
                      <img
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.user}
                        className="w-10 h-10 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{review.user}</span>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instructor Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Giảng viên</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={course.instructor.avatar || "/placeholder.svg"}
                    alt={course.instructor.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold">{course.instructor.name}</h4>
                    <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{course.instructor.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Đánh giá</p>
                  </div>
                  <div className="text-center">
                    <div className="font-bold mb-1">{course.instructor.students.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Học viên</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Xem hồ sơ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
