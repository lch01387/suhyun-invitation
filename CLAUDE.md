# invitation 프로젝트 정보

## 네이버 지도 API
- API 문서: https://api.ncloud-docs.com/docs/ai-application-service-apigateway
- GitHub Actions repo secret로 아래 두 개가 등록되어 있음:
  - `NAVER_MAP_API_ID` — NCP Maps Application의 Client ID(ncpKeyId), 값은 `emchkxaian`. 도메인 화이트리스트 기반 인증이라 노출돼도 무방함. 배포 빌드(`deploy.yml`)에서 `VITE_NAVER_MAP_CLIENT_ID` 환경변수로 주입되어 `src/config.js`의 `venue.mapClientId`(`import.meta.env.VITE_NAVER_MAP_CLIENT_ID`)로 사용됨.
  - `NAVER_MAP_API_KEY` — Client Secret. 서버 전용 값이라 정적 프론트엔드 번들에는 넣지 않음. 현재 코드는 브라우저에서 `maps.js` SDK만 로드하며 Client Secret이 필요한 서버사이드 API(예: Geocoding/Directions)는 호출하지 않으므로 아직 미사용 상태. 추후 서버/서버리스 함수를 추가해 해당 API를 호출할 때 사용할 것.
- 로컬 개발 시에는 `.env.example`을 복사한 `.env.local`에 `VITE_NAVER_MAP_CLIENT_ID`를 채워야 지도가 표시됨(git에 커밋되지 않음, `.gitignore`의 `*.local` 패턴에 포함).
