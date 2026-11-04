import { asset, media } from '@/content/media'
import { useT } from '@/i18n'
import s from './style.module.css'

/** Live setup + technical rider, shared by the home section and the printable /rider page */
export default function RiderContent() {
  const t = useT().rider
  const diagram = media.images['live-setup-diagram']

  return (
    <>
      <div className={s.summary}>
        <h3 className='visually-hidden'>{t.summaryTitle}</h3>
        <ul className={s.chips}>
          {t.summary.map((item) => (
            <li key={item} className={s.chip}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={s.grid}>
        <div>
          <div className={s.block}>
            <h3 className={s.blockTitle}>{t.techTitle}</h3>

            <h4 className={s.specTitle}>{t.general.title}</h4>
            <p className={s.specText}>{t.general.text}</p>

            <h4 className={s.specTitle}>{t.tech.title}</h4>
            <ul className={s.specList}>
              {t.tech.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h4 className={s.specTitle}>{t.stage.title}</h4>
            <p className={s.specText}>{t.stage.text}</p>

            <h4 className={s.specTitle}>{t.arrival.title}</h4>
            <p className={s.specText}>{t.arrival.text}</p>
          </div>
        </div>

        <div>
          <div className={s.block}>
            <h3 className={s.blockTitle}>{t.setupTitle}</h3>
            <p className={s.specText}>{t.setupIntro}</p>
            <img
              src={asset(diagram.src)}
              width={diagram.width}
              height={diagram.height}
              alt={t.diagramAlt}
              loading='lazy'
              decoding='async'
              className={s.diagram}
            />
            <dl className={s.gear}>
              {t.gear.map(({ name, role }) => (
                <div key={name} className={s.gearRow}>
                  <dt>{name}</dt>
                  <dd>{role}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.block}>
            <h3 className={s.blockTitle}>{t.routingTitle}</h3>
            <ol className={s.routing}>
              {t.routing.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  )
}
