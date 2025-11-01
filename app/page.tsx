import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { CheckCircle, Shield, Clock, Star, MapPin, ChevronDown } from "lucide-react"

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
                Đặt Lịch Khám Bệnh <span className="text-primary">Dễ Dàng</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Tìm và đặt lịch với các phòng khám uy tín, bác sĩ chuyên nghiệp chỉ trong vài phút
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/search">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Tìm Phòng Khám Ngay
                  </Button>
                </Link>
                <Link href="/search?nearby=true">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Tìm Gần Nhất
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            {/* <div className="mt-12 sm:mt-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 aspect-video flex items-center justify-center border border-primary/20">
              <div className="text-center text-muted-foreground">
                <p className="text-sm">Giao diện tìm kiếm phòng khám</p>
              </div>
            </div> */}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Tại Sao Chọn MaTrHiTr?</h2>
              <p className="text-muted-foreground text-lg">Nền tảng đáng tin cậy cho sức khỏe của bạn</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <Card className="p-6 border-border shadow transition-shadow hover:shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Phòng Khám Đã Xác Thực</h3>
                <p className="text-sm text-muted-foreground">Tất cả phòng khám đều được kiểm tra và xác thực</p>
              </Card>

              {/* Feature 2 */}
              <Card className="p-6 border-border shadow transition-shadow hover:shadow-md">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2">Đặt Lịch Nhanh</h3>
                <p className="text-sm text-muted-foreground">Hoàn tất quá trình đặt lịch trong chỉ 3 bước</p>
              </Card>

              {/* Feature 3 */}
              <Card className="p-6 border-border shadow transition-shadow hover:shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Bảo Mật Dữ Liệu</h3>
                <p className="text-sm text-muted-foreground">Thông tin cá nhân của bạn được bảo vệ an toàn</p>
              </Card>

              {/* Feature 4 */}
              <Card className="p-6 border-border shadow transition-shadow hover:shadow-md">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2">Đánh Giá Thật</h3>
                <p className="text-sm text-muted-foreground">Đánh giá từ những bệnh nhân thực tế</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Statistics Section - Added to show credibility */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">50K+</div>
                <p className="text-sm sm:text-base text-muted-foreground">Bệnh nhân</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-sm sm:text-base text-muted-foreground">Phòng khám</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">100K+</div>
                <p className="text-sm sm:text-base text-muted-foreground">Lịch hẹn</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">4.8★</div>
                <p className="text-sm sm:text-base text-muted-foreground">Đánh giá</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Clinics Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Phòng Khám Nổi Bật</h2>
                <p className="text-muted-foreground">Các phòng khám được đánh giá cao và uy tín</p>
              </div>
              <Link href="/clinic-ads">
                <Button variant="ghost" className="text-primary hover:text-primary/80">
                  Xem tất cả →
                </Button>
              </Link>
            </div>

            {/* Featured Clinics Carousel */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Featured Clinic 1 */}
              <Card className="overflow-hidden border-border shadow transition-shadow hover:shadow-md cursor-pointer">
                <div className="relative h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Quảng cáo
                  </div>
                  <div className="text-4xl text-primary">🏥</div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">Phòng Khám Tổng Hợp MaTrHiTr 1</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-semibold">4.9</span>
                    <span className="text-sm text-muted-foreground">(320 đánh giá)</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Đa khoa, bác sĩ chuyên nghiệp, trang thiết bị hiện đại
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>Quận 1, TP.HCM • 2.5km</span>
                  </div>
                  <Link href="/clinic/1">
                    <Button className="w-full bg-primary hover:bg-primary/90">Đặt lịch ngay</Button>
                  </Link>
                </div>
              </Card>

              {/* Featured Clinic 2 */}
              <Card className="overflow-hidden border-border shadow transition-shadow hover:shadow-md cursor-pointer">
                <div className="relative h-40 bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                  <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Quảng cáo
                  </div>
                  <div className="text-4xl">🩺</div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">Phòng Khám Chuyên Khoa MaTrHiTr 2</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-semibold">4.8</span>
                    <span className="text-sm text-muted-foreground">(285 đánh giá)</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Tim mạch, hô hấp, thần kinh, da liễu</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>Quận 3, TP.HCM • 3.1km</span>
                  </div>
                  <Link href="/clinic/2">
                    <Button className="w-full bg-primary hover:bg-primary/90">Đặt lịch ngay</Button>
                  </Link>
                </div>
              </Card>

              {/* Featured Clinic 3 */}
              <Card className="overflow-hidden border-border shadow transition-shadow hover:shadow-md cursor-pointer">
                <div className="relative h-40 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                  <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Quảng cáo
                  </div>
                  <div className="text-4xl">⚕️</div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">Bệnh Viện Quốc Tế MaTrHiTr</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-semibold">4.7</span>
                    <span className="text-sm text-muted-foreground">(412 đánh giá)</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Bệnh viện quốc tế, dịch vụ cao cấp, giỏi khám ngoài giờ
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>Quận 5, TP.HCM • 4.2km</span>
                  </div>
                  <Link href="/clinic/3">
                    <Button className="w-full bg-primary hover:bg-primary/90">Đặt lịch ngay</Button>
                  </Link>
                </div>
              </Card>
            </div>

            {/* Register for Ads CTA */}
            <div className="mt-12 bg-primary rounded-2xl px-6 sm:px-12 py-8 sm:py-10 text-center text-primary-foreground shadow-md">
              <h3 className="text-2xl font-bold mb-2">Bạn là chủ phòng khám?</h3>
              <p className="text-primary-foreground/90 mb-6">
                Đăng ký quảng cáo phòng khám của bạn để tiếp cận hàng nghìn bệnh nhân
              </p>
              <Link href="/clinic-ads/register">
                <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-background/90">
                  Đăng Ký Quảng Cáo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section - Added to answer common questions */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Câu Hỏi Thường Gặp</h2>
              <p className="text-muted-foreground">Tìm hiểu thêm về dịch vụ của chúng tôi</p>
            </div>

            <div className="space-y-4">
              {/* FAQ Item 1 */}
              <details className="group border border-border rounded-lg overflow-hidden shadow transition-shadow hover:shadow-md">
                <summary className="flex items-center justify-between cursor-pointer p-6 bg-background hover:bg-secondary/10 font-semibold">
                  <span>Làm cách nào để đặt lịch khám bệnh?</span>
                  <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 py-4 border-t border-border bg-background/50 text-muted-foreground">
                  Chỉ cần bước vào trang "Tìm Phòng Khám", chọn phòng khám mong muốn, chọn ngày giờ, cung cấp thông tin
                  cá nhân, và xác nhận. Bạn sẽ nhận được xác nhận lịch qua email.
                </div>
              </details>

              {/* FAQ Item 2 */}
              <details className="group border border-border rounded-lg overflow-hidden shadow transition-shadow hover:shadow-md">
                <summary className="flex items-center justify-between cursor-pointer p-6 bg-background hover:bg-secondary/10 font-semibold">
                  <span>Có phí đặt lịch không?</span>
                  <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 py-4 border-t border-border bg-background/50 text-muted-foreground">
                  Không! Dịch vụ đặt lịch của MaTrHiTr hoàn toàn miễn phí. Bạn chỉ thanh toán khi khám bệnh tại phòng
                  khám.
                </div>
              </details>

              {/* FAQ Item 3 */}
              <details className="group border border-border rounded-lg overflow-hidden shadow transition-shadow hover:shadow-md">
                <summary className="flex items-center justify-between cursor-pointer p-6 bg-background hover:bg-secondary/10 font-semibold">
                  <span>Tôi có thể hủy lịch khám được không?</span>
                  <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 py-4 border-t border-border bg-background/50 text-muted-foreground">
                  Có, bạn có thể hủy lịch khám tối thiểu 24 giờ trước giờ hẹn. Vào mục "Quản lý lịch hẹn" và chọn "Hủy
                  lịch khám".
                </div>
              </details>

              {/* FAQ Item 4 */}
              <details className="group border border-border rounded-lg overflow-hidden shadow transition-shadow hover:shadow-md">
                <summary className="flex items-center justify-between cursor-pointer p-6 bg-background hover:bg-secondary/10 font-semibold">
                  <span>Thông tin cá nhân của tôi có an toàn không?</span>
                  <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 py-4 border-t border-border bg-background/50 text-muted-foreground">
                  Tuyệt đối! Chúng tôi sử dụng mã hóa SSL 256-bit để bảo vệ tất cả dữ liệu cá nhân của bạn và tuân thủ
                  các tiêu chuẩn bảo mật quốc tế.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="bg-primary rounded-2xl px-6 sm:px-12 py-12 sm:py-16 text-center text-primary-foreground shadow-lg">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Bắt Đầu Ngay Hôm Nay</h2>
              <p className="text-primary-foreground/90 mb-8 text-lg">
                Không phí đặt lịch, không ẩn giấu, minh bạch 100%
              </p>
              <Link href="/search">
                <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-background/90">
                  Tìm Phòng Khám
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
