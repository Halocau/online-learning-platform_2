"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Upload, Check, Plus, ArrowLeft, Settings, FileText, Play, Trash2, GripVertical, Video, File, X, HelpCircle, Code, Target, Users, Bold, Italic } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Answer {
  id: string
  text: string
  explanation: string
  isCorrect: boolean
}

interface Question {
  id: string
  text: string
  type: "multiple-choice" | "true-false" | "fill-blank"
  answers: Answer[]
  relatedLectureId?: string
}

interface Quiz {
  id: string
  title: string
  description: string
  questions: Question[]
}

interface Lecture {
  id: string
  title: string
  type: "video" | "video-slide" | "article" | "text" | "quiz" | "coding-exercise" | "practice-test" | "assignment" | "role-play"
  duration?: number
  completed?: boolean
  contentType?: "video" | "video-slide" | "article"
  quiz?: Quiz
}

interface Section {
  id: string
  title: string
  lectures: Lecture[]
}

interface Coupon {
  id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  minOrderValue?: number
  maxDiscount?: number
  usageLimit?: number
  usedCount: number
  validFrom: string
  validTo: string
  isActive: boolean
  description?: string
}

interface Course {
  title: string
  description: string
  category: string
  level: string
  price: number
  thumbnail: string
  sections: Section[]
  coupons?: Coupon[]
}

// Coupon Form Component
function CouponForm({
  coupon,
  onSave,
  onCancel
}: {
  coupon: Coupon | null
  onSave: (coupon: Omit<Coupon, 'id' | 'usedCount'>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    code: coupon?.code || "",
    type: coupon?.type || "percentage" as "percentage" | "fixed",
    value: coupon?.value || 0,
    minOrderValue: coupon?.minOrderValue || 0,
    maxDiscount: coupon?.maxDiscount || 0,
    usageLimit: coupon?.usageLimit || 0,
    validFrom: coupon?.validFrom || new Date().toISOString().split('T')[0],
    validTo: coupon?.validTo || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isActive: coupon?.isActive !== undefined ? coupon.isActive : true,
    description: coupon?.description || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.code.trim()) {
      alert("Vui lòng nhập mã giảm giá")
      return
    }
    if (formData.value <= 0) {
      alert("Giá trị giảm giá phải lớn hơn 0")
      return
    }
    if (new Date(formData.validFrom) >= new Date(formData.validTo)) {
      alert("Ngày bắt đầu phải trước ngày kết thúc")
      return
    }
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="coupon-code">Mã giảm giá *</Label>
        <Input
          id="coupon-code"
          value={formData.code}
          onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
          placeholder="VD: WELCOME10"
          className="font-mono"
        />
      </div>

      <div>
        <Label>Loại giảm giá *</Label>
        <RadioGroup
          value={formData.type}
          onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as "percentage" | "fixed" }))}
          className="flex gap-6 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="percentage" id="percentage" />
            <Label htmlFor="percentage">Phần trăm (%)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fixed" id="fixed" />
            <Label htmlFor="fixed">Số tiền cố định ($)</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="coupon-value">
          Giá trị giảm {formData.type === "percentage" ? "(%)" : "($)"} *
        </Label>
        <Input
          id="coupon-value"
          type="number"
          min="0"
          max={formData.type === "percentage" ? "100" : undefined}
          value={formData.value}
          onChange={(e) => setFormData(prev => ({ ...prev, value: Number(e.target.value) }))}
        />
      </div>

      {formData.type === "percentage" && (
        <div>
          <Label htmlFor="max-discount">Giảm tối đa ($)</Label>
          <Input
            id="max-discount"
            type="number"
            min="0"
            value={formData.maxDiscount}
            onChange={(e) => setFormData(prev => ({ ...prev, maxDiscount: Number(e.target.value) }))}
            placeholder="Để trống nếu không giới hạn"
          />
        </div>
      )}

      <div>
        <Label htmlFor="min-order">Giá trị đơn hàng tối thiểu ($)</Label>
        <Input
          id="min-order"
          type="number"
          min="0"
          value={formData.minOrderValue}
          onChange={(e) => setFormData(prev => ({ ...prev, minOrderValue: Number(e.target.value) }))}
          placeholder="0 = không giới hạn"
        />
      </div>

      <div>
        <Label htmlFor="usage-limit">Số lần sử dụng tối đa</Label>
        <Input
          id="usage-limit"
          type="number"
          min="0"
          value={formData.usageLimit}
          onChange={(e) => setFormData(prev => ({ ...prev, usageLimit: Number(e.target.value) }))}
          placeholder="0 = không giới hạn"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="valid-from">Có hiệu lực từ *</Label>
          <Input
            id="valid-from"
            type="date"
            value={formData.validFrom}
            onChange={(e) => setFormData(prev => ({ ...prev, validFrom: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="valid-to">Có hiệu lực đến *</Label>
          <Input
            id="valid-to"
            type="date"
            value={formData.validTo}
            onChange={(e) => setFormData(prev => ({ ...prev, validTo: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Mô tả</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Mô tả ngắn về mã giảm giá này..."
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is-active"
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: !!checked }))}
        />
        <Label htmlFor="is-active">Kích hoạt mã giảm giá</Label>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
          {coupon ? "Cập nhật" : "Tạo mã"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
      </div>
    </form>
  )
}

export default function CreateCoursePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [courseId, setCourseId] = useState<string>("")
  const [showContentTypeModal, setShowContentTypeModal] = useState(false)
  const [selectedLecture, setSelectedLecture] = useState<{ sectionId: string, lectureId: string } | null>(null)
  const [showCurriculumModal, setShowCurriculumModal] = useState(false)
  const [selectedSectionForCurriculum, setSelectedSectionForCurriculum] = useState<string>("")
  const [showQuizModal, setShowQuizModal] = useState(false)
  const [showQuestionTypeModal, setShowQuestionTypeModal] = useState(false)
  const [showQuestionBuilderModal, setShowQuestionBuilderModal] = useState(false)
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [activeTab, setActiveTab] = useState<"curriculum" | "coupons">("curriculum")
  const [showCouponModal, setShowCouponModal] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const { toast } = useToast()

  const [course, setCourse] = useState<Course>({
    title: "",
    description: "",
    category: "",
    level: "",
    price: 0,
    thumbnail: "",
    sections: [],
    coupons: [],
  })

  useEffect(() => {
    if (!courseId) {
      setCourseId(`course-${Date.now()}`)
    }

    const savedCourse = localStorage.getItem(`course-draft-${courseId}`)
    if (savedCourse) {
      const parsedCourse = JSON.parse(savedCourse)
      setCourse(parsedCourse)
    }
  }, [courseId])

  useEffect(() => {
    if (courseId && (course.title || course.description)) {
      localStorage.setItem(
        `course-draft-${courseId}`,
        JSON.stringify({
          ...course,
          lastSaved: new Date().toISOString(),
        }),
      )
    }
  }, [course, courseId])

  const handleSaveCourse = async () => {
    if (!course.title || !course.description || !course.category || !course.level) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin khóa học",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const courseData = {
        ...course,
        id: courseId,
        status: "draft",
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem(`course-${courseId}`, JSON.stringify(courseData))
      localStorage.removeItem(`course-draft-${courseId}`)

      toast({
        title: "Khóa học đã được lưu!",
        description: "Chuyển đến tạo chương trình học",
      })

      // Add a default section if none exists
      if (course.sections.length === 0) {
        const defaultSection: Section = {
          id: `section-${Date.now()}`,
          title: "Introduction",
          lectures: [{
            id: `lecture-${Date.now()}`,
            title: "Introduction",
            type: "video",
            duration: 0,
            completed: false
          }],
        }
        setCourse(prev => ({
          ...prev,
          sections: [defaultSection]
        }))
      }

      // Move to curriculum creation step
      setCurrentStep(2)
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi lưu khóa học",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateNew = () => {
    setCourse({
      title: "",
      description: "",
      category: "",
      level: "",
      price: 0,
      thumbnail: "",
      sections: [],
    })
    setCourseId(`course-${Date.now()}`)
    setCurrentStep(1)
  }

  const handleBackToBasicInfo = () => {
    setCurrentStep(1)
  }

  const addSection = () => {
    const newSection: Section = {
      id: `section-${Date.now()}`,
      title: "Untitled Section",
      lectures: [],
    }
    setCourse(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }))
  }

  const updateSectionTitle = (sectionId: string, title: string) => {
    setCourse(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, title } : section
      )
    }))
  }

  const deleteSection = (sectionId: string) => {
    setCourse(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }))
  }

  const addLecture = (sectionId: string, type: "video" | "text" | "quiz") => {
    const lectureNames = {
      video: "Video Lecture",
      text: "Text Lecture",
      quiz: "Quiz"
    }

    const newLecture: Lecture = {
      id: `lecture-${Date.now()}`,
      title: lectureNames[type],
      type,
      duration: 0,
      completed: false
    }

    setCourse(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, lectures: [...section.lectures, newLecture] }
          : section
      )
    }))
  }

  const updateLectureTitle = (sectionId: string, lectureId: string, title: string) => {
    setCourse(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
            ...section,
            lectures: section.lectures.map(lecture =>
              lecture.id === lectureId ? { ...lecture, title } : lecture
            )
          }
          : section
      )
    }))
  }

  const deleteLecture = (sectionId: string, lectureId: string) => {
    setCourse(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
            ...section,
            lectures: section.lectures.filter(lecture => lecture.id !== lectureId)
          }
          : section
      )
    }))
  }

  const handleSubmitForReview = () => {
    // Save current course data
    localStorage.setItem(`course-draft-${courseId}`, JSON.stringify(course))

    toast({
      title: "Gửi xem trước thành công!",
      description: "Khóa học của bạn đã được gửi để xem trước và xét duyệt",
    })
  }

  const handlePreview = () => {
    // Save current course data before preview
    localStorage.setItem(`course-draft-${courseId}`, JSON.stringify(course))

    // Navigate to preview page
    window.open(`/instructor/preview-course/${courseId}`, '_blank')
  }

  const handleContentClick = (sectionId: string, lectureId: string) => {
    setSelectedLecture({ sectionId, lectureId })
    setShowContentTypeModal(true)
  }

  const handleContentTypeSelect = (contentType: "video" | "video-slide" | "article") => {
    if (selectedLecture) {
      setCourse(prev => ({
        ...prev,
        sections: prev.sections.map(section =>
          section.id === selectedLecture.sectionId
            ? {
              ...section,
              lectures: section.lectures.map(lecture =>
                lecture.id === selectedLecture.lectureId
                  ? { ...lecture, contentType, type: contentType === "article" ? "text" : "video" }
                  : lecture
              )
            }
            : section
        )
      }))
    }
    setShowContentTypeModal(false)
    setSelectedLecture(null)

    const contentTypeNames = {
      "video": "Video",
      "video-slide": "Video & Slide Mashup",
      "article": "Article"
    }

    toast({
      title: "Loại nội dung đã được chọn!",
      description: `Đã chọn ${contentTypeNames[contentType]}. Bạn có thể upload file ${contentType === "video" ? "video (MP4, MOV, AVI)" : contentType === "video-slide" ? "video và slide (PDF, PPT)" : "text (PDF, DOC, TXT)"}`,
    })
  }

  const handleCurriculumItemClick = (sectionId: string) => {
    setSelectedSectionForCurriculum(sectionId)
    setShowCurriculumModal(true)
  }

  const addCurriculumItem = (sectionId: string, itemType: string) => {
    const itemNames = {
      "lecture": "New Lecture",
      "quiz": "New Quiz",
      "coding-exercise": "Coding Exercise",
      "practice-test": "Practice Test",
      "assignment": "Assignment",
      "role-play": "Role Play"
    }

    if (itemType === "quiz") {
      // Open quiz creation modal
      const newQuiz: Quiz = {
        id: `quiz-${Date.now()}`,
        title: "",
        description: "",
        questions: []
      }
      setCurrentQuiz(newQuiz)
      setShowQuizModal(true)
      setShowCurriculumModal(false)
      return
    }

    const newLecture: Lecture = {
      id: `${itemType}-${Date.now()}`,
      title: itemNames[itemType as keyof typeof itemNames] || "New Item",
      type: itemType as any,
      duration: 0,
      completed: false
    }

    setCourse(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, lectures: [...section.lectures, newLecture] }
          : section
      )
    }))

    setShowCurriculumModal(false)

    toast({
      title: "Đã thêm mục curriculum!",
      description: `Đã thêm ${itemNames[itemType as keyof typeof itemNames]}`,
    })
  }

  const handleQuizSave = () => {
    if (!currentQuiz || !currentQuiz.title.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập tiêu đề quiz",
        variant: "destructive",
      })
      return
    }

    const newLecture: Lecture = {
      id: `quiz-${Date.now()}`,
      title: currentQuiz.title,
      type: "quiz",
      duration: 0,
      completed: false,
      quiz: currentQuiz
    }

    setCourse(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === selectedSectionForCurriculum
          ? { ...section, lectures: [...section.lectures, newLecture] }
          : section
      )
    }))

    setShowQuizModal(false)
    setCurrentQuiz(null)

    toast({
      title: "Quiz đã được tạo!",
      description: "Quiz của bạn đã được thêm vào section",
    })
  }

  const handleAddQuestion = () => {
    setShowQuestionTypeModal(true)
  }

  const handleQuestionTypeSelect = (questionType: "multiple-choice") => {
    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      text: "",
      type: questionType,
      answers: [
        { id: `answer-${Date.now()}-1`, text: "", explanation: "", isCorrect: false },
        { id: `answer-${Date.now()}-2`, text: "", explanation: "", isCorrect: false },
        { id: `answer-${Date.now()}-3`, text: "", explanation: "", isCorrect: false }
      ]
    }

    setCurrentQuestion(newQuestion)
    setShowQuestionTypeModal(false)
    setShowQuestionBuilderModal(true)
  }

  const handleQuestionSave = () => {
    if (!currentQuestion || !currentQuestion.text.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập câu hỏi",
        variant: "destructive",
      })
      return
    }

    if (currentQuiz) {
      setCurrentQuiz(prev => prev ? {
        ...prev,
        questions: [...prev.questions, currentQuestion]
      } : null)
    }

    setShowQuestionBuilderModal(false)
    setCurrentQuestion(null)

    toast({
      title: "Câu hỏi đã được thêm!",
      description: "Câu hỏi đã được thêm vào quiz",
    })
  }

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Lỗi",
          description: "Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB",
          variant: "destructive",
        })
        return
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Lỗi",
          description: "Vui lòng chọn file hình ảnh (JPG, PNG, GIF)",
          variant: "destructive",
        })
        return
      }

      setIsUploadingImage(true)
      const reader = new FileReader()

      reader.onload = (e) => {
        if (e.target?.result) {
          setCourse(prev => ({ ...prev, thumbnail: e.target?.result as string }))
          toast({
            title: "Thành công!",
            description: "Hình ảnh đã được tải lên thành công",
          })
        }
        setIsUploadingImage(false)
      }

      reader.onerror = () => {
        toast({
          title: "Lỗi",
          description: "Có lỗi xảy ra khi tải hình ảnh. Vui lòng thử lại",
          variant: "destructive",
        })
        setIsUploadingImage(false)
      }

      reader.readAsDataURL(file)
    }

    // Reset input value để có thể chọn lại cùng file
    event.target.value = ''
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={handleBackToBasicInfo} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to courses
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">2</span>
                <Badge variant="secondary">DRAFT</Badge>
                <span className="text-sm text-gray-600">0min of video content uploaded</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handlePreview}>
                <Play className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-80 bg-white border-r border-gray-200 p-6">
            <div className="space-y-6">
              {/* Curriculum Section */}
              <div
                className={`cursor-pointer rounded-lg p-3 transition-colors ${activeTab === "curriculum" ? "bg-purple-50 border border-purple-200" : "hover:bg-gray-50"
                  }`}
                onClick={() => setActiveTab("curriculum")}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Checkbox checked={activeTab === "curriculum"} />
                  <span className={`text-base font-medium ${activeTab === "curriculum" ? "text-purple-700" : "text-gray-900"
                    }`}>Chương trình giảng dạy</span>
                </div>
                <div className="pl-7">
                  <p className="text-sm text-gray-600 mb-2">
                    {course.sections.length} chương • {course.sections.reduce((total, section) => total + section.lectures.length, 0)} bài học
                  </p>
                  <p className="text-xs text-gray-500">
                    Tổng thời lượng: {course.sections.reduce((total, section) =>
                      total + section.lectures.reduce((sectionTotal, lecture) =>
                        sectionTotal + (lecture.duration || 0), 0), 0)}min
                  </p>
                </div>
              </div>

              {/* Coupons Section */}
              <div
                className={`cursor-pointer rounded-lg p-3 transition-colors ${activeTab === "coupons" ? "bg-purple-50 border border-purple-200" : "hover:bg-gray-50"
                  }`}
                onClick={() => setActiveTab("coupons")}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Checkbox checked={activeTab === "coupons"} />
                  <span className={`text-base font-medium ${activeTab === "coupons" ? "text-purple-700" : "text-gray-900"
                    }`}>Mã giảm giá</span>
                </div>
                <div className="pl-7">
                  <p className="text-sm text-gray-600 mb-2">
                    {course.coupons?.length || 0} mã giảm giá đã tạo
                  </p>
                  <p className="text-xs text-gray-500">
                    Tạo mã giảm giá để thu hút học viên đăng ký khóa học
                  </p>
                </div>
              </div>

              <Button onClick={handleSubmitForReview} className="w-full bg-purple-600 hover:bg-purple-700">
                Submit for Preview
              </Button>

              <Button variant="ghost" className="w-full mt-2 text-gray-600">
                Dismiss
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="max-w-4xl">
              {activeTab === "curriculum" && (
                /* Course Sections */
                <div className="space-y-4">
                  {course.sections.map((section, sectionIndex) => (
                    <Card key={section.id} className="border border-gray-200">
                      <div className="p-4 bg-gray-50 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <GripVertical className="w-4 h-4 text-gray-400" />
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Section {sectionIndex + 1}:</span>
                              <FileText className="w-4 h-4 text-gray-500" />
                              <Input
                                value={section.title}
                                onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                                className="border-none bg-transparent p-0 font-medium"
                                placeholder="Section Title"
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteSection(section.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-4">
                        {/* Lectures */}
                        <div className="space-y-3">
                          {section.lectures.map((lecture, lectureIndex) => (
                            <div key={lecture.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Checkbox checked={lecture.completed} />
                                <span className="font-medium">{lecture.type === "quiz" ? "Quiz" : "Lecture"} {lectureIndex + 1}:</span>
                                {(lecture.type === "video" || lecture.contentType === "video") && <Play className="w-4 h-4 text-gray-500" />}
                                {lecture.contentType === "video-slide" && <div className="relative"><Play className="w-4 h-4 text-gray-500" /><File className="w-2 h-2 text-gray-500 absolute -top-1 -right-1" /></div>}
                                {(lecture.type === "text" || lecture.contentType === "article") && <FileText className="w-4 h-4 text-gray-500" />}
                                {lecture.type === "quiz" && <HelpCircle className="w-4 h-4 text-gray-500" />}
                                {lecture.type === "coding-exercise" && <Code className="w-4 h-4 text-gray-500" />}
                                {lecture.type === "practice-test" && <Target className="w-4 h-4 text-gray-500" />}
                                {lecture.type === "assignment" && <FileText className="w-4 h-4 text-gray-500" />}
                                {lecture.type === "role-play" && <Users className="w-4 h-4 text-gray-500" />}
                                <Input
                                  value={lecture.quiz?.title || lecture.title}
                                  onChange={(e) => updateLectureTitle(section.id, lecture.id, e.target.value)}
                                  className="border-none bg-transparent p-0"
                                  placeholder={lecture.type === "quiz" ? "Quiz Title" : "Lecture Title"}
                                  readOnly={lecture.type === "quiz" && !!lecture.quiz}
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                {lecture.type === "quiz" ? (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-purple-600 border-purple-600"
                                    onClick={() => {
                                      if (lecture.quiz) {
                                        setCurrentQuiz(lecture.quiz)
                                        setShowQuizModal(true)
                                      }
                                    }}
                                  >
                                    + Questions
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-purple-600 border-purple-600"
                                    onClick={() => handleContentClick(section.id, lecture.id)}
                                  >
                                    + Content
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteLecture(section.id, lecture.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}

                          {/* Add Lecture Buttons */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addLecture(section.id, "text")}
                              className="text-purple-600 border-purple-600"
                            >
                              + Description
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addLecture(section.id, "text")}
                              className="text-purple-600 border-purple-600"
                            >
                              + Resources
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addLecture(section.id, "quiz")}
                              className="text-purple-600 border-purple-600"
                            >
                              + Lab
                            </Button>
                          </div>

                          {/* Add Curriculum Item */}
                          <div className="pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCurriculumItemClick(section.id)}
                              className="text-purple-600 border-purple-600"
                            >
                              + Curriculum item
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {/* Add Section Button */}
                  <Button
                    variant="outline"
                    onClick={addSection}
                    className="w-full py-3 text-purple-600 border-purple-600 border-dashed"
                  >
                    + Section
                  </Button>
                </div>
              )}

              {activeTab === "coupons" && (
                /* Coupon Management */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Quản lý mã giảm giá</h2>
                    <Button
                      onClick={() => {
                        setEditingCoupon(null)
                        setShowCouponModal(true)
                      }}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tạo mã giảm giá
                    </Button>
                  </div>

                  {course.coupons && course.coupons.length > 0 ? (
                    <div className="grid gap-4">
                      {course.coupons.map((coupon) => (
                        <Card key={coupon.id} className="border border-gray-200">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <code className="px-3 py-1 bg-purple-100 text-purple-800 rounded-md font-mono text-sm">
                                    {coupon.code}
                                  </code>
                                  <Badge variant={coupon.isActive ? "default" : "secondary"}>
                                    {coupon.isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
                                  </Badge>
                                </div>
                                <p className="text-gray-600 mb-2">{coupon.description || "Không có mô tả"}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span>
                                    Giảm: {coupon.type === "percentage" ? `${coupon.value}%` : `$${coupon.value}`}
                                    {coupon.maxDiscount && coupon.type === "percentage" && ` (tối đa $${coupon.maxDiscount})`}
                                  </span>
                                  <span>Đã dùng: {coupon.usedCount}/{coupon.usageLimit || "∞"}</span>
                                  <span>Từ {new Date(coupon.validFrom).toLocaleDateString()} đến {new Date(coupon.validTo).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setEditingCoupon(coupon)
                                    setShowCouponModal(true)
                                  }}
                                >
                                  Chỉnh sửa
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setCourse(prev => ({
                                      ...prev,
                                      coupons: prev.coupons?.filter(c => c.id !== coupon.id) || []
                                    }))
                                    toast({
                                      title: "Đã xóa mã giảm giá",
                                      description: `Mã ${coupon.code} đã được xóa`,
                                    })
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="text-4xl mb-4">🎫</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có mã giảm giá nào</h3>
                        <p className="text-gray-600 text-center mb-4">
                          Tạo mã giảm giá để thu hút học viên đăng ký khóa học của bạn.<br />
                          Bạn có thể tạo mã giảm theo phần trăm hoặc số tiền cố định.
                        </p>
                        <Button
                          onClick={() => {
                            setEditingCoupon(null)
                            setShowCouponModal(true)
                          }}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Tạo mã giảm giá đầu tiên
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Type Selection Modal */}
        <Dialog open={showContentTypeModal} onOpenChange={setShowContentTypeModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle>Select content type</DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowContentTypeModal(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            <div className="py-4">
              <p className="text-sm text-gray-600 mb-4">
                Select the main type of content. Files and links can be added as resources.{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  Learn about content types.
                </a>
              </p>

              <div className="flex gap-4 justify-center">
                {/* Video Option */}
                <div
                  className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-colors"
                  onClick={() => handleContentTypeSelect("video")}
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                    <Video className="w-8 h-8 text-gray-600" />
                  </div>
                  <span className="font-medium text-sm">Video</span>
                </div>

                {/* Video & Slide Mashup Option */}
                <div
                  className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-colors"
                  onClick={() => handleContentTypeSelect("video-slide")}
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                    <div className="relative">
                      <Video className="w-6 h-6 text-gray-600" />
                      <File className="w-4 h-4 text-gray-600 absolute -top-1 -right-1" />
                    </div>
                  </div>
                  <span className="font-medium text-sm text-center">Video & Slide<br />Mashup</span>
                </div>

                {/* Article Option */}
                <div
                  className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-colors"
                  onClick={() => handleContentTypeSelect("article")}
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                    <File className="w-8 h-8 text-gray-600" />
                  </div>
                  <span className="font-medium text-sm">Article</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Curriculum Item Selection Modal */}
        <Dialog open={showCurriculumModal} onOpenChange={setShowCurriculumModal}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle>Add Curriculum Item</DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCurriculumModal(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            <div className="py-4">
              <div className="flex flex-wrap gap-3 justify-center">
                {/* Lecture */}
                <div
                  className="flex items-center gap-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors"
                  onClick={() => addCurriculumItem(selectedSectionForCurriculum, "lecture")}
                >
                  <Play className="w-4 h-4" />
                  <span className="font-medium">+ Lecture</span>
                  <Badge variant="secondary" className="ml-1 text-xs">With lab</Badge>
                </div>

                {/* Quiz */}
                <div
                  className="flex items-center gap-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors"
                  onClick={() => addCurriculumItem(selectedSectionForCurriculum, "quiz")}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span className="font-medium">+ Quiz</span>
                </div>

                {/* Coding Exercise */}
                <div
                  className="flex items-center gap-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors"
                  onClick={() => addCurriculumItem(selectedSectionForCurriculum, "coding-exercise")}
                >
                  <Code className="w-4 h-4" />
                  <span className="font-medium">+ Coding Exercise</span>
                </div>

                {/* Practice Test */}
                <div
                  className="flex items-center gap-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors"
                  onClick={() => addCurriculumItem(selectedSectionForCurriculum, "practice-test")}
                >
                  <Target className="w-4 h-4" />
                  <span className="font-medium">+ Practice Test</span>
                </div>

                {/* Assignment */}
                <div
                  className="flex items-center gap-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors"
                  onClick={() => addCurriculumItem(selectedSectionForCurriculum, "assignment")}
                >
                  <FileText className="w-4 h-4" />
                  <span className="font-medium">+ Assignment</span>
                </div>

                {/* Role Play */}
                <div
                  className="flex items-center gap-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors"
                  onClick={() => addCurriculumItem(selectedSectionForCurriculum, "role-play")}
                >
                  <Users className="w-4 h-4" />
                  <span className="font-medium">+ Role Play</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Quiz Creation Modal */}
        <Dialog open={showQuizModal} onOpenChange={setShowQuizModal}>
          <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowQuizModal(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-600">New Quiz:</span>
                </div>
              </div>
            </DialogHeader>

            <div className="py-4 space-y-4">
              {/* Quiz Title */}
              <div>
                <Input
                  placeholder="học bài"
                  value={currentQuiz?.title || ""}
                  onChange={(e) => setCurrentQuiz(prev => prev ? { ...prev, title: e.target.value } : null)}
                  className="text-lg font-medium"
                />
                <div className="text-right text-sm text-gray-400 mt-1">73</div>
              </div>

              {/* Rich Text Editor */}
              <div className="border border-purple-500 rounded-lg">
                <div className="flex items-center gap-2 p-2 border-b border-purple-200">
                  <Button variant="ghost" size="sm">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Italic className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  placeholder="học bài"
                  value={currentQuiz?.description || ""}
                  onChange={(e) => setCurrentQuiz(prev => prev ? { ...prev, description: e.target.value } : null)}
                  className="border-none resize-none min-h-[100px]"
                />
              </div>

              {/* Questions List */}
              {currentQuiz?.questions.map((question, index) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Question {index + 1}: {question.text}</span>
                    <Button variant="outline" size="sm" className="text-purple-600 border-purple-600">
                      + Questions
                    </Button>
                  </div>
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex justify-between">
                <Button variant="ghost" onClick={() => setShowQuizModal(false)}>
                  Cancel
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleAddQuestion}>
                    Add Question
                  </Button>
                  <Button onClick={handleQuizSave} className="bg-purple-600 hover:bg-purple-700">
                    Add Quiz
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Question Type Selection Modal */}
        <Dialog open={showQuestionTypeModal} onOpenChange={setShowQuestionTypeModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle>Select question type</DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowQuestionTypeModal(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            <div className="py-4">
              <div className="flex justify-center">
                <div
                  className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-colors"
                  onClick={() => handleQuestionTypeSelect("multiple-choice")}
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                    <HelpCircle className="w-8 h-8 text-gray-600" />
                  </div>
                  <span className="font-medium">Multiple Choice</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Question Builder Modal */}
        <Dialog open={showQuestionBuilderModal} onOpenChange={setShowQuestionBuilderModal}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  <span>Quiz 1: học bài</span>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Add Multiple Choice</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowQuestionBuilderModal(false)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DialogHeader>

            <div className="py-4 space-y-6">
              {/* Question */}
              <div>
                <Label className="text-base font-medium">Question</Label>
                <div className="border rounded-lg mt-2">
                  <div className="flex items-center gap-2 p-2 border-b">
                    <Button variant="ghost" size="sm">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Code className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={currentQuestion?.text || ""}
                    onChange={(e) => setCurrentQuestion(prev => prev ? { ...prev, text: e.target.value } : null)}
                    className="border-none resize-none min-h-[100px]"
                    placeholder="Enter your question here..."
                  />
                </div>
              </div>

              {/* Answers */}
              <div>
                <Label className="text-base font-medium">Answers</Label>
                <div className="space-y-4 mt-2">
                  {currentQuestion?.answers.map((answer, index) => (
                    <div key={answer.id} className="space-y-2">
                      <div className="flex items-center gap-3">
                        <RadioGroup
                          value={currentQuestion.answers.findIndex(a => a.isCorrect).toString()}
                          onValueChange={(value) => {
                            if (currentQuestion) {
                              setCurrentQuestion({
                                ...currentQuestion,
                                answers: currentQuestion.answers.map((a, i) => ({
                                  ...a,
                                  isCorrect: i === parseInt(value)
                                }))
                              })
                            }
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
                          </div>
                        </RadioGroup>
                        <Input
                          placeholder="Add an answer."
                          value={answer.text}
                          onChange={(e) => {
                            if (currentQuestion) {
                              setCurrentQuestion({
                                ...currentQuestion,
                                answers: currentQuestion.answers.map((a, i) =>
                                  i === index ? { ...a, text: e.target.value } : a
                                )
                              })
                            }
                          }}
                          className="flex-1"
                        />
                      </div>
                      <Input
                        placeholder="Explain why this is or isn't the best answer."
                        value={answer.explanation}
                        onChange={(e) => {
                          if (currentQuestion) {
                            setCurrentQuestion({
                              ...currentQuestion,
                              answers: currentQuestion.answers.map((a, i) =>
                                i === index ? { ...a, explanation: e.target.value } : a
                              )
                            })
                          }
                        }}
                        className="ml-8 text-sm"
                      />
                      <div className="ml-8 text-right text-xs text-gray-400">600</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Write up to 15 possible answers and indicate which one is the best.
                </p>
              </div>

              {/* Related Lecture */}
              <div>
                <Label className="text-base font-medium">Related Lecture</Label>
                <Select
                  value={currentQuestion?.relatedLectureId || ""}
                  onValueChange={(value) => setCurrentQuestion(prev => prev ? { ...prev, relatedLectureId: value } : null)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="-- Select One --" />
                  </SelectTrigger>
                  <SelectContent>
                    {course.sections.flatMap(section =>
                      section.lectures
                        .filter(lecture => lecture.type === "video" || lecture.type === "text")
                        .map(lecture => (
                          <SelectItem key={lecture.id} value={lecture.id}>
                            {lecture.title}
                          </SelectItem>
                        ))
                    )}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600 mt-1">
                  Select a related video lecture to help students answer this question.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={() => setShowQuestionBuilderModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleQuestionSave} className="bg-purple-600 hover:bg-purple-700">
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Coupon Modal */}
        <Dialog open={showCouponModal} onOpenChange={setShowCouponModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingCoupon ? "Chỉnh sửa mã giảm giá" : "Tạo mã giảm giá mới"}
              </DialogTitle>
            </DialogHeader>
            <CouponForm
              coupon={editingCoupon}
              onSave={(couponData) => {
                if (editingCoupon) {
                  // Update existing coupon
                  setCourse(prev => ({
                    ...prev,
                    coupons: prev.coupons?.map(c =>
                      c.id === editingCoupon.id ? { ...couponData, id: editingCoupon.id, usedCount: c.usedCount } : c
                    ) || []
                  }))
                  toast({
                    title: "Đã cập nhật mã giảm giá",
                    description: `Mã ${couponData.code} đã được cập nhật`,
                  })
                } else {
                  // Add new coupon
                  const newCoupon = {
                    ...couponData,
                    id: `coupon-${Date.now()}`,
                    usedCount: 0,
                  }
                  setCourse(prev => ({
                    ...prev,
                    coupons: [...(prev.coupons || []), newCoupon]
                  }))
                  toast({
                    title: "Đã tạo mã giảm giá",
                    description: `Mã ${couponData.code} đã được tạo thành công`,
                  })
                }
                setShowCouponModal(false)
                setEditingCoupon(null)
              }}
              onCancel={() => {
                setShowCouponModal(false)
                setEditingCoupon(null)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold">Tạo khóa học mới</h1>
        </div>
        <p className="text-gray-600">Điền thông tin cơ bản cho khóa học của bạn</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
              1
            </span>
            Thông tin cơ bản
          </CardTitle>
          <CardDescription>Tên, mô tả, danh mục khóa học</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Tên khóa học *</Label>
            <Input
              id="title"
              placeholder="Nhập tên khóa học"
              value={course.title}
              onChange={(e) => setCourse({ ...course, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả khóa học *</Label>
            <Textarea
              id="description"
              placeholder="Mô tả về khóa học của bạn..."
              rows={4}
              value={course.description}
              onChange={(e) => setCourse({ ...course, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Danh mục *</Label>
              <Select value={course.category} onValueChange={(value) => setCourse({ ...course, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="programming">Lập trình</SelectItem>
                  <SelectItem value="design">Thiết kế</SelectItem>
                  <SelectItem value="business">Kinh doanh</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="language">Ngôn ngữ</SelectItem>
                  <SelectItem value="music">Âm nhạc</SelectItem>
                  <SelectItem value="health">Sức khỏe</SelectItem>
                  <SelectItem value="photography">Nhiếp ảnh</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Cấp độ *</Label>
              <Select value={course.level} onValueChange={(value) => setCourse({ ...course, level: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn cấp độ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Người mới bắt đầu</SelectItem>
                  <SelectItem value="intermediate">Trung cấp</SelectItem>
                  <SelectItem value="advanced">Nâng cao</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Giá khóa học (VNĐ)</Label>
            <Input
              id="price"
              type="number"
              placeholder="0"
              value={course.price}
              onChange={(e) => setCourse({ ...course, price: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail">Hình thu nhỏ khóa học</Label>
            <div className="flex items-center gap-4">
              {course.thumbnail && (
                <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-gray-100 group">
                  <img src={course.thumbnail} alt="Course thumbnail" className="w-full h-full object-cover" />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      setCourse(prev => ({ ...prev, thumbnail: "" }))
                      toast({
                        title: "Đã xóa hình ảnh",
                        description: "Hình thu nhỏ đã được xóa",
                      })
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <div className="space-y-2">
                <input
                  type="file"
                  id="thumbnail"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                  disabled={isUploadingImage}
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("thumbnail")?.click()}
                  disabled={isUploadingImage}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploadingImage ? "Đang tải..." : course.thumbnail ? "Thay đổi hình" : "Tải lên hình"}
                </Button>
                {isUploadingImage && (
                  <div className="text-xs text-gray-500">
                    Đang xử lý hình ảnh...
                  </div>
                )}
                <div className="text-xs text-gray-400">
                  Hỗ trợ: JPG, PNG, GIF, WebP. Tối đa 5MB
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={handleSaveCourse} disabled={isLoading} className="flex-1">
              {isLoading ? (
                "Đang lưu..."
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Lưu khóa học
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleCreateNew}>
              Tạo mới
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
