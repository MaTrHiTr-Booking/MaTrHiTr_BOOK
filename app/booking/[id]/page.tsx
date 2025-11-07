"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle } from "lucide-react"

export default function BookingPage({ params }: { params: { id: string } }) {
  const [step, setStep] = useState(1)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const [showUpdateInfoPopup, setShowUpdateInfoPopup] = useState(false)

  // Form states
  const [patientInfo, setPatientInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    dob: "",
  })

  const [appointmentInfo, setAppointmentInfo] = useState({
    date: "",
    time: "",
    reason: "",
    doctor: "",
  })

  const clinicName = "Phòng Khám Sức Khỏe Gia Đình"
  const doctors = ["TS.BS Nguyễn Văn A", "BS Trần Thị B", "BS Lê Văn C"]
  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ]

  const handleStep1Submit = () => {
    if (!isLoggedIn) {
      setShowLoginPopup(true)
    } else {
      setShowUpdateInfoPopup(true)
      setTimeout(() => setShowUpdateInfoPopup(false), 3000)
      setStep(2)
    }
  }

  const handleStep2Submit = () => {
    setStep(3)
    if (appointmentInfo.date && appointmentInfo.time && appointmentInfo.reason && appointmentInfo.doctor) {
      
    }
  }

  const handleStep3Submit = () => {
    setStep(4)
  }

  const handleUpdateImmediately = () => {
    setShowUpdateInfoPopup(false)
    setStep(2)
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />

      <main className="min-h-screen bg-background py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Steps Indicator */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                      s < step
                        ? "bg-primary text-primary-foreground"
                        : s === step
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/30"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s < step ? <CheckCircle className="w-6 h-6" /> : <span className="font-bold">{s}</span>}
                  </div>
                  <span className="text-xs sm:text-sm text-center text-muted-foreground">
                    {s === 1 ? "Xác Thực" : s === 2 ? "Thông Tin" : s === 3 ? "Xác Nhận" : "Hoàn Tất"}
                  </span>
                  {s < 4 && <div className={`h-1 w-12 mt-3 transition-all ${s < step ? "bg-primary" : "bg-border"}`} />}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Patient Info Verification */}
          {step === 1 && (
            <Card className="p-6 sm:p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-6">Bước 1: Xác Thực Thông Tin Cá Nhân</h2>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Họ và Tên *</label>
                  <Input
                    type="text"
                    placeholder="Nhập họ và tên"
                    value={patientInfo.fullName}
                    onChange={(e) => setPatientInfo({ ...patientInfo, fullName: e.target.value })}
                    disabled={isLoggedIn}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Số Điện Thoại *</label>
                    <Input
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      value={patientInfo.phone}
                      onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                      disabled={isLoggedIn}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                    <Input
                      type="email"
                      placeholder="Nhập email"
                      value={patientInfo.email}
                      onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
                      disabled={isLoggedIn}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Ngày Sinh</label>
                  <Input
                    type="date"
                    value={patientInfo.dob}
                    onChange={(e) => setPatientInfo({ ...patientInfo, dob: e.target.value })}
                    disabled={isLoggedIn}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Link href={`/clinic/${params.id}`}>
                  <Button variant="outline">Quay Lại</Button>
                </Link>
                <Button
                  onClick={handleStep1Submit}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={!patientInfo.fullName || !patientInfo.phone || !patientInfo.email}
                >
                  Tiếp Tục
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: Appointment Info */}
          {step === 2 && (
            <Card className="p-6 sm:p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-6">Bước 2: Thông Tin Lịch Khám</h2>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Ngày Khám *</label>
                  <Input
                    type="date"
                    value={appointmentInfo.date}
                    onChange={(e) => setAppointmentInfo({ ...appointmentInfo, date: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Giờ Khám *</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setAppointmentInfo({ ...appointmentInfo, time })}
                        className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          appointmentInfo.time === time
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Lý Do Khám *</label>
                  <textarea
                    placeholder="Mô tả lý do khám bệnh của bạn"
                    value={appointmentInfo.reason}
                    onChange={(e) => setAppointmentInfo({ ...appointmentInfo, reason: e.target.value })}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Chọn Bác Sĩ *</label>
                  <select
                    value={appointmentInfo.doctor}
                    onChange={(e) => setAppointmentInfo({ ...appointmentInfo, doctor: e.target.value })}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">-- Chọn bác sĩ --</option>
                    {doctors.map((doctor) => (
                      <option key={doctor} value={doctor}>
                        {doctor}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Quay Lại
                </Button>
                <Button onClick={handleStep2Submit} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Tiếp Tục
                </Button>
              </div>
            </Card>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <Card className="p-6 sm:p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-6">Bước 3: Xác Nhận Đặt Lịch</h2>

              <div className="space-y-6 mb-8">
                {/* Patient Info Summary */}
                <Card className="bg-secondary/20 p-4 border border-secondary">
                  <h3 className="font-bold mb-4 text-foreground">Thông Tin Bệnh Nhân</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Họ và Tên</p>
                      <p className="font-semibold text-foreground">{patientInfo.fullName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Số Điện Thoại</p>
                      <p className="font-semibold text-foreground">{patientInfo.phone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-semibold text-foreground">{patientInfo.email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ngày Sinh</p>
                      <p className="font-semibold text-foreground">{patientInfo.dob || "Chưa cập nhật"}</p>
                    </div>
                  </div>
                </Card>

                {/* Appointment Info Summary */}
                <Card className="bg-primary/5 p-4 border border-primary/20">
                  <h3 className="font-bold mb-4 text-foreground">Thông Tin Lịch Hẹn</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Phòng Khám</p>
                      <p className="font-semibold text-foreground">{clinicName}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-muted-foreground">Ngày</p>
                        <p className="font-semibold text-foreground">{appointmentInfo.date}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Giờ</p>
                        <p className="font-semibold text-foreground">{appointmentInfo.time}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Bác Sĩ</p>
                      <p className="font-semibold text-foreground">{appointmentInfo.doctor}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Lý Do Khám</p>
                      <p className="font-semibold text-foreground">{appointmentInfo.reason}</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-accent/10 p-4 border border-accent/20">
                  <p className="text-sm text-foreground">
                    <span className="font-bold">Phí Đặt Lịch:</span>{" "}
                    <span className="text-accent font-bold">Miễn Phí</span>
                  </p>
                </Card>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Quay Lại
                </Button>
                <Button onClick={handleStep3Submit} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Xác Nhận Đặt Lịch
                </Button>
              </div>
            </Card>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <Card className="p-6 sm:p-8 shadow-lg text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-2">Đặt Lịch Thành Công!</h2>
              <p className="text-muted-foreground mb-8">
                Lịch hẹn của bạn đã được tiếp nhận. Phòng khám sẽ liên hệ xác nhận trong 24 giờ.
              </p>

              <Card className="bg-secondary/20 p-6 mb-8 text-left">
                <h3 className="font-bold mb-4 text-foreground">Chi Tiết Lịch Hẹn</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Mã Lịch Hẹn:</span>{" "}
                    <span className="font-bold">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Phòng Khám:</span>{" "}
                    <span className="font-semibold">{clinicName}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Ngày/Giờ:</span>{" "}
                    <span className="font-semibold">
                      {appointmentInfo.date} lúc {appointmentInfo.time}
                    </span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Bác Sĩ:</span>{" "}
                    <span className="font-semibold">{appointmentInfo.doctor}</span>
                  </p>
                </div>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button variant="outline">Quay Lại Trang Chủ</Button>
                </Link>
                <Link href="/appointments">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Xem Lịch Hẹn</Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </main>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md shadow-lg">
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Đăng Nhập</h3>
              <p className="text-muted-foreground mb-6">Vui lòng đăng nhập hoặc tạo tài khoản để tiếp tục đặt lịch.</p>
              <div className="space-y-3 mb-6">
                <Button
                  onClick={() => {
                    setIsLoggedIn(true)
                    setShowLoginPopup(false)
                    setShowUpdateInfoPopup(true)
                  }}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Đăng Nhập
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowLoginPopup(false)}>
                  Tiếp Tục Với Email
                </Button>
              </div>
              <button onClick={() => setShowLoginPopup(false)} className="text-sm text-primary hover:text-primary/80">
                Đóng
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Update Info Popup */}
      {showUpdateInfoPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md shadow-lg">
            <div className="p-6 sm:p-8">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Xác Thực Thành Công</h3>
              <p className="text-muted-foreground mb-4">Cập nhật thông tin cá nhân để hoàn thiện hồ sơ?</p>
              <div className="space-y-3">
                <Button
                  onClick={handleUpdateImmediately}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Cập Nhật Ngay
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
