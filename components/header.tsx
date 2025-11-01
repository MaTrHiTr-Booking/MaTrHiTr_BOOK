"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Calendar, User } from "lucide-react"
import { useState } from "react"
import { NotificationsDropdown } from "./notifications-dropdown"

interface HeaderProps {
  isLoggedIn?: boolean
}

export function Header({ isLoggedIn = false }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

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

          {/* Search - Hidden on mobile, shown on tablet+ */}
          {/* <div className="hidden md:flex flex-1 mx-8">
            <input
              type="text"
              placeholder="Tìm phòng khám..."
              className="w-full px-4 py-2 bg-secondary/50 border border-secondary text-foreground placeholder:text-muted-foreground rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setIsSearchOpen(e.target.value !== "")}
            />
          </div> */}

          {/* Navigation */}
          <div className="flex items-center gap-3">
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
                    <span className="hidden sm:inline">Lịch hẹn</span>
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Tôi</span>
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
        </div>
      </div>
    </header>
  )
}
