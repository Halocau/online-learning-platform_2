"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Trash2, Plus, Minus, ShoppingCart, CreditCard, BookOpen, Clock, Star, QrCode, Copy, CheckCircle, X } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CartPage() {
  const { toast } = useToast()
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending')

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
    {
      id: 3,
      title: "Node.js Backend Development",
      instructor: "Mike Johnson",
      price: 2200000,
      originalPrice: 3000000,
      thumbnail: "/nodejs-course.jpg",
      duration: "18 giờ",
      rating: 4.7,
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
    toast({
      title: "Đã xóa khỏi giỏ hàng",
      description: "Khóa học đã được xóa khỏi giỏ hàng của bạn",
    })
  }

  const applyPromoCode = () => {
    const validCodes = {
      WELCOME10: 10,
      STUDENT20: 20,
      NEWYEAR25: 25,
    }

    if (validCodes[promoCode as keyof typeof validCodes]) {
      setAppliedPromo({
        code: promoCode,
        discount: validCodes[promoCode as keyof typeof validCodes],
      })
      toast({
        title: "Mã giảm giá đã được áp dụng!",
        description: `Bạn được giảm ${validCodes[promoCode as keyof typeof validCodes]}%`,
      })
      setPromoCode("")
    } else {
      toast({
        title: "Mã giảm giá không hợp lệ",
        description: "Vui lòng kiểm tra lại mã giảm giá",
        variant: "destructive",
      })
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
    toast({
      title: "Đã hủy mã giảm giá",
      description: "Mã giảm giá đã được hủy bỏ",
    })
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0
  const total = subtotal - promoDiscount

  // Mock payment data
  const paymentInfo = {
    orderCode: `ORDER${Date.now()}`,
    amount: total,
    qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", // Placeholder QR code
    bankInfo: {
      accountName: "EDUPLATFORM VIETNAM",
      accountNumber: "1234567890",
      bankName: "Vietcombank",
      branch: "Chi nhánh Đống Đa",
      content: `THANHTOAN ${Date.now().toString().slice(-6)}`
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Đã sao chép!",
      description: `${label} đã được sao chép vào clipboard`,
    })
  }

  const handlePayment = () => {
    setShowPaymentModal(true)
    setPaymentStatus('pending')

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success')
      toast({
        title: "Thanh toán thành công!",
        description: "Cảm ơn bạn đã mua hàng. Bạn có thể bắt đầu học ngay bây giờ!",
      })
    }, 3000)
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h1>
            <p className="text-gray-600 mb-6">
              Bạn chưa có khóa học nào trong giỏ hàng. Hãy khám phá các khóa học tuyệt vời của chúng tôi!
            </p>
            <Link href="/courses">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <BookOpen className="w-4 h-4 mr-2" />
                Khám phá khóa học
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng của bạn</h1>
          <Badge variant="secondary" className="ml-2">
            {cartItems.length} khóa học
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-24 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                          <p className="text-gray-600 text-sm">Giảng viên: {item.instructor}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{item.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{item.rating}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-blue-600">
                            {item.price.toLocaleString('vi-VN')} VNĐ
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-lg text-gray-500 line-through">
                              {item.originalPrice.toLocaleString('vi-VN')} VNĐ
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Tổng đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Mã giảm giá</label>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">{appliedPromo.code}</span>
                        <Badge variant="secondary" className="text-xs">
                          -{appliedPromo.discount}%
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removePromoCode}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Nhập mã giảm giá"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      />
                      <Button variant="outline" onClick={applyPromoCode} disabled={!promoCode.trim()}>
                        Áp dụng
                      </Button>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium">{subtotal.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá ({appliedPromo.discount}%):</span>
                      <span>-{promoDiscount.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-blue-600">{total.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                  onClick={handlePayment}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Thanh toán ngay
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Bằng việc thanh toán, bạn đồng ý với{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Điều khoản sử dụng
                  </Link>{" "}
                  của chúng tôi
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* PayOS Payment Modal */}
        <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-blue-600" />
                Thanh toán với PayOS
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {paymentStatus === 'pending' && (
                <>
                  {/* Order Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Thông tin đơn hàng</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mã đơn hàng:</span>
                        <span className="font-mono">{paymentInfo.orderCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Số tiền:</span>
                        <span className="font-bold text-blue-600">
                          {paymentInfo.amount.toLocaleString('vi-VN')} VNĐ
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Mã QR PayOS</p>
                        <p className="text-xs text-gray-400">Quét để thanh toán</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Quét mã QR bằng ứng dụng ngân hàng để thanh toán
                    </p>
                  </div>

                  {/* Bank Transfer Info */}
                  <div className="border-t pt-4">
                    <h3 className="font-medium text-gray-900 mb-3">Hoặc chuyển khoản thủ công</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <span className="text-sm text-gray-600">Tên tài khoản:</span>
                          <p className="font-medium">{paymentInfo.bankInfo.accountName}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(paymentInfo.bankInfo.accountName, "Tên tài khoản")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <span className="text-sm text-gray-600">Số tài khoản:</span>
                          <p className="font-mono font-medium">{paymentInfo.bankInfo.accountNumber}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(paymentInfo.bankInfo.accountNumber, "Số tài khoản")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <span className="text-sm text-gray-600">Ngân hàng:</span>
                          <p className="font-medium">{paymentInfo.bankInfo.bankName}</p>
                          <p className="text-xs text-gray-500">{paymentInfo.bankInfo.branch}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-2 bg-yellow-50 border border-yellow-200 rounded">
                        <div>
                          <span className="text-sm text-gray-600">Nội dung chuyển khoản:</span>
                          <p className="font-mono font-medium text-yellow-800">{paymentInfo.bankInfo.content}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(paymentInfo.bankInfo.content, "Nội dung chuyển khoản")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex justify-between items-center p-2 bg-blue-50 border border-blue-200 rounded">
                        <div>
                          <span className="text-sm text-gray-600">Số tiền:</span>
                          <p className="font-bold text-blue-600 text-lg">
                            {paymentInfo.amount.toLocaleString('vi-VN')} VNĐ
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(paymentInfo.amount.toString(), "Số tiền")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                      Đang chờ thanh toán...
                    </div>
                  </div>
                </>
              )}

              {paymentStatus === 'success' && (
                <div className="text-center py-6">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h3>
                  <p className="text-gray-600 mb-6">
                    Cảm ơn bạn đã mua hàng. Các khóa học đã được thêm vào tài khoản của bạn.
                  </p>
                  <div className="space-y-3">
                    <Button className="w-full" onClick={() => {
                      setShowPaymentModal(false)
                      setCartItems([])
                    }}>
                      Bắt đầu học ngay
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowPaymentModal(false)}
                    >
                      Đóng
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </>
  )
}