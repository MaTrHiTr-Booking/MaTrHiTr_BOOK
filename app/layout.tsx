import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const _inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MaTrHiTr - Đặt Lịch Khám Bệnh",
  description: "Hệ thống đặt lịch khám bệnh trực tuyến - Healthcare Booking Platform",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    apple: "/apple-touch-icon.svg",
  },
  openGraph: {
    title: "MaTrHiTr - Đặt Lịch Khám Bệnh",
    description: "Hệ thống đặt lịch khám bệnh trực tuyến",
    images: ["/icon.svg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`font-sans antialiased`}>
        <Header/>
        {children}
        <Analytics />
        <Footer/>
      </body>
    </html>
  )
}