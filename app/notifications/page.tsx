"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Bell, BookOpen, Award, CreditCard, Users, MessageSquare, CheckCircle2, X, Settings } from "lucide-react"
import { useState } from "react"

const notifications = [
  {
    id: 1,
    type: "course",
    title: "Bài học mới đã được thêm",
    message: "Khóa học 'React Fundamentals' vừa có bài học mới: 'React Context API'",
    time: "2 phút trước",
    read: false,
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    id: 2,
    type: "achievement",
    title: "Chúc mừng! Bạn đã hoàn thành khóa học",
    message: "Bạn đã hoàn thành khóa học 'HTML & CSS Cơ Bản' với điểm số 92%. Chứng chỉ đã sẵn sàng để tải về.",
    time: "1 giờ trước",
    read: false,
    icon: Award,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  },
  {
    id: 3,
    type: "payment",
    title: "Thanh toán thành công",
    message: "Thanh toán 1.500.000 VNĐ cho khóa học 'Node.js Backend Development' đã được xử lý thành công.",
    time: "3 giờ trước",
    read: true,
    icon: CreditCard,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    id: 4,
    type: "social",
    title: "Bình luận mới trong diễn đàn",
    message: "Có 3 phản hồi mới cho câu hỏi của bạn về 'React useEffect cleanup function'",
    time: "5 giờ trước",
    read: true,
    icon: MessageSquare,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    id: 5,
    type: "course",
    title: "Nhắc nhở: Tiếp tục học tập",
    message: "Bạn chưa học trong 2 ngày. Hãy tiếp tục với bài 'JavaScript Promises' để duy trì tiến độ.",
    time: "1 ngày trước",
    read: true,
    icon: Bell,
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    id: 6,
    type: "course",
    title: "Khóa học sắp hết hạn",
    message: "Khóa học 'Python Data Science' sẽ hết hạn truy cập trong 7 ngày. Hãy hoàn thành trước khi hết hạn.",
    time: "2 ngày trước",
    read: true,
    icon: BookOpen,
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    id: 7,
    type: "social",
    title: "Bạn có một người theo dõi mới",
    message: "Nguyễn Văn A đã bắt đầu theo dõi tiến độ học tập của bạn",
    time: "3 ngày trước",
    read: true,
    icon: Users,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  },
  {
    id: 8,
    type: "achievement",
    title: "Streak 7 ngày!",
    message: "Tuyệt vời! Bạn đã học liên tục 7 ngày. Tiếp tục để đạt mục tiêu 30 ngày!",
    time: "1 tuần trước",
    read: true,
    icon: Award,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  }
]

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications)
  const unreadCount = notificationList.filter(notif => !notif.read).length

  const markAsRead = (id: number) => {
    setNotificationList(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotificationList(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const deleteNotification = (id: number) => {
    setNotificationList(prev => prev.filter(notif => notif.id !== id))
  }

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
                <BreadcrumbItem>
                  <BreadcrumbPage>Thông báo</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Bell className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{notificationList.length}</p>
                    <p className="text-sm text-gray-600">Tổng thông báo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Bell className="w-8 h-8 text-red-600" />
                    {unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadCount}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{unreadCount}</p>
                    <p className="text-sm text-gray-600">Chưa đọc</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center justify-center">
                <Button onClick={markAllAsRead} disabled={unreadCount === 0}>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Đánh dấu tất cả đã đọc
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Thông báo</h1>
                  <p className="text-gray-600 mt-2">Cập nhật mới nhất về hoạt động học tập của bạn</p>
                </div>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Cài đặt thông báo
                </Button>
              </div>

              <div className="space-y-4">
                {notificationList.map((notification) => {
                  const IconComponent = notification.icon
                  return (
                    <Card
                      key={notification.id}
                      className={`transition-all hover:shadow-md ${!notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
                        }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-full ${notification.bgColor}`}>
                            <IconComponent className={`w-5 h-5 ${notification.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                  {notification.title}
                                  {!notification.read && (
                                    <Badge variant="secondary" className="ml-2 text-xs">
                                      Mới
                                    </Badge>
                                  )}
                                </h3>
                                <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                  {notification.time}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                {!notification.read && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => markAsRead(notification.id)}
                                    className="text-blue-600 hover:text-blue-700"
                                  >
                                    Đánh dấu đã đọc
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {notificationList.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Không có thông báo nào
                  </h3>
                  <p className="text-gray-600">
                    Các thông báo mới sẽ xuất hiện ở đây
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
