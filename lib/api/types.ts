export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
}

export interface User {
  id: string
  username: string
  email: string
  fullName?: string
  phone?: string
  avatar?: string
  role?: string
}
