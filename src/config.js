// ─────────────────────────────────────────────
// 청첩장 정보는 이 파일만 수정하면 됩니다.
// ─────────────────────────────────────────────
export const WEDDING = {
  groom: {
    name: '창현',
    parents: '아버지이름 · 어머니이름의 장남', // TODO: 혼주 성함으로 수정
    phone: '010-0000-0000',
  },
  bride: {
    name: '지수',
    parents: '아버지이름 · 어머니이름의 장녀', // TODO: 혼주 성함으로 수정
    phone: '010-0000-0000',
  },
  // 예식 일시 (연, 월, 일, 시, 분) — 월은 1~12 그대로 적으면 됩니다.
  date: { year: 2026, month: 10, day: 24, hour: 12, minute: 0 },
  venue: {
    name: '○○웨딩홀 3층 그랜드홀', // TODO: 예식장 이름으로 수정
    address: '서울특별시 ○○구 ○○로 123', // TODO: 주소로 수정
    // 네이버 지도에서 장소 검색 후 URL을 붙여넣으세요.
    mapUrl: 'https://map.naver.com/p/search/%EC%98%88%EC%8B%9D%EC%9E%A5',
  },
  greeting: [
    '서로가 마주 보며 다져온 사랑을',
    '이제 함께 한 곳을 바라보며 걸어가고자 합니다.',
    '',
    '저희 두 사람이 사랑의 이름으로 지켜나갈 수 있게',
    '앞날을 축복해 주시면 감사하겠습니다.',
  ],
  account: {
    groom: '○○은행 000-0000-0000 (창현)',
    bride: '○○은행 000-0000-0000 (지수)',
  },
}

export function weddingDate() {
  const { year, month, day, hour, minute } = WEDDING.date
  return new Date(year, month - 1, day, hour, minute)
}
