'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, XCircle, Clock, Trophy, RotateCcw, Home } from 'lucide-react'

// Mock quiz data (same as quiz page)
const quizData = {
  '1': {
    id: '1',
    title: 'Kiểm tra React Basics',
    description: 'Bài kiểm tra kiến thức cơ bản về React',
    timeLimit: 1800,
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
    timeLimit: 1200,
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

interface QuestionResult {
  question: any
  userAnswer: any
  isCorrect: boolean
  points: number
  maxPoints: number
}

export default function QuizResultsPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const quizId = params.quizId as string
  const courseId = params.id as string
  
  const [results, setResults] = useState<QuestionResult[]>([])
  const [totalScore, setTotalScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  const [percentage, setPercentage] = useState(0)

  const quiz = quizData[quizId as keyof typeof quizData]

  useEffect(() => {
    if (!quiz) return

    const answersParam = searchParams.get('answers')
    if (!answersParam) return

    try {
      const userAnswers: Answer[] = JSON.parse(decodeURIComponent(answersParam))
      
      let score = 0
      let maxPossibleScore = 0
      const questionResults: QuestionResult[] = []

      quiz.questions.forEach(question => {
        const userAnswer = userAnswers.find(a => a.questionId === question.id)
        maxPossibleScore += question.points

        let isCorrect = false
        let earnedPoints = 0

        switch (question.type) {
          case 'multiple-choice':
            isCorrect = userAnswer?.answer === question.correctAnswer
            earnedPoints = isCorrect ? question.points : 0
            break

          case 'true-false':
            isCorrect = userAnswer?.answer === question.correctAnswer
            earnedPoints = isCorrect ? question.points : 0
            break

          case 'multiple-select':
            const userSelections = userAnswer?.answer || []
            const correctSelections = (question as any).correctAnswers || []
            
            // Check if arrays are equal
            const isExactMatch = userSelections.length === correctSelections.length &&
              userSelections.every((val: number) => correctSelections.includes(val))
            
            isCorrect = isExactMatch
            earnedPoints = isCorrect ? question.points : 0
            break

          case 'essay':
            // For essay questions, we'll give full points if answered
            // In a real app, this would need manual grading
            isCorrect = userAnswer?.answer && userAnswer.answer.trim().length > 0
            earnedPoints = isCorrect ? question.points : 0
            break
        }

        score += earnedPoints
        questionResults.push({
          question,
          userAnswer: userAnswer?.answer,
          isCorrect,
          points: earnedPoints,
          maxPoints: question.points
        })
      })

      setResults(questionResults)
      setTotalScore(score)
      setMaxScore(maxPossibleScore)
      setPercentage(Math.round((score / maxPossibleScore) * 100))

    } catch (error) {
      console.error('Error parsing answers:', error)
    }
  }, [quiz, searchParams])

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

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'Xuất sắc', color: 'text-green-600', bgColor: 'bg-green-100' }
    if (percentage >= 80) return { grade: 'Giỏi', color: 'text-blue-600', bgColor: 'bg-blue-100' }
    if (percentage >= 70) return { grade: 'Khá', color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
    if (percentage >= 60) return { grade: 'Trung bình', color: 'text-orange-600', bgColor: 'bg-orange-100' }
    return { grade: 'Yếu', color: 'text-red-600', bgColor: 'bg-red-100' }
  }

  const gradeInfo = getGrade(percentage)

  const formatAnswer = (question: any, answer: any) => {
    switch (question.type) {
      case 'multiple-choice':
        return question.options?.[answer] || 'Không trả lời'
      
      case 'true-false':
        return answer === true ? 'Đúng' : answer === false ? 'Sai' : 'Không trả lời'
      
      case 'multiple-select':
        if (!answer || answer.length === 0) return 'Không trả lời'
        return answer.map((index: number) => question.options?.[index]).join(', ')
      
      case 'essay':
        return answer || 'Không trả lời'
      
      default:
        return 'Không trả lời'
    }
  }

  const formatCorrectAnswer = (question: any) => {
    switch (question.type) {
      case 'multiple-choice':
        return question.options?.[question.correctAnswer]
      
      case 'true-false':
        return question.correctAnswer ? 'Đúng' : 'Sai'
      
      case 'multiple-select':
        return (question as any).correctAnswers?.map((index: number) => question.options?.[index]).join(', ')
      
      case 'essay':
        return 'Câu trả lời tự luận (cần chấm thủ công)'
      
      default:
        return 'N/A'
    }
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Kết quả bài quiz</h1>
        <p className="text-muted-foreground">{quiz.title} - {quiz.courseName}</p>
      </div>

      {/* Score Summary */}
      <Card className="mb-6">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl">
            {totalScore}/{maxScore} điểm
          </CardTitle>
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${gradeInfo.bgColor}`}>
            <span className={`font-semibold ${gradeInfo.color}`}>
              {gradeInfo.grade} ({percentage}%)
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={percentage} className="h-3 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {results.filter(r => r.isCorrect).length}
              </div>
              <div className="text-sm text-muted-foreground">Câu đúng</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {results.filter(r => !r.isCorrect).length}
              </div>
              <div className="text-sm text-muted-foreground">Câu sai</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {results.length}
              </div>
              <div className="text-sm text-muted-foreground">Tổng câu hỏi</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Details */}
      <div className="space-y-4 mb-6">
        <h2 className="text-xl font-semibold">Chi tiết từng câu hỏi</h2>
        {results.map((result, index) => (
          <Card key={result.question.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline">Câu {index + 1}</Badge>
                    <Badge variant={result.isCorrect ? "default" : "destructive"}>
                      {result.points}/{result.maxPoints} điểm
                    </Badge>
                    {result.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <p className="font-medium">{result.question.question}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Câu trả lời của bạn:
                  </p>
                  <p className={`${result.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {formatAnswer(result.question, result.userAnswer)}
                  </p>
                </div>
                
                {!result.isCorrect && result.question.type !== 'essay' && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Đáp án đúng:
                    </p>
                    <p className="text-green-700">
                      {formatCorrectAnswer(result.question)}
                    </p>
                  </div>
                )}

                {result.question.type === 'essay' && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Lưu ý:</strong> Câu tự luận cần được chấm thủ công bởi giảng viên.
                      Điểm hiện tại chỉ dựa trên việc có trả lời hay không.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={() => router.push(`/courses/${courseId}/quiz/${quizId}`)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Làm lại bài quiz
        </Button>
        <Button
          onClick={() => router.push(`/courses/${courseId}`)}
          className="w-full sm:w-auto"
        >
          <Home className="h-4 w-4 mr-2" />
          Quay về khóa học
        </Button>
      </div>

      {/* Feedback Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Đánh giá kết quả</CardTitle>
        </CardHeader>
        <CardContent>
          {percentage >= 80 ? (
            <div className="text-green-700">
              <p className="font-semibold">Chúc mừng! 🎉</p>
              <p>Bạn đã có kết quả xuất sắc. Hãy tiếp tục học tập để duy trì thành tích này.</p>
            </div>
          ) : percentage >= 60 ? (
            <div className="text-yellow-700">
              <p className="font-semibold">Kết quả khá tốt! 👍</p>
              <p>Bạn đã nắm được phần lớn kiến thức. Hãy ôn tập lại những phần còn thiếu sót.</p>
            </div>
          ) : (
            <div className="text-red-700">
              <p className="font-semibold">Cần cố gắng thêm! 💪</p>
              <p>Hãy xem lại bài giảng và thực hành thêm trước khi làm bài quiz tiếp theo.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}