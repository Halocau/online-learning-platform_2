"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, ShoppingCart, CreditCard, BookOpen, Clock, Star } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "React Fundamentals",
      instructor: "John Doe",
      price: 1500000,
      originalPrice: 2000000,
      thumbnail: "/react-course.png",
      duration: "12 giờ",
      rating: 4.8,
      quantity: 1,
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Jane Smith",
      price: 1800000,
      originalPrice: 2500000,
      thumbnail: "/javascript-course.png",
      duration: "15 giờ",
      rating: 4.9,
      quantity: 1,
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item)),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    const validCodes = {
      WELCOME10: 0.1,
      STUDENT20: 0.2,
      NEWUSER15: 0.15,
    }

    if (validCodes[promoCode as keyof typeof validCodes]) {
      setAppliedPromo({
        code: promoCode,
        discount: validCodes[promoCode as keyof typeof validCodes],
      })
      setPromoCode("")
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0)
  const promoDiscount = appliedPromo ? subtotal * appliedPromo.discount : 0
  const total = subtotal - promoDiscount

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <Link href="/" className="text-2xl font-bold text-foreground">
                  EduPlatform
                </Link>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Trang chủ
                </Link>
                <Link href="/courses" className="text-muted-foreground hover:text-foreground transition-colors">
                  Khóa học
                </Link>
                <Link href="/cart" className="text-foreground font-medium">
                  Giỏ hàng
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
            <p className="text-muted-foreground mb-6">
              Bạn chưa có khóa học nào trong giỏ hàng. Hãy khám phá các khóa học tuyệt vời của chúng tôi!
            </p>
            <Button asChild size="lg">
              <Link href="/courses">Khám phá khóa học</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <Link href="/" className="text-2xl font-bold text-foreground">
                EduPlatform
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Trang chủ
              </Link>
              <Link href="/courses" className="text-muted-foreground hover:text-foreground transition-colors">
                Khóa học
              </Link>
              <Link href="/cart" className="text-foreground font-medium">
                Giỏ hàng ({cartItems.length})
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Giỏ hàng của bạn</h1>
              <Badge variant="secondary">{cartItems.length} khóa học</Badge>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-muted-foreground mb-2">Giảng viên: {item.instructor}</p>

                        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{item.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{item.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-primary">
                              {(item.price / 1000000).toFixed(1)}M VNĐ
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              {(item.originalPrice / 1000000).toFixed(1)}M VNĐ
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="px-3 py-1 min-w-[2rem] text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link href="/courses">← Tiếp tục mua sắm</Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>{(subtotal / 1000000).toFixed(1)}M VNĐ</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Tiết kiệm:</span>
                  <span>-{(savings / 1000000).toFixed(1)}M VNĐ</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Mã giảm giá ({appliedPromo.code}):</span>
                    <span>-{(promoDiscount / 1000000).toFixed(1)}M VNĐ</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-primary">{(total / 1000000).toFixed(1)}M VNĐ</span>
                </div>

                {/* Promo Code */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Mã giảm giá"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    />
                    <Button variant="outline" onClick={applyPromoCode}>
                      Áp dụng
                    </Button>
                  </div>

                  {appliedPromo && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600">✓ Mã {appliedPromo.code} đã áp dụng</span>
                      <Button variant="ghost" size="sm" onClick={removePromoCode}>
                        Xóa
                      </Button>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">Thử: WELCOME10, STUDENT20, NEWUSER15</p>
                </div>

                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Thanh toán
                  </Link>
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Thanh toán an toàn và bảo mật</p>
                  <p>Hoàn tiền 100% trong 30 ngày</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
