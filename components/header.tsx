"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Calendar, User, Menu, X, Bell, Info, Handshake, Megaphone } from "lucide-react"
import { useState } from "react"
import { NotificationsDropdown } from "./notifications-dropdown"

interface HeaderProps {
  isLoggedIn?: boolean
}

export function Header({ isLoggedIn = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-primary">MaTrHiTr</span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/about">
              <Button variant="ghost" size="sm" className="text-foreground">
                Về chúng tôi
              </Button>
            </Link>
            <Link href="/partnership">
              <Button variant="ghost" size="sm" className="text-foreground">
                Hợp tác
              </Button>
            </Link>

            <Link href="/clinic-ads/management">
              <Button variant="ghost" size="sm" className="text-foreground">
                Quản lý quảng cáo
              </Button>
            </Link>

            {isLoggedIn ? (
              <>
                <NotificationsDropdown />

                <Link href="/appointments">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Lịch hẹn</span>
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Tôi</span>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-foreground">
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Đăng ký
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-black/50 z-40" onClick={closeMobileMenu} />
      )}

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-16 right-0 h-[calc(100vh-4rem)] w-72 bg-background border-l border-border shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <nav className="flex-1 px-4 py-6 space-y-2">
            {/* User Section - if logged in */}
            {isLoggedIn && (
              <div className="pb-4 mb-4 border-b border-border">
                <Link href="/profile" onClick={closeMobileMenu}>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Tài khoản của tôi</p>
                      <p className="text-sm text-muted-foreground">Xem hồ sơ</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Main Navigation */}
            <Link href="/about" onClick={closeMobileMenu}>
              <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base">
                <Info className="w-5 h-5" />
                Về chúng tôi
              </Button>
            </Link>

            <Link href="/partnership" onClick={closeMobileMenu}>
              <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base">
                <Handshake className="w-5 h-5" />
                Hợp tác
              </Button>
            </Link>

            <Link href="/clinic-ads/management" onClick={closeMobileMenu}>
              <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base">
                <Megaphone className="w-5 h-5" />
                Quản lý quảng cáo
              </Button>
            </Link>

            {isLoggedIn && (
              <>
                <Link href="/notifications" onClick={closeMobileMenu}>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base">
                    <Bell className="w-5 h-5" />
                    Thông báo
                  </Button>
                </Link>

                <Link href="/appointments" onClick={closeMobileMenu}>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base">
                    <Calendar className="w-5 h-5" />
                    Lịch hẹn
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Auth Buttons - if not logged in */}
          {!isLoggedIn && (
            <div className="p-4 border-t border-border space-y-3">
              <Link href="/login" onClick={closeMobileMenu}>
                <Button variant="outline" className="w-full h-11 text-base">
                  Đăng nhập
                </Button>
              </Link>
              <Link href="/signup" onClick={closeMobileMenu}>
                <Button className="w-full h-11 text-base bg-primary hover:bg-primary/90 text-primary-foreground">
                  Đăng ký
                </Button>
              </Link>
            </div>
          )}

          {/* Logout Button - if logged in */}
          {isLoggedIn && (
            <div className="p-4 border-t border-border">
              <Button
                variant="ghost"
                className="w-full h-11 text-base text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => {
                  closeMobileMenu()
                  // Add logout logic here
                }}
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
