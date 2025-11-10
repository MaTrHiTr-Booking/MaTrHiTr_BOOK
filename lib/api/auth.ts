import { apiClient } from './client'

export interface RegisterData {
//   username: string
  email: string
  password: string
  role: string
  fullName?: string
  phone?: string
}

export interface LoginData {
  username: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data?: {
    token?: string
    user?: any
  }
}

// API đăng ký
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post('/auth/register', data)
    return {
      success: true,
      message: response.data.message || 'Đăng ký thành công',
      data: response.data,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Đăng ký thất bại',
    }
  }
}

// API đăng nhập
export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post('/auth/login', data)
    
    // Lưu token vào localStorage
    if (response.data.token && typeof window !== 'undefined') {
      localStorage.setItem('token', response.data.token)
    }
    
    return {
      success: true,
      message: response.data.message || 'Đăng nhập thành công',
      data: response.data,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Đăng nhập thất bại',
    }
  }
}

// API đăng xuất
export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
}

// API lấy thông tin user hiện tại
export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/auth/me')
    return {
      success: true,
      data: response.data,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Không thể lấy thông tin user',
    }
  }
}
