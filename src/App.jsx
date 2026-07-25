import { useEffect, useRef, useState } from 'react'
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

function formatDate() {
  const d = weddingDate()
  const ampm = d.getHours() < 12 ? '오전' : '오후'
  const hour12 = d.getHours() % 12 || 12
  const minute = d.getMinutes() ? ` ${d.getMinutes()}분` : ''
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${DAYS[d.getDay()]}요일 ${ampm} ${hour12}시${minute}`
}

function formatDateEn() {
  const d = weddingDate()
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const pad = (n) => String(n).padStart(2, '0')
  const h = d.getHours()
  const ampm = h < 12 ? 'AM' : 'PM'
  const hour12 = h % 12 || 12
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}. ${days[d.getDay()]} ${hour12}:${pad(d.getMinutes())} ${ampm}`
}

// 히어로에 흩뿌려지는 이름 알파벳 뱃지 (x, y는 % 단위)
const LETTER_BADGES = [
  ...['C', 'H', 'A', 'N', 'G', 'H', 'Y', 'U', 'N'].map((ch, i) => ({
    ch,
    x: [7, 16, 27, 38, 50, 61, 72, 83, 91][i],
    y: [16, 7, 14, 5, 12, 4, 13, 6, 15][i],
    alt: false,
  })),
  ...['J', 'I', 'S', 'U'].map((ch, i) => ({
    ch,
    x: [22, 41, 60, 78][i],
    y: [24, 22, 25, 23][i],
    alt: true,
  })),
]

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
    <div className="countdown">
      {[
        [days, 'DAYS'],
        [hours, 'HOURS'],
        [minutes, 'MIN'],
        [seconds, 'SEC'],
      ].map(([value, label]) => (
        <div className="countdown-item" key={label}>
          <span className="countdown-value">{value}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  )
}

function Calendar() {
  const d = weddingDate()
  const first = new Date(d.getFullYear(), d.getMonth(), 1)
  const last = new Date(d.getFullYear(), d.getMonth() + 1, 0)
  const cells = [
    ...Array(first.getDay()).fill(null),
    ...Array.from({ length: last.getDate() }, (_, i) => i + 1),
  ]

  return (
    <div className="calendar-blob">
      <div className="calendar">
        <div className="calendar-month">
          {d.getMonth() + 1}월 <span className="calendar-month-en">/ {formatDateEn()}</span>
        </div>
        <div className="calendar-grid">
          {DAYS.map((day) => (
            <div className="calendar-head" key={day}>
              {day}
            </div>
          ))}
          {cells.map((day, i) => (
            <div className={day === d.getDate() ? 'calendar-day wedding-day' : 'calendar-day'} key={i}>
              {day === d.getDate() && <Clover size={36} className="wedding-clover" />}
              <span>{day}</span>
            </div>
          ))}
        </div>
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

function ContactRow({ role, person }) {
  return (
    <div className="contact-row">
      <span className="contact-role">{role}</span>
      <span className="contact-name">{person.name}</span>
      <a className="contact-call" href={`tel:${person.phone}`}>
        전화하기
      </a>
    </div>
  )
}

function AccountCard({ side, entries, tone }) {
  return (
    <div className={`account-card ${tone}`}>
      <span className="account-side hand">{side}</span>
      {entries.map((entry) => (
        <div className="account-entry" key={entry.holder}>
          <p>{entry.bank}</p>
          <p className="account-holder">{entry.holder}</p>
          <CopyButton className="copy-link" text={`${entry.bank} ${entry.holder}`}>
            복사하기
          </CopyButton>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const { groom, bride, venue, greeting, account } = WEDDING

  return (
    <div className="invitation">
      <header className="hero">
        {LETTER_BADGES.map((b, i) => (
          <span
            className={b.alt ? 'letter-chip alt' : 'letter-chip'}
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
            key={i}
          >
            {b.ch}
          </span>
        ))}
        <Clover size={72} className="hero-clover" />
        <div className="hero-blob">
          <p className="hero-names-en">
            {groom.nameEn} <Clover size={14} className="inline-clover" /> {bride.nameEn}
          </p>
          <p className="hero-date-en">{formatDateEn()}</p>
          <p className="hero-venue-en">{venue.name}</p>
        </div>
        <p className="hero-script hand">
          You&rsquo;re invited
          <br />
          to our wedding
        </p>
        <h1 className="hero-title">
          {groom.name}, {bride.name} 결혼합니다.
        </h1>
      </header>

      <section className="section">
        <h2 className="section-heading">모시는 글</h2>
        <div className="greeting hand">
          {greeting.map((line, i) => (line ? <p key={i}>{line}</p> : <br key={i} />))}
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

      <section className="section">
        <h2 className="section-heading">예식 안내</h2>
        <p className="schedule-date">{formatDate()}</p>
        <Calendar />
        <Countdown />
      </section>

      <section className="section">
        <h2 className="section-heading">
          오시는 길
          <span className="section-sub">{venue.name}</span>
        </h2>
        <p className="venue-address">{venue.address}</p>
        <CopyButton className="copy-button" text={venue.address}>
          주소 복사하기
        </CopyButton>
        <NaverMap />
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
        {venue.transit.map((t) => (
          <div className="transit" key={t.title}>
            <h3>
              {t.icon} {t.title}
            </h3>
            {t.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        ))}
      </section>

      <section className="section">
        <h2 className="section-heading">연락하기</h2>
        <ContactRow role="신랑" person={groom} />
        <ContactRow role="신부" person={bride} />
      </section>

      <section className="section">
        <h2 className="section-heading">마음 전하실 곳</h2>
        <div className="accounts">
          <AccountCard side="신랑 측" entries={account.groom} tone="groom" />
          <AccountCard side="신부 측" entries={account.bride} tone="bride" />
        </div>
      </section>

      <footer className="footer">
        {groom.name} <Clover size={16} className="inline-clover" /> {bride.name}
      </footer>
    </div>
  )
}
