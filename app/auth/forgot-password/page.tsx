'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setIsSubmitted(true)
        }, 2000)
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Email đã được gửi!</CardTitle>
                        <CardDescription>
                            Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="text-center space-y-2">
                            <p className="text-sm text-muted-foreground">
                                Vui lòng kiểm tra hộp thư đến (và cả thư mục spam) để tìm email từ chúng tôi.
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Email: <span className="font-medium">{email}</span>
                            </p>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                                <strong>Lưu ý:</strong> Link đặt lại mật khẩu sẽ hết hạn sau 24 giờ vì lý do bảo mật.
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter className="space-y-4">
                        <Button
                            onClick={() => setIsSubmitted(false)}
                            variant="outline"
                            className="w-full"
                        >
                            Gửi lại email
                        </Button>

                        <div className="text-center">
                            <Link
                                href="/auth/login"
                                className="inline-flex items-center text-sm text-primary hover:underline"
                            >
                                <ArrowLeft className="mr-1 h-4 w-4" />
                                Quay lại đăng nhập
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                        <Mail className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Quên mật khẩu?</CardTitle>
                    <CardDescription>
                        Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="example@domain.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                            <p className="text-xs text-amber-800 dark:text-amber-200">
                                Hãy đảm bảo rằng đây là email bạn đã sử dụng để đăng ký tài khoản.
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter className="space-y-4">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                                    Đang gửi...
                                </>
                            ) : (
                                'Gửi hướng dẫn đặt lại'
                            )}
                        </Button>

                        <div className="text-center">
                            <Link
                                href="/auth/login"
                                className="inline-flex items-center text-sm text-primary hover:underline"
                            >
                                <ArrowLeft className="mr-1 h-4 w-4" />
                                Quay lại đăng nhập
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
