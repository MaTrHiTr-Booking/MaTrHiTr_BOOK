"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Phone, Mail } from "lucide-react"

export default function PartnershipRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Clinic Info
    clinicName: "",
    clinicType: "",
    foundedYear: "",

    // Contact Person
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    position: "",

    // Location
    address: "",
    ward: "",
    district: "",
    city: "",

    // Services
    services: [],
    doctors: "",
    capacity: "",
    workingHours: "8h-18h",
    workingDays: "Thứ 2 - Thứ 7",

    // Additional
    agreeTerms: false,
  })

  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const services = [
    "Khám tổng quát",
    "Nha khoa",
    "Phụ khoa",
    "Tim mạch",
    "Ngoại khoa",
    "Nội khoa",
    "Xương khớp",
    "Mắt",
    "Tai Mũi Họng",
    "Tâm thần",
    "Da liễu",
    "Sản phụ khoa",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const toggleService = (service: string) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Partnership registration submitted:", { ...formData, services: selectedServices })
    alert("Cảm ơn bạn đã đăng ký hợp tác! Chúng tôi sẽ liên hệ với bạn sớm.")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-primary">MaTrHiTr</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/partnership">
                <Button variant="ghost" size="sm">
                  Quay lại
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex-1 h-2 mx-1 rounded-full transition-colors ${
                  step <= currentStep ? "bg-primary" : "bg-secondary"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Bước 1: Thông tin phòng khám</span>
            <span>Bước 2: Người đại diện</span>
            <span>Bước 3: Địa chỉ & Dịch vụ</span>
            <span>Bước 4: Xác nhận</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Clinic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Thông tin phòng khám</h2>
                <p className="text-muted-foreground">Vui lòng cung cấp thông tin cơ bản về phòng khám của bạn</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tên phòng khám</label>
                  <input
                    type="text"
                    name="clinicName"
                    value={formData.clinicName}
                    onChange={handleInputChange}
                    placeholder="Nhập tên phòng khám"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Loại hình phòng khám</label>
                    <select
                      name="clinicType"
                      value={formData.clinicType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Chọn loại hình</option>
                      <option value="private">Phòng khám tư nhân</option>
                      <option value="clinic">Phòng khám y tế</option>
                      <option value="hospital">Bệnh viện</option>
                      <option value="dental">Phòng khám nha khoa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Năm thành lập</label>
                    <input
                      type="number"
                      name="foundedYear"
                      value={formData.foundedYear}
                      onChange={handleInputChange}
                      placeholder="Năm"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Person */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Thông tin người đại diện</h2>
                <p className="text-muted-foreground">Vui lòng cung cấp thông tin liên hệ chính</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Họ và tên</label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Chức vụ</label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Chọn chức vụ</option>
                    <option value="director">Giám đốc</option>
                    <option value="manager">Quản lý</option>
                    <option value="doctor">Bác sĩ</option>
                    <option value="staff">Nhân viên</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="Nhập số điện thoại"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="Nhập email"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location & Services */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Địa chỉ & Dịch vụ</h2>
                <p className="text-muted-foreground">Vui lòng cung cấp địa chỉ và các dịch vụ của phòng khám</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Địa chỉ</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Nhập địa chỉ"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phường/Xã</label>
                    <input
                      type="text"
                      name="ward"
                      value={formData.ward}
                      onChange={handleInputChange}
                      placeholder="Nhập phường"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Quận/Huyện</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      placeholder="Nhập quận"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Thành phố</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Nhập thành phố"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Dịch vụ khám bệnh</label>
                  <div className="grid grid-cols-2 gap-3">
                    {services.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`p-3 rounded-lg border transition-colors text-sm font-medium ${
                          selectedServices.includes(service)
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-foreground border-border hover:border-primary"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Số bác sĩ</label>
                    <input
                      type="number"
                      name="doctors"
                      value={formData.doctors}
                      onChange={handleInputChange}
                      placeholder="Nhập số bác sĩ"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Sức chứa (bệnh nhân/ngày)</label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      placeholder="Nhập sức chứa"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Xác nhận thông tin</h2>
                <p className="text-muted-foreground">Vui lòng kiểm tra lại thông tin trước khi gửi</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Phòng khám</h3>
                    <p className="font-medium text-foreground">{formData.clinicName || "Chưa nhập"}</p>
                    <p className="text-sm text-muted-foreground">{formData.clinicType || "Chưa chọn"}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Người đại diện</h3>
                    <p className="font-medium text-foreground">{formData.contactName || "Chưa nhập"}</p>
                    <p className="text-sm text-muted-foreground">{formData.position || "Chưa chọn"}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Địa chỉ</h3>
                    <p className="font-medium text-foreground">{formData.address || "Chưa nhập"}</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.district}, {formData.city}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Dịch vụ</h3>
                    <p className="font-medium text-foreground">{selectedServices.length} dịch vụ được chọn</p>
                    <p className="text-sm text-muted-foreground">{selectedServices.slice(0, 2).join(", ")}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Liên hệ</h3>
                  <div className="space-y-1 text-sm">
                    <p className="flex items-center gap-2 text-foreground">
                      <Phone className="w-4 h-4" /> {formData.contactPhone || "Chưa nhập"}
                    </p>
                    <p className="flex items-center gap-2 text-foreground">
                      <Mail className="w-4 h-4" /> {formData.contactEmail || "Chưa nhập"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 mt-1 border border-border rounded focus:ring-2 focus:ring-primary"
                      required
                    />
                    <span className="text-sm text-foreground">
                      Tôi đó là đã đọc và đồng ý với{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Điều khoản hợp tác
                      </Link>{" "}
                      và{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Chính sách bảo mật
                      </Link>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="flex-1 bg-transparent"
            >
              Quay lại
            </Button>

            {currentStep < 4 ? (
              <Button type="button" onClick={handleNext} className="flex-1 bg-primary hover:bg-primary/90">
                Tiếp tục
              </Button>
            ) : (
              <Button type="submit" disabled={!formData.agreeTerms} className="flex-1 bg-primary hover:bg-primary/90">
                Gửi đơn đăng ký
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
