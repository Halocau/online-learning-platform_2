"use client"

import type * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Users,
  ShoppingCart,
  MessageSquare,
  CreditCard,
  Bell,
  HelpCircle,
  Shield,
  BarChart3,
  UserCheck,
  Ban,
  DollarSign,
  TrendingUp,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// This is sample data for different user roles
const guestData = {
  user: {
    name: "Khách",
    email: "guest@example.com",
    avatar: "/avatars/guest.jpg",
  },
  teams: [
    {
      name: "EduPlatform",
      logo: GalleryVerticalEnd,
      plan: "Khách",
    },
  ],
  navMain: [
    {
      title: "Trang chủ",
      url: "/",
      icon: SquareTerminal,
    },
    {
      title: "Khóa học",
      url: "/courses",
      icon: BookOpen,
      items: [
        {
          title: "Tất cả khóa học",
          url: "/courses",
        },
        {
          title: "Tìm kiếm",
          url: "/courses/search",
        },
      ],
    },
    {
      title: "Giỏ hàng",
      url: "/cart",
      icon: ShoppingCart,
    },
    {
      title: "Diễn đàn",
      url: "/forum",
      icon: MessageSquare,
    },
    {
      title: "Hỗ trợ AI",
      url: "/chatbot",
      icon: Bot,
    },
  ],
  projects: [],
}

const customerData = {
  user: {
    name: "Học viên",
    email: "student@example.com",
    avatar: "/avatars/student.jpg",
  },
  teams: [
    {
      name: "EduPlatform",
      logo: GalleryVerticalEnd,
      plan: "Học viên",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Khóa học của tôi",
      url: "/my-courses",
      icon: BookOpen,
      items: [
        {
          title: "Đang học",
          url: "/my-courses/active",
        },
        {
          title: "Đã hoàn thành",
          url: "/my-courses/completed",
        },
        {
          title: "Yêu thích",
          url: "/my-courses/favorites",
        },
      ],
    },
    {
      title: "Khám phá",
      url: "/courses",
      icon: Map,
      items: [
        {
          title: "Tất cả khóa học",
          url: "/courses",
        },
        {
          title: "Tìm kiếm",
          url: "/courses/search",
        },
      ],
    },
    {
      title: "Giỏ hàng",
      url: "/cart",
      icon: ShoppingCart,
    },
    {
      title: "Thanh toán",
      url: "/payment",
      icon: CreditCard,
    },
    {
      title: "Diễn đàn",
      url: "/forum",
      icon: MessageSquare,
    },
    {
      title: "Hỗ trợ",
      url: "/support",
      icon: HelpCircle,
    },
    {
      title: "Hỗ trợ AI",
      url: "/chatbot",
      icon: Bot,
    },
    {
      title: "Thông báo",
      url: "/notifications",
      icon: Bell,
    },
    {
      title: "Ví tiền",
      url: "/wallet",
      icon: DollarSign,
    },
  ],
  projects: [
    {
      name: "Khóa học React",
      url: "/courses/react-course",
      icon: Frame,
    },
    {
      name: "Khóa học Node.js",
      url: "/courses/nodejs-course",
      icon: PieChart,
    },
  ],
}

const instructorData = {
  user: {
    name: "Giảng viên",
    email: "instructor@example.com",
    avatar: "/avatars/instructor.jpg",
  },
  teams: [
    {
      name: "EduPlatform",
      logo: GalleryVerticalEnd,
      plan: "Giảng viên",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/instructor/dashboard",
      icon: BarChart3,
    },
    {
      title: "Khóa học",
      url: "/instructor/courses",
      icon: BookOpen,
      items: [
        {
          title: "Tạo khóa học",
          url: "/instructor/create-course",
        },
        {
          title: "Quản lý khóa học",
          url: "/instructor/courses",
        },
        {
          title: "Bài giảng",
          url: "/instructor/lectures",
        },
        {
          title: "Quiz",
          url: "/instructor/quizzes",
        },
      ],
    },
    {
      title: "Học viên",
      url: "/instructor/students",
      icon: Users,
    },
    {
      title: "Doanh thu",
      url: "/instructor/revenue",
      icon: TrendingUp,
    },
    {
      title: "Thanh toán",
      url: "/instructor/payments",
      icon: CreditCard,
    },
    {
      title: "Thông báo",
      url: "/notifications",
      icon: Bell,
    },
    {
      title: "Ví tiền",
      url: "/wallet",
      icon: DollarSign,
    },
  ],
  projects: [
    {
      name: "Khóa học React của tôi",
      url: "/instructor/courses/react-course",
      icon: Frame,
    },
    {
      name: "Khóa học Node.js của tôi",
      url: "/instructor/courses/nodejs-course",
      icon: PieChart,
    },
  ],
}

const moderatorData = {
  user: {
    name: "Moderator",
    email: "moderator@example.com",
    avatar: "/avatars/moderator.jpg",
  },
  teams: [
    {
      name: "EduPlatform",
      logo: GalleryVerticalEnd,
      plan: "Moderator",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/moderator/dashboard",
      icon: BarChart3,
    },
    {
      title: "Giảng viên",
      url: "/moderator/instructors",
      icon: UserCheck,
      items: [
        {
          title: "Đơn đăng ký",
          url: "/moderator/instructor-applications",
        },
        {
          title: "Danh sách giảng viên",
          url: "/moderator/instructors",
        },
      ],
    },
    {
      title: "Hỗ trợ",
      url: "/moderator/support",
      icon: HelpCircle,
      items: [
        {
          title: "Ticket hỗ trợ",
          url: "/moderator/tickets",
        },
      ],
    },
    {
      title: "Diễn đàn",
      url: "/moderator/forum",
      icon: MessageSquare,
      items: [
        {
          title: "Quản lý bài viết",
          url: "/moderator/forum/posts",
        },
        {
          title: "Báo cáo",
          url: "/moderator/forum/reports",
        },
      ],
    },
    {
      title: "Quản lý người dùng",
      url: "/moderator/users",
      icon: Ban,
    },
    {
      title: "Ví tiền",
      url: "/moderator/wallet",
      icon: DollarSign,
    },
  ],
  projects: [],
}

const adminData = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "EduPlatform",
      logo: GalleryVerticalEnd,
      plan: "Admin",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: BarChart3,
    },
    {
      title: "Thống kê",
      url: "/admin/analytics",
      icon: PieChart,
      items: [
        {
          title: "Người dùng",
          url: "/admin/analytics/users",
        },
        {
          title: "Doanh thu",
          url: "/admin/analytics/revenue",
        },
        {
          title: "Khóa học",
          url: "/admin/analytics/courses",
        },
      ],
    },
    {
      title: "Moderator",
      url: "/admin/moderators",
      icon: Shield,
      items: [
        {
          title: "Thêm moderator",
          url: "/admin/moderators/add",
        },
        {
          title: "Quản lý moderator",
          url: "/admin/moderators",
        },
      ],
    },
    {
      title: "Hệ thống",
      url: "/admin/system",
      icon: Settings2,
    },
  ],
  projects: [],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole?: "guest" | "customer" | "instructor" | "moderator" | "admin"
}

export function AppSidebar({ userRole = "guest", ...props }: AppSidebarProps) {
  let data

  switch (userRole) {
    case "customer":
      data = customerData
      break
    case "instructor":
      data = instructorData
      break
    case "moderator":
      data = moderatorData
      break
    case "admin":
      data = adminData
      break
    default:
      data = guestData
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {data.projects.length > 0 && <NavProjects projects={data.projects} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
