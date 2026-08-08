import { Fragment, useEffect, useRef, useState } from 'react'
import { WEDDING, weddingDate } from './config'

const DAYS = ['일', '월', '화', '수', '목', '금', '토']

function Clover({ size = 24, className = '' }) {
  const petal =
    'M0 0 C-1.8 -5 -11 -6.2 -11 -12.6 C-11 -17 -7.6 -19.8 -4 -19.8 C-1.6 -19.8 0 -18 0 -18 C0 -18 1.6 -19.8 4 -19.8 C7.6 -19.8 11 -17 11 -12.6 C11 -6.2 1.8 -5 0 0 Z'
  return (
    <svg viewBox="0 0 48 52" width={size} height={(size * 52) / 48} className={className} aria-hidden="true">
      <g fill="currentColor">
        {[45, 135, 225, 315].map((deg) => (
          <path key={deg} d={petal} transform={`translate(24 24) rotate(${deg})`} />
        ))}
      </g>
      <path
        d="M24 24 C25 33 27 39 31 47"
        stroke="currentColor"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Heart({ size = 15, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.429-6.381 12-11.147 12-15.808 0-6.769-8.852-8.346-12-2.944z"
      />
    </svg>
  )
}

function HeartDivider() {
  return (
    <div className="heart-divider">
      <Heart className="heart-mint" />
      <Heart className="heart-coral" />
      <Heart className="heart-mint" />
    </div>
  )
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function formatDate() {
  const d = weddingDate()
  const ampm = d.getHours() < 12 ? '오전' : '오후'
  const hour12 = d.getHours() % 12 || 12
  const minute = d.getMinutes() ? ` ${d.getMinutes()}분` : ''
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${DAYS[d.getDay()]}요일 ${ampm} ${hour12}시${minute}`
}

function formatDayTime() {
  const d = weddingDate()
  const ampm = d.getHours() < 12 ? '오전' : '오후'
  const hour12 = d.getHours() % 12 || 12
  const minute = d.getMinutes() ? ` ${d.getMinutes()}분` : ''
  return `${DAYS[d.getDay()]}요일 ${ampm} ${hour12}시${minute}`
}

// 스크롤 시 카드가 아래에서 떠오르는 애니메이션
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        }),
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function CopyButton({ text, className = '', children }) {
  const [copied, setCopied] = useState(false)
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard 미지원 브라우저는 무시 */
    }
  }
  return (
    <button type="button" className={className} onClick={onClick}>
      {copied ? '복사됐어요 🍀' : children}
    </button>
  )
}

function Countdown() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const diff = weddingDate() - now
  if (diff <= 0) {
    return <p className="countdown-done">두 사람의 새로운 시작을 축복해 주셔서 감사합니다.</p>
  }
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)

  return (
    <>
      <div className="countdown">
        {[
          [days, 'DAYS'],
          [hours, 'HOUR'],
          [minutes, 'MIN'],
          [seconds, 'SEC'],
        ].map(([value, label], i) => (
          <Fragment key={label}>
            {i > 0 && <span className="countdown-sep">:</span>}
            <div className="countdown-item">
              <span className="countdown-value">{value}</span>
              <span className="countdown-label">{label}</span>
            </div>
          </Fragment>
        ))}
      </div>
      <p className="countdown-summary">
        {WEDDING.groom.name} <Heart size={11} className="heart-coral" /> {WEDDING.bride.name}의 결혼식이{' '}
        <strong>{days}일</strong> 남았습니다.
      </p>
    </>
  )
}

function Calendar() {
  const d = weddingDate()
  const year = d.getFullYear()
  const month = d.getMonth()
  const leading = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()
  const totalCells = Math.ceil((leading + daysInMonth) / 7) * 7
  const trailing = totalCells - leading - daysInMonth

  const cells = [
    ...Array.from({ length: leading }, (_, i) => ({ day: daysInPrevMonth - leading + i + 1, current: false })),
    ...Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, current: true })),
    ...Array.from({ length: trailing }, (_, i) => ({ day: i + 1, current: false })),
  ]

  return (
    <div className="calendar">
      <div className="calendar-grid">
        {DAYS.map((day, i) => (
          <div className={i === 0 ? 'calendar-head sunday' : 'calendar-head'} key={day}>
            {day}
          </div>
        ))}
        {cells.map((cell, i) => {
          const isWeddingDay = cell.current && cell.day === d.getDate()
          const classes = ['calendar-day']
          if (!cell.current) classes.push('muted')
          else if (i % 7 === 0) classes.push('sunday')
          if (isWeddingDay) classes.push('wedding-day')
          return (
            <div className={classes.join(' ')} key={i}>
              <span>{cell.day}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function NaverMap() {
  const mapRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const { lat, lng, mapClientId } = WEDDING.venue
    if (!mapClientId) {
      setFailed(true)
      return
    }

    const init = () => {
      const { maps } = window.naver
      const center = new maps.LatLng(lat, lng)
      const map = new maps.Map(mapRef.current, {
        center,
        zoom: 16,
        scrollWheel: false,
      })
      new maps.Marker({ position: center, map })
    }

    // 인증 실패 시 네이버 API가 호출하는 전역 콜백
    window.navermap_authFailure = () => setFailed(true)

    if (window.naver?.maps) {
      init()
      return
    }
    const script = document.createElement('script')
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${mapClientId}`
    script.onload = init
    script.onerror = () => setFailed(true)
    document.head.appendChild(script)
  }, [])

  if (failed) {
    return <div className="map-fallback">지도를 불러오지 못했습니다. 아래 앱으로 확인해주세요.</div>
  }
  return <div className="map-embed" ref={mapRef} />
}

function Polaroid({ src }) {
  return (
    <section className="polaroid-section reveal">
      <div className="polaroid-card">
        <img src={src} alt="" loading="lazy" />
        <span className="polaroid-caption hand">We're getting married!</span>
      </div>
    </section>
  )
}

function Gallery({ photos }) {
  return (
    <section className="section reveal">
      <HeartDivider />
      <h2 className="section-heading">웨딩 갤러리</h2>
      <div className="gallery-grid">
        {photos.map((src, i) => (
          <div className="gallery-photo" key={i}>
            <img src={src} alt="" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  )
}

function Accordion({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="accordion">
      <button type="button" className="accordion-header" onClick={() => setOpen((v) => !v)}>
        {title}
        <span className={open ? 'accordion-chevron open' : 'accordion-chevron'}>▾</span>
      </button>
      {open && <div className="accordion-body">{children}</div>}
    </div>
  )
}

function AccountRows({ entries }) {
  return (
    <>
      {entries.map((entry) => (
        <div className="account-row" key={entry.holder}>
          <div className="account-info">
            <p className="account-bank">{entry.bank}</p>
            <p className="account-holder">{entry.holder}</p>
          </div>
          <CopyButton className="pill-button" text={`${entry.bank} ${entry.holder}`}>
            복사하기
          </CopyButton>
        </div>
      ))}
    </>
  )
}

export default function App() {
  useReveal()
  const { groom, bride, venue, greeting, account, photos } = WEDDING
  const d = weddingDate()

  return (
    <div className="invitation">
      <header className="hero-photo reveal">
        <img className="hero-bg" src={photos.hero} alt="" />
        <div className="hero-overlay" />
        <Heart size={22} className="hero-heart hero-heart-1" />
        <Heart size={18} className="hero-heart hero-heart-2" />
        <Heart size={20} className="hero-heart hero-heart-3" />
        <div className="hero-names-en">
          <span>{groom.nameEn}</span>
          <span className="hero-and">and</span>
          <span>{bride.nameEn}</span>
        </div>
        <p className="hero-date-vertical">
          {d.getFullYear()}.{pad(d.getMonth() + 1)}.{pad(d.getDate())}
        </p>
        <h1 className="hero-script hand">
          {groom.name}
          <span className="hero-script-amp">&amp;</span>
          {bride.name}
        </h1>
      </header>

      <section className="section reveal">
        <HeartDivider />
        <h2 className="section-heading">초대합니다</h2>
        <div className="greeting">
          {greeting.map((line, i) =>
            line ? (
              <p key={i}>
                {line.split('♥').map((part, j, parts) => (
                  <span key={j}>
                    {part}
                    {j < parts.length - 1 && <span className="small-heart">♥</span>}
                  </span>
                ))}
              </p>
            ) : (
              <br key={i} />
            ),
          )}
        </div>
        <div className="parents">
          <p>
            {groom.parents} <strong>{groom.name}</strong>
          </p>
          <p>
            {bride.parents} <strong>{bride.name}</strong>
          </p>
        </div>
      </section>

      <Polaroid src={photos.polaroid} />

      <section className="section schedule-section reveal">
        <HeartDivider />
        <p className="schedule-big-date">
          {pad(d.getMonth() + 1)} / {pad(d.getDate())}
        </p>
        <p className="schedule-date">{formatDayTime()}</p>
        <Calendar />
        <Countdown />
      </section>

      <Gallery photos={photos.gallery} />

      <section className="section reveal">
        <HeartDivider />
        <h2 className="section-heading">식장 위치</h2>
        <p className="venue-name">{venue.name}</p>
        <p className="venue-address">{venue.address}</p>
        <NaverMap />
        <CopyButton className="copy-button" text={venue.address}>
          주소 복사하기
        </CopyButton>
        <div className="map-apps">
          {[
            {
              label: '네이버지도',
              icon: 'navermap.png',
              href: venue.mapUrl,
            },
            {
              label: '티맵',
              icon: 'tmap.png',
              href: `tmap://route?goalname=${encodeURIComponent(venue.name)}&goaly=${venue.lat}&goalx=${venue.lng}`,
            },
            {
              label: '카카오맵',
              icon: 'kakaomap.png',
              href: `https://map.kakao.com/link/to/${encodeURIComponent(venue.name)},${venue.lat},${venue.lng}`,
            },
          ].map((app) => (
            <a className="map-app" href={app.href} target="_blank" rel="noreferrer" key={app.label}>
              <img src={`${import.meta.env.BASE_URL}icons/${app.icon}`} alt={app.label} />
              <span>{app.label}</span>
            </a>
          ))}
        </div>
        <div className="transit-list">
          {venue.transit.map((t) => (
            <div className="transit" key={t.title}>
              <h3>
                <span className="transit-icon">{t.icon}</span> {t.title}
              </h3>
              {t.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="section reveal">
        <HeartDivider />
        <h2 className="section-heading">마음 전하실 곳</h2>
        <div className="accounts">
          <Accordion title="신랑측 계좌번호">
            <AccountRows entries={account.groom} />
          </Accordion>
          <Accordion title="신부측 계좌번호">
            <AccountRows entries={account.bride} />
          </Accordion>
        </div>
      </section>

      <section className="section reveal">
        <HeartDivider />
        <h2 className="section-heading">연락하기</h2>
        <div className="contact-row">
          <span className="contact-role">신랑</span>
          <span className="contact-name">{groom.name}</span>
          <span className="contact-phone">{groom.phone}</span>
          <a className="pill-button" href={`tel:${groom.phone}`}>
            전화하기
          </a>
        </div>
        <div className="contact-row">
          <span className="contact-role">신부</span>
          <span className="contact-name">{bride.name}</span>
          <span className="contact-phone">{bride.phone}</span>
          <a className="pill-button" href={`tel:${bride.phone}`}>
            전화하기
          </a>
        </div>
      </section>

      <div className="closing-band reveal">
        <img src={photos.closing} alt="" loading="lazy" />
        <div className="closing-band-overlay">
          <p className="closing-band-text">함께해주신 모든 분들께 감사드립니다.</p>
        </div>
      </div>

      <footer className="footer">
        {groom.name} <Clover size={15} className="inline-clover" /> {bride.name}
      </footer>
    </div>
  )
}
