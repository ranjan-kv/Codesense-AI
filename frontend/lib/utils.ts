import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSeverityColor(severity: string) {
  switch (severity.toLowerCase()) {
    case 'high':
      return 'text-red-400'
    case 'medium':
      return 'text-yellow-400'
    case 'low':
      return 'text-green-400'
    default:
      return 'text-gray-400'
  }
}

export function getTypeColor(type: string) {
  switch (type.toLowerCase()) {
    case 'bug':
      return 'bg-red-500/20 text-red-400 border-red-500/50'
    case 'security':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/50'
    case 'optimization':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/50'
    case 'readability':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/50'
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
  }
}

