import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Xác thực - EduPlatform',
    description: 'Đăng nhập hoặc đăng ký tài khoản EduPlatform',
}

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-10 p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                            <svg
                                className="h-4 w-4 text-primary-foreground"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-foreground">EduPlatform</span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-6">
                        <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Trang chủ
                        </a>
                        <a href="/courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Khóa học
                        </a>
                        <a href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Về chúng tôi
                        </a>
                        <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Liên hệ
                        </a>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="absolute bottom-0 left-0 right-0 p-4">
                <div className="container mx-auto text-center">
                    <p className="text-xs text-muted-foreground">
                        © 2024 EduPlatform. Tất cả quyền được bảo lưu.
                    </p>
                </div>
            </footer>
        </div>
    )
}