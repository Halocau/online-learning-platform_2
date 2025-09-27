'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Camera, Save, X } from 'lucide-react'

interface EditProfileModalProps {
    isOpen: boolean
    onClose: () => void
    userData: {
        name: string
        email: string
        role: string
        avatar: string
        phone?: string
        bio?: string
    }
    onSave: (data: any) => void
}

export function EditProfileModal({ isOpen, onClose, userData, onSave }: EditProfileModalProps) {
    const [formData, setFormData] = useState({
        firstName: userData.name.split(' ')[0] || '',
        lastName: userData.name.split(' ').slice(1).join(' ') || '',
        email: userData.email,
        phone: userData.phone || '',
        bio: userData.bio || ''
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            const updatedData = {
                ...userData,
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                phone: formData.phone,
                bio: formData.bio
            }

            onSave(updatedData)
            setIsLoading(false)
            onClose()
        }, 1500)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Camera className="h-5 w-5" />
                        Chỉnh sửa thông tin cá nhân
                    </DialogTitle>
                    <DialogDescription>
                        Cập nhật thông tin profile của bạn. Thông tin này sẽ hiển thị công khai trên hồ sơ.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                            <Avatar className="w-24 h-24">
                                <AvatarImage src={userData.avatar} alt={userData.name} />
                                <AvatarFallback className="text-2xl bg-gray-100">
                                    {userData.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                            >
                                <Camera className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-sm text-gray-600">Click để thay đổi ảnh đại diện</p>
                    </div>

                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Họ *</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Nguyễn"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Tên *</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Văn A"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="example@domain.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="0123456789"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Giới thiệu bản thân</Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            placeholder="Viết một vài dòng về bản thân bạn..."
                            rows={3}
                        />
                    </div>

                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            <X className="h-4 w-4 mr-2" />
                            Hủy
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                                    Đang lưu...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Lưu thay đổi
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
