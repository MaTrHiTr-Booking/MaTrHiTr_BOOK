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
      <Header isLoggedIn={true} />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Thông báo</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `Bạn có ${unreadCount} thông báo chưa đọc` : "Bạn đã đọc tất cả thông báo"}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              Tất cả ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "unread"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              Chưa đọc ({unreadCount})
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mb-6">
            {unreadCount > 0 && (
              <Button onClick={handleMarkAllAsRead} variant="outline" size="sm">
                <Check className="w-4 h-4 mr-2" />
                Đánh dấu tất cả đã đọc
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                onClick={handleDeleteAll}
                variant="outline"
                size="sm"
                className="text-destructive hover:bg-destructive/10 bg-transparent"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Xóa tất cả
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-2">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 bg-card border border-border rounded-lg">
                <Bell className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
                <p className="text-muted-foreground font-medium">
                  {filter === "unread" ? "Không có thông báo chưa đọc" : "Không có thông báo"}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex gap-4 p-4 border border-border rounded-lg transition-colors ${
                    !notification.isRead ? "bg-secondary/30 hover:bg-secondary/40" : "bg-card hover:bg-secondary/20"
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={notification.appointmentId ? `/appointments/${notification.appointmentId}` : "#"}
                      className="hover:underline"
                    >
                      <h3 className="font-semibold text-foreground mb-1">{notification.title}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                      <div className="flex gap-2">
                        {!notification.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-primary text-xs hover:underline font-medium"
                          >
                            Đánh dấu đã đọc
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notification.id)}
                          className="text-muted-foreground hover:text-destructive text-xs"
                        >
                          <Trash2 className="w-4 h-4" />
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
      <Footer />
    </>
  )
}
