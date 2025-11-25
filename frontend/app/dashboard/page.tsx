'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { CodeEditor } from '@/components/CodeEditor'
import { ReviewPanel } from '@/components/ReviewPanel'
import { ChatPanel } from '@/components/ChatPanel'
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard'
import { Button } from '@/components/ui/button'
import { MessageSquare, BarChart3, Code, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [code, setCode] = useState('')
  const [review, setReview] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [language, setLanguage] = useState('javascript')

  useEffect(() => {
    if (!loading && !user) {
      console.log('No user found, redirecting to login')
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleReview = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to review')
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_AI_API_URL}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ code, language })
      })
      const data = await response.json()
      setReview(data)
      
      // Save version
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/code/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ code, review: data, language })
      })
      
      toast.success('Code reviewed successfully!')
    } catch (error) {
      toast.error('Failed to review code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">CodeSense AI</h1>
            <Button
              variant="ghost"
              onClick={() => setShowAnalytics(!showAnalytics)}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowChat(!showChat)}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              AI Chat
            </Button>
          </div>
        </div>
      </nav>

      {showAnalytics && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border w-full max-w-6xl max-h-[90vh] overflow-auto">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold">Analytics Dashboard</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowAnalytics(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <AnalyticsDashboard />
          </div>
        </div>
      )}

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-80px)]">
          <div className="flex flex-col">
            <CodeEditor
              code={code}
              setCode={setCode}
              language={language}
              setLanguage={setLanguage}
              onReview={handleReview}
              loading={loading}
            />
          </div>
          <div className="flex flex-col">
            <ReviewPanel review={review} code={code} />
          </div>
        </div>
      </div>

      {showChat && (
        <ChatPanel
          code={code}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  )
}

