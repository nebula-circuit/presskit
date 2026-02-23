import type { ReactNode } from 'react'
import Link from '@mui/material/Link'

const LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g

export function parseLinks(text: string): ReactNode[] {
  const parts: ReactNode[] = []

  let last = 0

  for (const match of text.matchAll(LINK_RE)) {
    const idx = match.index!

    if (idx > last) {
      parts.push(text.slice(last, idx))
    }

    parts.push(
      <Link key={idx} href={match[2]} target='_blank' rel='noopener noreferrer'>
        {match[1]}
      </Link>
    )

    last = idx + match[0].length
  }

  if (last < text.length) {
    parts.push(text.slice(last))
  }

  return parts
}

export function stripLinks(text: string): string {
  return text.replace(LINK_RE, '$1')
}
