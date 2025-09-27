"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageSquare,
  Search,
  Plus,
  TrendingUp,
  Clock,
  Users,
  BookOpen,
  ThumbsUp,
  Eye,
  Pin,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("latest")

  // Mock forum data
  const categories = [
    { id: "all", name: "Tất cả", count: 245, color: "bg-blue-500" },
    { id: "general", name: "Thảo luận chung", count: 89, color: "bg-green-500" },
    { id: "programming", name: "Lập trình", count: 156, color: "bg-purple-500" },
    { id: "design", name: "Thiết kế", count: 67, color: "bg-pink-500" },
    { id: "career", name: "Nghề nghiệp", count: 43, color: "bg-orange-500" },
    { id: "qa", name: "Hỏi đáp", count: 78, color: "bg-red-500" },
  ]

  const discussions = [
    {
      id: 1,
      title: "Làm thế nào để tối ưu performance React app?",
      content: "Mình đang gặp vấn đề về performance khi app React có quá nhiều component re-render...",
      author: {
        name: "Nguyễn Văn A",
        avatar: "/user1.jpg",
        role: "Học viên",
        level: "Intermediate",
      },
      category: "programming",
      tags: ["React", "Performance", "Optimization"],
      replies: 12,
      views: 234,
      likes: 8,
      createdAt: "2 giờ trước",
      lastReply: "30 phút trước",
      isPinned: false,
      isSolved: false,
      isHot: true,
    },
    {
      id: 2,
      title: "Chia sẻ kinh nghiệm phỏng vấn Frontend Developer",
      content: "Vừa qua mình đã trải qua 5 vòng phỏng vấn cho vị trí Frontend Developer tại một công ty lớn...",
      author: {
        name: "Trần Thị B",
        avatar: "/user2.jpg",
        role: "Cựu học viên",
        level: "Expert",
      },
      category: "career",
      tags: ["Interview", "Frontend", "Career"],
      replies: 25,
      views: 567,
      likes: 34,
      createdAt: "1 ngày trước",
      lastReply: "2 giờ trước",
      isPinned: true,
      isSolved: false,
      isHot: true,
    },
    {
      id: 3,
      title: "Cách thiết kế UI/UX cho mobile app hiệu quả?",
      content: "Mình đang thiết kế một mobile app và muốn tìm hiểu về best practices...",
      author: {
        name: "Lê Văn C",
        avatar: "/user3.jpg",
        role: "Học viên",
        level: "Beginner",
      },
      category: "design",
      tags: ["UI/UX", "Mobile", "Design"],
      replies: 8,
      views: 156,
      likes: 12,
      createdAt: "3 ngày trước",
      lastReply: "1 ngày trước",
      isPinned: false,
      isSolved: true,
      isHot: false,
    },
    {
      id: 4,
      title: "Tài liệu học JavaScript từ cơ bản đến nâng cao",
      content: "Mình tổng hợp một số tài liệu hay về JavaScript cho những bạn mới bắt đầu...",
      author: {
        name: "Phạm Thị D",
        avatar: "/user4.jpg",
        role: "Giảng viên",
        level: "Expert",
      },
      category: "programming",
      tags: ["JavaScript", "Learning", "Resources"],
      replies: 45,
      views: 892,
      likes: 67,
      createdAt: "1 tuần trước",
      lastReply: "5 giờ trước",
      isPinned: true,
      isSolved: false,
      isHot: true,
    },
  ]

  const stats = [
    { label: "Tổng thảo luận", value: "1,234", icon: MessageSquare },
    { label: "Thành viên hoạt động", value: "567", icon: Users },
    { label: "Câu hỏi đã giải quyết", value: "89%", icon: CheckCircle },
    { label: "Bài viết hôm nay", value: "23", icon: TrendingUp },
  ]

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || discussion.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.likes - a.likes
      case "replies":
        return b.replies - a.replies
      case "views":
        return b.views - a.views
      default: // latest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <Link href="/" className="text-2xl font-bold text-foreground">
                SkillUp
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Trang chủ
              </Link>
              <Link href="/courses" className="text-muted-foreground hover:text-foreground transition-colors">
                Khóa học
              </Link>
              <Link href="/forum" className="text-foreground font-medium">
                Diễn đàn
              </Link>
            </nav>
            <Button asChild>
              <Link href="/forum/new">
                <Plus className="mr-2 h-4 w-4" />
                Tạo thảo luận
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Diễn đàn cộng đồng</h1>
          <p className="text-muted-foreground">Nơi chia sẻ kiến thức và kết nối với cộng đồng học tập</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Danh mục</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm thảo luận..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Mới nhất</SelectItem>
                  <SelectItem value="popular">Phổ biến nhất</SelectItem>
                  <SelectItem value="replies">Nhiều phản hồi</SelectItem>
                  <SelectItem value="views">Nhiều lượt xem</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Discussions List */}
            <div className="space-y-4">
              {sortedDiscussions.map((discussion) => (
                <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="flex-shrink-0">
                        <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            {discussion.isPinned && <Pin className="h-4 w-4 text-primary" />}
                            {discussion.isSolved && <CheckCircle className="h-4 w-4 text-green-600" />}
                            {discussion.isHot && <Badge className="bg-red-500 text-xs">Hot</Badge>}
                            <Link
                              href={`/forum/${discussion.id}`}
                              className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2"
                            >
                              {discussion.title}
                            </Link>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{discussion.content}</p>

                        <div className="flex items-center gap-2 mb-3">
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <span className="font-medium">{discussion.author.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {discussion.author.role}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{discussion.createdAt}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{discussion.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{discussion.replies}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{discussion.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {sortedDiscussions.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Không tìm thấy thảo luận</h3>
                <p className="text-muted-foreground mb-4">Thử thay đổi từ khóa tìm kiếm hoặc danh mục</p>
                <Button asChild>
                  <Link href="/forum/new">Tạo thảo luận mới</Link>
                </Button>
              </div>
            )}

            {/* Pagination */}
            {sortedDiscussions.length > 0 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Trước
                  </Button>
                  <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Sau
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
