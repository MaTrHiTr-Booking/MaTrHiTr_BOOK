"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Check, Trash2, AlertCircle, CheckCircle2, Clock } from "lucide-react"

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
]

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

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

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "appointment":
        return <AlertCircle className="w-4 h-4 text-accent" />
      case "reminder":
        return <Clock className="w-4 h-4 text-primary" />
      case "confirmation":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case "review":
        return <Bell className="w-4 h-4 text-primary" />
      case "update":
        return <AlertCircle className="w-4 h-4 text-primary" />
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-96 bg-card border border-border rounded-lg shadow-lg z-40 max-h-96 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Thông báo</h3>
              {unreadCount > 0 && (
                <button onClick={handleMarkAllAsRead} className="text-xs text-primary hover:underline">
                  Đánh dấu tất cả đã đọc
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <Bell className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-sm">Không có thông báo</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <Link
                    key={notification.id}
                    href={notification.appointmentId ? `/appointments/${notification.appointmentId}` : "#"}
                  >
                    <div
                      className={`p-4 border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer group ${
                        !notification.isRead ? "bg-secondary/30" : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-sm text-foreground truncate">{notification.title}</p>
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handleDelete(notification.id)
                              }}
                              className="flex-shrink-0 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                            {!notification.isRead && (
                              <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  handleMarkAsRead(notification.id)
                                }}
                                className="flex items-center gap-1 text-primary text-xs hover:underline"
                              >
                                <Check className="w-3 h-3" />
                                Đánh dấu đã đọc
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Footer */}
            <Link href="/notifications" onClick={() => setIsOpen(false)}>
              <div className="p-3 text-center border-t border-border text-primary text-sm font-medium hover:bg-secondary/50 transition-colors cursor-pointer">
                Xem tất cả thông báo
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
