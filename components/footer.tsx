export function Footer() {
  return (
    <footer className="bg-muted border-t border-border mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Về MaTrHiTr</h3>
            <p className="text-sm text-muted-foreground">Nền tảng đặt lịch khám bệnh trực tuyến hàng đầu</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Cho Bệnh Nhân</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Tìm phòng khám
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Lịch hẹn của tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Hồ sơ cá nhân
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Hỗ Trợ</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Pháp Lý</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Điều khoản
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Riêng tư
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Bảo mật
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 MaTrHiTr. Tất cả quyền lợi được bảo vệ.</p>
        </div>
      </div>
    </footer>
  )
}
