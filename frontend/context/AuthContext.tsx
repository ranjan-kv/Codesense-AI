'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUser(token)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async (token: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      console.log('Fetching user with API URL:', apiUrl)
      const response = await axios.get(`${apiUrl}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log('User fetched successfully:', response.data.user)
      setUser(response.data.user)
    } catch (error: any) {
      console.error('Fetch user error:', error.response?.data || error.message)
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      console.log('Login API URL:', apiUrl)
      console.log('Login request:', { email, password: '***' })
      
      const response = await axios.post(`${apiUrl}/api/auth/login`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log('Login response:', response.data)
      const { token, user } = response.data
      
      if (!token || !user) {
        console.error('Invalid response:', response.data)
        throw new Error('Invalid response from server')
      }
      
      localStorage.setItem('token', token)
      setUser(user)
      console.log('Login successful, user set:', user)
    } catch (error: any) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      })
      if (error.response) {
        throw error
      }
      throw new Error(error.message || 'Login failed')
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const response = await axios.post(`${apiUrl}/api/auth/signup`, {
        name,
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const { token, user } = response.data
      if (!token || !user) {
        throw new Error('Invalid response from server')
      }
      localStorage.setItem('token', token)
      setUser(user)
    } catch (error: any) {
      console.error('Signup error:', error)
      if (error.response) {
        throw error
      }
      throw new Error(error.message || 'Signup failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

