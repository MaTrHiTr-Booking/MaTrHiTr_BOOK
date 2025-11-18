"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Calendar, User, Menu, X, Bell, Info, Handshake, Megaphone } from "lucide-react"
import { useState, useEffect } from "react"
// import { NotificationsDropdown } from "./notifications-dropdown" // Loại bỏ nếu không dùng

interface HeaderProps {
  isLoggedIn?: boolean
}

export function Header({ isLoggedIn: propIsLoggedIn = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(propIsLoggedIn) // Sử dụng state để quản lý

  // Cập nhật state từ localStorage khi component mount
  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token) // Chuyển thành boolean
  }, [localStorage.getItem("token")])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    closeMobileMenu()
    // Thêm logic redirect nếu cần, ví dụ: router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-1 min-w-0">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
              <Image 
                src="/logo.svg" 
                alt="MaTrHiTr Logo" 
                width={140} 
                height={35}
                priority
                className="h-6 sm:h-7 md:h-8 w-auto"
              />
            </Link>

            {/* Desktop Navigation Links - Hidden on tablet and below */}
            <div className="hidden xl:flex items-center gap-1">
              <Link href="/about">
                <Button variant="hoverText" size="sm" className="text-foreground text-xs lg:text-sm">
                  Về chúng tôi
                </Button>
              </Link>
              <Link href="/partnership">
                <Button variant="hoverText" size="sm" className="text-foreground text-xs lg:text-sm">
                  Hợp tác
                </Button>
              </Link>

              <Link href="/clinic-ads/management">
                <Button variant="hoverText" size="sm" className="text-foreground text-xs lg:text-sm whitespace-nowrap">
                  Quản lý quảng cáo
                </Button>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-1.5 sm:gap-2 lg:gap-3 flex-shrink-0">
            {isLoggedIn ? (
              <>
                {/* <NotificationsDropdown /> */} {/* Uncomment nếu dùng */}

                <Link href="/appointments">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm px-2 lg:px-3">
                    <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    <span className="hidden lg:inline">Lịch hẹn</span>
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm px-2 lg:px-3">
                    <User className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    <span className="hidden lg:inline">Tôi</span>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-foreground text-xs lg:text-sm px-2 sm:px-3 lg:px-4">
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs lg:text-sm px-2 sm:px-3 lg:px-4">
                    Đăng ký
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-1.5 sm:p-2 text-foreground hover:bg-secondary rounded-lg transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-14 sm:top-16 bg-black/50 z-40" onClick={closeMobileMenu} />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-14 sm:top-16 right-0 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-full max-w-sm bg-background border-l border-border shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2">
            {/* User Section - if logged in */}
            {isLoggedIn && (
              <div className="pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-border">
                <Link href="/profile" onClick={closeMobileMenu}>
                  <div className="flex items-center gap-3 p-2 sm:p-3 rounded-lg hover:bg-secondary transition-colors">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm sm:text-base truncate">Tài khoản của tôi</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Xem hồ sơ</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Main Navigation */}
            <Link href="/about" onClick={closeMobileMenu}>
              <Button variant="ghost" className="w-full justify-start gap-2.5 sm:gap-3 h-10 sm:h-12 text-sm sm:text-base">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="truncate">Về chúng tôi</span>
              </Button>
            </Link>

            <Link href="/partnership" onClick={closeMobileMenu}>
              <Button variant="ghost" className="w-full justify-start gap-2.5 sm:gap-3 h-10 sm:h-12 text-sm sm:text-base">
                <Handshake className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="truncate">Hợp tác</span>
              </Button>
            </Link>

            <Link href="/clinic-ads/management" onClick={closeMobileMenu}>
              <Button variant="ghost" className="w-full justify-start gap-2.5 sm:gap-3 h-10 sm:h-12 text-sm sm:text-base">
                <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="truncate">Quản lý quảng cáo</span>
              </Button>
            </Link>

            {isLoggedIn && (
              <>
                <Link href="/notifications" onClick={closeMobileMenu}>
                  <Button variant="ghost" className="w-full justify-start gap-2.5 sm:gap-3 h-10 sm:h-12 text-sm sm:text-base">
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="truncate">Thông báo</span>
                  </Button>
                </Link>

                <Link href="/appointments" onClick={closeMobileMenu}>
                  <Button variant="ghost" className="w-full justify-start gap-2.5 sm:gap-3 h-10 sm:h-12 text-sm sm:text-base">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="truncate">Lịch hẹn</span>
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Auth Buttons - if not logged in */}
          {!isLoggedIn && (
            <div className="p-3 sm:p-4 border-t border-border space-y-2 sm:space-y-3">
              <Link href="/login" onClick={closeMobileMenu}>
                <Button variant="outline" className="w-full h-10 sm:h-11 text-sm sm:text-base">
                  Đăng nhập
                </Button>
              </Link>
              <Link href="/signup" onClick={closeMobileMenu}>
                <Button className="w-full h-10 sm:h-11 text-sm sm:text-base bg-primary hover:bg-primary/90 text-primary-foreground">
                  Đăng ký
                </Button>
              </Link>
            </div>
          )}

          {/* Logout Button - if logged in */}
          {isLoggedIn && (
            <div className="p-3 sm:p-4 border-t border-border">
              <Button
                variant="ghost"
                className="w-full h-10 sm:h-11 text-sm sm:text-base text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                Đăng xuất
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}