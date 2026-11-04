import btn from '@/components/button/style.module.css'
import { CheckIcon, CopyIcon } from '@/components/icons/icons'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { cx } from '@/utils/cx'

interface CopyButtonProps {
  text: string
  label: string
  copiedLabel: string
  small?: boolean
}

export default function CopyButton({ text, label, copiedLabel, small }: CopyButtonProps) {
  const { copyToClipboard, copied } = useCopyToClipboard()

  return (
    <button
      type='button'
      className={cx(btn.button, small && btn.small, 'no-print')}
      onClick={() => copyToClipboard(text)}
    >
      {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
      <span aria-live='polite'>{copied ? copiedLabel : label}</span>
    </button>
  )
}
