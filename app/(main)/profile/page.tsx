"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, ArrowLeft, LogOut } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

interface UserProfile {
  name: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  district: string
  city: string
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {handleLogout} = useAuth();

  // Mock user data
  const [profile, setProfile] = useState<UserProfile>({
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0987654321",
    dateOfBirth: "1990-05-15",
    address: "123 Đường ABC",
    district: "Quận 1",
    city: "Hồ Chí Minh",
  })

  const [editedProfile, setEditedProfile] = useState(profile)

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSaveProfile = () => {
    setProfile(editedProfile)
    setIsEditing(false)
    // API call would go here
  }

  const handleCancelEdit = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!")
      return
    }
    // API call would go here
    alert("Đổi mật khẩu thành công!")
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <main className="flex-1 mx-auto max-w-3xl px-3 sm:px-6 lg:px-8 py-4 sm:py-8 w-full">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4 sm:mb-8 gap-2 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground line-clamp-1">Hồ Sơ Cá Nhân</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 line-clamp-1">Quản lý thông tin tài khoản của bạn</p>
        </div>
        <Link href="/appointments">
          <Button variant="outline" className="flex items-center gap-1.5 sm:gap-2 bg-transparent h-9 sm:h-10 px-2.5 sm:px-4">
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline text-sm">Quay lại</span>
          </Button>
        </Link>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 sm:gap-2 border-b border-border mb-4 sm:mb-6">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-3 sm:px-4 py-2 sm:py-3 font-medium text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "profile"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Thông Tin Cá Nhân
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`px-3 sm:px-4 py-2 sm:py-3 font-medium text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "password"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Đổi Mật Khẩu
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <Card className="p-4 sm:p-6 border border-border bg-card">
          <div className="space-y-4 sm:space-y-6">
            {/* Name */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                Họ và Tên <span className="text-destructive">*</span>
              </label>
              <Input
                type="text"
                name="name"
                value={isEditing ? editedProfile.name : profile.name}
                onChange={handleProfileChange}
                disabled={!isEditing}
                className="w-full h-9 sm:h-10 text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                Email <span className="text-destructive">*</span>
              </label>
              <Input
                type="email"
                name="email"
                value={isEditing ? editedProfile.email : profile.email}
                onChange={handleProfileChange}
                disabled={!isEditing}
                className="w-full h-9 sm:h-10 text-sm"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                Số Điện Thoại <span className="text-destructive">*</span>
              </label>
              <Input
                type="tel"
                name="phone"
                value={isEditing ? editedProfile.phone : profile.phone}
                onChange={handleProfileChange}
                disabled={!isEditing}
                className="w-full h-9 sm:h-10 text-sm"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">Ngày Sinh</label>
              <Input
                type="date"
                name="dateOfBirth"
                value={isEditing ? editedProfile.dateOfBirth : profile.dateOfBirth}
                onChange={handleProfileChange}
                disabled={!isEditing}
                className="w-full h-9 sm:h-10 text-sm"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">Địa Chỉ</label>
              <Input
                type="text"
                name="address"
                value={isEditing ? editedProfile.address : profile.address}
                onChange={handleProfileChange}
                disabled={!isEditing}
                placeholder="Số nhà, tên đường..."
                className="w-full h-9 sm:h-10 text-sm"
              />
            </div>

            {/* District and City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">Quận/Huyện</label>
                <Input
                  type="text"
                  name="district"
                  value={isEditing ? editedProfile.district : profile.district}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  className="w-full h-9 sm:h-10 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">Thành Phố</label>
                <Input
                  type="text"
                  name="city"
                  value={isEditing ? editedProfile.city : profile.city}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  className="w-full h-9 sm:h-10 text-sm"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-border">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 sm:h-10 text-sm"
                >
                  Chỉnh Sửa Thông Tin
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 sm:h-10 text-sm"
                  >
                    Lưu Thay Đổi
                  </Button>
                  <Button onClick={handleCancelEdit} variant="outline" className="h-9 sm:h-10 text-sm">
                    Hủy
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Password Tab */}
      {activeTab === "password" && (
        <Card className="p-4 sm:p-6 border border-border bg-card">
          <div className="space-y-4 sm:space-y-6">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Nhập mật khẩu hiện tại của bạn cùng với mật khẩu mới để đổi mật khẩu.
            </p>

            {/* Current Password */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                Mật Khẩu Hiện Tại <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Nhập mật khẩu hiện tại"
                  className="w-full pr-10 h-9 sm:h-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                Mật Khẩu Mới <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Nhập mật khẩu mới"
                  className="w-full pr-10 h-9 sm:h-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                Xác Nhận Mật Khẩu <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Nhập lại mật khẩu mới"
                  className="w-full pr-10 h-9 sm:h-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-border">
              <Button
                onClick={handleChangePassword}
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 sm:h-10 text-sm"
              >
                Đổi Mật Khẩu
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Logout Button */}
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border">
        
        <Link href="/">
          <Button 
            variant="outline" 
            className="flex items-center gap-1.5 sm:gap-2 h-9 sm:h-10 text-sm"
            onClick={handleLogout} 
            >
            <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Đăng Xuất
          </Button>
        </Link>
      </div>
    </main>
  )
}
