"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, Eye, EyeOff } from "lucide-react"
import { register } from "@/lib/api/auth"
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    // if (!formData.fullName.trim()) {
    //   newErrors.fullName = "Vui lòng nhập họ tên"
    // }

    if (!formData.email.includes("@")) {
      newErrors.email = "Email không hợp lệ"
    }

    // if (!formData.phone || formData.phone.length < 10) {
    //   newErrors.phone = "Số điện thoại không hợp lệ"
    // }

    if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp"
    }

    if (!formData.agree) {
      newErrors.agree = "Vui lòng đồng ý với điều khoản dịch vụ"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)
      
      try {
        // Gọi API đăng ký
        const result = await register({
          // username: formData.email.split("@")[0], // Tạo username từ email
          email: formData.email,
          password: formData.password,
          role: "CLINIC"
          // fullName: formData.fullName,
          // phone: formData.phone,
        })

        if (result.success) {
          toast({
            title: "Thành công",
            description: result.message,
          })
          // Redirect to login page
          router.push("/login")
        } else {
          toast({
            title: "Lỗi",
            description: result.message,
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Lỗi",
          description: "Có lỗi xảy ra, vui lòng thử lại",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-8">
        <div className="text-center text-primary-foreground max-w-md">
          <div className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold mb-4">MaTrHiTr</h1>
          <p className="text-lg opacity-90 mb-8">Hệ thống đặt lịch khám bệnh trực tuyến hàng đầu Việt Nam</p>
          <div className="space-y-4 text-sm opacity-80">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary-foreground/30 flex-shrink-0 mt-1"></div>
              <p>Đặt lịch khám dễ dàng và nhanh chóng</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary-foreground/30 flex-shrink-0 mt-1"></div>
              <p>Kết nối với hàng nghìn phòng khám uy tín</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary-foreground/30 flex-shrink-0 mt-1"></div>
              <p>Quản lý lịch hẹn của bạn dễ dàng</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 font-bold text-2xl mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-primary">MaTrHiTr</span>
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-2">Đăng ký</h2>
          <p className="text-muted-foreground mb-8">Tạo tài khoản để bắt đầu đặt lịch khám</p>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            {/* <div>
              <label className="block text-sm font-medium text-foreground mb-2">Họ và tên</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
                className={`w-full px-4 py-3 rounded-lg bg-input border transition-colors ${
                  errors.fullName ? "border-destructive" : "border-border"
                } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
            </div> */}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-lg bg-input border transition-colors ${
                  errors.email ? "border-destructive" : "border-border"
                } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            {/* <div>
              <label className="block text-sm font-medium text-foreground mb-2">Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0901234567"
                className={`w-full px-4 py-3 rounded-lg bg-input border transition-colors ${
                  errors.phone ? "border-destructive" : "border-border"
                } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
            </div> */}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Mật khẩu</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-lg bg-input border transition-colors ${
                    errors.password ? "border-destructive" : "border-border"
                  } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Xác nhận mật khẩu</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-lg bg-input border transition-colors ${
                    errors.confirmPassword ? "border-destructive" : "border-border"
                  } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms Agreement */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-border cursor-pointer mt-1"
                />
                <span className="text-sm text-muted-foreground">
                  Tôi đồng ý với{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Điều khoản dịch vụ
                  </Link>{" "}
                  và{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Chính sách bảo mật
                  </Link>
                </span>
              </label>
              {errors.agree && <p className="text-destructive text-sm mt-1">{errors.agree}</p>}
            </div>

            {/* Signup Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors"
              onClick={handleSignup}
            >
              {isLoading ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-muted-foreground mt-6">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>


   
    </div>
  )
}


  //  <div className="mx-auto max-w-md self-center">
  //       {/* Logo */}
  //       {/* <div className="flex items-center gap-2 font-bold text-2xl mb-8 justify-center">
  //         <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
  //           <Heart className="w-6 h-6 text-primary-foreground" />
  //         </div>
  //         <span className="text-primary">MaTrHiTr</span>
  //       </div> */}

  //       <h2 className="text-3xl font-bold text-foreground mb-2 text-center">Đăng ký</h2>
  //       <p className="text-muted-foreground mb-8 text-center">Tạo tài khoản để bắt đầu đặt lịch khám</p>

  //       <form onSubmit={handleSignup} className="space-y-4">
  //         {/* Full Name */}
  //         <div>
  //           <label className="block text-sm font-medium text-foreground mb-2">Họ và tên</label>
  //           <input
  //             type="text"
  //             name="fullName"
  //             value={formData.fullName}
  //             onChange={handleChange}
  //             placeholder="Nguyễn Văn A"
  //             className={`w-full px-4 py-3 rounded-lg bg-input border transition-colors ${
  //               errors.fullName ? "border-destructive" : "border-border"
  //             } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
  //           />
  //           {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
  //         </div>

  //         {/* Email */}
  //         <div>
  //           <label className="block text-sm font-medium text-foreground mb-2">Email</label>
  //           <input
  //             type="email"
  //             name="email"
  //             value={formData.email}
  //             onChange={handleChange}
  //             placeholder="you@example.com"
  //             className={`w-full px-4 py-3 rounded-lg bg-input border transition-colors ${
  //               errors.email ? "border-destructive" : "border-border"
  //             } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
  //           />
  //           {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
  //         </div>

  //         {/* Phone */}
  //         {/*  */}

  //         {/* Password */}
  //         <div>
  //           <label className="block text-sm font-medium text-foreground mb-2">Mật khẩu</label>
  //           <div className="relative">
  //             <input
  //               type={showPassword ? "text" : "password"}
  //               name="password"
  //               value={formData.password}
  //               onChange={handleChange}
  //               placeholder="••••••••"
  //               className={`w-full px-4 py-3 rounded-lg bg-input border transition-colors ${
  //                 errors.password ? "border-destructive" : "border-border"
  //               } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
  //             />
  //             <button
  //               type="button"
  //               onClick={() => setShowPassword(!showPassword)}
  //               className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
  //             >
  //               {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
  //             </button>
  //           </div>
  //           {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
  //         </div>

  //         {/* Confirm Password */}
  //         <div>
  //           <label className="block text-sm font-medium text-foreground mb-2">Xác nhận mật khẩu</label>
  //           <div className="relative">
  //             <input
  //               type={showConfirmPassword ? "text" : "password"}
  //               name="confirmPassword"
  //               value={formData.confirmPassword}
  //               onChange={handleChange}
  //               placeholder="••••••••"
  //               className={`w-full px-4 py-3 rounded-lg bg-input border transition-colors ${
  //                 errors.confirmPassword ? "border-destructive" : "border-border"
  //               } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
  //             />
  //             <button
  //               type="button"
  //               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  //               className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
  //             >
  //               {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
  //             </button>
  //           </div>
  //           {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>}
  //         </div>

  //         {/* Terms Agreement */}
  //         <div>
  //           <label className="flex items-start gap-3 cursor-pointer">
  //             <input
  //               type="checkbox"
  //               name="agree"
  //               checked={formData.agree}
  //               onChange={handleChange}
  //               className="w-4 h-4 rounded border-border cursor-pointer mt-1"
  //             />
  //             <span className="text-sm text-muted-foreground">
  //               Tôi đồng ý với{" "}
  //               <Link href="#" className="text-primary hover:underline">
  //                 Điều khoản dịch vụ
  //               </Link>{" "}
  //               và{" "}
  //               <Link href="#" className="text-primary hover:underline">
  //                 Chính sách bảo mật
  //               </Link>
  //             </span>
  //           </label>
  //           {errors.agree && <p className="text-destructive text-sm mt-1">{errors.agree}</p>}
  //         </div>

  //         {/* Signup Button */}
  //         <Button
  //           type="submit"
  //           disabled={isLoading}
  //           className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors"
  //         >
  //           {isLoading ? "Đang đăng ký..." : "Đăng ký"}
  //         </Button>
  //       </form>

  //       {/* Login Link */}
  //       <p className="text-center text-muted-foreground mt-6">
  //         Đã có tài khoản?{" "}
  //         <Link href="/login" className="text-primary hover:underline font-medium">
  //           Đăng nhập ngay
  //         </Link>
  //       </p>
  //     </div>