"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, CheckCircle2, TrendingUp, Users, Clock, Shield } from "lucide-react"

export default function PartnershipPage() {
  const [isOpen, setIsOpen] = useState(false)

  const features = [
    {
      icon: TrendingUp,
      title: "Tăng doanh thu",
      description: "Tiếp cận hàng triệu bệnh nhân tiềm năng trên nền tảng MaTrHiTr",
    },
    {
      icon: Users,
      title: "Quản lý dễ dàng",
      description: "Hệ thống quản lý lịch hẹn thông minh giúp tối ưu hóa công suất phòng khám",
    },
    {
      icon: Clock,
      title: "Tiết kiệm thời gian",
      description: "Tự động hóa quy trình đặt lịch, giảm tải cho nhân viên",
    },
    {
      icon: Shield,
      title: "An toàn dữ liệu",
      description: "Bảo mật thông tin bệnh nhân theo tiêu chuẩn quốc tế",
    },
  ]

  const benefits = [
    "Hiển thị trên top tìm kiếm",
    "Lịch làm việc linh hoạt",
    "Báo cáo chi tiết và phân tích",
    "Hỗ trợ 24/7",
    "Không phí thiết lập",
    "Thanh toán linh hoạt",
  ]

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
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Đăng nhập
                </Button>
              </Link>
              <Link href="/partnership-register">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Đăng ký hợp tác
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Phát triển phòng khám cùng MaTrHiTr</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Kết nối với hàng triệu bệnh nhân tiềm năng và phát triển doanh thu của bạn thông qua nền tảng đặt lịch khám
            trực tuyến hàng đầu Việt Nam
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/partnership-register">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Bắt đầu hợp tác
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500K+</div>
              <p className="text-muted-foreground">Bệnh nhân đã sử dụng</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1,200+</div>
              <p className="text-muted-foreground">Phòng khám hợp tác</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <p className="text-muted-foreground">Tỷ lệ hài lòng</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Tại sao chọn MaTrHiTr?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Những lợi ích khi hợp tác</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-secondary/30 rounded-xl h-64 flex items-center justify-center border border-secondary">
              <p className="text-muted-foreground">Hình ảnh minh họa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Gói hợp tác</h2>
          <p className="text-muted-foreground">Chọn gói phù hợp với quy mô phòng khám của bạn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Cơ bản", price: "Miễn phí", features: ["10 lịch hẹn/tháng", "Quản lý cơ bản", "Email support"] },
            {
              name: "Chuyên nghiệp",
              price: "4.99M/tháng",
              features: ["Lịch hẹn không giới hạn", "Báo cáo chi tiết", "Hỗ trợ ưu tiên", "API tích hợp"],
              highlight: true,
            },
            {
              name: "Doanh nghiệp",
              price: "Tùy chỉnh",
              features: ["Giải pháp toàn diện", "Hỗ trợ tài khoản riêng", "Tích hợp tùy chỉnh", "SLA 99.9%"],
            },
          ].map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-8 border transition-all ${
                plan.highlight ? "bg-primary/10 border-primary shadow-lg" : "bg-card border-border hover:shadow-md"
              }`}
            >
              <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-primary mb-6">{plan.price}</div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={plan.highlight ? "default" : "outline"} size="lg">
                Chọn gói này
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="mx-auto max-w-4xl text-center text-primary-foreground">
          <h2 className="text-4xl font-bold mb-6">Sẵn sàng phát triển cùng MaTrHiTr?</h2>
          <p className="text-lg opacity-90 mb-8">Tham gia cộng đồng hơn 1,200 phòng khám đang hợp tác với chúng tôi</p>
          <Link href="/partnership-register">
            <Button
              size="lg"
              className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary font-semibold"
            >
              Đăng ký hợp tác miễn phí
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Câu hỏi thường gặp</h2>

          <div className="space-y-4">
            {[
              {
                q: "Làm thế nào để đăng ký hợp tác?",
                a: "Bạn có thể đăng ký tại trang hợp tác của chúng tôi. Quá trình xác minh thông thường mất 1-2 ngày.",
              },
              {
                q: "Có phí thiết lập không?",
                a: "Không, chúng tôi không tính phí thiết lập. Bạn chỉ cần trả tiền cho gói bạn chọn.",
              },
              {
                q: "Tôi có thể hủy bất cứ lúc nào không?",
                a: "Có, bạn có thể hủy gói hợp tác bất cứ lúc nào mà không phải trả phí đơn phương.",
              },
              {
                q: "Hỗ trợ kỹ thuật có sẵn 24/7 không?",
                a: "Có, đội hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ qua email, chat và điện thoại.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-card rounded-lg p-6 border border-border">
                <button
                  onClick={() => setIsOpen(isOpen === index ? -1 : index)}
                  className="w-full flex items-center justify-between"
                >
                  <h3 className="font-semibold text-foreground text-left">{item.q}</h3>
                  <span className="text-primary ml-4">{isOpen === index ? "−" : "+"}</span>
                </button>
                {isOpen === index && <p className="text-muted-foreground mt-4">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-lg mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-primary">MaTrHiTr</span>
              </div>
              <p className="text-muted-foreground text-sm">Hệ thống đặt lịch khám bệnh trực tuyến hàng đầu Việt Nam</p>
            </div>
            {[
              { title: "Sản phẩm", links: ["Cho bệnh nhân", "Cho phòng khám", "Giá cả"] },
              { title: "Công ty", links: ["Về chúng tôi", "Blog", "Liên hệ"] },
              { title: "Pháp lý", links: ["Điều khoản", "Bảo mật", "Cookie"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold text-foreground mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© 2025 MaTrHiTr. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Facebook
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Twitter
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
