"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check, Trash2, AlertCircle, CheckCircle2, Clock, Bell } from "lucide-react"

interface Notification {
  id: string
  type: "appointment" | "reminder" | "confirmation" | "review" | "update"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  appointmentId?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "appointment",
    title: "Lịch hẹn mới",
    message: "Bạn có một lịch hẹn khám bệnh được xác nhận vào 14:00 ngày 15/11",
    timestamp: "2 giờ trước",
    isRead: false,
    appointmentId: "1",
  },
  {
    id: "2",
    type: "reminder",
    title: "Nhắc nhở lịch hẹn",
    message: "Bạn có lịch hẹn với Bác sĩ Nguyễn Văn A vào mai lúc 10:00",
    timestamp: "1 ngày trước",
    isRead: false,
    appointmentId: "2",
  },
  {
    id: "3",
    type: "confirmation",
    title: "Xác nhận lịch hẹn",
    message: "Phòng khám đã xác nhận lịch hẹn của bạn",
    timestamp: "3 ngày trước",
    isRead: true,
    appointmentId: "3",
  },
  {
    id: "4",
    type: "review",
    title: "Yêu cầu đánh giá",
    message: "Bạn có thể đánh giá lịch hẹn đã hoàn thành của mình",
    timestamp: "5 ngày trước",
    isRead: true,
    appointmentId: "4",
  },
  {
    id: "5",
    type: "update",
    title: "Cập nhật từ phòng khám",
    message: "Bác sĩ của bạn có thông báo quan trọng",
    timestamp: "1 tuần trước",
    isRead: true,
    appointmentId: "5",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filteredNotifications = filter === "unread" ? notifications.filter((n) => !n.isRead) : notifications

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
  }

  const handleDeleteAll = () => {
    setNotifications([])
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "appointment":
        return <AlertCircle className="w-5 h-5 text-accent" />
      case "reminder":
        return <Clock className="w-5 h-5 text-primary" />
      case "confirmation":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "review":
        return <Bell className="w-5 h-5 text-primary" />
      case "update":
        return <AlertCircle className="w-5 h-5 text-primary" />
    }
  }

  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1.5 sm:mb-2">Thông báo</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {unreadCount > 0 ? `Bạn có ${unreadCount} thông báo chưa đọc` : "Bạn đã đọc tất cả thông báo"}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors ${
                filter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              Tất cả ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors ${
                filter === "unread"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              Chưa đọc ({unreadCount})
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {unreadCount > 0 && (
              <Button onClick={handleMarkAllAsRead} variant="outline" size="sm" className="text-xs sm:text-sm h-8 sm:h-9">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">Đánh dấu tất cả đã đọc</span>
                <span className="sm:hidden">Đánh dấu đã đọc</span>
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                onClick={handleDeleteAll}
                variant="outline"
                size="sm"
                className="text-destructive hover:bg-destructive/10 bg-transparent text-xs sm:text-sm h-8 sm:h-9"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Xóa tất cả
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-2">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 sm:py-12 bg-card border border-border rounded-lg">
                <Bell className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mb-2.5 sm:mb-3 opacity-50" />
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  {filter === "unread" ? "Không có thông báo chưa đọc" : "Không có thông báo"}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex gap-2.5 sm:gap-4 p-3 sm:p-4 border border-border rounded-lg transition-colors ${
                    !notification.isRead ? "bg-secondary/30 hover:bg-secondary/40" : "bg-card hover:bg-secondary/20"
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5 sm:mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={notification.appointmentId ? `/appointments/${notification.appointmentId}` : "#"}
                      className="hover:underline"
                    >
                      <h3 className="font-semibold text-sm sm:text-base text-foreground mb-0.5 sm:mb-1 line-clamp-1">{notification.title}</h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2 line-clamp-2">{notification.message}</p>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{notification.timestamp}</p>
                      <div className="flex gap-2 sm:gap-2.5">
                        {!notification.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-primary text-[10px] sm:text-xs hover:underline font-medium whitespace-nowrap"
                          >
                            Đánh dấu đã đọc
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notification.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  )
}
