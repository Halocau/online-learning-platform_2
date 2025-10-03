'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react'

// Mock data for quizzes
const quizData = {
  '1': {
    id: '1',
    title: 'Kiểm tra React Basics',
    description: 'Bài kiểm tra kiến thức cơ bản về React',
    timeLimit: 1800, // 30 phút
    courseId: '1',
    courseName: 'React Toàn Tập',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'JSX là viết tắt của từ gì?',
        options: [
          'JavaScript XML',
          'Java Syntax Extension',
          'JSON XML',
          'JavaScript Extension'
        ],
        correctAnswer: 0,
        points: 2
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: 'Hook nào được sử dụng để quản lý state trong functional component?',
        options: [
          'useEffect',
          'useState',
          'useContext',
          'useReducer'
        ],
        correctAnswer: 1,
        points: 2
      },
      {
        id: 3,
        type: 'true-false',
        question: 'React component có thể return nhiều element mà không cần wrap trong một container.',
        correctAnswer: false,
        points: 1
      },
      {
        id: 4,
        type: 'multiple-select',
        question: 'Những hook nào là built-in hooks của React? (Chọn tất cả đáp án đúng)',
        options: [
          'useState',
          'useEffect',
          'useRouter',
          'useContext',
          'useQuery'
        ],
        correctAnswers: [0, 1, 3],
        points: 3
      },
      {
        id: 5,
        type: 'essay',
        question: 'Giải thích sự khác biệt giữa Class Component và Functional Component trong React.',
        points: 5
      }
    ]
  },
  '2': {
    id: '2',
    title: 'JavaScript ES6+ Quiz',
    description: 'Kiểm tra kiến thức về các tính năng mới của JavaScript',
    timeLimit: 1200, // 20 phút
    courseId: '2',
    courseName: 'JavaScript Nâng Cao',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Arrow function được giới thiệu trong phiên bản nào của JavaScript?',
        options: [
          'ES5',
          'ES6',
          'ES7',
          'ES8'
        ],
        correctAnswer: 1,
        points: 2
      },
      {
        id: 2,
        type: 'true-false',
        question: 'Async/await được sử dụng để làm việc với Promise.',
        correctAnswer: true,
        points: 1
      }
    ]
  }
}

interface Answer {
  questionId: number
  answer: any
}

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const quizId = params.quizId as string
  const courseId = params.id as string

  const quiz = quizData[quizId as keyof typeof quizData]

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [timeRemaining, setTimeRemaining] = useState(quiz?.timeLimit || 0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0 && !isSubmitted) {
      handleSubmitQuiz()
    }
  }, [timeRemaining, isSubmitted])

  if (!quiz) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <p>Quiz không tồn tại.</p>
            <Button onClick={() => router.back()} className="mt-4">
              Quay lại
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleAnswerChange = (questionId: number, answer: any) => {
    setAnswers(prevAnswers => {
      const existingIndex = prevAnswers.findIndex(a => a.questionId === questionId)
      if (existingIndex >= 0) {
        const newAnswers = [...prevAnswers]
        newAnswers[existingIndex] = { questionId, answer }
        return newAnswers
      } else {
        return [...prevAnswers, { questionId, answer }]
      }
    })
  }

  const getCurrentAnswer = (questionId: number) => {
    const answer = answers.find(a => a.questionId === questionId)
    return answer?.answer
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmitQuiz = () => {
    setIsSubmitted(true)
    // Redirect to results page
    router.push(`/courses/${courseId}/quiz/${quizId}/results?answers=${encodeURIComponent(JSON.stringify(answers))}`)
  }

  const renderQuestion = () => {
    const currentAnswer = getCurrentAnswer(currentQuestion.id)

    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            <RadioGroup
              value={currentAnswer?.toString() || ''}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, parseInt(value))}
            >
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case 'true-false':
        return (
          <div className="space-y-4">
            <RadioGroup
              value={currentAnswer?.toString() || ''}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value === 'true')}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="true" />
                <Label htmlFor="true" className="cursor-pointer">Đúng</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="false" />
                <Label htmlFor="false" className="cursor-pointer">Sai</Label>
              </div>
            </RadioGroup>
          </div>
        )

      case 'multiple-select':
        return (
          <div className="space-y-4">
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`checkbox-${index}`}
                  checked={currentAnswer?.includes(index) || false}
                  onCheckedChange={(checked) => {
                    const currentSelections = currentAnswer || []
                    if (checked) {
                      handleAnswerChange(currentQuestion.id, [...currentSelections, index])
                    } else {
                      handleAnswerChange(currentQuestion.id, currentSelections.filter((i: number) => i !== index))
                    }
                  }}
                />
                <Label htmlFor={`checkbox-${index}`} className="cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        )

      case 'essay':
        return (
          <div className="space-y-4">
            <Textarea
              placeholder="Nhập câu trả lời của bạn..."
              value={currentAnswer || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              className="min-h-32"
            />
          </div>
        )

      default:
        return <p>Loại câu hỏi không được hỗ trợ.</p>
    }
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <p className="text-muted-foreground">{quiz.courseName}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className={`font-mono ${timeRemaining < 300 ? 'text-red-500' : ''}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            <Badge variant="outline">
              {currentQuestionIndex + 1}/{quiz.questions.length}
            </Badge>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              Câu {currentQuestionIndex + 1}
            </CardTitle>
            <Badge>
              {currentQuestion.points} điểm
            </Badge>
          </div>
          <CardDescription className="text-base leading-relaxed">
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderQuestion()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Câu trước
        </Button>

        <div className="flex space-x-2">
          {quiz.questions.map((_, index) => (
            <Button
              key={index}
              variant={index === currentQuestionIndex ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-10 h-10 p-0 ${answers.find(a => a.questionId === quiz.questions[index].id)
                  ? 'bg-green-100 border-green-300'
                  : ''
                }`}
            >
              {index + 1}
            </Button>
          ))}
        </div>

        {currentQuestionIndex === quiz.questions.length - 1 ? (
          <Button onClick={handleSubmitQuiz}>
            Nộp bài
          </Button>
        ) : (
          <Button onClick={handleNextQuestion}>
            Câu tiếp
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>

      {/* Quick Navigation */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Tổng quan bài làm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-10 gap-2">
            {quiz.questions.map((_, index) => {
              const isAnswered = answers.find(a => a.questionId === quiz.questions[index].id)
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`h-10 ${index === currentQuestionIndex
                      ? 'border-blue-500 bg-blue-50'
                      : isAnswered
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200'
                    }`}
                >
                  {index + 1}
                </Button>
              )
            })}
          </div>
          <div className="flex items-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-green-500 bg-green-50 rounded"></div>
              <span>Đã trả lời</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-500 bg-blue-50 rounded"></div>
              <span>Câu hiện tại</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-200 rounded"></div>
              <span>Chưa trả lời</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}