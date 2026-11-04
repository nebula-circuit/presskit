import btn from '@/components/button/style.module.css'
import { DownloadIcon } from '@/components/icons/icons'
import { asset, formatMB } from '@/content/media'

interface DownloadLinkProps {
  file: string
  label: string
  bytes: number
}

export default function DownloadLink({ file, label, bytes }: DownloadLinkProps) {
  return (
    <a href={asset(file)} download className={btn.button}>
      <DownloadIcon size={16} />
      {label}
      <span className={btn.meta}>· {formatMB(bytes)}</span>
    </a>
  )
}
