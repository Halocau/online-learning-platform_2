import { type NextRequest, NextResponse } from "next/server"

// Mock database - trong thực tế bạn sẽ sử dụng database thật
const courses: any[] = []

// Load courses from localStorage on server start (in real app, this would be from database)
if (typeof window !== "undefined") {
  const savedCourses = localStorage.getItem("courses")
  if (savedCourses) {
    courses.push(...JSON.parse(savedCourses))
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { step, courseId, data } = body

    console.log("[v0] Saving course step:", { step, courseId, data })

    // Tìm khóa học hiện tại hoặc tạo mới
    let courseIndex = courses.findIndex((c) => c.id === courseId)

    if (courseIndex === -1) {
      // Tạo khóa học mới
      const newCourse = {
        id: courseId || `course-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "draft",
        currentStep: step,
        ...data,
      }
      courses.push(newCourse)
      courseIndex = courses.length - 1
    } else {
      // Cập nhật khóa học hiện tại
      courses[courseIndex] = {
        ...courses[courseIndex],
        ...data,
        updatedAt: new Date().toISOString(),
        currentStep: step,
      }
    }

    const savedCourse = courses[courseIndex]

    if (typeof window !== "undefined") {
      localStorage.setItem("courses", JSON.stringify(courses))
    }

    return NextResponse.json({
      success: true,
      message: `Đã lưu bước ${step} thành công`,
      course: savedCourse,
    })
  } catch (error) {
    console.error("[v0] Error saving course:", error)
    return NextResponse.json({ success: false, message: "Có lỗi xảy ra khi lưu khóa học" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const courseId = searchParams.get("courseId")

  if (courseId) {
    const course = courses.find((c) => c.id === courseId)
    if (course) {
      return NextResponse.json({ success: true, course })
    } else {
      return NextResponse.json({ success: false, message: "Không tìm thấy khóa học" }, { status: 404 })
    }
  }

  return NextResponse.json({ success: true, courses })
}
