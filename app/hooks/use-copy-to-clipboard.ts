import { useState } from 'react'

export function useCopyToClipboard() {
  const [copiedWhich, setCopiedWhich] = useState<'short' | 'long' | null>(null)

  const copyToClipboard = async (text: string, which: 'short' | 'long') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedWhich(which)
      setTimeout(() => setCopiedWhich(null), 2000)
    } catch {
      // NOTE: Fallback for older browsers
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopiedWhich(which)
      setTimeout(() => setCopiedWhich(null), 2000)
    }
  }

  return { copyToClipboard, copiedWhich }
}
