"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, AlertCircle, MessageSquare, Star } from "lucide-react"

interface TimelineStep {
  step: number
  title: string
  description: string
  completed: boolean
  date: string
}

export default function AppointmentDetailsPage({ params }: { params: { id: string } }) {
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [cancelReason, setCancelReason] = useState("")
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")

  // Mock appointment data
  const appointment = {
    id: params.id,
    appointmentCode: "APT001",
    clinicName: "Phòng Khám Sức Khỏe Gia Đình",
    clinicAddress: "Quận 1, TP HCM",
    doctor: "TS.BS Nguyễn Văn A",
    doctorSpecialty: "Tim Mạch",
    date: "2025-01-15",
    time: "10:00",
    reason: "Khám tổng quát, tiền sử sức khỏe gia đình",
    status: "confirmed" as const,
    patientName: "Nguyễn Văn B",
    patientPhone: "0901234567",
    patientEmail: "patient@email.com",
  }

  const timeline: TimelineStep[] = [
    {
      step: 1,
      title: "Đặt Lịch Thành Công",
      description: "Lịch hẹn được ghi nhận vào hệ thống",
      completed: true,
      date: "2025-01-10",
    },
    {
      step: 2,
      title: "Đang Chờ Xác Nhận",
      description: "Phòng khám sẽ xác nhận trong 24 giờ",
      completed: appointment.status !== "pending",
      date: "2025-01-11",
    },
    {
      step: 3,
      title: "Đã Xác Nhận",
      description: "Phòng khám đã xác nhận lịch hẹn của bạn",
      completed: appointment.status === "confirmed",
      date: "2025-01-12",
    },
    {
      step: 4,
      title: "Khám Bệnh",
      description: "Ngày khám bệnh của bạn",
      completed: false,
      date: "2025-01-15",
    },
  ]

  return (
    <>
      <Header isLoggedIn={true} />

      <main className="min-h-screen bg-background py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Link href="/appointments" className="text-primary hover:text-primary/80 text-sm mb-6 inline-block">
            ← Quay lại danh sách
          </Link>

          {/* Appointment Info Card */}
          <Card className="p-6 sm:p-8 shadow-lg mb-6">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{appointment.clinicName}</h1>
                <p className="text-sm text-muted-foreground mb-4">Mã lịch hẹn: {appointment.appointmentCode}</p>
                <div className="flex items-center gap-2">
                  {appointment.status === "confirmed" ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold text-primary">Đã Xác Nhận</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                      <span className="text-sm font-semibold text-amber-500">Chưa Xác Nhận</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Appointment Details */}
              <div className="space-y-4">
                <h3 className="font-bold text-foreground">Thông Tin Lịch Hẹn</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Ngày và Giờ</p>
                    <p className="font-semibold text-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" /> {appointment.date} lúc {appointment.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Bác Sĩ</p>
                    <p className="font-semibold text-foreground">{appointment.doctor}</p>
                    <p className="text-xs text-muted-foreground">{appointment.doctorSpecialty}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Lý Do Khám</p>
                    <p className="font-semibold text-foreground">{appointment.reason}</p>
                  </div>
                </div>
              </div>

              {/* Patient Info */}
              <div className="space-y-4">
                <h3 className="font-bold text-foreground">Thông Tin Bệnh Nhân</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Tên</p>
                    <p className="font-semibold text-foreground">{appointment.patientName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Số Điện Thoại</p>
                    <p className="font-semibold text-foreground">{appointment.patientPhone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-semibold text-foreground text-xs break-all">{appointment.patientEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-6 sm:p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-8">Trạng Thái Lịch Hẹn</h2>

            <div className="space-y-6">
              {timeline.map((item, idx) => (
                <div key={item.step} className="flex gap-4">
                  {/* Timeline dot and line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mb-4 ${
                        item.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.completed ? <CheckCircle className="w-6 h-6" /> : item.step}
                    </div>
                    {idx < timeline.length - 1 && (
                      <div className={`w-1 h-16 ${item.completed ? "bg-primary" : "bg-border"}`} />
                    )}
                  </div>

                  {/* Timeline content */}
                  <div className="pb-6 pt-1 flex-1">
                    <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <Card className="p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                {appointment.status === "confirmed" && (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1 sm:flex-none bg-transparent"
                      onClick={() => setShowCancelModal(true)}
                    >
                      Hủy Lịch Hẹn
                    </Button>
                    <Button variant="outline" className="flex-1 sm:flex-none bg-transparent">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Nhắn Tin
                    </Button>
                  </>
                )}
              </div>
              {appointment.status === "completed" && (
                <Link href={`/appointments/review/${appointment.id}`} className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Star className="w-4 h-4 mr-2" />
                    Đánh Giá Ngay
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        </div>
      </main>

      {/* Cancel Appointment Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md shadow-lg">
            <div className="p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-4 text-foreground">Hủy Lịch Hẹn</h3>
              <p className="text-muted-foreground mb-4">
                Bạn chắc chắn muốn hủy lịch hẹn này? Hành động này không thể hoàn tác.
              </p>
              <textarea
                placeholder="Vui lòng cho biết lý do hủy (tùy chọn)"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none h-24 mb-4"
              />
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCancelModal(false)
                    setCancelReason("")
                  }}
                >
                  Không
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setShowCancelModal(false)
                    setCancelReason("")
                  }}
                >
                  Xác Nhận Hủy
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="w-full max-w-md shadow-lg my-8">
            <div className="p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-2 text-foreground">Đánh Giá Phòng Khám</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Chia sẻ trải nghiệm của bạn để giúp chúng tôi cải thiện
              </p>

              {/* Star Rating */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3">Đánh Giá Sao *</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-3xl transition-all ${star <= rating ? "text-accent" : "text-muted"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-2">Nhận Xét (Tùy Chọn)</p>
                <textarea
                  placeholder="Chia sẻ cảm nhận chi tiết về dịch vụ..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none h-24"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-2">Ảnh Minh Chứng (Tùy Chọn)</p>
                <button className="w-full px-4 py-3 border-2 border-dashed border-border rounded-lg text-center hover:bg-secondary/20 transition-colors">
                  <p className="text-sm text-muted-foreground">Nhấp để tải ảnh</p>
                </button>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowReviewModal(false)
                    setRating(0)
                    setReview("")
                  }}
                >
                  Hủy
                </Button>
                <Button
                  onClick={() => {
                    setShowReviewModal(false)
                    setRating(0)
                    setReview("")
                  }}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={rating === 0}
                >
                  Gửi Đánh Giá
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Footer />
    </>
  )
}
