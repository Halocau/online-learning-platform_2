'use client'

import React from 'react'
import Link from 'next/link'
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-16">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                                <BookOpen className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold">SkillUp</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Nền tảng học trực tuyến hàng đầu Việt Nam, cung cấp các khóa học chất lượng cao từ các chuyên gia trong ngành.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Youtube className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Liên kết nhanh</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/courses" className="text-gray-300 hover:text-white transition-colors">
                                    Khóa học
                                </Link>
                            </li>
                            <li>
                                <Link href="/instructors" className="text-gray-300 hover:text-white transition-colors">
                                    Giảng viên
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                                    Về chúng tôi
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                                    Trợ giúp
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Danh mục</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/categories/programming" className="text-gray-300 hover:text-white transition-colors">
                                    Lập trình
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/design" className="text-gray-300 hover:text-white transition-colors">
                                    Thiết kế
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/marketing" className="text-gray-300 hover:text-white transition-colors">
                                    Marketing
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/business" className="text-gray-300 hover:text-white transition-colors">
                                    Kinh doanh
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/data-science" className="text-gray-300 hover:text-white transition-colors">
                                    Data Science
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Liên hệ</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-300">info@skillup.vn</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-300">1900 1234</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                                <span className="text-gray-300">
                                    123 Đường ABC, Quận 1<br />
                                    TP. Hồ Chí Minh, Việt Nam
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © 2024 SkillUp. Tất cả quyền được bảo lưu.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                                Chính sách bảo mật
                            </Link>
                            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                                Điều khoản sử dụng
                            </Link>
                            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                                Chính sách Cookie
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
