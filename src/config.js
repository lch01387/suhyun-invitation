// ─────────────────────────────────────────────
// 청첩장 정보는 이 파일만 수정하면 됩니다.
// ─────────────────────────────────────────────
export const WEDDING = {
  groom: {
    name: '창현',
    nameEn: 'CHANGHYUN',
    parents: '아버지이름 · 어머니이름의 장남', // TODO: 혼주 성함으로 수정
    phone: '010-0000-0000',
  },
  bride: {
    name: '지수',
    nameEn: 'JISU',
    parents: '아버지이름 · 어머니이름의 장녀', // TODO: 혼주 성함으로 수정
    phone: '010-0000-0000',
  },
  // 예식 일시 (연, 월, 일, 시, 분) — 월은 1~12 그대로 적으면 됩니다.
  date: { year: 2026, month: 11, day: 7, hour: 23, minute: 30 },
  venue: {
    name: '네이버 1784',
    address: '경기도 성남시 분당구 정자일로 95',
    lat: 37.3588179,
    lng: 127.1052329,
    mapUrl: 'https://map.naver.com/p/entry/place/1909737461',
    // 네이버 클라우드 플랫폼 > Maps > Application의 Client ID(ncpKeyId).
    // Web 서비스 URL에 http://localhost:5173 과 https://lch01387.github.io 를 등록해야 합니다.
    // (Client Secret은 서버용이므로 여기에 넣지 말 것)
    mapClientId: 'emchkxaian',
    transit: [
      {
        icon: '🚈',
        title: '지하철 이용 시',
        lines: ['수인분당선 정자역 3번 출구에서 도보 15분'],
      },
      {
        icon: '🚗',
        title: '자가용 이용 시',
        lines: ['건물 지하주차장 이용'], // TODO: 실제 안내로 수정
      },
    ],
  },
  greeting: [
    '서로가 마주 보며 다져온 사랑을',
    '이제 함께 한 곳을 바라보며',
    '걸어가고자 합니다.',
    '',
    '저희 두 사람이 사랑의 이름으로',
    '지켜나갈 수 있게 앞날을',
    '축복해 주시면 감사하겠습니다.',
  ],
  account: {
    groom: [{ holder: '창현', bank: '○○은행 000-0000-0000' }],
    bride: [{ holder: '지수', bank: '○○은행 000-0000-0000' }],
  },
}

export function weddingDate() {
  const { year, month, day, hour, minute } = WEDDING.date
  return new Date(year, month - 1, day, hour, minute)
}
