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

// 인터뷰 팝업 사진 (src/assets/photos/interview/i1.jpg ~ i5.jpg)
const interviewPhotoModules = import.meta.glob('./assets/photos/interview/i*.jpg', {
  eager: true,
  import: 'default',
})
const interviewPhoto = (n) => interviewPhotoModules[`./assets/photos/interview/i${n}.jpg`]

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
  // OUR LOVE STORY(WEDDING INTERVIEW) 팝업의 인터뷰 내용
  // photo는 src/assets/photos/interview/i{N}.jpg, caption은 사진 아래 회색 설명
  interview: {
    popupTitle: 'WEDDING INTERVIEW',
    items: [
      {
        q: 'Q1. 두 사람, 서로 처음 만날 때 어떤 사람이었나요?',
        photo: interviewPhoto(1),
        caption: '제주도 해안스쿠터 탄 날!',
        a: '🤵 창현: 아직 몇 년 되지 않았는데 엄청 옛날 이야기를 하는 느낌이에요. 그때 저는 7년 차 개발자로 딱히 친구가 많거나 특별한 취미가 있는 편도 아닌 무색무취한 일상을 보내고 있었어요.\n\n👰 지수: 거제에서 올라와 대학을 졸업하고 인턴 두번에 취업 후 이직까지 정신없이 달렸어요. 그래서 당시엔 1년차 병아리 은행원이었어요 ㅎㅎ 그런데 어느날 문득 “어 나는 뭘 위해…?” 하는 생각이 들더라고요. 그러던 어느날 친구가 좋은 사람이 있다며 소개해줬어요.',
      },
      {
        q: 'Q2. 그럼 어떻게 만나게 되었나요?',
        photo: interviewPhoto(2),
        caption: '우리가 같이 처음본 눈',
        a: '🤵 창현: 알고 지내던 동생에게 지수를 소개받았어요. 처음 만났는데도 대화가 잘 통했고, 생각하는 방식이나 분위기도 비슷해서 왠지 잘 맞는 사람이라는 느낌이 들었어요.\n\n👰 지수: 오빠는 몰랐겠지만, 사실 제가 처음 오빠를 알게 된 건 2024년이에요. 주선자가 서울로 면접보러 올라오면 회사다니는 형네 집에서 지낸다고 했거든요. 당시 저는 이직을 준비하고 있었는데, 먼저 사회에 자리 잡은 오빠가 괜히 멋져 보이더라고요~',
      },
      {
        q: 'Q3. 연애 중 가장 기억에 남는 재미있는 에피소드가 있나요?',
        photo: interviewPhoto(3),
        caption: '향수공방에서 찍은 우리가 처음 같이 찍은 사진!',
        a: '👰 지수: 썸 탈 때 향수공방 원데이클래스 데이트를 갔는데 서로 존댓말쓰면서 엄청 어색했거든요. 그런데 그 모습에 공방 선생님이 호기심을 느꼈는지 큐피트 역할을 해주신 거 있죠?\n\n🤵 창현: 지수가 자리를 비웠을 때 오늘 고백해 버리라며 재촉하셨어요. 나중에 알고보니 제가 없을 때는 지수 마음을 떠보셨다고 하네요. 결국 그 날 고백할 수 있었답니다.\n\n👰 지수: 그날도 안하면 제가 하려고 했어요.',
      },
      {
        q: 'Q4. 서로를 결혼할 사람으로 선택한 이유는?',
        photo: interviewPhoto(4),
        caption: '같이 간 첫 해외여행',
        a: '👰 지수: 처음 만난 날부터 “어? 이 사람이랑 결혼하면 좋겠다?” 싶었어요. 알고 보니 제 이상형 리스트 100가지에도 거의 다 부합하더라고요! 그리고 저는 불도저처럼 달리는 스타일인데 오빠는 안정형이라, 제가 앞만 보고 달릴 때 옆에서 중심을 잡아줄 수 있는 사람이란 생각이 들었어요.\n\n🤵 창현: 지수가 없었던 일상과 만난 이후의 일상이 완전히 다른 느낌이라서 이제 예전으로 돌아가는게 상상도 되지 않아요.',
      },
      {
        q: 'Q5. 오늘 와주신 하객분들께 한마디!',
        photo: interviewPhoto(5),
        caption: '제주도 가는 비행기 안',
        a: '👰 지수: 멀리서도 저희를 보러 와주신 만큼, 앞으로 오래오래 행복하게 잘 살게요! 오늘 와주셔서 정말 고마워용 🥰\n\n🤵 창현: 바쁘신 와중에도 저희의 시작을 함께해주셔서 감사합니다. 특히 거제에서 찾아와주신 분들과 해외에서 와준 친구들까지 보내주신 마음 잊지 않고 행복하게 잘 살겠습니다!',
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
