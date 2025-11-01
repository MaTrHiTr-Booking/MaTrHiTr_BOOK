"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, AlertCircle, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

interface Appointment {
  id: string
  clinicName: string
  doctor: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  reason?: string
  cancelReason?: string
}

const mockAppointments: Appointment[] = [
  {
    id: "APT001",
    clinicName: "Phòng Khám Sức Khỏe Gia Đình",
    doctor: "TS.BS Nguyễn Văn A",
    date: "2025-01-15",
    time: "10:00",
    status: "pending",
    reason: "Khám tổng quát",
  },
  {
    id: "APT002",
    clinicName: "Bệnh Viện Đa Khoa Tây Sài Gòn",
    doctor: "BS Trần Thị B",
    date: "2025-01-20",
    time: "14:30",
    status: "confirmed",
    reason: "Khám chuyên khoa nha",
  },
  {
    id: "APT003",
    clinicName: "Phòng Khám Chuyên Khoa Mắt",
    doctor: "BS Lê Văn C",
    date: "2024-12-20",
    time: "15:00",
    status: "completed",
    reason: "Khám mắt",
  },
  {
    id: "APT004",
    clinicName: "Phòng Khám Nhi Đông",
    doctor: "BS Võ Thị D",
    date: "2024-12-10",
    time: "09:00",
    status: "cancelled",
    reason: "Khám nhi",
    cancelReason: "Lịch trùng với công việc",
  },
]

const StatusIcon = ({ status }: { status: Appointment["status"] }) => {
  switch (status) {
    case "pending":
      return <AlertCircle className="w-5 h-5 text-amber-500" />
    case "confirmed":
      return <CheckCircle className="w-5 h-5 text-primary" />
    case "completed":
      return <CheckCircle className="w-5 h-5 text-accent" />
    case "cancelled":
      return <XCircle className="w-5 h-5 text-destructive" />
  }
}

const StatusLabel = ({ status }: { status: Appointment["status"] }) => {
  switch (status) {
    case "pending":
      return <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">Chưa Xác Nhận</span>
    case "confirmed":
      return <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full">Đã Xác Nhận</span>
    case "completed":
      return <span className="text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full">Đã Hoàn Thành</span>
    case "cancelled":
      return <span className="text-xs bg-destructive/10 text-destructive px-2.5 py-1 rounded-full">Đã Hủy</span>
  }
}

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const router = useRouter()

  return (
    <Card
      onClick={() => router.push(`/appointments/${appointment.id}`)}
      className="p-4 sm:p-6 shadow transition-shadow hover:shadow-md cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-foreground mb-1">{appointment.clinicName}</h3>
          <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
        </div>
        <StatusLabel status={appointment.status} />
      </div>

      <div className="space-y-2 text-sm mb-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          {appointment.date} lúc {appointment.time}
        </div>
        <div className="text-muted-foreground">Lý do: {appointment.reason}</div>
        {appointment.cancelReason && (
          <div className="text-destructive text-xs">Lý do hủy: {appointment.cancelReason}</div>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
        <Button size="sm" variant="ghost" className="w-full">
          Xem Chi Tiết
        </Button>
        {appointment.status === "completed" && (
          <Link href={`/appointments/review/${appointment.id}`}>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground whitespace-nowrap">
              Đánh Giá
            </Button>
          </Link>
        )}
      </div>
    </Card>
  )
}

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const getFilteredAppointments = (tab: string) => {
    switch (tab) {
      case "pending":
        return mockAppointments.filter((a) => a.status === "pending")
      case "confirmed":
        return mockAppointments.filter((a) => a.status === "confirmed")
      case "completed":
        return mockAppointments.filter((a) => a.status === "completed")
      case "cancelled":
        return mockAppointments.filter((a) => a.status === "cancelled")
      default:
        return mockAppointments
    }
  }

  const filteredAppointments = getFilteredAppointments(activeTab)

  return (
    <>
      <Header isLoggedIn={true} />

      <main className="min-h-screen bg-background py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Lịch Hẹn Của Tôi</h1>
            <p className="text-muted-foreground">Quản lý và theo dõi các lịch khám bệnh của bạn</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-secondary/20 p-1 rounded-lg overflow-auto">
              <TabsTrigger value="all">Tất Cả</TabsTrigger>
              <TabsTrigger value="pending" className="text-xs sm:text-sm">
                Chưa Xác Nhận
              </TabsTrigger>
              <TabsTrigger value="confirmed" className="text-xs sm:text-sm">
                Đã Xác Nhận
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-xs sm:text-sm">
                Hoàn Thành
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="text-xs sm:text-sm">
                Hủy
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              {filteredAppointments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {filteredAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              ) : (
                <Card className="p-8 sm:p-12 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Không có lịch hẹn</h3>
                  <p className="text-muted-foreground mb-6">
                    {activeTab === "all"
                      ? "Bạn chưa có lịch hẹn nào. Hãy tìm và đặt lịch ngay!"
                      : "Không có lịch hẹn trong danh mục này."}
                  </p>
                  <Link href="/search">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Đặt Lịch Ngay</Button>
                  </Link>
                </Card>
              )}
            </div>
          </Tabs>
        </div>
      </main>

      <Footer />
    </>
  )
}
