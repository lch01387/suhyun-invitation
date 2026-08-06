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
    <div className="calendar">
      <div className="calendar-grid">
        {DAYS.map((day, i) => (
          <div className={i === 0 ? 'calendar-head sunday' : 'calendar-head'} key={day}>
            {day}
          </div>
        ))}
        {cells.map((day, i) => (
          <div
            className={
              day === d.getDate()
                ? 'calendar-day wedding-day'
                : i % 7 === 0
                  ? 'calendar-day sunday'
                  : 'calendar-day'
            }
            key={i}
          >
            {day === d.getDate() && <Clover size={38} className="wedding-clover" />}
            <span>{day}</span>
          </div>
        ))}
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

function AccountCard({ side, entries }) {
  return (
    <div className="account-card">
      <span className="account-tag">{side}</span>
      {entries.map((entry) => (
        <div className="account-row" key={entry.holder}>
          <div className="account-info">
            <p className="account-bank">{entry.bank}</p>
            <p className="account-holder">{entry.holder}</p>
          </div>
          <CopyButton className="pill-button" text={`${entry.bank} ${entry.holder}`}>
            복사
          </CopyButton>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  useReveal()
  const { groom, bride, venue, greeting, account } = WEDDING
  const d = weddingDate()

  return (
    <div className="invitation">
      <header className="card hero reveal">
        <p className="overline">WEDDING INVITATION</p>
        <div className="hero-date-big">
          {pad(d.getMonth() + 1)}
          <Clover size={34} className="hero-date-clover" />
          {pad(d.getDate())}
        </div>
        <h1 className="hero-names">
          {groom.name} <span className="hero-amp">&</span> {bride.name}
        </h1>
        <p className="hero-script hand">평생 함께 할 사람을 만났습니다</p>
        <div className="hero-meta">
          <p>{formatDate()}</p>
          <p>{venue.name}</p>
        </div>
      </header>

      <section className="card reveal">
        <h2 className="section-heading">모시는 글</h2>
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

      <section className="card reveal">
        <h2 className="section-heading">예식 안내</h2>
        <p className="schedule-date">{formatDate()}</p>
        <Calendar />
        <Countdown />
      </section>

      <section className="card reveal">
        <h2 className="section-heading">오시는 길</h2>
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

      <section className="card reveal">
        <h2 className="section-heading">연락하기</h2>
        <div className="contact-row">
          <span className="contact-role">신랑</span>
          <span className="contact-name">{groom.name}</span>
          <a className="pill-button" href={`tel:${groom.phone}`}>
            전화하기
          </a>
        </div>
        <div className="contact-row">
          <span className="contact-role">신부</span>
          <span className="contact-name">{bride.name}</span>
          <a className="pill-button" href={`tel:${bride.phone}`}>
            전화하기
          </a>
        </div>
      </section>

      <section className="card reveal">
        <h2 className="section-heading">마음 전하실 곳</h2>
        <div className="accounts">
          <AccountCard side="신랑 측" entries={account.groom} />
          <AccountCard side="신부 측" entries={account.bride} />
        </div>
      </section>

      <footer className="footer">
        {groom.name} <Clover size={15} className="inline-clover" /> {bride.name}
      </footer>
    </div>
  )
}
