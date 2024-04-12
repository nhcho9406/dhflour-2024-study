## NODE.JS

- Node 16.x || 18.x

## USING YARN (Recommend)

- yarn install
- yarn start

## USING NPM

- npm i OR npm i --legacy-peer-deps
- npm start

## 공지사항 게시판 의 경로 설정
- /src/routes/sections/dashboard.tsx : 페이지 경로 설정
- /src/layouts/config-navigation.tsx : 대시보드 메뉴 관리
- /public/mock/**.json : 공지사항 게시판의 목업용 데이터
- /src/pages/dashboard/board/list.tsx : 공지사항 게시판 시작 Node
- /src/components/board/**.tsx : 공지사항 게시판의 콤포넌트
- /src/components/hyperx/table/**.ts(x) : table 공통 곰포넌트
- /src/sections/board : 공지사항 게시판 페이지 구성 콤포넌트
- /src/types/board.ts : 공지사항 게시판 데이터 객체
