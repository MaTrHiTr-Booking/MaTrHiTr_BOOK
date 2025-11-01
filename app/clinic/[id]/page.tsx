"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Clock, Phone, Users, Award } from "lucide-react"

export default function ClinicDetailsPage({ params }: { params: { id: string } }) {
  const [activeImage, setActiveImage] = useState(0)

  // Mock data
  const clinic = {
    id: params.id,
    name: "Phòng Khám Sức Khỏe Gia Đình",
    rating: 4.8,
    reviews: 234,
    specialty: ["Khám Tổng Quát", "Nha Khoa", "Tim Mạch"],
    location: "Quận 1, TP HCM",
    distance: 2.3,
    phone: "028 1234 5678",
    hours: "8:00 - 18:00 (Thứ 2 - Thứ 7)",
    description:
      "Phòng khám sức khỏe gia đình là một trong những cơ sở y tế hàng đầu tại TP HCM, cung cấp các dịch vụ khám chữa bệnh chất lượng cao với đội ngũ bác sĩ chuyên môn và trang thiết bị hiện đại.",
    images: ["/modern-clinic-reception.jpg", "/diverse-medical-equipment.png", "/doctor-office.png"],
    doctors: [
      {
        id: 1,
        name: "TS.BS Nguyễn Văn A",
        specialty: "Tim Mạch",
        experience: "15 năm",
        rating: 4.9,
      },
      {
        id: 2,
        name: "BS Trần Thị B",
        specialty: "Nha Khoa",
        experience: "10 năm",
        rating: 4.8,
      },
      {
        id: 3,
        name: "BS Lê Văn C",
        specialty: "Khám Tổng Quát",
        experience: "8 năm",
        rating: 4.7,
      },
    ],
    services: [
      {
        id: 1,
        name: "Khám Sức Khỏe Định Kỳ",
        price: "500.000 đ",
        description: "Khám toàn bộ cơ thể, xét nghiệm cơ bản",
      },
      {
        id: 2,
        name: "Điều Trị Tim Mạch",
        price: "1.000.000 đ",
        description: "Điều trị bệnh tim mạch với công nghệ hiện đại",
      },
      {
        id: 3,
        name: "Tẩy Trắng Răng",
        price: "3.000.000 đ",
        description: "Dịch vụ tẩy trắng răng an toàn và hiệu quả",
      },
      {
        id: 4,
        name: "Nhổ Răng",
        price: "800.000 đ",
        description: "Nhổ răng với kỹ thuật hiện đại, không đau",
      },
    ],
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="mx-auto max-w-6xl">
            <Link href="/search" className="text-primary hover:text-primary/80 text-sm mb-6 inline-block">
              ← Quay lại
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Images and Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Main Image */}
                <Card className="overflow-hidden bg-secondary/30 shadow-lg">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <img
                      src={clinic.images[activeImage] || "/placeholder.svg"}
                      alt="clinic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Card>

                {/* Thumbnail Images */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {clinic.images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-20 h-20 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all ${
                        activeImage === idx ? "border-primary" : "border-border"
                      }`}
                    >
                      <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Clinic Info Card */}
                <Card className="p-6 shadow">
                  <h1 className="text-3xl font-bold text-foreground mb-4">{clinic.name}</h1>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-accent text-accent" />
                        <span className="font-bold text-lg">{clinic.rating}</span>
                      </div>
                      <span className="text-muted-foreground">({clinic.reviews} đánh giá)</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-5 h-5 flex-shrink-0" />
                      {clinic.location} ({clinic.distance} km)
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-5 h-5 flex-shrink-0" />
                      {clinic.hours}
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-5 h-5 flex-shrink-0" />
                      {clinic.phone}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {clinic.specialty.map((spec) => (
                        <span key={spec} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-secondary/20 p-1 rounded-lg">
                    <TabsTrigger value="about">Giới Thiệu</TabsTrigger>
                    <TabsTrigger value="doctors">Bác Sĩ</TabsTrigger>
                    <TabsTrigger value="services">Dịch Vụ</TabsTrigger>
                  </TabsList>

                  {/* About Tab */}
                  <TabsContent value="about" className="mt-6">
                    <Card className="p-6 shadow">
                      <h3 className="font-bold text-lg mb-4">Về Phòng Khám</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">{clinic.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <Award className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold text-sm">Chứng Chỉ Quốc Tế</p>
                            <p className="text-xs text-muted-foreground">ISO 9001:2015</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold text-sm">Đội Ngũ Bác Sĩ</p>
                            <p className="text-xs text-muted-foreground">50+ chuyên gia</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>

                  {/* Doctors Tab */}
                  <TabsContent value="doctors" className="mt-6 space-y-4">
                    {clinic.doctors.map((doctor) => (
                      <Card key={doctor.id} className="p-4 shadow">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-bold text-foreground mb-1">{doctor.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">Chuyên Khoa: {doctor.specialty}</p>
                            <p className="text-sm text-muted-foreground">Kinh Nghiệm: {doctor.experience}</p>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Star className="w-4 h-4 fill-accent text-accent" />
                            <span className="font-bold text-sm">{doctor.rating}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </TabsContent>

                  {/* Services Tab */}
                  <TabsContent value="services" className="mt-6 space-y-3">
                    {clinic.services.map((service) => (
                      <Card key={service.id} className="p-4 shadow">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-bold text-foreground mb-1">{service.name}</h4>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-primary text-lg">{service.price}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right: CTA and Quick Info */}
              <div className="lg:col-span-1">
                <Card className="p-6 shadow-lg sticky top-24 space-y-4">
                  <div className="bg-secondary/20 rounded-lg p-4 mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Phí Đặt Lịch</p>
                    <p className="text-2xl font-bold text-primary">Miễn Phí</p>
                  </div>

                  <Link href={`/booking/${clinic.id}`} className="w-full">
                    <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Đặt Lịch Ngay
                    </Button>
                  </Link>

                  <Button variant="outline" className="w-full bg-transparent">
                    Gọi Ngay
                  </Button>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">Thời Gian Làm Việc</p>
                      <p className="font-semibold text-foreground">8:00 - 18:00</p>
                      <p className="text-xs text-muted-foreground">Thứ 2 - Thứ 7</p>
                    </div>

                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">Địa Chỉ</p>
                      <p className="font-semibold text-foreground text-sm">{clinic.location}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
