'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { BookOpen, Menu, X, Bell, ShoppingCart, User, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface HeaderProps {
    user?: {
        name: string
        email: string
        avatar: string
    } | null
}

export function Header({ user }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                        <BookOpen className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="hidden font-bold sm:inline-block">SkillUp</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link
                        href="/courses"
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                        Khóa học
                    </Link>
                    <Link
                        href="/forum"
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                        Diễn đàn
                    </Link>
                    <Link
                        href="/about"
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                        Về chúng tôi
                    </Link>
                    <Link
                        href="/contact"
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                        Liên hệ
                    </Link>
                </nav>

                {/* User Actions */}
                <div className="flex items-center space-x-4">
                    {/* Theme Toggle */}
                    <ModeToggle />

                    {/* Notifications and Cart - Show for all users */}
                    <div className="flex items-center space-x-2">
                        {/* Notifications Bell */}
                        <Button variant="ghost" size="sm" className="relative">
                            <Bell className="h-5 w-5" />
                            {/* Notification Badge */}
                            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                1
                            </span>
                        </Button>

                        {/* Shopping Cart */}
                        <Link href="/cart">
                            <Button variant="ghost" size="sm" className="relative">
                                <ShoppingCart className="h-5 w-5" />
                                {/* Cart Badge */}
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                                    2
                                </span>
                            </Button>
                        </Link>
                    </div>

                    {/* Authentication Buttons */}
                    {user ? (
                        <div className="flex items-center space-x-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                                            <span className="text-primary-foreground text-sm font-medium">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            Hồ sơ cá nhân
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard" className="cursor-pointer">
                                            <Settings className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="cursor-pointer text-red-600 focus:text-red-600"
                                        onClick={() => {
                                            // Logout logic here
                                            localStorage.removeItem('user')
                                            sessionStorage.removeItem('user')
                                            window.location.href = '/'
                                        }}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Đăng xuất
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center space-x-2">
                            <Link href="/auth/login">
                                <Button variant="ghost" size="sm">
                                    Đăng nhập
                                </Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button size="sm">
                                    Đăng ký
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b">
                        <Link
                            href="/courses"
                            className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Khóa học
                        </Link>
                        <Link
                            href="/forum"
                            className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Diễn đàn
                        </Link>
                        <Link
                            href="/about"
                            className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Về chúng tôi
                        </Link>
                        <Link
                            href="/contact"
                            className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Liên hệ
                        </Link>

                        {/* Mobile Notifications and Cart */}
                        <div className="pt-4 border-t border-border">
                            <div className="flex items-center justify-center space-x-4 px-3">
                                <Button variant="ghost" size="sm" className="relative">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                        1
                                    </span>
                                </Button>
                                <Link href="/cart">
                                    <Button variant="ghost" size="sm" className="relative" onClick={() => setIsMobileMenuOpen(false)}>
                                        <ShoppingCart className="h-5 w-5" />
                                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                                            2
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Auth Buttons */}
                        {!user && (
                            <div className="pt-4 pb-3 border-t border-border">
                                <div className="flex items-center space-x-3 px-3">
                                    <Link href="/auth/login" className="flex-1">
                                        <Button variant="outline" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                                            Đăng nhập
                                        </Button>
                                    </Link>
                                    <Link href="/auth/register" className="flex-1">
                                        <Button className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                                            Đăng ký
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}
