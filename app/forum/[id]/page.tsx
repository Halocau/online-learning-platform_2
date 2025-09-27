"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Flag,
  BookOpen,
  ArrowLeft,
  Pin,
  CheckCircle,
  Clock,
  Eye,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"

// Mock discussion data
const getDiscussionData = (id: string) => {
  return {
    id: Number.parseInt(id),
    title: "Làm thế nào để tối ưu performance React app?",
    content: `Chào mọi người,

Mình đang phát triển một ứng dụng React khá lớn và gặp vấn đề về performance. App có khoảng 50+ components và mình nhận thấy có nhiều component bị re-render không cần thiết.

Mình đã thử một số cách như:
- Sử dụng React.memo() cho các component
- Tối ưu useState và useEffect
- Chia nhỏ components

Nhưng vẫn chưa thấy cải thiện đáng kể. Các bạn có kinh nghiệm gì về vấn đề này không? Có tools nào để debug performance không?

Cảm ơn mọi người!`,
    author: {
      name: "Nguyễn Văn A",
      avatar: "/user1.jpg",
      role: "Học viên",
      level: "Intermediate",
      joinDate: "Tham gia 6 tháng trước",
      posts: 45,
      reputation: 234,
    },
    category: "programming",
    tags: ["React", "Performance", "Optimization"],
    replies: 12,
    views: 234,
    likes: 8,
    dislikes: 1,
    createdAt: "2 giờ trước",
    lastReply: "30 phút trước",
    isPinned: false,
    isSolved: false,
    isHot: true,
  }
}

// Mock replies data
const getRepliesData = () => {
  return [
    {
      id: 1,
      content: `Mình nghĩ vấn đề chính là bạn chưa sử dụng đúng cách React.memo và useMemo. 

Một số gợi ý:
1. Sử dụng React DevTools Profiler để xác định component nào re-render nhiều
2. Implement useMemo cho các calculations phức tạp
3. Sử dụng useCallback cho event handlers
4. Consider using React.lazy cho code splitting

Bạn có thể share code để mình xem cụ thể không?`,
      author: {
        name: "Trần Thị B",
        avatar: "/user2.jpg",
        role: "Giảng viên",
        level: "Expert",
      },
      likes: 15,
      dislikes: 0,
      createdAt: "1 giờ trước",
      isAccepted: true,
      isModerator: true,
    },
    {
      id: 2,
      content: `Thêm vào đó, bạn nên check:

- Có đang pass objects/arrays như props không? Nếu có thì cần memoize
- State structure có hợp lý không? Đôi khi việc chia nhỏ state giúp giảm re-render
- Sử dụng React.StrictMode để detect side effects

Tool mình recommend: React DevTools Profiler và why-did-you-render package.`,
      author: {
        name: "Lê Văn C",
        avatar: "/user3.jpg",
        role: "Cựu học viên",
        level: "Advanced",
      },
      likes: 8,
      dislikes: 0,
      createdAt: "45 phút trước",
      isAccepted: false,
      isModerator: false,
    },
    {
      id: 3,
      content: `Mình cũng từng gặp vấn đề tương tự. Sau khi research thì thấy Context API cũng có thể gây ra performance issues nếu không sử dụng đúng cách.

Nếu bạn đang dùng Context, hãy thử split thành nhiều contexts nhỏ thay vì một context lớn chứa toàn bộ state.`,
      author: {
        name: "Phạm Thị D",
        avatar: "/user4.jpg",
        role: "Học viên",
        level: "Beginner",
      },
      likes: 3,
      dislikes: 0,
      createdAt: "30 phút trước",
      isAccepted: false,
      isModerator: false,
    },
  ]
}

export default function DiscussionPage({ params }: { params: { id: string } }) {
  const [newReply, setNewReply] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const discussion = getDiscussionData(params.id)
  const replies = getRepliesData()

  const handleSubmitReply = async () => {
    if (!newReply.trim()) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setNewReply("")
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
              <Link href="/forum" className="text-muted-foreground hover:text-foreground transition-colors">
                Diễn đàn
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/forum" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Diễn đàn
          </Link>
          <span className="text-muted-foreground">→</span>
          <span className="font-medium">Thảo luận</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Original Post */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    {discussion.isPinned && <Pin className="h-4 w-4 text-primary" />}
                    {discussion.isSolved && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {discussion.isHot && <Badge className="bg-red-500 text-xs">Hot</Badge>}
                    <h1 className="text-2xl font-bold">{discussion.title}</h1>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  {discussion.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex gap-4 mb-4">
                  <Avatar className="flex-shrink-0">
                    <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{discussion.author.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {discussion.author.role}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {discussion.author.level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{discussion.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{discussion.views} lượt xem</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="prose prose-sm max-w-none mb-6">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{discussion.content}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                      <ThumbsUp className="h-4 w-4" />
                      {discussion.likes}
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                      <ThumbsDown className="h-4 w-4" />
                      {discussion.dislikes}
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                      <Share2 className="h-4 w-4" />
                      Chia sẻ
                    </Button>
                  </div>

                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Flag className="h-4 w-4 mr-1" />
                    Báo cáo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Replies */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  {replies.length} Phản hồi
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  {replies.map((reply, index) => (
                    <div key={reply.id}>
                      <div className="flex gap-4">
                        <Avatar className="flex-shrink-0">
                          <AvatarImage src={reply.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{reply.author.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {reply.author.role}
                            </Badge>
                            {reply.isModerator && <Badge className="bg-green-600 text-xs">Moderator</Badge>}
                            {reply.isAccepted && (
                              <Badge className="bg-green-600 text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Câu trả lời được chấp nhận
                              </Badge>
                            )}
                          </div>

                          <div className="text-sm text-muted-foreground mb-3">{reply.createdAt}</div>

                          <div className="prose prose-sm max-w-none mb-4">
                            <div className="whitespace-pre-wrap text-sm leading-relaxed">{reply.content}</div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                              <ThumbsUp className="h-3 w-3" />
                              {reply.likes}
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                              <ThumbsDown className="h-3 w-3" />
                              {reply.dislikes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              Trả lời
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <Flag className="h-3 w-3 mr-1" />
                              Báo cáo
                            </Button>
                          </div>
                        </div>
                      </div>

                      {index < replies.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reply Form */}
            <Card>
              <CardHeader>
                <CardTitle>Thêm phản hồi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Viết phản hồi của bạn..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    rows={6}
                  />

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Hãy giữ thái độ tôn trọng và xây dựng trong thảo luận
                    </p>
                    <Button onClick={handleSubmitReply} disabled={isSubmitting || !newReply.trim()}>
                      {isSubmitting ? "Đang gửi..." : "Gửi phản hồi"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Tác giả</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{discussion.author.name}</div>
                    <div className="text-sm text-muted-foreground">{discussion.author.role}</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cấp độ:</span>
                    <Badge variant="outline">{discussion.author.level}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bài viết:</span>
                    <span>{discussion.author.posts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uy tín:</span>
                    <span>{discussion.author.reputation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tham gia:</span>
                    <span>{discussion.author.joinDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Discussions */}
            <Card>
              <CardHeader>
                <CardTitle>Thảo luận liên quan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "React Hooks best practices",
                    "State management với Redux",
                    "Performance optimization tips",
                    "React Testing Library guide",
                  ].map((title, index) => (
                    <Link
                      key={index}
                      href={`/forum/${index + 10}`}
                      className="block text-sm hover:text-primary transition-colors"
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
