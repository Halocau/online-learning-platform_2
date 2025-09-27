"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    Settings,
    Maximize,
    CheckCircle,
    Clock,
    BookOpen,
    ChevronDown,
    ChevronRight,
    Lock
} from "lucide-react"
import Link from "next/link"

// Mock course data
const courseData = {
    id: 1,
    title: "React Fundamentals - Từ Cơ Bản Đến Nâng Cao",
    instructor: "Nguyễn Văn An",
    thumbnail: "/react-course.png",
    totalLessons: 24,
    completedLessons: 8,
    progress: 33,
    chapters: [
        {
            id: 1,
            title: "Giới thiệu về React",
            lessons: [
                {
                    id: 1,
                    title: "React là gì?",
                    duration: "15:30",
                    completed: true,
                    free: true,
                    videoUrl: "/videos/react-intro.mp4"
                },
                {
                    id: 2,
                    title: "Cài đặt môi trường phát triển",
                    duration: "20:45",
                    completed: true,
                    free: true,
                    videoUrl: "/videos/setup-environment.mp4"
                },
                {
                    id: 3,
                    title: "Tạo ứng dụng React đầu tiên",
                    duration: "18:20",
                    completed: true,
                    free: false,
                    videoUrl: "/videos/first-react-app.mp4"
                },
                {
                    id: 4,
                    title: "JSX cơ bản",
                    duration: "25:10",
                    completed: true,
                    free: false,
                    videoUrl: "/videos/jsx-basics.mp4"
                }
            ]
        },
        {
            id: 2,
            title: "Components và Props",
            lessons: [
                {
                    id: 5,
                    title: "Tạo component đầu tiên",
                    duration: "22:15",
                    completed: true,
                    free: false,
                    videoUrl: "/videos/first-component.mp4"
                },
                {
                    id: 6,
                    title: "Props và cách sử dụng",
                    duration: "18:30",
                    completed: true,
                    free: false,
                    videoUrl: "/videos/props-usage.mp4"
                },
                {
                    id: 7,
                    title: "Component composition",
                    duration: "16:45",
                    completed: true,
                    free: false,
                    videoUrl: "/videos/component-composition.mp4"
                },
                {
                    id: 8,
                    title: "Conditional rendering",
                    duration: "20:20",
                    completed: true,
                    free: false,
                    videoUrl: "/videos/conditional-rendering.mp4"
                }
            ]
        },
        {
            id: 3,
            title: "State và Event Handling",
            lessons: [
                {
                    id: 9,
                    title: "useState Hook",
                    duration: "28:30",
                    completed: false,
                    free: false,
                    videoUrl: "/videos/usestate-hook.mp4",
                    current: true
                },
                {
                    id: 10,
                    title: "Event handling trong React",
                    duration: "25:15",
                    completed: false,
                    free: false,
                    videoUrl: "/videos/event-handling.mp4"
                },
                {
                    id: 11,
                    title: "Forms và controlled components",
                    duration: "30:45",
                    completed: false,
                    free: false,
                    videoUrl: "/videos/forms-controlled.mp4"
                }
            ],
            quiz: {
                id: 1,
                title: "Kiểm tra React Basics",
                description: "Test kiến thức về State và Event Handling"
            }
        },
        {
            id: 4,
            title: "Advanced Hooks",
            lessons: [
                {
                    id: 12,
                    title: "useEffect Hook",
                    duration: "35:20",
                    completed: false,
                    free: false,
                    videoUrl: "/videos/useeffect-hook.mp4"
                },
                {
                    id: 13,
                    title: "useContext Hook",
                    duration: "28:45",
                    completed: false,
                    free: false,
                    videoUrl: "/videos/usecontext-hook.mp4"
                },
                {
                    id: 14,
                    title: "Custom Hooks",
                    duration: "32:15",
                    completed: false,
                    free: false,
                    videoUrl: "/videos/custom-hooks.mp4"
                }
            ]
        }
    ]
}

export default function VideoPlayerPage({ params }: { params: { id: string, lessonId: string } }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(145) // 2:25
    const [duration] = useState(1710) // 28:30
    const [volume, setVolume] = useState(80)
    const [expandedChapters, setExpandedChapters] = useState<number[]>([1, 2, 3])

    // Get current lesson
    const currentLesson = courseData.chapters
        .flatMap(chapter => chapter.lessons)
        .find(lesson => lesson.id === parseInt(params.lessonId)) || courseData.chapters[2].lessons[0]

    const toggleChapter = (chapterId: number) => {
        setExpandedChapters(prev =>
            prev.includes(chapterId)
                ? prev.filter(id => id !== chapterId)
                : [...prev, chapterId]
        )
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    const progressPercentage = (currentTime / duration) * 100

    return (
        <div className="min-h-screen bg-black">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 h-screen">
                {/* Main Video Player */}
                <div className="lg:col-span-3 flex flex-col">
                    {/* Video Container */}
                    <div className="flex-1 relative bg-black">
                        <div className="w-full h-full flex items-center justify-center">
                            {/* Video Placeholder */}
                            <div className="w-full h-full bg-gray-900 relative">
                                <img
                                    src="/react-course.png"
                                    alt="Video thumbnail"
                                    className="w-full h-full object-cover opacity-30"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Button
                                        size="lg"
                                        className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                                        onClick={() => setIsPlaying(!isPlaying)}
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-8 h-8 text-white" />
                                        ) : (
                                            <Play className="w-8 h-8 text-white ml-1" />
                                        )}
                                    </Button>
                                </div>

                                {/* Video Controls */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                    {/* Progress Bar */}
                                    <div className="w-full mb-4">
                                        <div className="w-full bg-white/20 rounded-full h-1 cursor-pointer">
                                            <div
                                                className="bg-blue-500 h-1 rounded-full relative"
                                                style={{ width: `${progressPercentage}%` }}
                                            >
                                                <div className="absolute right-0 top-1/2 w-3 h-3 bg-blue-500 rounded-full transform -translate-y-1/2"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Control Buttons */}
                                    <div className="flex items-center justify-between text-white">
                                        <div className="flex items-center gap-4">
                                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                                                <SkipBack className="w-5 h-5" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-white hover:bg-white/20"
                                                onClick={() => setIsPlaying(!isPlaying)}
                                            >
                                                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                                                <SkipForward className="w-5 h-5" />
                                            </Button>
                                            <div className="flex items-center gap-2">
                                                <Volume2 className="w-4 h-4" />
                                                <div className="w-20 bg-white/20 rounded-full h-1">
                                                    <div
                                                        className="bg-white h-1 rounded-full"
                                                        style={{ width: `${volume}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <span className="text-sm">
                                                {formatTime(currentTime)} / {formatTime(duration)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                                                <Settings className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                                                <Maximize className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Info */}
                    <div className="bg-white p-6 border-t">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    {currentLesson.title}
                                </h1>
                                <p className="text-gray-600 mb-4">
                                    {courseData.title} • {courseData.instructor}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{currentLesson.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <BookOpen className="w-4 h-4" />
                                        <span>Bài {currentLesson.id} / {courseData.totalLessons}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <Badge variant={currentLesson.completed ? "default" : "secondary"}>
                                    {currentLesson.completed ? "Đã hoàn thành" : "Đang học"}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Course Content */}
                <div className="lg:col-span-1 bg-white border-l overflow-y-auto">
                    <div className="p-4 border-b">
                        <h2 className="font-semibold text-gray-900 mb-2">Nội dung khóa học</h2>
                        <div className="text-sm text-gray-600">
                            <p>{courseData.completedLessons}/{courseData.totalLessons} bài đã hoàn thành</p>
                            <Progress value={courseData.progress} className="mt-2 h-2" />
                        </div>
                    </div>

                    <div className="p-2">
                        {courseData.chapters.map((chapter) => (
                            <div key={chapter.id} className="mb-2">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-between p-3 h-auto text-left"
                                    onClick={() => toggleChapter(chapter.id)}
                                >
                                    <span className="font-medium">{chapter.title}</span>
                                    {expandedChapters.includes(chapter.id) ? (
                                        <ChevronDown className="w-4 h-4" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4" />
                                    )}
                                </Button>

                                {expandedChapters.includes(chapter.id) && (
                                    <div className="ml-2 mt-1">
                                        {chapter.lessons.map((lesson) => (
                                            <Link
                                                key={lesson.id}
                                                href={`/courses/${courseData.id}/lesson/${lesson.id}`}
                                            >
                                                <div className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer ${lesson.current ? 'bg-blue-50 border border-blue-200' : ''
                                                    }`}>
                                                    <div className="flex-shrink-0">
                                                        {lesson.completed ? (
                                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                                        ) : lesson.free ? (
                                                            <Play className="w-5 h-5 text-blue-600" />
                                                        ) : (
                                                            <Lock className="w-5 h-5 text-gray-400" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-sm font-medium truncate ${lesson.current ? 'text-blue-700' : 'text-gray-900'
                                                            }`}>
                                                            {lesson.title}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-xs text-gray-500">
                                                                {lesson.duration}
                                                            </span>
                                                            {lesson.free && (
                                                                <Badge variant="outline" className="text-xs">
                                                                    Miễn phí
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}

                                        {/* Quiz button for chapter */}
                                        {(chapter as any).quiz && (
                                            <Link href={`/courses/${courseData.id}/quiz/${(chapter as any).quiz.id}`}>
                                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-50 cursor-pointer border border-yellow-200 bg-yellow-50 mt-2">
                                                    <div className="flex-shrink-0">
                                                        <BookOpen className="w-5 h-5 text-yellow-600" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-yellow-800">
                                                            📝 {(chapter as any).quiz.title}
                                                        </p>
                                                        <p className="text-xs text-yellow-600 mt-1">
                                                            {(chapter as any).quiz.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="p-4">
                        <Link href={`/courses/${courseData.id}`}>
                            <Button variant="outline" className="w-full">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Về trang khóa học
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}