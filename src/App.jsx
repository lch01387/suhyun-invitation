import { Fragment, useEffect, useRef, useState } from 'react'
import { WEDDING, weddingDate } from './config'
import letterImg from './assets/decor/letter.png'
import raccoonImg from './assets/decor/raccoon.png'

const DAYS = ['일', '월', '화', '수', '목', '금', '토']

function Clover({ size = 24, className = '', style }) {
  const petal =
    'M0 0 C-1.8 -5 -11 -6.2 -11 -12.6 C-11 -17 -7.6 -19.8 -4 -19.8 C-1.6 -19.8 0 -18 0 -18 C0 -18 1.6 -19.8 4 -19.8 C7.6 -19.8 11 -17 11 -12.6 C11 -6.2 1.8 -5 0 0 Z'
  return (
    <svg
      viewBox="0 0 48 52"
      width={size}
      height={(size * 52) / 48}
      className={className}
      style={style}
      aria-hidden="true"
    >
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

function ParentsLine({ text, name }) {
  const [father, motherAndRelation] = text.split('·').map((s) => s.trim())
  const match = motherAndRelation.match(/^(.*?)(의\s*(?:장남|장녀))$/)
  const mother = match ? match[1] : motherAndRelation
  const relation = match ? match[2] : ''
  return (
    <p>
      {father} · {mother}
      <span className="parents-relation">{relation}</span> <strong>{name}</strong>
    </p>
  )
}

function Gallery({ photos }) {
  const [active, setActive] = useState(null) // 확대 중인 사진의 인덱스 (null이면 닫힘)

  const prev = () => setActive((i) => (i - 1 + photos.length) % photos.length)
  const next = () => setActive((i) => (i + 1) % photos.length)

  useEffect(() => {
    if (active === null) return
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])

  // 사진의 왼쪽 절반 클릭 → 이전, 오른쪽 절반 클릭 → 다음
  const onImageClick = (e) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    if (e.clientX - rect.left < rect.width / 2) prev()
    else next()
  }

  // 사진 위 커서: 왼쪽 절반은 ←, 오른쪽 절반은 → 모양으로 이동 방향을 표시
  const onImageMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.cursor = e.clientX - rect.left < rect.width / 2 ? 'w-resize' : 'e-resize'
  }

  return (
    <section className="section">
      <HeartDivider />
      <h2 className="section-heading">웨딩 갤러리</h2>
      <div className="gallery-grid">
        {photos.map((photo, i) => (
          <button type="button" className="gallery-photo" key={i} onClick={() => setActive(i)}>
            <img src={photo.src} alt="" loading="lazy" style={{ objectPosition: photo.pos }} />
          </button>
        ))}
      </div>
      {active !== null && (
        <div className="lightbox" onClick={() => setActive(null)}>
          <button
            type="button"
            className="lightbox-close"
            aria-label="닫기"
            onClick={(e) => {
              e.stopPropagation()
              setActive(null)
            }}
          >
            ✕
          </button>
          <button
            type="button"
            className="lightbox-arrow lightbox-arrow-left"
            aria-label="이전 사진"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
          >
            ‹
          </button>
          <img src={photos[active].src} alt="" onClick={onImageClick} onMouseMove={onImageMouseMove} />
          <button
            type="button"
            className="lightbox-arrow lightbox-arrow-right"
            aria-label="다음 사진"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
          >
            ›
          </button>
          <div className="lightbox-counter">
            {active + 1} / {photos.length}
          </div>
        </div>
      )}
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

function accountNumberOf(bank) {
  return bank.replace(/\D/g, '')
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
          <CopyButton className="pill-button" text={accountNumberOf(entry.bank)}>
            복사하기
          </CopyButton>
        </div>
      ))}
    </>
  )
}

const BURST_EMOJI = ['🍀']

function makeCloverBurst() {
  const count = (10 + Math.floor(Math.random() * 7)) * 3
  return Array.from({ length: count }, () => {
    const angle = Math.random() * 2 * Math.PI
    const distance = 50 + Math.random() * 130
    const dx = distance * Math.cos(angle)
    const dy = distance * Math.sin(angle)
    return {
      id: `${Date.now()}-${Math.random()}`,
      emoji: BURST_EMOJI[Math.floor(Math.random() * BURST_EMOJI.length)],
      dx,
      dy,
      size: 16 + Math.random() * 14,
      rotate: Math.random() * 360 - 180,
      delay: Math.random() * 0.15,
      duration: 0.7 + Math.random() * 0.5,
    }
  })
}

function ClosingRaccoon({ src }) {
  const [bursts, setBursts] = useState([])
  const imgRef = useRef(null)
  const canvasRef = useRef(null)

  const isOpaqueAt = (clientX, clientY) => {
    const img = imgRef.current
    if (!img) return true
    if (!canvasRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      canvas.getContext('2d').drawImage(img, 0, 0)
      canvasRef.current = canvas
    }
    const rect = img.getBoundingClientRect()
    const x = Math.floor(((clientX - rect.left) / rect.width) * img.naturalWidth)
    const y = Math.floor(((clientY - rect.top) / rect.height) * img.naturalHeight)
    const alpha = canvasRef.current.getContext('2d').getImageData(x, y, 1, 1).data[3]
    return alpha > 20
  }

  const handleClick = (e) => {
    if (!isOpaqueAt(e.clientX, e.clientY)) return
    const id = `${Date.now()}-${Math.random()}`
    setBursts((prev) => [...prev, { id, particles: makeCloverBurst() }])
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id))
    }, 1500)
  }

  return (
    <div className="closing-raccoon">
      <div className="raccoon-stage">
        <div className="clover-burst" aria-hidden="true">
          {bursts.map((burst) =>
            burst.particles.map((p) => (
              <span
                key={p.id}
                className="clover-particle"
                style={{
                  fontSize: `${p.size}px`,
                  '--dx': `${p.dx}px`,
                  '--dy': `${p.dy}px`,
                  '--rot': `${p.rotate}deg`,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                }}
              >
                {p.emoji}
              </span>
            )),
          )}
        </div>
        <button type="button" className="raccoon-button" onClick={handleClick}>
          <img ref={imgRef} src={src} alt="" />
        </button>
      </div>
      <p className="raccoon-caption">행운을 가져다주는 바위너구리</p>
    </div>
  )
}

export default function App() {
  const { groom, bride, venue, greeting, account, photos } = WEDDING
  const d = weddingDate()

  return (
    <div className="invitation">
      <header className="hero-photo">
        <img className="hero-bg" src={photos.hero} alt="" />
        <div className="hero-info">
          <p className="hero-venue-name">{venue.name}</p>
          <p>{formatDate()}</p>
        </div>
      </header>

      <section className="greeting-section">
        <div className="invite-block">
          <img className="invite-letter" src={letterImg} alt="" />
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
        </div>
        <div className="parents-divider" />
        <div className="parents">
          <ParentsLine text={groom.parents} name={groom.fullName} />
          <ParentsLine text={bride.parents} name={bride.fullName} />
        </div>
      </section>

      <section className="section schedule-section">
        <p className="schedule-big-date">
          {pad(d.getMonth() + 1)} / {pad(d.getDate())}
        </p>
        <p className="schedule-date">{formatDayTime()}</p>
        <Calendar />
        <Countdown />
      </section>

      <Gallery photos={photos.gallery} />

      <section className="section">
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

      <section className="section">
        <HeartDivider />
        <h2 className="section-heading">마음 전하실 곳</h2>
        <div className="accounts">
          <Accordion title="신랑" defaultOpen={false}>
            <AccountRows entries={account.groom} />
          </Accordion>
          <Accordion title="신부" defaultOpen={false}>
            <AccountRows entries={account.bride} />
          </Accordion>
        </div>
      </section>

      <section className="section">
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

      <ClosingRaccoon src={raccoonImg} />

      <footer className="footer">
        {groom.name} <Clover size={15} className="inline-clover" /> {bride.name}
      </footer>
    </div>
  )
}
