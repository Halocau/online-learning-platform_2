import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { BookOpen, Users, Award, TrendingUp, Search, Star, Clock, Play } from "lucide-react"

export default function HomePage() {
  // Mock featured courses data
  const featuredCourses = [
    {
      id: 1,
      title: "React Fundamentals",
      description: "Học React từ cơ bản đến nâng cao với các dự án thực tế",
      instructor: "John Doe",
      price: 1500000,
      originalPrice: 2000000,
      rating: 4.8,
      students: 1250,
      duration: "12 giờ",
      level: "Cơ bản",
      category: "Lập trình",
      thumbnail: "/react-course.png",
      isPopular: true,
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description: "Nắm vững JavaScript ES6+ và các kỹ thuật lập trình nâng cao",
      instructor: "Jane Smith",
      price: 1800000,
      originalPrice: 2500000,
      rating: 4.9,
      students: 980,
      duration: "15 giờ",
      level: "Nâng cao",
      category: "Lập trình",
      thumbnail: "/javascript-course.png",
      isNew: true,
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      description: "Thiết kế giao diện người dùng chuyên nghiệp và trải nghiệm tối ưu",
      instructor: "Mike Johnson",
      price: 1200000,
      originalPrice: 1600000,
      rating: 4.7,
      students: 750,
      duration: "10 giờ",
      level: "Trung cấp",
      category: "Thiết kế",
      thumbnail: "/design-course-concept.png",
      isBestseller: true,
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      description: "Xây dựng API và ứng dụng backend mạnh mẽ với Node.js",
      instructor: "Sarah Wilson",
      price: 2000000,
      originalPrice: 2800000,
      rating: 4.8,
      students: 650,
      duration: "18 giờ",
      level: "Trung cấp",
      category: "Lập trình",
      thumbnail: "/nodejs-course.jpg",
      isPopular: true,
    },
  ]

  const categories = [
    { name: "Lập trình", count: 150, icon: "💻" },
    { name: "Thiết kế", count: 85, icon: "🎨" },
    { name: "Kinh doanh", count: 120, icon: "💼" },
    { name: "Marketing", count: 95, icon: "📈" },
    { name: "Ngoại ngữ", count: 200, icon: "🌍" },
    { name: "Nhiếp ảnh", count: 60, icon: "📸" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-balance mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Nền tảng học trực tuyến chuyên nghiệp
            </h2>
            <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
              Khám phá hàng nghìn khóa học chất lượng cao từ các chuyên gia hàng đầu. Học mọi lúc, mọi nơi với công nghệ
              hiện đại.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Tìm kiếm khóa học, giảng viên, chủ đề..."
                  className="pl-12 pr-4 py-6 text-lg rounded-full border-2 focus:border-primary"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full">Tìm kiếm</Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/courses">Khám phá khóa học</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-transparent">
                <Link href="/instructor/create-course">Tạo khóa học</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Danh mục phổ biến</h3>
            <p className="text-muted-foreground text-lg">Chọn lĩnh vực bạn muốn phát triển</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
                  <h4 className="font-semibold mb-2">{category.name}</h4>
                  <p className="text-sm text-muted-foreground">{category.count} khóa học</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl font-bold mb-4">Khóa học nổi bật</h3>
              <p className="text-muted-foreground text-lg">Những khóa học được yêu thích nhất</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/courses">
                Xem tất cả
                <TrendingUp className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {course.isPopular && <Badge className="bg-red-500">Phổ biến</Badge>}
                    {course.isNew && <Badge className="bg-green-500">Mới</Badge>}
                    {course.isBestseller && <Badge className="bg-yellow-500 text-black">Bán chạy</Badge>}
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{course.category}</Badge>
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>

                  <h4 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h4>

                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>

                  <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                    <span>{course.instructor}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                      <span className="text-muted-foreground">({course.students.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {(course.price / 1000000).toFixed(1)}M VNĐ
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {(course.originalPrice / 1000000).toFixed(1)}M VNĐ
                      </span>
                    </div>
                  </div>

                  <Button className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Xem chi tiết
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Tại sao chọn SkillUp?</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Chúng tôi cung cấp trải nghiệm học tập tốt nhất với công nghệ hiện đại
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle>Khóa học đa dạng</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Hàng nghìn khóa học từ cơ bản đến nâng cao trong mọi lĩnh vực</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle>Cộng đồng học tập</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Kết nối với hàng triệu học viên và giảng viên trên toàn thế giới</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle>Chứng chỉ uy tín</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Nhận chứng chỉ được công nhận sau khi hoàn thành khóa học</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle>Theo dõi tiến độ</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Theo dõi quá trình học tập và đánh giá kết quả chi tiết</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6">Bắt đầu hành trình học tập của bạn</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Tham gia cùng hàng triệu học viên đang phát triển kỹ năng và sự nghiệp của họ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
              <Link href="/register">Đăng ký miễn phí</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <Link href="/courses">Khám phá khóa học</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">SkillUp</span>
              </div>
              <p className="text-muted-foreground">
                Nền tảng học trực tuyến hàng đầu Việt Nam, mang đến trải nghiệm học tập tốt nhất.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Khóa học</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/courses/programming" className="hover:text-foreground">
                    Lập trình
                  </Link>
                </li>
                <li>
                  <Link href="/courses/design" className="hover:text-foreground">
                    Thiết kế
                  </Link>
                </li>
                <li>
                  <Link href="/courses/business" className="hover:text-foreground">
                    Kinh doanh
                  </Link>
                </li>
                <li>
                  <Link href="/courses/marketing" className="hover:text-foreground">
                    Marketing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground">
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-foreground">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    Điều khoản
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Kết nối</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    YouTube
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 SkillUp. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
