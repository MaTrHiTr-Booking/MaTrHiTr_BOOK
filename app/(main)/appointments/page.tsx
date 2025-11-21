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
      return <span className="text-[10px] sm:text-xs bg-amber-100 text-amber-700 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap">Chưa XN</span>
    case "confirmed":
      return <span className="text-[10px] sm:text-xs bg-primary/10 text-primary px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap">Đã XN</span>
    case "completed":
      return <span className="text-[10px] sm:text-xs bg-accent/10 text-accent px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap">Hoàn Thành</span>
    case "cancelled":
      return <span className="text-[10px] sm:text-xs bg-destructive/10 text-destructive px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap">Đã Hủy</span>
  }
}

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const router = useRouter()

  return (
    <Card
      onClick={() => router.push(`/appointments/${appointment.id}`)}
      className="p-3 sm:p-4 lg:p-6 shadow transition-shadow hover:shadow-md cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm sm:text-base text-foreground mb-1 line-clamp-2">{appointment.clinicName}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">{appointment.doctor}</p>
        </div>
        <StatusLabel status={appointment.status} />
      </div>

      <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm mb-3 sm:mb-4">
        <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="truncate">{appointment.date} lúc {appointment.time}</span>
        </div>
        <div className="text-muted-foreground line-clamp-2">
          <span className="font-medium">Lý do:</span> {appointment.reason}
        </div>
        {appointment.cancelReason && (
          <div className="text-destructive text-xs line-clamp-2">
            <span className="font-medium">Lý do hủy:</span> {appointment.cancelReason}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 mt-3 sm:mt-4" onClick={(e) => e.stopPropagation()}>
        <Button size="sm" variant="ghost" className="flex-1 text-xs sm:text-sm h-8 sm:h-9">
          Xem Chi Tiết
        </Button>

        {appointment.status === "completed" && (
          <Link href={`/appointments/review/${appointment.id}`} className="flex-1">
            <Button
              size="sm"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-xs sm:text-sm h-8 sm:h-9"
            >
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
      <main className="min-h-screen bg-background py-4 sm:py-8">
        <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
          <div className="mb-4 sm:mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2">Lịch Hẹn Của Tôi</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Quản lý và theo dõi các lịch khám bệnh của bạn</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-secondary/20 p-0.5 sm:p-1 rounded-lg h-auto">
              <TabsTrigger value="all" className="text-[10px] sm:text-sm px-1 sm:px-3 py-1.5 sm:py-2">Tất Cả</TabsTrigger>
              <TabsTrigger value="pending" className="text-[10px] sm:text-sm px-1 sm:px-3 py-1.5 sm:py-2 leading-tight">
                Chưa XN
              </TabsTrigger>
              <TabsTrigger value="confirmed" className="text-[10px] sm:text-sm px-1 sm:px-3 py-1.5 sm:py-2 leading-tight">
                Đã XN
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-[10px] sm:text-sm px-1 sm:px-3 py-1.5 sm:py-2 leading-tight">
                Hoàn Thành
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="text-[10px] sm:text-sm px-1 sm:px-3 py-1.5 sm:py-2">
                Hủy
              </TabsTrigger>
            </TabsList>

            <div className="mt-4 sm:mt-6">
              {filteredAppointments.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {filteredAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              ) : (
                <Card className="p-6 sm:p-8 lg:p-12 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-1.5 sm:mb-2">Không có lịch hẹn</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 px-2">
                    {activeTab === "all"
                      ? "Bạn chưa có lịch hẹn nào. Hãy tìm và đặt lịch ngay!"
                      : "Không có lịch hẹn trong danh mục này."}
                  </p>
                  <Link href="/search">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base h-9 sm:h-10 px-4 sm:px-6">Đặt Lịch Ngay</Button>
                  </Link>
                </Card>
              )}
            </div>
          </Tabs>
        </div>
      </main>
    </>
  )
}
