import { useEffect, useState } from 'react'
import { WEDDING, weddingDate } from './config'

const DAYS = ['일', '월', '화', '수', '목', '금', '토']

function formatDate() {
  const d = weddingDate()
  const ampm = d.getHours() < 12 ? '오전' : '오후'
  const hour12 = d.getHours() % 12 || 12
  const minute = d.getMinutes() ? ` ${d.getMinutes()}분` : ''
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${DAYS[d.getDay()]}요일 ${ampm} ${hour12}시${minute}`
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
      <div className="calendar-month">{d.getMonth() + 1}월</div>
      <div className="calendar-grid">
        {DAYS.map((day) => (
          <div className="calendar-head" key={day}>
            {day}
          </div>
        ))}
        {cells.map((day, i) => (
          <div className={day === d.getDate() ? 'calendar-day wedding-day' : 'calendar-day'} key={i}>
            {day}
          </div>
        ))}
      </div>
    </div>
  )
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

export default function App() {
  const { groom, bride, venue, greeting, account } = WEDDING

  return (
    <div className="invitation">
      <header className="hero">
        <p className="hero-script">Wedding Invitation</p>
        <h1 className="hero-names">
          {groom.name}
          <span className="hero-and">그리고</span>
          {bride.name}
        </h1>
        <p className="hero-date">{formatDate()}</p>
        <p className="hero-venue">{venue.name}</p>
      </header>

      <section className="section">
        <h2 className="section-title">모시는 글</h2>
        <div className="greeting">
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
        <h2 className="section-title">예식 안내</h2>
        <Calendar />
        <Countdown />
      </section>

      <section className="section">
        <h2 className="section-title">오시는 길</h2>
        <p className="venue-name">{venue.name}</p>
        <p className="venue-address">{venue.address}</p>
        <a className="button" href={venue.mapUrl} target="_blank" rel="noreferrer">
          지도 보기
        </a>
      </section>

      <section className="section">
        <h2 className="section-title">연락하기</h2>
        <ContactRow role="신랑" person={groom} />
        <ContactRow role="신부" person={bride} />
      </section>

      <section className="section">
        <h2 className="section-title">마음 전하실 곳</h2>
        <div className="account">
          <p>
            <span className="account-role">신랑측</span> {account.groom}
          </p>
          <p>
            <span className="account-role">신부측</span> {account.bride}
          </p>
        </div>
      </section>

      <footer className="footer">
        {groom.name} ♥ {bride.name}
      </footer>
    </div>
  )
}
