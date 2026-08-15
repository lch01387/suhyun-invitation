import { useEffect, useRef, useState } from 'react'
import { WEDDING, weddingDate } from './config'
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

const EN_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const EN_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function formatFullKo() {
  const d = weddingDate()
  const ampm = d.getHours() < 12 ? '오전' : '오후'
  const hour12 = d.getHours() % 12 || 12
  const minute = d.getMinutes() ? ` ${d.getMinutes()}분` : ''
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${DAYS[d.getDay()]}요일 | ${ampm} ${hour12}시${minute}`
}

function formatFullEn() {
  const d = weddingDate()
  const ampm = d.getHours() < 12 ? 'AM' : 'PM'
  const hour12 = d.getHours() % 12 || 12
  return `${EN_DAYS[d.getDay()]}, ${EN_MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} | ${ampm} ${hour12}:${pad(d.getMinutes())}`
}

function CopyButton({ text, className = '', children, copiedChildren = '복사됐어요 🍀', ...rest }) {
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
    <button type="button" className={className} onClick={onClick} {...rest}>
      {copied ? copiedChildren : children}
    </button>
  )
}

function CopyIcon({ size = 15 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5 15H4.8A1.8 1.8 0 0 1 3 13.2V4.8A1.8 1.8 0 0 1 4.8 3h8.4A1.8 1.8 0 0 1 15 4.8V5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CheckIcon({ size = 15 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <path
        d="M4.5 12.5 10 18 19.5 6.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TransitSvg({ children, size = 19 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function SubwayIcon() {
  return (
    <TransitSvg>
      <path d="M8 3.1V7a4 4 0 0 0 8 0V3.1" />
      <path d="m9 15-1-1" />
      <path d="m15 15 1-1" />
      <path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z" />
      <path d="m8 19-2 3" />
      <path d="m16 19 2 3" />
    </TransitSvg>
  )
}

function CarIcon() {
  return (
    <TransitSvg>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </TransitSvg>
  )
}

function ParkingIcon() {
  return (
    <TransitSvg>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </TransitSvg>
  )
}

// config의 transit.icon 키 → 라인 아이콘 (참고 페이지 디자인)
const TRANSIT_ICONS = {
  subway: <SubwayIcon />,
  car: <CarIcon />,
  parking: <ParkingIcon />,
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
          [hours, 'HOURS'],
          [minutes, 'MINUTES'],
          [seconds, 'SECONDS'],
        ].map(([value, label]) => (
          <div className="countdown-item" key={label}>
            <span className="countdown-value">{value}</span>
            <span className="countdown-label">{label}</span>
          </div>
        ))}
      </div>
      <p className="countdown-summary">
        {WEDDING.groom.name} <Heart size={11} className="heart-ink" /> {WEDDING.bride.name}의 결혼식이{' '}
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
          // 참고 디자인처럼 이전/다음 달 날짜는 빈 칸으로 둔다
          if (!cell.current) return <div className="calendar-day" key={i} />
          const isWeddingDay = cell.day === d.getDate()
          const classes = ['calendar-day']
          if (i % 7 === 0) classes.push('sunday')
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

function ChevronIcon({ dir = 'left', size = 26 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <path
        d={dir === 'left' ? 'M15 18 9 12l6-6' : 'm9 18 6-6-6-6'}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CloseIcon({ size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function Gallery({ photos }) {
  const [active, setActive] = useState(null) // 확대 중인 사진의 인덱스 (null이면 닫힘)
  const touchStartX = useRef(null)

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
    // 뷰어가 열려 있는 동안 뒤 페이지 스크롤 잠금
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [active])

  // 참고 페이지와 동일하게 스와이프로 이전/다음 이동
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (dx > 40) prev()
    else if (dx < -40) next()
  }

  return (
    <section className="section gallery-section">
      <h2 className="schedule-title">GALLERY</h2>
      <div className="gallery-grid">
        {photos.map((photo, i) => (
          <button type="button" className="gallery-photo" key={i} onClick={() => setActive(i)}>
            <img src={photo.src} alt="" loading="lazy" style={{ objectPosition: photo.pos }} />
          </button>
        ))}
      </div>
      {active !== null && (
        <div className="lightbox">
          <div className="lightbox-frame" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <img src={photos[active].src} alt="" />
            <button
              type="button"
              className="lightbox-close"
              aria-label="닫기"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </button>
            {/* 참고 페이지처럼 좌우 가장자리 전체가 이전/다음 탭 존 */}
            <button type="button" className="lightbox-zone lightbox-zone-left" aria-label="이전 사진" onClick={prev} />
            <button type="button" className="lightbox-zone lightbox-zone-right" aria-label="다음 사진" onClick={next} />
            <div className="lightbox-bottom">
              <button type="button" className="lightbox-nav" aria-label="이전 사진" onClick={prev}>
                <ChevronIcon dir="left" />
              </button>
              <span className="lightbox-counter">
                {active + 1} / {photos.length}
              </span>
              <button type="button" className="lightbox-nav" aria-label="다음 사진" onClick={next}>
                <ChevronIcon dir="right" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Accordion({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={open ? 'accordion open' : 'accordion'}>
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

function AccountRows({ entries, side }) {
  // 데이터 순서: 본인, 아버지, 어머니
  const relationOf = (i) => (i === 0 ? side : i === 1 ? `${side} 아버지` : `${side} 어머니`)
  return (
    <>
      {entries.map((entry, i) => {
        const [bankName, ...numberParts] = entry.bank.split(' ')
        const number = numberParts.join(' ')
        const info = (
          <div className="account-copy-info">
            <p className="account-bank-name">{bankName}</p>
            <p className="account-number">{number}</p>
          </div>
        )
        return (
          <div className="account-card" key={entry.holder}>
            <div className="account-card-top">
              <span className="account-relation">{relationOf(i)}</span>
              <span className="account-name">{entry.holder}</span>
            </div>
            <CopyButton
              className="account-copy"
              text={accountNumberOf(entry.bank)}
              copiedChildren={
                <>
                  {info}
                  <CheckIcon size={20} />
                </>
              }
            >
              {info}
              <CopyIcon size={20} />
            </CopyButton>
          </div>
        )
      })}
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
  const { groom, bride, venue, greeting, account, information, photos } = WEDDING

  return (
    <div className="invitation">
      <header className="hero-photo">
        <img className="hero-bg" src={photos.hero} alt="" />
      </header>

      <section className="greeting-section">
        <div className="invite-block">
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
        <p className="schedule-title">WEDDING DAY</p>
        <p className="schedule-date-ko">{formatFullKo()}</p>
        <p className="schedule-date-en">{formatFullEn()}</p>
        <div className="schedule-line" />
        <Calendar />
        <div className="schedule-line" />
        <Countdown />
      </section>

      <section className="section location-section">
        <h2 className="location-title">LOCATION</h2>
        <p className="venue-name">{venue.name}</p>
        <CopyButton
          className="venue-address"
          text={venue.address}
          aria-label="주소 복사하기"
          copiedChildren={
            <>
              {venue.address}
              <CheckIcon />
            </>
          }
        >
          {venue.address}
          <CopyIcon />
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
        <div className="transit-list">
          {venue.transit.map((t) => (
            <div className="transit" key={t.title}>
              <h3>
                {TRANSIT_ICONS[t.icon] ?? <span className="transit-icon">{t.icon}</span>} {t.title}
              </h3>
              {t.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <Gallery photos={photos.gallery} />

      <section className="section accounts-section">
        <div className="accounts-topline" />
        <h2 className="accounts-title">마음 전하실 곳</h2>
        <p className="accounts-note">
          참석이 어려우신 분들을 위해 기재했습니다
          <br />
          너그러운 마음으로 양해 부탁드립니다
        </p>
        <div className="accounts">
          <Accordion title="신랑" defaultOpen={false}>
            <AccountRows entries={account.groom} side="신랑" />
          </Accordion>
          <Accordion title="신부" defaultOpen={false}>
            <AccountRows entries={account.bride} side="신부" />
          </Accordion>
        </div>
      </section>

      <section className="section info-section">
        <h2 className="schedule-title info-title">INFORMATION</h2>
        <p className="accounts-title">안내</p>
        <p className="accounts-note">저희 웨딩에 대한 사전 안내를 드립니다</p>
        <div className="info-cards">
          {information.map((item) => (
            <div className="info-card" key={item.title}>
              <h3 className="info-card-title">{item.title}</h3>
              {item.lines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          ))}
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
