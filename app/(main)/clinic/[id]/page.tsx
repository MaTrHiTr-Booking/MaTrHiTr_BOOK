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
      <main className="min-h-screen bg-background pb-24 lg:pb-0">
        <div className="px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="mx-auto max-w-6xl">
            <Link href="/search" className="text-primary hover:text-primary/80 text-xs sm:text-sm mb-4 sm:mb-6 inline-block">
              ← Quay lại
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              
              {/* LEFT SIDE */}
              <div className="lg:col-span-2 space-y-3 sm:space-y-6">

                {/* Main Image */}
                <Card className="overflow-hidden bg-secondary/30 shadow-lg h-[180px] sm:h-[250px] md:h-[300px] lg:h-[380px]">
                  <img
                    src={clinic.images[activeImage] || "/placeholder.svg"}
                    alt="clinic"
                    className="w-full h-full object-cover"
                  />
                </Card>

                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {clinic.images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg border-2 overflow-hidden transition-all ${
                        activeImage === idx ? "border-primary" : "border-border"
                      }`}
                    >
                      <img src={image} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Clinic Info */}
                <Card className="p-4 sm:p-6 shadow">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">{clinic.name}</h1>

                  <div className="space-y-3 sm:space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-yellow-500" />
                        <span className="font-bold text-base sm:text-lg">{clinic.rating}</span>
                      </div>
                      <span className="text-xs sm:text-sm text-muted-foreground">({clinic.reviews} đánh giá)</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{clinic.location} ({clinic.distance} km)</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{clinic.hours}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{clinic.phone}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {clinic.specialty.map((spec) => (
                        <span key={spec} className="text-xs sm:text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid grid-cols-2 bg-secondary/20 p-1 rounded-lg">
                    <TabsTrigger value="about">Giới Thiệu</TabsTrigger>
                    <TabsTrigger value="doctors">Bác Sĩ</TabsTrigger>
                  </TabsList>

                  {/* About */}
                  <TabsContent value="about" className="mt-4 sm:mt-6">
                    <Card className="p-4 sm:p-6 shadow">
                      <h3 className="font-bold text-lg mb-4">Về Phòng Khám</h3>
                      <p className="text-sm text-muted-foreground mb-6">{clinic.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <Award className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-semibold text-sm">Chứng Chỉ Quốc Tế</p>
                            <p className="text-xs text-muted-foreground">ISO 9001:2015</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Users className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-semibold text-sm">Đội Ngũ Bác Sĩ</p>
                            <p className="text-xs text-muted-foreground">50+ chuyên gia</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>

                  {/* Doctors */}
                  <TabsContent value="doctors" className="mt-4 space-y-4">
                    {clinic.doctors.map((doctor) => (
                      <Card key={doctor.id} className="p-4 shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-base">{doctor.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Chuyên Khoa: {doctor.specialty}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Kinh Nghiệm: {doctor.experience}
                            </p>
                          </div>

                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                            <span className="font-bold">{doctor.rating}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>

              {/* RIGHT SIDEBAR (desktop only) */}
              <div className="lg:col-span-1 hidden lg:block">
                <Card className="p-6 shadow-lg sticky top-24 space-y-4">
                  <div className="bg-secondary/20 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Phí Đặt Lịch</p>
                    <p className="text-2xl font-bold text-primary">Miễn Phí</p>
                  </div>

                  <Link href={`/booking/${clinic.id}`}>
                    <Button className="w-full h-11 text-base bg-primary text-primary-foreground">
                      Đặt Lịch Ngay
                    </Button>
                  </Link>

                  <Button variant="outline" className="w-full h-11 text-base">
                    Gọi Ngay
                  </Button>

                  <div className="pt-4 border-t space-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Thời Gian Làm Việc</p>
                      <p className="font-semibold">8:00 - 18:00</p>
                      <p className="text-xs text-muted-foreground">Thứ 2 - Thứ 7</p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Địa Chỉ</p>
                      <p className="font-semibold">{clinic.location}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE BOTTOM CTA */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-background border-t border-border p-3 shadow-lg">
        <Link href={`/booking/${clinic.id}`}>
          <Button className="w-full h-11 text-base bg-primary text-primary-foreground rounded-xl">
            Đặt Lịch Ngay
          </Button>
        </Link>
      </div>
    </>
  )
}
