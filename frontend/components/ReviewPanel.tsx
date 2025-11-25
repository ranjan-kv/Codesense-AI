'use client'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { getSeverityColor, getTypeColor } from '@/lib/utils'
import { Bug, Shield, Zap, Eye, TrendingUp } from 'lucide-react'

interface ReviewItem {
  line: number
  type: string
  severity: string
  description: string
  suggestion: string
}

interface ReviewPanelProps {
  review: any
  code: string
}

export function ReviewPanel({ review, code }: ReviewPanelProps) {
  if (!review) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>AI Code Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Click "Review Code" to get AI feedback</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const items: ReviewItem[] = review.feedback || []
  const qualityScore = review.quality_score || 0
  const summary = review.summary || ''

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'bug':
        return <Bug className="w-4 h-4" />
      case 'security':
        return <Shield className="w-4 h-4" />
      case 'optimization':
        return <Zap className="w-4 h-4" />
      case 'readability':
        return <Eye className="w-4 h-4" />
      default:
        return <Bug className="w-4 h-4" />
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>AI Code Review</CardTitle>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-2xl font-bold">{qualityScore}</span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
        </div>
        {summary && (
          <p className="text-sm text-muted-foreground mt-2">{summary}</p>
        )}
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        {items.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <p>No issues found! Great code! 🎉</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getTypeColor(item.type)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <span className="font-semibold capitalize">{item.type}</span>
                    <span className={`text-xs ${getSeverityColor(item.severity)}`}>
                      {item.severity}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Line {item.line}
                  </span>
                </div>
                <p className="text-sm mb-2">{item.description}</p>
                {item.suggestion && (
                  <div className="mt-2 p-2 bg-background/50 rounded text-sm">
                    <span className="text-muted-foreground">💡 Suggestion: </span>
                    {item.suggestion}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

