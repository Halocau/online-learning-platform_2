'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { EditProfileModal } from '@/components/edit-profile-modal'
import {
  BookOpen,
  Clock,
  TrendingUp,
  Camera,
  Bell,
  Play,
  CheckCircle,
  Edit
} from 'lucide-react'

// Mock data - this would come from API/database in real app
const initialUserData = {
  name: "Nguyễn Văn A",
  email: "nguyenvana@email.com",
  role: "Học viên",
  avatar: "/placeholder-user.jpg",
  phone: "0123456789",
  bio: "Passionate learner focused on modern web development and technology.",
  location: "TP. Hồ Chí Minh, Việt Nam",
  website: "https://example.com",
  stats: {
    totalCourses: 15,
    completedCourses: 8,
    totalHours: 120,
    currentStreak: 7
  }
}

const coursesData = [
  {
    id: 1,
    title: "React Advanced Patterns",
    instructor: "Bởi Nguyễn Minh Tuấn",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    status: "In Progress",
    thumbnail: "/react-course.png",
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Node.js Microservices",
    instructor: "Bởi Trần Văn Hùng",
    progress: 100,
    totalLessons: 20,
    completedLessons: 20,
    status: "Completed",
    thumbnail: "/nodejs-course.jpg",
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Python Machine Learning",
    instructor: "Bởi Lê Thị Mai",
    progress: 30,
    totalLessons: 32,
    completedLessons: 10,
    status: "In Progress",
    thumbnail: "/placeholder.jpg",
    color: "bg-yellow-500"
  }
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("courses")
  const [userData, setUserData] = useState(initialUserData)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Mock user data for header - in real app this would come from authentication context
  const currentUser = {
    name: userData.name,
    email: userData.email,
    avatar: userData.avatar
  }

  const handleSaveProfile = (updatedData: any) => {
    setUserData(updatedData)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header user={currentUser} />

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                      <AvatarFallback className="text-2xl bg-gray-100">
                        {userData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
                  <p className="text-gray-600 mb-2">{userData.email}</p>
                  <Badge variant="secondary" className="mb-4">
                    {userData.role}
                  </Badge>

                  {/* Edit Profile Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mb-4"
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Chỉnh sửa profile
                  </Button>
                </div>

                <Separator className="my-6" />

                {/* Learning Statistics */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Thống kê học tập
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Khóa học</span>
                      </div>
                      <span className="font-semibold">{userData.stats.completedCourses}/{userData.stats.totalCourses}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Giờ học</span>
                      </div>
                      <span className="font-semibold">{userData.stats.totalHours}h</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Streak</span>
                      </div>
                      <span className="font-semibold">{userData.stats.currentStreak} ngày</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Tab Navigation */}
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="courses" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Khóa học
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Thông báo
                </TabsTrigger>
              </TabsList>

              {/* Courses Tab */}
              <TabsContent value="courses" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Khóa học của tôi</h2>
                    <p className="text-gray-600">Theo dõi tiên độ học tập</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {coursesData.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        {/* Course Header */}
                        <div className="p-4 pb-2">
                          <div className="flex items-start gap-3">
                            <div className={`w-12 h-12 rounded-lg ${course.color} flex items-center justify-center flex-shrink-0`}>
                              <BookOpen className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 truncate">
                                {course.title}
                              </h3>
                              <p className="text-sm text-gray-600">{course.instructor}</p>
                            </div>
                          </div>
                        </div>

                        {/* Progress Section */}
                        <div className="px-4 pb-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Tiến độ</span>
                            <span className="text-sm font-semibold text-gray-900">
                              {course.progress}%
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2 mb-2" />
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>{course.completedLessons}/{course.totalLessons} bài học</span>
                            <Badge
                              variant={course.status === "Completed" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {course.status === "Completed" ? (
                                <>
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Completed
                                </>
                              ) : (
                                "In Progress"
                              )}
                            </Badge>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="p-4 pt-2">
                          <Button
                            className="w-full"
                            variant={course.status === "Completed" ? "outline" : "default"}
                          >
                            {course.status === "Completed" ? (
                              <>
                                <BookOpen className="h-4 w-4 mr-2" />
                                Xem lại
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Tiếp tục học
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông báo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Quản lý thông báo và alerts.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
        onSave={handleSaveProfile}
      />
    </div>
  )
}