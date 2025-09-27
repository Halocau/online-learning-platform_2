"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, Star, Clock, BookOpen, Play, Grid3X3, List, SlidersHorizontal, X } from "lucide-react"
import Link from "next/link"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 5000000])
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  // Mock courses data
  const allCourses = [
    {
      id: 1,
      title: "React Fundamentals",
      description:
        "Học React từ cơ bản đến nâng cao với các dự án thực tế. Khóa học bao gồm JSX, Components, State, Props, Hooks và nhiều hơn nữa.",
      instructor: "John Doe",
      price: 1500000,
      originalPrice: 2000000,
      rating: 4.8,
      students: 1250,
      duration: "12 giờ",
      lessons: 45,
      level: "Cơ bản",
      category: "Lập trình",
      thumbnail: "/react-course.png",
      isPopular: true,
      tags: ["React", "JavaScript", "Frontend"],
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description:
        "Nắm vững JavaScript ES6+ và các kỹ thuật lập trình nâng cao. Tìm hiểu về Async/Await, Promises, Closures và Design Patterns.",
      instructor: "Jane Smith",
      price: 1800000,
      originalPrice: 2500000,
      rating: 4.9,
      students: 980,
      duration: "15 giờ",
      lessons: 52,
      level: "Nâng cao",
      category: "Lập trình",
      thumbnail: "/javascript-course.png",
      isNew: true,
      tags: ["JavaScript", "ES6", "Advanced"],
      lastUpdated: "2024-01-20",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      description:
        "Thiết kế giao diện người dùng chuyên nghiệp và trải nghiệm tối ưu. Học cách sử dụng Figma, Adobe XD và các công cụ thiết kế.",
      instructor: "Mike Johnson",
      price: 1200000,
      originalPrice: 1600000,
      rating: 4.7,
      students: 750,
      duration: "10 giờ",
      lessons: 35,
      level: "Trung cấp",
      category: "Thiết kế",
      thumbnail: "/design-course-concept.png",
      isBestseller: true,
      tags: ["UI/UX", "Figma", "Design"],
      lastUpdated: "2024-01-10",
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      description:
        "Xây dựng API và ứng dụng backend mạnh mẽ với Node.js. Học Express.js, MongoDB, Authentication và Deploy ứng dụng.",
      instructor: "Sarah Wilson",
      price: 2000000,
      originalPrice: 2800000,
      rating: 4.8,
      students: 650,
      duration: "18 giờ",
      lessons: 60,
      level: "Trung cấp",
      category: "Lập trình",
      thumbnail: "/nodejs-course.jpg",
      isPopular: true,
      tags: ["Node.js", "Backend", "API"],
      lastUpdated: "2024-01-18",
    },
    {
      id: 5,
      title: "Digital Marketing Mastery",
      description: "Chiến lược marketing số toàn diện từ SEO, SEM, Social Media đến Email Marketing và Analytics.",
      instructor: "David Brown",
      price: 1300000,
      originalPrice: 1800000,
      rating: 4.6,
      students: 890,
      duration: "14 giờ",
      lessons: 42,
      level: "Cơ bản",
      category: "Marketing",
      thumbnail: "/marketing-course.jpg",
      tags: ["Marketing", "SEO", "Social Media"],
      lastUpdated: "2024-01-12",
    },
    {
      id: 6,
      title: "Python for Data Science",
      description:
        "Phân tích dữ liệu và Machine Learning với Python. Sử dụng Pandas, NumPy, Matplotlib và Scikit-learn.",
      instructor: "Lisa Chen",
      price: 2200000,
      originalPrice: 3000000,
      rating: 4.9,
      students: 1100,
      duration: "20 giờ",
      lessons: 65,
      level: "Trung cấp",
      category: "Lập trình",
      thumbnail: "/python-course.jpg",
      isNew: true,
      tags: ["Python", "Data Science", "ML"],
      lastUpdated: "2024-01-22",
    },
  ]

  const categories = [
    { value: "all", label: "Tất cả danh mục" },
    { value: "Lập trình", label: "Lập trình" },
    { value: "Thiết kế", label: "Thiết kế" },
    { value: "Marketing", label: "Marketing" },
    { value: "Kinh doanh", label: "Kinh doanh" },
    { value: "Ngoại ngữ", label: "Ngoại ngữ" },
  ]

  const levels = [
    { value: "all", label: "Tất cả cấp độ" },
    { value: "Cơ bản", label: "Cơ bản" },
    { value: "Trung cấp", label: "Trung cấp" },
    { value: "Nâng cao", label: "Nâng cao" },
  ]

  const sortOptions = [
    { value: "popular", label: "Phổ biến nhất" },
    { value: "newest", label: "Mới nhất" },
    { value: "rating", label: "Đánh giá cao nhất" },
    { value: "price-low", label: "Giá thấp đến cao" },
    { value: "price-high", label: "Giá cao đến thấp" },
  ]

  // Filter and sort courses
  const filteredCourses = allCourses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
      const matchesLevel = selectedLevel === "all" || course.level === selectedLevel
      const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        case "rating":
          return b.rating - a.rating
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        default: // popular
          return b.students - a.students
      }
    })

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedLevel("all")
    setPriceRange([0, 5000000])
    setSortBy("popular")
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
                EduPlatform
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Trang chủ
              </Link>
              <Link href="/courses" className="text-foreground font-medium">
                Khóa học
              </Link>
              <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                Danh mục
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/login">Đăng nhập</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Đăng ký</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tất cả khóa học</h1>
          <p className="text-muted-foreground">Khám phá {allCourses.length} khóa học chất lượng cao</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Tìm kiếm khóa học, giảng viên..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Bộ lọc
            </Button>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Khoảng giá</h4>
                  <div className="space-y-3">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={5000000}
                      step={100000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{(priceRange[0] / 1000000).toFixed(1)}M VNĐ</span>
                      <span>{(priceRange[1] / 1000000).toFixed(1)}M VNĐ</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Đánh giá</h4>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {rating}+ ({Math.floor(Math.random() * 500) + 100})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Thời lượng</h4>
                  <div className="space-y-2">
                    {[
                      { label: "Dưới 5 giờ", count: 45 },
                      { label: "5-10 giờ", count: 78 },
                      { label: "10-20 giờ", count: 92 },
                      { label: "Trên 20 giờ", count: 34 },
                    ].map((duration) => (
                      <div key={duration.label} className="flex items-center space-x-2">
                        <Checkbox id={`duration-${duration.label}`} />
                        <label htmlFor={`duration-${duration.label}`} className="text-sm">
                          {duration.label} ({duration.count})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <Button variant="outline" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Xóa bộ lọc
                </Button>
                <p className="text-sm text-muted-foreground">Tìm thấy {filteredCourses.length} khóa học</p>
              </div>
            </Card>
          )}
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-muted-foreground">Hiển thị {filteredCourses.length} khóa học</p>
        </div>

        {/* Courses Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
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

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {(course.price / 1000000).toFixed(1)}M VNĐ
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {(course.originalPrice / 1000000).toFixed(1)}M VNĐ
                      </span>
                    </div>
                  </div>

                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Xem chi tiết
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative flex-shrink-0">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-64 h-36 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 flex gap-2">
                        {course.isPopular && <Badge className="bg-red-500 text-xs">Phổ biến</Badge>}
                        {course.isNew && <Badge className="bg-green-500 text-xs">Mới</Badge>}
                        {course.isBestseller && <Badge className="bg-yellow-500 text-black text-xs">Bán chạy</Badge>}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{course.category}</Badge>
                            <Badge variant="secondary">{course.level}</Badge>
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {course.title}
                          </h3>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {(course.price / 1000000).toFixed(1)}M VNĐ
                          </div>
                          <div className="text-sm text-muted-foreground line-through">
                            {(course.originalPrice / 1000000).toFixed(1)}M VNĐ
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <span>Giảng viên: {course.instructor}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating}</span>
                          <span>({course.students.toLocaleString()})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{course.lessons} bài</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {course.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <Button className="w-32">Xem chi tiết</Button>
                      <Button variant="outline" className="w-32 bg-transparent">
                        Thêm vào giỏ
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Không tìm thấy khóa học</h3>
            <p className="text-muted-foreground mb-4">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            <Button onClick={clearFilters}>Xóa bộ lọc</Button>
          </div>
        )}
      </div>
    </div>
  )
}
