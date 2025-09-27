"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Flag, Eye, CheckCircle, XCircle, Clock, Search, BookOpen, AlertTriangle, Users, FileText } from "lucide-react"
import Link from "next/link"

export default function ModeratorDashboard() {
  const [activeTab, setActiveTab] = useState("pending")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock moderation data
  const pendingReports = [
    {
      id: 1,
      type: "forum",
      title: "Spam trong diễn đàn",
      content: "Người dùng đăng liên kết spam nhiều lần trong cùng một thảo luận",
      reportedBy: "User123",
      reportedUser: "Spammer456",
      reportedContent: "Check out this amazing deal! Click here: [spam-link]",
      createdAt: "2 giờ trước",
      priority: "high",
      category: "spam",
    },
    {
      id: 2,
      type: "course",
      title: "Nội dung không phù hợp",
      content: "Khóa học chứa nội dung không phù hợp với độ tuổi",
      reportedBy: "Parent789",
      reportedUser: "Instructor101",
      reportedContent: "Bài gi강 về chủ đề nhạy cảm không có cảnh báo",
      createdAt: "4 giờ trước",
      priority: "medium",
      category: "inappropriate",
    },
    {
      id: 3,
      type: "comment",
      title: "Bình luận xúc phạm",
      content: "Bình luận có tính chất xúc phạm người khác",
      reportedBy: "Student456",
      reportedUser: "Toxic789",
      reportedContent: "Bạn thật ngu ngốc, không hiểu gì cả!",
      createdAt: "1 ngày trước",
      priority: "low",
      category: "harassment",
    },
  ]

  const resolvedReports = [
    {
      id: 4,
      type: "forum",
      title: "Quảng cáo không phù hợp",
      action: "Đã xóa bài viết và cảnh cáo người dùng",
      resolvedBy: "Moderator A",
      resolvedAt: "1 ngày trước",
      status: "resolved",
    },
    {
      id: 5,
      type: "course",
      title: "Nội dung vi phạm bản quyền",
      action: "Đã gỡ khóa học và liên hệ tác giả",
      resolvedBy: "Moderator B",
      resolvedAt: "2 ngày trước",
      status: "resolved",
    },
  ]

  const stats = [
    {
      title: "Báo cáo chờ xử lý",
      value: pendingReports.length,
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Đã xử lý hôm nay",
      value: 12,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Báo cáo ưu tiên cao",
      value: pendingReports.filter((r) => r.priority === "high").length,
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      title: "Người dùng bị cảnh cáo",
      value: 5,
      icon: Users,
      color: "text-orange-600",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Cao"
      case "medium":
        return "Trung bình"
      case "low":
        return "Thấp"
      default:
        return priority
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case "spam":
        return "Spam"
      case "inappropriate":
        return "Không phù hợp"
      case "harassment":
        return "Quấy rối"
      case "copyright":
        return "Vi phạm bản quyền"
      default:
        return category
    }
  }

  const handleApproveReport = (reportId: number) => {
    console.log("Approve report:", reportId)
    // Handle approve logic
  }

  const handleRejectReport = (reportId: number) => {
    console.log("Reject report:", reportId)
    // Handle reject logic
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
                SkillUp Moderator
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/">Xem trang chính</Link>
              </Button>
              <Avatar>
                <AvatarImage src="/moderator-avatar.jpg" />
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bảng điều khiển Moderator</h1>
          <p className="text-muted-foreground">Quản lý và xử lý các báo cáo vi phạm</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg w-fit">
          {[
            { id: "pending", label: "Chờ xử lý", count: pendingReports.length },
            { id: "resolved", label: "Đã xử lý", count: resolvedReports.length },
            { id: "users", label: "Quản lý người dùng" },
            { id: "content", label: "Kiểm duyệt nội dung" },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className="rounded-md"
            >
              {tab.label}
              {tab.count && (
                <Badge variant="secondary" className="ml-2">
                  {tab.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm báo cáo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Pending Reports Tab */}
        {activeTab === "pending" && (
          <div className="space-y-6">
            {pendingReports.map((report) => (
              <Card key={report.id} className="border-l-4 border-l-yellow-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Flag className="h-5 w-5 text-red-500" />
                        {report.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getPriorityColor(report.priority)}>{getPriorityText(report.priority)}</Badge>
                        <Badge variant="outline">{getCategoryText(report.category)}</Badge>
                        <Badge variant="secondary">{report.type}</Badge>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{report.createdAt}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Mô tả báo cáo:</h4>
                    <p className="text-sm text-muted-foreground">{report.content}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Nội dung bị báo cáo:</h4>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">{report.reportedContent}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>
                        Báo cáo bởi: <strong>{report.reportedBy}</strong>
                      </span>
                      <span>
                        Đối tượng: <strong>{report.reportedUser}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Xem chi tiết
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApproveReport(report.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Chấp nhận
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                        onClick={() => handleRejectReport(report.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Từ chối
                      </Button>
                    </div>
                  </div>

                  {/* Action Form */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Hành động xử lý:</h4>
                    <Textarea placeholder="Nhập lý do và hành động xử lý..." className="mb-2" rows={3} />
                    <div className="flex justify-end">
                      <Button size="sm">Gửi quyết định</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Resolved Reports Tab */}
        {activeTab === "resolved" && (
          <div className="space-y-6">
            {resolvedReports.map((report) => (
              <Card key={report.id} className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold mb-2">{report.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{report.action}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>
                          Xử lý bởi: <strong>{report.resolvedBy}</strong>
                        </span>
                        <span>•</span>
                        <span>{report.resolvedAt}</span>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Đã giải quyết</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Users Management Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý người dùng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-16 w-16 mx-auto mb-4" />
                  <p>Tính năng quản lý người dùng sẽ được phát triển</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Content Moderation Tab */}
        {activeTab === "content" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kiểm duyệt nội dung</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-16 w-16 mx-auto mb-4" />
                  <p>Tính năng kiểm duyệt nội dung sẽ được phát triển</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
