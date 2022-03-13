# 쇼핑몰 구축 프로젝트

`사용언어`
Server: Node Express
Front: React
CSS: Tailwind, antd
DB: MySQL

### 1. 설치

`DB 구축`
MySQL 다운로드: https://www.mysql.com/ 

`React 설치`
npx install create-react-app [프로젝트명]

`Redux 설치`
npm i redux (위에서 npx가 아닌 npm으로 설치했다면,,)
npm i react-redux (yarn add redux react-redux)
yarn add redux react-redux redux-devtools-extension redux-logger
* redux-devtools-extension: 크롬 확장 프로그램에서 redux dev tools를 통해 설치 할 수 있고, redux의 데이터 흐름을 알아보기 쉽게 하기 위해 사용
* redux-logger: redux를 통해 바뀔 이전 state, dispatch 실행으로 인해 바뀐 state가 콘솔에 찍혀 디버깅 쉽게 해주는 라이브러리

`Node 설치`
npm init
npm install express

`React&Node 동시 실행`
npm i -D concurrently

`DB 설치`
npm install --save mysql2

`CSS 설치`
tailwind 설치 => 홈페이지
yarn add antd
npm install @mui/material @emotion/react @emotion/styled
yarn add @mui/icons-material

### 2. 로그인 기능 구축
**Note: !**

