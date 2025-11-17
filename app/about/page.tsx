"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Target, Zap, Award, Globe } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">Về Chúng Tôi</h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                MaTrHiTr là nền tảng kết nối bệnh nhân với các cơ sở y tế hàng đầu, giúp đặt lịch khám bệnh dễ dàng, nhanh
                chóng và hiệu quả.
              </p>
            </div>
          </div>
        </section>
  
        {/* Mission & Vision */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Mission */}
              <div className="bg-secondary/30 rounded-2xl p-8 border border-secondary">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Sứ Mệnh</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Cung cấp giải pháp đặt lịch khám bệnh online hiện đại, an toàn và đáng tin cậy, giúp người dân tiếp cận
                  dịch vụ y tế chất lượng cao một cách thuận tiện nhất.
                </p>
              </div>
  
              {/* Vision */}
              <div className="bg-secondary/30 rounded-2xl p-8 border border-secondary">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Tầm Nhìn</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Trở thành nền tảng số 1 tại Việt Nam trong lĩnh vực y tế, kết nối hàng triệu bệnh nhân với các bác sĩ và
                  cơ sở y tế uy tín, giúp nâng cao chất lượng cuộc sống cộng đồng.
                </p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Core Values */}
        <section className="py-16 sm:py-24 bg-secondary/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12">Giá Trị Cốt Lõi</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Chăm Sóc Tâm Huyết",
                  description: "Chúng tôi luôn đặt sức khỏe và hạnh phúc của bệnh nhân lên hàng đầu",
                },
                {
                  icon: Zap,
                  title: "Nhanh Chóng & Hiệu Quả",
                  description: "Tối ưu hóa mọi quy trình để tiết kiệm thời gian cho người dùng",
                },
                {
                  icon: Award,
                  title: "Chất Lượng & Uy Tín",
                  description: "Chỉ hợp tác với các cơ sở y tế có chứng chỉ và uy tín cao",
                },
              ].map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
  
        {/* Team Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12">Đội Ngũ Của Chúng Tôi</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { name: "Nguyễn Văn A", role: "Sáng Lập Viên & CEO", image: "👨‍💼" },
                { name: "Trần Thị B", role: "CTO & Đồng Sáng Lập", image: "👩‍💻" },
                { name: "Lê Văn C", role: "Giám Đốc Y Tế", image: "👨‍⚕️" },
                { name: "Phạm Thị D", role: "Giám Đốc Marketing", image: "👩‍💼" },
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-secondary/30 rounded-2xl p-6 border border-secondary text-center hover:shadow-md transition-shadow"
                >
                  <div className="text-5xl mb-4 flex justify-center">{member.image}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Stats Section */}
        <section className="py-16 sm:py-24 bg-secondary/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "50K+", label: "Bệnh Nhân" },
                { number: "500+", label: "Phòng Khám" },
                { number: "2000+", label: "Bác Sĩ" },
                { number: "100K+", label: "Lịch Hẹn Thành Công" },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-primary/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Sẵn Sàng Tìm Phòng Khám Lý Tưởng?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Khám phá hàng trăm cơ sở y tế chất lượng cao trên nền tảng MaTrHiTr ngay hôm nay
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/search">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Tìm Phòng Khám
                </Button>
              </Link>
              <Link href="/partnership">
                <Button size="lg" variant="outline">
                  Hợp Tác Với Chúng Tôi
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>  )
}
