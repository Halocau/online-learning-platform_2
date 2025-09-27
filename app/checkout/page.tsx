"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Smartphone, Building2, Shield, Lock, BookOpen, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  // Mock cart data
  const cartItems = [
    {
      id: 1,
      title: "React Fundamentals",
      instructor: "John Doe",
      price: 1500000,
      originalPrice: 2000000,
      thumbnail: "/react-course.png",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Jane Smith",
      price: 1800000,
      originalPrice: 2500000,
      thumbnail: "/javascript-course.png",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const discount = 330000 // 10% discount applied
  const total = subtotal - discount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setOrderComplete(true)
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <Link href="/" className="text-2xl font-bold text-foreground">
                SkillUp
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold mb-4">Thanh toán thành công!</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Cảm ơn bạn đã mua khóa học. Bạn có thể bắt đầu học ngay bây giờ.
            </p>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Chi tiết đơn hàng #ORD-2025-001</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        className="w-16 h-10 object-cover rounded"
                      />
                      <div className="flex-1 text-left">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.instructor}</p>
                      </div>
                      <span className="font-medium">{(item.price / 1000000).toFixed(1)}M VNĐ</span>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Tổng cộng:</span>
                    <span className="text-primary">{(total / 1000000).toFixed(1)}M VNĐ</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/dashboard">Vào học ngay</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/courses">Khám phá thêm</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <Link href="/" className="text-2xl font-bold text-foreground">
                SkillUp
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm text-muted-foreground">Thanh toán bảo mật</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link href="/cart" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Giỏ hàng
            </Link>
            <span className="text-muted-foreground">→</span>
            <span className="font-medium">Thanh toán</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div>
              <h1 className="text-2xl font-bold mb-6">Thông tin thanh toán</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Billing Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin hóa đơn</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Họ *</Label>
                        <Input id="firstName" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Tên *</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required />
                    </div>

                    <div>
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input id="phone" type="tel" />
                    </div>

                    <div>
                      <Label htmlFor="address">Địa chỉ</Label>
                      <Input id="address" />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>Phương thức thanh toán</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                          <CreditCard className="h-5 w-5" />
                          <span>Thẻ tín dụng / Thẻ ghi nợ</span>
                        </Label>
                        <div className="flex gap-1">
                          <img src="/visa.png" alt="Visa" className="h-6" />
                          <img src="/mastercard.png" alt="Mastercard" className="h-6" />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="momo" id="momo" />
                        <Label htmlFor="momo" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Smartphone className="h-5 w-5" />
                          <span>Ví MoMo</span>
                        </Label>
                        <img src="/momo.png" alt="MoMo" className="h-6" />
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="banking" id="banking" />
                        <Label htmlFor="banking" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Building2 className="h-5 w-5" />
                          <span>Chuyển khoản ngân hàng</span>
                        </Label>
                      </div>
                    </RadioGroup>

                    {/* Card Details */}
                    {paymentMethod === "card" && (
                      <div className="mt-6 space-y-4 p-4 bg-muted/30 rounded-lg">
                        <div>
                          <Label htmlFor="cardNumber">Số thẻ *</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Ngày hết hạn *</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input id="cvv" placeholder="123" required />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="cardName">Tên trên thẻ *</Label>
                          <Input id="cardName" required />
                        </div>
                      </div>
                    )}

                    {/* MoMo Details */}
                    {paymentMethod === "momo" && (
                      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Bạn sẽ được chuyển hướng đến ứng dụng MoMo để hoàn tất thanh toán.
                        </p>
                      </div>
                    )}

                    {/* Banking Details */}
                    {paymentMethod === "banking" && (
                      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Chuyển khoản đến tài khoản:</p>
                        <div className="text-sm space-y-1">
                          <p>
                            <strong>Ngân hàng:</strong> Vietcombank
                          </p>
                          <p>
                            <strong>Số tài khoản:</strong> 1234567890
                          </p>
                          <p>
                            <strong>Chủ tài khoản:</strong> CONG TY SkillUp
                          </p>
                          <p>
                            <strong>Nội dung:</strong> Thanh toan khoa hoc [Email của bạn]
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Terms */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm">
                    Tôi đồng ý với{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Điều khoản dịch vụ
                    </Link>{" "}
                    và{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Chính sách bảo mật
                    </Link>
                  </Label>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Hoàn tất thanh toán {(total / 1000000).toFixed(1)}M VNĐ
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Tóm tắt đơn hàng</h2>

              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <img
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.title}
                          className="w-20 h-12 object-cover rounded flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          <p className="text-xs text-muted-foreground">{item.instructor}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-medium">{(item.price / 1000000).toFixed(1)}M VNĐ</span>
                            <span className="text-xs text-muted-foreground line-through">
                              {(item.originalPrice / 1000000).toFixed(1)}M VNĐ
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Tạm tính:</span>
                      <span>{(subtotal / 1000000).toFixed(1)}M VNĐ</span>
                    </div>

                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá:</span>
                      <span>-{(discount / 1000000).toFixed(1)}M VNĐ</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Tổng cộng:</span>
                      <span className="text-primary">{(total / 1000000).toFixed(1)}M VNĐ</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Cam kết của chúng tôi</span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Hoàn tiền 100% trong 30 ngày</li>
                      <li>• Truy cập trọn đời</li>
                      <li>• Chứng chỉ hoàn thành</li>
                      <li>• Hỗ trợ 24/7</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
