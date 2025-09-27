"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { toast } from "sonner"

interface AddToCartButtonProps {
  courseId: number
  courseTitle: string
  price: number
  className?: string
}

export function AddToCartButton({ courseId, courseTitle, price, className }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setIsAdded(true)
    setIsLoading(false)

    toast.success(`Đã thêm "${courseTitle}" vào giỏ hàng`, {
      description: `Giá: ${(price / 1000000).toFixed(1)}M VNĐ`,
      action: {
        label: "Xem giỏ hàng",
        onClick: () => (window.location.href = "/cart"),
      },
    })

    // Reset after 3 seconds
    setTimeout(() => setIsAdded(false), 3000)
  }

  return (
    <Button onClick={handleAddToCart} disabled={isLoading || isAdded} className={className}>
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Đang thêm...
        </>
      ) : isAdded ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Đã thêm vào giỏ
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Thêm vào giỏ
        </>
      )}
    </Button>
  )
}
