# Hướng dẫn tích hợp API

## 📁 Cấu trúc thư mục

```
lib/
  api/
    client.ts       # Axios instance và interceptors
    auth.ts         # API authentication (register, login, logout)
    types.ts        # TypeScript interfaces
hooks/
  use-auth.ts       # Custom hook cho authentication
.env.local          # Environment variables
```

## 🔧 Cấu hình

### 1. Environment Variables

File `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 2. API Client (`lib/api/client.ts`)

- Tạo axios instance với base URL
- Request interceptor: Tự động thêm token vào header
- Response interceptor: Xử lý lỗi 401 (Unauthorized)

### 3. Auth API (`lib/api/auth.ts`)

#### Đăng ký
```typescript
const result = await register({
  username: string,
  email: string,
  password: string,
  fullName?: string,
  phone?: string,
})
```

#### Đăng nhập
```typescript
const result = await login({
  username: string,
  password: string,
})
```

#### Đăng xuất
```typescript
logout()
```

## 🎯 Cách sử dụng

### Option 1: Sử dụng trực tiếp API functions

```typescript
import { register, login } from '@/lib/api/auth'

// Trong component
const handleSubmit = async (data) => {
  const result = await register(data)
  
  if (result.success) {
    // Xử lý thành công
    console.log(result.message)
  } else {
    // Xử lý lỗi
    console.error(result.message)
  }
}
```

### Option 2: Sử dụng custom hook (Recommended)

```typescript
import { useAuth } from '@/hooks/use-auth'

export default function SignupPage() {
  const { handleRegister, loading } = useAuth()
  
  const onSubmit = async (data) => {
    await handleRegister(data)
  }
  
  return (
    <button disabled={loading}>
      {loading ? 'Đang xử lý...' : 'Đăng ký'}
    </button>
  )
}
```

## 📝 API Response Format

### Success Response
```typescript
{
  success: true,
  message: "Đăng ký thành công",
  data: {
    token?: string,
    user?: User
  }
}
```

### Error Response
```typescript
{
  success: false,
  message: "Đăng ký thất bại"
}
```

## 🔐 Token Management

- Token được lưu trong `localStorage` với key `'token'`
- Tự động thêm vào header: `Authorization: Bearer {token}`
- Khi token hết hạn (401), tự động xóa và redirect về `/login`

## 📦 Dependencies

- `axios`: ^1.13.2 (đã có sẵn trong project)
- `next`: ^14.2.13
- `react`: ^18.3.1

## 🚀 Đã tích hợp vào các page

- ✅ `/app/signup/page.tsx` - Trang đăng ký
- ✅ `/app/login/page.tsx` - Trang đăng nhập

## 🔄 Mở rộng API

Để thêm API mới, tạo file trong `lib/api/`:

```typescript
// lib/api/appointments.ts
import { apiClient } from './client'

export const getAppointments = async () => {
  try {
    const response = await apiClient.get('/appointments')
    return {
      success: true,
      data: response.data,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Lỗi',
    }
  }
}
```

## 📱 Testing

1. Khởi động backend server: `http://localhost:8080`
2. Khởi động Next.js: `npm run dev`
3. Truy cập: `http://localhost:3000/signup`
4. Thử đăng ký với thông tin hợp lệ

## 🐛 Troubleshooting

### Lỗi CORS
Đảm bảo backend đã enable CORS cho `http://localhost:3000`

### Lỗi Network
Kiểm tra backend đang chạy tại `http://localhost:8080`

### Token không được gửi
Kiểm tra localStorage có chứa token không: `localStorage.getItem('token')`
