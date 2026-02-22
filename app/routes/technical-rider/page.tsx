import { useTranslation } from 'react-i18next'

export default function Page() {
  const { t } = useTranslation()
  return (
    <div>
      <h1>{t('pages.technicalRider.title')}</h1>
    </div>
  )
}
