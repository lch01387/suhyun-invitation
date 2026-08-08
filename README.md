# suhyun-invitation

창현 ♥ 지수 모바일 청첩장입니다. React + Vite로 제작했고 GitHub Pages로 서빙합니다.

- 청첩장 페이지: https://lch01387.github.io/suhyun-invitation/

## 주요 기능

- 예식 일시 카운트다운 및 캘린더
- 오시는 길 (네이버 지도 임베드, 네이버지도/티맵/카카오맵 바로가기, 주소 복사)
- 마음 전하실 곳 계좌번호 복사
- 신랑/신부 전화 연결

## 정보 수정

청첩장에 표시되는 이름, 날짜, 예식장, 연락처, 계좌 등 모든 정보는 `src/config.js` 한 곳에서 관리합니다. 이 파일만 수정하면 됩니다.

## 개발

```bash
npm install
npm run dev
```

## 빌드 및 배포

`main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 자동으로 빌드 후 GitHub Pages에 배포합니다. 수동 빌드가 필요하면:

```bash
npm run build
```

GitHub Pages는 `https://<user>.github.io/suhyun-invitation/` 하위 경로로 서빙되므로 `vite.config.js`의 `base: '/suhyun-invitation/'` 설정이 필요합니다.

## 네이버 지도 API

지도 임베드는 네이버 클라우드 플랫폼(NCP) Maps API를 사용합니다. Client ID(`ncpKeyId`)는 `src/config.js`의 `venue.mapClientId`에 설정되어 있으며, NCP Maps 애플리케이션의 Web 서비스 URL에 `http://localhost:5173`과 `https://lch01387.github.io`가 등록되어 있어야 정상 동작합니다. 관련 문서 및 secret 정보는 [CLAUDE.md](./CLAUDE.md)를 참고하세요.
