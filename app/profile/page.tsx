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
    <div className="min-h-screen bg-background flex flex-col">
      <Header isLoggedIn={true} />

      <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Hồ Sơ Cá Nhân</h1>
            <p className="text-muted-foreground mt-1">Quản lý thông tin tài khoản của bạn</p>
          </div>
          <Link href="/appointments">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Quay lại</span>
            </Button>
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-border mb-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "profile"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Thông Tin Cá Nhân
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
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
          <Card className="p-6 border border-border bg-card">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Họ và Tên <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  name="name"
                  value={isEditing ? editedProfile.name : profile.name}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  className="w-full"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  value={isEditing ? editedProfile.email : profile.email}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  className="w-full"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Số Điện Thoại <span className="text-destructive">*</span>
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={isEditing ? editedProfile.phone : profile.phone}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  className="w-full"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Ngày Sinh</label>
                <Input
                  type="date"
                  name="dateOfBirth"
                  value={isEditing ? editedProfile.dateOfBirth : profile.dateOfBirth}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  className="w-full"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Địa Chỉ</label>
                <Input
                  type="text"
                  name="address"
                  value={isEditing ? editedProfile.address : profile.address}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  placeholder="Số nhà, tên đường..."
                  className="w-full"
                />
              </div>

              {/* District and City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Quận/Huyện</label>
                  <Input
                    type="text"
                    name="district"
                    value={isEditing ? editedProfile.district : profile.district}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Thành Phố</label>
                  <Input
                    type="text"
                    name="city"
                    value={isEditing ? editedProfile.city : profile.city}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border">
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Chỉnh Sửa Thông Tin
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleSaveProfile}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Lưu Thay Đổi
                    </Button>
                    <Button onClick={handleCancelEdit} variant="outline">
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
          <Card className="p-6 border border-border bg-card">
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Nhập mật khẩu hiện tại của bạn cùng với mật khẩu mới để đổi mật khẩu.
              </p>

              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mật Khẩu Hiện Tại <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Nhập mật khẩu hiện tại"
                    className="w-full pr-10"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mật Khẩu Mới <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Nhập mật khẩu mới"
                    className="w-full pr-10"
                  />
                  <button
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Xác Nhận Mật Khẩu <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Nhập lại mật khẩu mới"
                    className="w-full pr-10"
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button
                  onClick={handleChangePassword}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Đổi Mật Khẩu
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Logout Button */}
        <div className="mt-8 pt-6 border-t border-border">
          <Button variant="destructive" className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Đăng Xuất
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
