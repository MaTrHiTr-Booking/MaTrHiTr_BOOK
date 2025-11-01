"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChevronRight, Check } from "lucide-react"

export default function ClinicAdsRegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    clinicName: "",
    clinicType: "",
    phoneNumber: "",
    email: "",
    address: "",
    district: "",
    city: "",
    country: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    specialties: [],
    services: [],
    adPackage: "",
    adDuration: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const specialtiesOptions = [
    { id: "general", label: "Đa khoa" },
    { id: "cardio", label: "Tim mạch" },
    { id: "neuro", label: "Thần kinh" },
    { id: "ortho", label: "Xương khớp" },
    { id: "pediatric", label: "Nhi" },
    { id: "derma", label: "Da liễu" },
    { id: "dental", label: "Nha khoa" },
    { id: "ent", label: "Tai Mũi Họng" },
  ]

  const servicesOptions = [
    { id: "online", label: "Khám online" },
    { id: "home", label: "Khám tại nhà" },
    { id: "surgery", label: "Phẫu thuật" },
    { id: "dental", label: "Nha khoa" },
    { id: "ultrasound", label: "Siêu âm" },
    { id: "xray", label: "Chụp X-quang" },
  ]

  const adPackages = [
    {
      id: "basic",
      name: "Cơ bản",
      price: "1.000.000đ/tháng",
      features: ["Hiển thị trong tìm kiếm", "Đánh giá tối đa 100/tháng"],
    },
    {
      id: "pro",
      name: "Chuyên nghiệp",
      price: "3.000.000đ/tháng",
      features: ["Tất cả tính năng Cơ bản", "Hiển thị nổi bật", "Đánh giá tối đa 500/tháng"],
    },
    {
      id: "premium",
      name: "Premium",
      price: "5.000.000đ/tháng",
      features: ["Tất cả tính năng Chuyên nghiệp", "Vị trí đầu trang", "Hỗ trợ ưu tiên 24/7"],
    },
  ]

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const isStep1Valid =
    formData.clinicName && formData.clinicType && formData.phoneNumber && formData.email && formData.address

  const isStep2Valid = formData.ownerName && formData.ownerPhone && formData.ownerEmail

  const isStep3Valid = formData.specialties.length > 0 && formData.services.length > 0

  const isStep4Valid = formData.adPackage && formData.adDuration

  const handleSubmit = () => {
    if (isStep4Valid) {
      setSubmitted(true)
      console.log("Form submitted:", formData)
      setTimeout(() => {
        setStep(1)
        setFormData({
          clinicName: "",
          clinicType: "",
          phoneNumber: "",
          email: "",
          address: "",
          district: "",
          city: "",
          country: "",
          ownerName: "",
          ownerPhone: "",
          ownerEmail: "",
          specialties: [],
          services: [],
          adPackage: "",
          adDuration: "",
        })
        setSubmitted(false)
      }, 3000)
    }
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Đăng Ký Quảng Cáo Phòng Khám</h1>
            <p className="text-muted-foreground">Hoàn thành 4 bước để đăng ký quảng cáo cho phòng khám của bạn</p>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <Check className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-green-800 mb-2">Đăng Ký Thành Công!</h2>
              <p className="text-green-700">Chúng tôi sẽ xác nhận thông tin và liên hệ bạn trong 24 giờ</p>
            </div>
          )}

          {!submitted && (
            <>
              {/* Progress Indicator */}
              <div className="mb-12">
                <div className="flex items-center justify-between">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex items-center flex-1">
                      <button
                        onClick={() => s < step && setStep(s)}
                        className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all ${
                          s < step
                            ? "bg-green-500 text-white cursor-pointer"
                            : s === step
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {s < step ? <Check className="w-5 h-5" /> : s}
                      </button>
                      {s < 4 && <div className={`flex-1 h-1 mx-2 ${s < step ? "bg-green-500" : "bg-muted"}`} />}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                  <span>Thông tin phòng khám</span>
                  <span>Người đại diện</span>
                  <span>Dịch vụ</span>
                  <span>Gói quảng cáo</span>
                </div>
              </div>

              {/* Step 1: Clinic Information */}
              {step === 1 && (
                <Card className="p-8 border-border shadow-sm">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Thông Tin Phòng Khám</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Tên Phòng Khám *</label>
                      <input
                        type="text"
                        name="clinicName"
                        value={formData.clinicName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Nhập tên phòng khám"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Loại Phòng Khám *</label>
                      <select
                        name="clinicType"
                        value={formData.clinicType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Chọn loại phòng khám</option>
                        <option value="clinic">Phòng khám</option>
                        <option value="hospital">Bệnh viện</option>
                        <option value="specialty">Phòng khám chuyên khoa</option>
                        <option value="dental">Nha khoa</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Số Điện Thoại *</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="0901234567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="clinic@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Địa Chỉ *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Số nhà, tên đường"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Quận/Huyện</label>
                        <input
                          type="text"
                          name="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Quận 1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Thành phố</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="TP.HCM"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Quốc gia</label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Việt Nam"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Link href="/partnership">
                      <Button variant="outline">Hủy</Button>
                    </Link>
                    <Button onClick={() => setStep(2)} disabled={!isStep1Valid} className="ml-auto">
                      Tiếp Tục <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              )}

              {/* Step 2: Owner Information */}
              {step === 2 && (
                <Card className="p-8 border-border shadow-sm">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Thông Tin Người Đại Diện</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Họ Tên *</label>
                      <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Tên người đại diện"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Số Điện Thoại *</label>
                      <input
                        type="tel"
                        name="ownerPhone"
                        value={formData.ownerPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="0901234567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                      <input
                        type="email"
                        name="ownerEmail"
                        value={formData.ownerEmail}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="owner@example.com"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Quay Lại
                    </Button>
                    <Button onClick={() => setStep(3)} disabled={!isStep2Valid} className="ml-auto">
                      Tiếp Tục <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              )}

              {/* Step 3: Services & Specialties */}
              {step === 3 && (
                <Card className="p-8 border-border shadow-sm">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Dịch Vụ & Chuyên Khoa</h2>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Chuyên Khoa *</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {specialtiesOptions.map((specialty) => (
                        <button
                          key={specialty.id}
                          onClick={() => handleSpecialtyToggle(specialty.id)}
                          className={`p-3 rounded-lg border-2 text-left font-medium transition-all ${
                            formData.specialties.includes(specialty.id)
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border text-foreground hover:border-primary/50"
                          }`}
                        >
                          {specialty.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Dịch Vụ Cung Cấp *</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {servicesOptions.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => handleServiceToggle(service.id)}
                          className={`p-3 rounded-lg border-2 text-left font-medium transition-all ${
                            formData.services.includes(service.id)
                              ? "border-accent bg-accent/5 text-accent"
                              : "border-border text-foreground hover:border-accent/50"
                          }`}
                        >
                          {service.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Quay Lại
                    </Button>
                    <Button onClick={() => setStep(4)} disabled={!isStep3Valid} className="ml-auto">
                      Tiếp Tục <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              )}

              {/* Step 4: Ad Package Selection */}
              {step === 4 && (
                <div className="space-y-8">
                  <Card className="p-8 border-border shadow-sm">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Chọn Gói Quảng Cáo</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {adPackages.map((pkg) => (
                        <button
                          key={pkg.id}
                          onClick={() => setFormData((prev) => ({ ...prev, adPackage: pkg.id }))}
                          className={`p-6 rounded-lg border-2 text-left transition-all ${
                            formData.adPackage === pkg.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <h3 className="text-lg font-bold text-foreground mb-2">{pkg.name}</h3>
                          <p className="text-primary font-bold text-lg mb-4">{pkg.price}</p>
                          <ul className="space-y-2">
                            {pkg.features.map((feature, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                                <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Thời Hạn Quảng Cáo *</label>
                      <select
                        name="adDuration"
                        value={formData.adDuration}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Chọn thời hạn</option>
                        <option value="1">1 tháng</option>
                        <option value="3">3 tháng</option>
                        <option value="6">6 tháng (Giảm 10%)</option>
                        <option value="12">12 tháng (Giảm 20%)</option>
                      </select>
                    </div>
                  </Card>

                  {/* Summary */}
                  <Card className="p-8 border-border shadow-sm">
                    <h3 className="text-lg font-bold text-foreground mb-6">Tóm Tắt Đơn Đăng Ký</h3>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-start pb-4 border-b border-border">
                        <span className="text-muted-foreground">Phòng khám:</span>
                        <span className="font-semibold">{formData.clinicName}</span>
                      </div>
                      <div className="flex justify-between items-start pb-4 border-b border-border">
                        <span className="text-muted-foreground">Người đại diện:</span>
                        <span className="font-semibold">{formData.ownerName}</span>
                      </div>
                      <div className="flex justify-between items-start pb-4 border-b border-border">
                        <span className="text-muted-foreground">Chuyên khoa:</span>
                        <span className="font-semibold">{formData.specialties.length} chuyên khoa</span>
                      </div>
                      <div className="flex justify-between items-start pb-4 border-b border-border">
                        <span className="text-muted-foreground">Dịch vụ:</span>
                        <span className="font-semibold">{formData.services.length} dịch vụ</span>
                      </div>
                      <div className="flex justify-between items-start pt-4">
                        <span className="text-foreground font-bold">Gói quảng cáo:</span>
                        <span className="font-bold text-primary">
                          {adPackages.find((p) => p.id === formData.adPackage)?.name} - {formData.adDuration} tháng
                        </span>
                      </div>
                    </div>
                  </Card>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(3)}>
                      Quay Lại
                    </Button>
                    <Button onClick={handleSubmit} disabled={!isStep4Valid} className="ml-auto">
                      Xác Nhận Đăng Ký
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {submitted && (
            <div className="text-center">
              <Link href="/">
                <Button className="mt-4">Quay Lại Trang Chủ</Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
