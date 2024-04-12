## NODE.JS

- Node 16.x || 18.x

## USING YARN (Recommend)

- yarn install
- yarn start

## USING NPM

- npm i OR npm i --legacy-peer-deps
- npm start

## 리액트 훅 샘플 경로
- /src/pages/dashboard/reactHookSample.tsx
- /src/pages/dashboard/samplePage1.tsx
- /src/pages/dashboard/samplePage2.tsx

## 공지사항 게시판 의 경로 설정
### 메뉴 추가
- /src/routes/sections/dashboard.tsx : 페이지 경로 설정
- /src/layouts/config-navigation.tsx : 대시보드 메뉴 관리

### 공지사항 메뉴 구성
- /src/pages/dashboard/board/list.tsx : 공지사항 게시판 시작 Node
- /src/components/board/**.tsx : 공지사항 게시판의 콤포넌트
- /src/components/hyperx/table/**.ts(x) : table 공통 곰포넌트
- /src/sections/board : 공지사항 게시판 페이지 React Hook 및 구성 콤포넌트
- /src/types/board.ts : 공지사항 게시판 데이터 객체

### 공지사항 목업 데이터 Json
- /public/mock/**.json : 공지사항 게시판의 목업용 데이터
