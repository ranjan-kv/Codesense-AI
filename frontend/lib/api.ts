import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
})

const aiApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_API_URL || 'http://localhost:8001',
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

aiApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const reviewCode = async (code: string, language?: string) => {
  const response = await aiApi.post('/review', { code, language })
  return response.data
}

export const chatWithAI = async (message: string, code?: string) => {
  const response = await aiApi.post('/chat', { message, code })
  return response.data
}

export const getCodeVersions = async () => {
  const response = await api.get('/api/code/versions')
  return response.data
}

export const saveCodeVersion = async (code: string, review: any, language?: string) => {
  const response = await api.post('/api/code/save', { code, review, language })
  return response.data
}

export const getAnalytics = async () => {
  const response = await api.get('/api/analytics')
  return response.data
}

