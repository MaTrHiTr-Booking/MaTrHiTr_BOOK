"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Upload, X } from "lucide-react"

export default function ReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState("")
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Mock appointment data
  const appointment = {
    id: params.id,
    appointmentCode: "APT003",
    clinicName: "Phòng Khám Chuyên Khoa Mắt",
    doctor: "BS Lê Văn C",
    doctorSpecialty: "Chuyên Khoa Mắt",
    date: "2024-12-20",
    time: "15:00",
    patientName: "Nguyễn Văn B",
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setUploadedImages([...uploadedImages, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (rating === 0) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <Header isLoggedIn={true} />
        <main className="min-h-screen bg-background py-8">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <Card className="p-8 sm:p-12 text-center shadow-lg">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-2">Cảm Ơn Đánh Giá!</h2>
              <p className="text-muted-foreground mb-2">Đánh giá của bạn đã được gửi thành công</p>
              <p className="text-sm text-muted-foreground mb-8">Phản hồi của bạn sẽ giúp chúng tôi cải thiện dịch vụ</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/appointments">
                  <Button variant="outline">Quay Lại Lịch Hẹn</Button>
                </Link>
                <Link href="/search">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Đặt Lịch Mới</Button>
                </Link>
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header isLoggedIn={true} />

      <main className="min-h-screen bg-background py-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Link
            href={`/appointments/${params.id}`}
            className="text-primary hover:text-primary/80 text-sm mb-6 inline-block"
          >
            ← Quay lại chi tiết lịch hẹn
          </Link>

          {/* Appointment Info */}
          <Card className="p-6 sm:p-8 shadow-lg mb-6 bg-secondary/30 border border-secondary/50">
            <h2 className="text-2xl font-bold text-foreground mb-4">Đánh Giá Lịch Khám</h2>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Phòng Khám</p>
                <p className="font-semibold text-foreground">{appointment.clinicName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground">Bác Sĩ</p>
                  <p className="font-semibold text-foreground">{appointment.doctor}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Ngày Khám</p>
                  <p className="font-semibold text-foreground">{appointment.date}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Review Form */}
          <Card className="p-6 sm:p-8 shadow-lg">
            <div className="space-y-8">
              {/* Star Rating */}
              <div>
                <label className="block text-lg font-bold text-foreground mb-4">
                  Đánh Giá Sao <span className="text-destructive">*</span>
                </label>
                <div className="flex gap-3 justify-center py-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="transition-all transform hover:scale-125"
                    >
                      <span
                        className={`text-6xl transition-colors ${
                          star <= (hoverRating || rating) ? "text-accent" : "text-muted"
                        }`}
                      >
                        ★
                      </span>
                    </button>
                  ))}
                </div>
                {rating > 0 && <p className="text-center text-sm text-muted-foreground">Bạn đã chọn {rating} sao</p>}
              </div>

              {/* Rating Labels */}
              {rating > 0 && (
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-sm font-semibold text-foreground">
                    {rating === 1 && "Rất không hài lòng"}
                    {rating === 2 && "Không hài lòng"}
                    {rating === 3 && "Bình thường"}
                    {rating === 4 && "Hài lòng"}
                    {rating === 5 && "Rất hài lòng"}
                  </p>
                </div>
              )}

              {/* Review Text */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-3">
                  Nhận Xét <span className="text-muted-foreground">(Tùy Chọn)</span>
                </label>
                <textarea
                  placeholder="Chia sẻ chi tiết trải nghiệm của bạn... (Ví dụ: Dịch vụ thế nào? Bác sĩ chuyên nghiệp? Cơ sở vật chất như thế nào?)"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  maxLength={1000}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none h-32"
                />
                <p className="text-xs text-muted-foreground mt-2 text-right">{review.length}/1000</p>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-3">
                  Ảnh Minh Chứng <span className="text-muted-foreground">(Tùy Chọn)</span>
                </label>

                {/* Upload Button */}
                <label className="flex items-center justify-center px-6 py-8 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">Nhấp để tải ảnh</p>
                    <p className="text-xs text-muted-foreground">hoặc kéo và thả</p>
                  </div>
                  <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>

                {/* Image Preview */}
                {uploadedImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {uploadedImages.map((image, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Preview ${idx}`}
                          className="w-full h-24 object-cover rounded-lg border border-border"
                        />
                        <button
                          onClick={() => removeImage(idx)}
                          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                        >
                          <X className="w-6 h-6 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Rating Info */}
              <Card className="bg-secondary/10 p-4 border border-secondary/50">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold">Lưu ý:</span> Đánh giá phải trung thực và không chứa nội dung quảng
                  cáo, xúc phạm hoặc thông tin cá nhân của người khác.
                </p>
              </Card>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Link href={`/appointments/${params.id}`} className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Hủy
                  </Button>
                </Link>
                <Button
                  onClick={handleSubmit}
                  disabled={rating === 0 || isSubmitting}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Đang Gửi..." : "Gửi Đánh Giá"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  )
}
