"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Clock, Users, Star, Play, BookOpen, FileText, Code, Target, HelpCircle } from "lucide-react"

interface Lecture {
    id: string
    title: string
    type: "video" | "video-slide" | "article" | "text" | "quiz" | "coding-exercise" | "practice-test" | "assignment" | "role-play"
    duration?: number
    completed?: boolean
    contentType?: "video" | "video-slide" | "article"
}

interface Section {
    id: string
    title: string
    lectures: Lecture[]
}

interface Course {
    title: string
    description: string
    category: string
    level: string
    price: number
    thumbnail: string
    sections: Section[]
}

const getLectureIcon = (type: string) => {
    switch (type) {
        case "video":
        case "video-slide":
            return <Play className="w-4 h-4" />
        case "article":
        case "text":
            return <FileText className="w-4 h-4" />
        case "quiz":
            return <HelpCircle className="w-4 h-4" />
        case "coding-exercise":
            return <Code className="w-4 h-4" />
        case "practice-test":
            return <Target className="w-4 h-4" />
        case "assignment":
            return <BookOpen className="w-4 h-4" />
        case "role-play":
            return <Users className="w-4 h-4" />
        default:
            return <FileText className="w-4 h-4" />
    }
}

const getLectureTypeName = (type: string) => {
    switch (type) {
        case "video":
            return "Video"
        case "video-slide":
            return "Video & Slide"
        case "article":
            return "Article"
        case "text":
            return "Text"
        case "quiz":
            return "Quiz"
        case "coding-exercise":
            return "Coding Exercise"
        case "practice-test":
            return "Practice Test"
        case "assignment":
            return "Assignment"
        case "role-play":
            return "Role Play"
        default:
            return "Content"
    }
}

export default function PreviewCoursePage() {
    const params = useParams()
    const router = useRouter()
    const [course, setCourse] = useState<Course | null>(null)
    const [totalDuration, setTotalDuration] = useState(0)
    const [totalLectures, setTotalLectures] = useState(0)

    useEffect(() => {
        const courseId = params.id as string
        const savedCourse = localStorage.getItem(`course-draft-${courseId}`)

        if (savedCourse) {
            const parsedCourse = JSON.parse(savedCourse)
            setCourse(parsedCourse)

            // Calculate total duration and lectures
            let duration = 0
            let lectures = 0

            parsedCourse.sections.forEach((section: Section) => {
                lectures += section.lectures.length
                section.lectures.forEach((lecture: Lecture) => {
                    if (lecture.duration) {
                        duration += lecture.duration
                    }
                })
            })

            setTotalDuration(duration)
            setTotalLectures(lectures)
        }
    }, [params.id])

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Course not found</h2>
                    <p className="text-gray-600 mb-4">The course you're looking for doesn't exist or hasn't been created yet.</p>
                    <Button onClick={() => router.back()}>Go Back</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Button
                            variant="ghost"
                            onClick={() => router.back()}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Edit
                        </Button>
                        <div className="flex items-center gap-3">
                            <Badge variant="secondary">PREVIEW MODE</Badge>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Course Content */}
                    <div className="lg:col-span-2">
                        {/* Course Hero */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                            {course.thumbnail && (
                                <div className="mb-4">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                            <p className="text-gray-600 text-lg mb-4">{course.description}</p>

                            <div className="flex items-center gap-4 mb-4">
                                <Badge variant="outline">{course.category}</Badge>
                                <Badge variant="outline">{course.level}</Badge>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <BookOpen className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">{totalLectures} lectures</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">(Preview Mode - No ratings yet)</span>
                            </div>
                        </div>

                        {/* Course Curriculum */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Course Curriculum</CardTitle>
                                <CardDescription>
                                    {course.sections.length} sections • {totalLectures} lectures • {Math.floor(totalDuration / 60)}h {totalDuration % 60}m total length
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="multiple" className="w-full">
                                    {course.sections.map((section, index) => (
                                        <AccordionItem key={section.id} value={section.id}>
                                            <AccordionTrigger className="text-left">
                                                <div className="flex items-center justify-between w-full pr-4">
                                                    <span className="font-medium">Section {index + 1}: {section.title}</span>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <span>{section.lectures.length} lectures</span>
                                                        <span>•</span>
                                                        <span>
                                                            {section.lectures.reduce((acc, lecture) => acc + (lecture.duration || 0), 0)}min
                                                        </span>
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="space-y-2">
                                                    {section.lectures.map((lecture, lectureIndex) => (
                                                        <div
                                                            key={lecture.id}
                                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-100"
                                                        >
                                                            <div className="flex items-center gap-2 text-gray-600">
                                                                {getLectureIcon(lecture.type)}
                                                                <span className="text-sm">{lectureIndex + 1}.</span>
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center justify-between">
                                                                    <span className="font-medium text-gray-900">{lecture.title}</span>
                                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                        <Badge variant="secondary" className="text-xs">
                                                                            {getLectureTypeName(lecture.type)}
                                                                        </Badge>
                                                                        {lecture.duration && (
                                                                            <span>{lecture.duration}min</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-6">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-purple-600">
                                    ${course.price.toLocaleString()}
                                </CardTitle>
                                <CardDescription>Course Price</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
                                    Enroll Now (Preview)
                                </Button>
                                <Button variant="outline" className="w-full" size="lg">
                                    Add to Cart (Preview)
                                </Button>

                                <div className="border-t pt-4">
                                    <h4 className="font-medium text-gray-900 mb-3">This course includes:</h4>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{Math.floor(totalDuration / 60)} hours on-demand video</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            <span>{totalLectures} lectures</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-4 h-4" />
                                            <span>Full lifetime access</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            <span>Access on mobile and TV</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}