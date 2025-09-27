"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ArrowLeft, X, Plus } from "lucide-react"
import Link from "next/link"

export default function NewDiscussionPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { value: "general", label: "Thảo luận chung" },
    { value: "programming", label: "Lập trình" },
    { value: "design", label: "Thiết kế" },
    { value: "career", label: "Nghề nghiệp" },
    { value: "qa", label: "Hỏi đáp" },
  ]

  const suggestedTags = [
    "React",
    "JavaScript",
    "CSS",
    "HTML",
    "Node.js",
    "Python",
    "UI/UX",
    "Design",
    "Career",
    "Interview",
    "Performance",
    "Optimization",
  ]

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || !category) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)

    // Redirect to the new discussion (mock)
    window.location.href = "/forum/1"
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
          <span className="font-medium">Tạo thảo luận mới</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Tạo thảo luận mới</CardTitle>
              <p className="text-muted-foreground">Chia sẻ câu hỏi, kiến thức hoặc kinh nghiệm của bạn với cộng đồng</p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <Label htmlFor="title">Tiêu đề *</Label>
                  <Input
                    id="title"
                    placeholder="Nhập tiêu đề thảo luận..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Tiêu đề rõ ràng, cụ thể sẽ thu hút nhiều phản hồi hơn
                  </p>
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category">Danh mục *</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Content */}
                <div>
                  <Label htmlFor="content">Nội dung *</Label>
                  <Textarea
                    id="content"
                    placeholder="Viết nội dung thảo luận của bạn...

Một số gợi ý:
- Mô tả rõ vấn đề bạn gặp phải
- Chia sẻ những gì bạn đã thử
- Đặt câu hỏi cụ thể
- Cung cấp context và ví dụ nếu có thể"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={12}
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Nội dung chi tiết sẽ giúp mọi người hiểu và hỗ trợ bạn tốt hơn
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <Label>Tags (tối đa 5)</Label>
                  <div className="mt-1 space-y-3">
                    {/* Current Tags */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="gap-1">
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Add New Tag */}
                    {tags.length < 5 && (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Thêm tag..."
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addTag(newTag)
                            }
                          }}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addTag(newTag)}
                          disabled={!newTag.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {/* Suggested Tags */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Tags gợi ý:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedTags
                          .filter((tag) => !tags.includes(tag))
                          .slice(0, 8)
                          .map((tag) => (
                            <Button
                              key={tag}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addTag(tag)}
                              disabled={tags.length >= 5}
                              className="text-xs"
                            >
                              {tag}
                            </Button>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guidelines */}
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Quy tắc cộng đồng</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Giữ thái độ tôn trọng và xây dựng</li>
                      <li>• Không spam hoặc quảng cáo</li>
                      <li>• Tìm kiếm trước khi đăng để tránh trùng lặp</li>
                      <li>• Sử dụng tiêu đề và tags phù hợp</li>
                      <li>• Cung cấp thông tin chi tiết và chính xác</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Submit */}
                <div className="flex justify-between items-center">
                  <Button variant="outline" asChild>
                    <Link href="/forum">Hủy</Link>
                  </Button>

                  <Button type="submit" disabled={isSubmitting || !title.trim() || !content.trim() || !category}>
                    {isSubmitting ? "Đang đăng..." : "Đăng thảo luận"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
