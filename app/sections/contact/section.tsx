import CopyButton from '@/components/copy-button/copy-button'
import { ArrowUpRightIcon, MailIcon } from '@/components/icons/icons'
import SectionHeader from '@/components/section-header/section-header'
import { socialLinks } from '@/config/social'
import { useT } from '@/i18n'
import s from './style.module.css'

export default function ContactSection() {
  const t = useT()
  const { email } = t.contact

  return (
    <section id='contact' aria-labelledby='contact-title'>
      <SectionHeader id='contact' title={t.contact.title} />

      <div className={s.panel}>
        <p className={s.lead}>{t.contact.lead}</p>
        <div className={s.emailRow}>
          <a href={`mailto:${email}`} className={s.email}>
            <MailIcon size={20} />
            {email}
          </a>
          <CopyButton text={email} label={t.contact.copy} copiedLabel={t.contact.copied} />
        </div>

        <ul className={s.socials}>
          {socialLinks.map(({ key, href, Icon }) => (
            <li key={key}>
              <a href={href} target='_blank' rel='noopener noreferrer' className={s.social}>
                <Icon size={20} />
                {t.social[key]}
                <ArrowUpRightIcon size={14} className={s.arrow} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className={s.colophon}>
        {t.nav.brand} <span aria-hidden='true'>·</span> {t.nav.subtitle}
      </p>
    </section>
  )
}
