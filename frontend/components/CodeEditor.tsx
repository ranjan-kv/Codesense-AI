'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from './ui/button'
import { Upload, Play } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

interface CodeEditorProps {
  code: string
  setCode: (code: string) => void
  language: string
  setLanguage: (language: string) => void
  onReview: () => void
  loading: boolean
}

export function CodeEditor({ code, setCode, language, setLanguage, onReview, loading }: CodeEditorProps) {
  const [editorHeight, setEditorHeight] = useState('600px')

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        setCode(content)

        // Detect language from file extension
        const ext = file.name.split('.').pop()?.toLowerCase()
        const langMap: Record<string, string> = {
          'js': 'javascript',
          'jsx': 'javascript',
          'ts': 'typescript',
          'tsx': 'typescript',
          'py': 'python',
          'java': 'java',
          'cpp': 'cpp',
          'c': 'c',
          'cs': 'csharp',
          'go': 'go',
          'rs': 'rust',
          'php': 'php',
          'rb': 'ruby',
          'swift': 'swift',
          'kt': 'kotlin',
        }
        if (ext && langMap[ext]) {
          setLanguage(langMap[ext])
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Code Editor</CardTitle>
          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1.5 rounded-md border border-input bg-background text-sm"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="csharp">C#</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="php">PHP</option>
              <option value="ruby">Ruby</option>
            </select>
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.cs,.go,.rs,.php,.rb"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button variant="outline" size="sm" type="button">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </label>
            <Button onClick={onReview} disabled={loading || !code.trim()}>
              <Play className="w-4 h-4 mr-2" />
              {loading ? 'Reviewing...' : 'Review Code'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <MonacoEditor
          height={editorHeight}
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            wordWrap: 'on',
            automaticLayout: true,
            scrollBeyondLastLine: false,
          }}
        />
      </CardContent>
    </Card>
  )
}

