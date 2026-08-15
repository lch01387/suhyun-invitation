# invitation 프로젝트 정보

## 개발·배포 방식
- **변경 명령을 받으면 로컬에만 반영한다.** dev 서버(`npm run dev`, http://localhost:5173/suhyun-invitation/)와 브라우저로 검증 후 보고하고, 커밋/푸시는 하지 않는다.
- **"배포하라" 명령 시 main에 커밋/푸시한다.** GitHub Actions(`deploy.yml`)가 두 벌을 함께 배포한다:
  - 사이트 루트 `https://lch01387.github.io/suhyun-invitation/` — **최신 릴리즈 태그(v*)** 시점 코드. 네이버 QR이 이 주소를 가리키므로 사용자에게는 항상 릴리즈된 버전만 보인다.
  - `/dev/` 경로 `https://lch01387.github.io/suhyun-invitation/dev/` — **main 최신 커밋**. 모바일 확인용. 즉, 배포 명령은 사실상 /dev/만 갱신한다.
- **릴리즈 발행(예: v1.1)은 별도의 명시적 지시가 있을 때만** 한다. 발행하면 다음 배포부터 루트가 그 버전으로 교체된다.
- 배포 상태 확인: `GH_HOST=github.com gh run list --repo lch01387/suhyun-invitation` (기본 GH_HOST가 사내 호스트로 설정되어 있어 오버라이드 필요).

## 네이버 지도 API
- API 문서: https://api.ncloud-docs.com/docs/ai-application-service-apigateway
- GitHub Actions repo secret로 아래 두 개가 등록되어 있음:
  - `NAVER_MAP_API_ID` — NCP Maps Application의 Client ID(ncpKeyId), 값은 `emchkxaian`. 도메인 화이트리스트 기반 인증이라 노출돼도 무방함. 배포 빌드(`deploy.yml`)에서 `VITE_NAVER_MAP_CLIENT_ID` 환경변수로 주입되어 `src/config.js`의 `venue.mapClientId`(`import.meta.env.VITE_NAVER_MAP_CLIENT_ID`)로 사용됨.
  - `NAVER_MAP_API_KEY` — Client Secret. 서버 전용 값이라 정적 프론트엔드 번들에는 넣지 않음. 현재 코드는 브라우저에서 `maps.js` SDK만 로드하며 Client Secret이 필요한 서버사이드 API(예: Geocoding/Directions)는 호출하지 않으므로 아직 미사용 상태. 추후 서버/서버리스 함수를 추가해 해당 API를 호출할 때 사용할 것.
- 로컬 개발 시에는 `.env.example`을 복사한 `.env.local`에 `VITE_NAVER_MAP_CLIENT_ID`를 채워야 지도가 표시됨(git에 커밋되지 않음, `.gitignore`의 `*.local` 패턴에 포함).
