// ─────────────────────────────────────────────
// 청첩장 정보는 이 파일만 수정하면 됩니다.
// ─────────────────────────────────────────────
// 히어로: 4컷 필름 스트립 — 맨 아래 컷은 비어 있어 날짜·장소 텍스트 오버레이가 올라간다
import heroPhoto from './assets/photos/hero-strip5.jpg'

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

// 썸네일 확대 설정: scale 2 = 원본의 1/4 영역만 표시, origin = 확대 기준 위치
const galleryZooms = {
  9: { scale: 2, origin: 'left 65%' }, // 맨 왼쪽, 중간보다 살짝 아래 1/4 영역
}

// 웨딩 갤러리 사진 (src/assets/photos/gallery/), 파일명 숫자순 정렬
const galleryPhotos = Object.entries(
  import.meta.glob('./assets/photos/gallery/g*.jpg', { eager: true, import: 'default' }),
)
  .sort(([a], [b]) => parseInt(a.match(/g(\d+)/)[1], 10) - parseInt(b.match(/g(\d+)/)[1], 10))
  .map(([path, src]) => {
    const num = parseInt(path.match(/g(\d+)/)[1], 10)
    return { src, pos: galleryCropPositions[num] || '50% 50%', zoom: galleryZooms[num] }
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
      // 배열 항목 = 문단, 항목 안의 \n = 줄바꿈
      lines: [
        '예식장 한켠에 포토부스가 마련되어 있습니다.',
        '사진 한 장은 가져가시고,\n한 장은 방명록에 남겨주세요.',
        '귀한 시간내어 축하해주신 여러분의 마음을\n더욱 오래 추억하며 간직하겠습니다.',
      ],
    },
    {
      title: '플라워 래핑',
      lines: [
        '저희의 결혼식을 아름답게 채워준 꽃들을\n예식 후 작은 꽃다발로 묶어\n감사한 마음과 함께 나누어 드립니다.',
        '특별한 하루를 함께해 주신 마음처럼\n예쁜 꽃과 함께 행복한 하루 되시면 좋겠습니다.',
      ],
    },
  ],
  // OUR LOVE STORY 팝업의 인터뷰 내용 (TODO: 실제 인터뷰로 교체 — 현재는 참고 페이지 예시 그대로)
  interview: {
    popupTitle: 'WEDDING INTERVIEW',
    items: [
      {
        q: 'Q1. 신랑 신부를 소개해주세요',
        a: '👦 신랑 김진호 (ISTJ)\n계획은 철저, 감정 표현은 서툴지만 진심은 깊은 사람입니다.\n작은 약속도 잊지 않고 챙기고, 혼잣말인 줄 알았던 제 투정도 기억하더라고요.\n말수가 적어 오해받기도 하지만, 묵묵히 행동으로 보여주는 스타일이에요.\n‘고장 난 전구도 스스로 갈아끼우는 남자’라는 말, 진호를 위해 있는 말 아닐까요? 😎\n신부에게는 언제나 "그래~"로 끝맺는 든든한 남자입니다 💪🤍\n\n👰 신부 이나은 (ENFP)\n하루에도 열두 번 웃고 울고 떠드는 감성 엔진입니다 🚀\n유머와 에너지로 분위기를 환하게 밝히고, 초면에도 인생 얘기 나누는 스타일이에요.\n혼잣말에 진지하게 대답해주는 진호와 잘 맞는 이유죠.\n즉흥 여행을 좋아하지만 중요한 건 항상 집에 무사 귀환!\n낭만과 현실을 넘나들며 오늘도 진호를 웃게 하는, 귀엽고 단단한 사람입니다 🌸😌',
      },
      {
        q: 'Q2. 두 분은 어떻게 만나게 되었나요?',
        a: '서로의 이름도 몰랐던 어느 날, 지인의 모임에서 마주 앉게 됐어요.\n많은 사람 중 마지막까지 남아 있던 두 사람이었죠.\n말수가 적은 진호와 수다쟁이 나은이의 대화는 조금 어색했지만,\n그 시간이 이상하게 편했고, 자연스럽게 연락이 이어졌어요.\n처음엔 그냥 좋은 사람이라 생각했는데, 어느 순간\n"이 사람이면 좋겠다"는 생각이 들더라고요.\n지금 생각하면 그날의 공기는… 운명이 아니었을까요? 🍀🌙',
      },
      {
        q: 'Q3. 결혼을 결심하게 된 계기는요?',
        a: '누군가를 오래 만나다 보면 익숙함에 무뎌지기도 하잖아요.\n그런데 저희는 반대였어요. 시간이 흐를수록 더 좋은 사람이 되어가더라고요.\n말다툼도 했지만, 결국 함께 밥 먹고 웃으며 하루를 마무리했고\n서로에게 가장 편한 친구이자 가족이 되어 있다는 걸 느꼈어요.\n그리고 어느 날, 거창한 이벤트도 없이\n평범한 일상 속에서 서로를 꼭 껴안으며 말했죠.\n"우리, 그냥 같이 살까?"\n그게 우리의 진짜 프러포즈였어요 💍',
      },
      {
        q: 'Q4. 앞으로의 결혼 생활에 대한 다짐은요?',
        a: '우리가 닮은 점도, 다른 점도 많은 만큼\n매일이 배우고 이해하는 과정이 되겠지만,\n싸울 땐 냉전 없이 바로 화해하고\n가끔은 데이트하듯 설레는 하루를 보내고 싶어요.\n좋은 날은 나누고, 나쁜 날은 나눠 가질게요.\n집안일은 ‘가위✌️바위✊보✋’로 공정하게 정하고,\n‘밥은 누가 할까’ 고민보다 ‘같이 먹자’는 말을 더 자주 하겠습니다.\n언제나 ‘우리’로 살아가는 부부가 될게요 💑✨',
      },
    ],
  },
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
