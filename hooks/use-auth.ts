import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login, register, type LoginData, type RegisterData } from '@/lib/api/auth'
import { useToast } from './use-toast'

export function useAuth() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleRegister = async (data: RegisterData) => {
    setLoading(true)
    try {
      const result = await register(data)
      
      if (result.success) {
        toast({
          title: 'Thành công',
          description: result.message,
        })
        router.push('/login')
        return true
      } else {
        toast({
          title: 'Lỗi',
          description: result.message,
          variant: 'destructive',
        })
        return false
      }
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Có lỗi xảy ra',
        variant: 'destructive',
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (data: LoginData) => {
    setLoading(true)
    try {
      const result = await login(data)
      
      if (result.success) {
        toast({
          title: 'Thành công',
          description: result.message,
        })
        router.push('/')
        return true
      } else {
        toast({
          title: 'Lỗi',
          description: result.message,
          variant: 'destructive',
        })
        return false
      }
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Có lỗi xảy ra',
        variant: 'destructive',
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    handleRegister,
    handleLogin,
    loading,
  }
}
