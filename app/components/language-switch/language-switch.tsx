import { Link, useLocation } from 'react-router'
import { languages, localePath, stripLang, useLang, useT } from '@/i18n'
import s from './style.module.css'

interface LanguageSwitchProps {
  /** Anchor to keep when switching, so the reader stays on the same section */
  hash?: string
}

export default function LanguageSwitch({ hash = '' }: LanguageSwitchProps) {
  const t = useT()
  const lang = useLang()
  const path = stripLang(useLocation().pathname)

  return (
    <div role='group' aria-label={t.language.label} className={s.switch}>
      {languages.map((l) => (
        <Link
          key={l}
          to={`${localePath(l, path)}${hash}`}
          hrefLang={l}
          lang={l}
          title={t.language.names[l]}
          aria-current={l === lang ? 'true' : undefined}
          className={s.option}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
