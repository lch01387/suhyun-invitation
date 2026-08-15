// ─────────────────────────────────────────────
// 청첩장 정보는 이 파일만 수정하면 됩니다.
// ─────────────────────────────────────────────
// 히어로: 날짜·장소 텍스트가 포함된 필름 스트립 디자인 (하단 흰 여백은 잘라낸 상태)
import heroPhoto from './assets/photos/hero-strip.jpg'

// 갤러리 썸네일(정사각형)에서 각 사진의 크롭 기준점 (CSS object-position).
// 세로 % 값이 작을수록 사진의 위쪽을 보여줍니다. 지정하지 않으면 중앙(50% 50%).
const galleryCropPositions = {
  1: '50% 0%', // 상단으로
  3: '50% 15%', // 위로
  4: '50% 15%', // 위로
  6: '50% 15%', // 위로
  9: '50% 75%', // 아래로
  10: '50% 35%', // 살짝 위로
  12: '50% 15%', // 위로
  13: '50% 15%', // 위로
  14: '50% 75%', // 아래로
  15: '50% 15%', // 위로
}

// 웨딩 갤러리 사진 (src/assets/photos/gallery/), 파일명 숫자순 정렬
const galleryPhotos = Object.entries(
  import.meta.glob('./assets/photos/gallery/g*.jpg', { eager: true, import: 'default' }),
)
  .sort(([a], [b]) => parseInt(a.match(/g(\d+)/)[1], 10) - parseInt(b.match(/g(\d+)/)[1], 10))
  .map(([path, src]) => {
    const num = parseInt(path.match(/g(\d+)/)[1], 10)
    return { src, pos: galleryCropPositions[num] || '50% 50%' }
  })

export const WEDDING = {
  groom: {
    name: '창현',
    fullName: '이창현',
    nameEn: 'CHANGHYUN',
    parents: '이봉규 · 김인숙의 장남',
    phone: '010-3614-3258',
  },
  bride: {
    name: '지수',
    fullName: '하지수',
    nameEn: 'JISU',
    parents: '하행진 · 김정남의 장녀',
    phone: '010-4634-6851',
  },
  // 예식 일시 (연, 월, 일, 시, 분) — 월은 1~12 그대로 적으면 됩니다.
  date: { year: 2026, month: 11, day: 7, hour: 12, minute: 30 },
  venue: {
    name: '네이버 1784 스카이홀',
    address: '경기도 성남시 분당구 정자일로 95',
    lat: 37.3588179,
    lng: 127.1052329,
    mapUrl: 'https://map.naver.com/p/entry/place/1909737461',
    // 네이버 클라우드 플랫폼 > Maps > Application의 Client ID(ncpKeyId).
    // Web 서비스 URL에 http://localhost:5173 과 https://lch01387.github.io 를 등록해야 합니다.
    // 값은 하드코딩하지 않고 VITE_NAVER_MAP_CLIENT_ID 환경변수로 주입합니다.
    // (로컬 개발: .env.local, 배포: GitHub Actions secret NAVER_MAP_API_ID)
    // Client Secret(NAVER_MAP_API_KEY)은 서버용이라 프론트엔드 번들에는 넣지 않습니다.
    mapClientId: import.meta.env.VITE_NAVER_MAP_CLIENT_ID,
    // icon은 App.jsx의 TRANSIT_ICONS 키 (subway | car | parking)
    transit: [
      {
        icon: 'subway',
        title: '지하철 이용 시',
        lines: ['수인분당선/신분당선 정자역 3번 출구에서 도보 15분'],
      },
      {
        icon: 'car',
        title: '자차 이용 시',
        lines: ['‘네이버1784’ 검색', '경기 성남시 분당구 정자일로 95'],
      },
      {
        icon: 'parking',
        title: '주차',
        lines: ['건물 내 주차, 당일 무료'],
      },
    ],
  },
  greeting: [
    '자란 곳도, 하는 일도, 살아온 시간도 달랐지만',
    '함께 있으면 신기할 만큼 잘 맞는 우리는',
    '이대로 오래오래 함께하고 싶어 결혼합니다♥',
    '가을이 깊어가는 11월의 첫 주말,',
    '저희의 가장 설레는 하루를 함께해 주세요.',
  ],
  // INFORMATION 섹션 (마음 전하실 곳 아래) 안내 카드들
  information: [
    {
      title: '식사 안내',
      lines: ['연회장은 예식 30분 전 부터 2시간 이용 가능합니다.'],
    },
    {
      title: '포토 부스',
      lines: [
        '예식장 한켠에 포토부스가 마련되어 있습니다.',
        '사진 한 장은 가져가시고, 한 장은 방명록에 남겨주세요.',
        '귀한 시간내어 축하해주신 여러분의 마음을 더욱 오래 추억하며 간직하겠습니다.',
      ],
    },
    {
      title: '플라워 래핑',
      lines: [
        '저희의 결혼식을 아름답게 채워준 꽃들을 예식 후 작은 꽃다발로 묶어 감사한 마음과 함께 나누어 드립니다.',
        '특별한 하루를 함께해 주신 마음처럼 예쁜 꽃과 함께 행복한 하루 되시면 좋겠습니다.',
      ],
    },
  ],
  account: {
    groom: [
      { holder: '이창현', bank: '하나은행 142-910-6971-6207' },
      { holder: '이봉규', bank: '신한은행 110-156-277440' },
      { holder: '김인숙', bank: '신한은행 110-513-545597' },
    ],
    bride: [
      { holder: '하지수', bank: '농협은행 302-1871-3425-41' },
      { holder: '하행진', bank: '국민은행 6695010-04-008174' },
      { holder: '김정남', bank: '농협 825072-56-017596' },
    ],
  },
  // 히어로/갤러리 모두 실제 사진(src/assets/photos/)을 사용합니다.
  photos: {
    hero: heroPhoto,
    gallery: galleryPhotos,
  },
}

export function weddingDate() {
  const { year, month, day, hour, minute } = WEDDING.date
  return new Date(year, month - 1, day, hour, minute)
}
