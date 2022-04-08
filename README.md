# 쇼핑몰 구축 프로젝트

`사용언어` <br>
Server: Node Express <br>
Front: React <br>
CSS: Tailwind, antd <br>
DB: MySQL <br>

## 1. 설치

`DB 구축`
<br> MySQL 다운로드: https://www.mysql.com/ 

`React 설치`
```
npx install create-react-app [프로젝트명]
```

`Redux 설치`
```
npm i redux // (위에서 npx가 아닌 npm으로 설치했다면,,)
npm i react-redux (yarn add redux react-redux)
yarn add redux 
react-redux 
redux-devtools-extension 
redux-logger 
yarn add redux-persist
```
* redux-devtools-extension: 크롬 확장 프로그램에서 redux dev tools를 통해 설치 할 수 있고, redux의 데이터 흐름을 알아보기 쉽게 하기 위해 사용
* redux-logger: redux를 통해 바뀔 이전 state, dispatch 실행으로 인해 바뀐 state가 콘솔에 찍혀 디버깅 쉽게 해주는 라이브러리
* redux-persist: 새로고침 시, 데이터 날라가는 것 방지

`Node 설치`
```
npm init
npm install express
```

`React&Node 동시 실행`
```
npm i -D concurrently
```

`DB 설치`
```
npm install --save mysql2
```

`CSS 설치`
<br> tailwind 설치 => 홈페이지
```
yarn add antd
npm install @mui/material @emotion/react @emotion/styled
yarn add @mui/icons-material
```

`react router 및 router dom 설치`
```
npm install --save react-router
npm install react-router-dom --save
```

`주소 검색 api`
```
npm i react-daum-postcode
```

## 2. 회원가입 기능 
**_Note: 회원가입시, 비밀번호는 암호화해야한다!_**
- MySQL DB에 User 컬럼 구성
- 구성한 컬럼대로 회원가입 form 생성 (디자인은 Tailwind)
- 세부 기능 살피기: 비밀번호 확인 기능, 중복 User Id 처리, 주소는 카카오톡 map api 연동

## 3. 로그인 기능
**_Note: 로그인 유지하기 위해선 redux 사용!_**
- 아이디와 패스워드를 입력하여 로그인 기능 구현
- 세부 기능 살피기: 에러별로 alert 처리 상세하게 (ex. 입력한 아이디 없을 경우)
- 로그인 후, 해당 user 정보를 전역 state 값에 저장하고 -> 홈화면으로 이동시키기
- 로그인 후, Header 정보 변경 (ex. Login -> Logout)

## 4. 장바구니 기능
- 로그인 상태시에만 장바구니 사용 가능
- 제품 상세 페이지에서 제품 선택 후, Add to Cart 버튼을 누르면 모달창 (쇼핑 계속하기, 장바구니로 이동)
- User DB에 있는 장바구니 정보 가져오기 (FOREIGN KEY 제약 조건 끄고 작업 => 'SET FOREIGN_KEY_CHECKS=0;' )
- Antd 라이브러리로 Table 장바구니 리스트 그리기
- 테이블 선택을 통해 선택된 상품 장바구니 삭제

## 5. 주문 기능
- 장바구니 화면 혹은 제품 페이지 화면에서 주문하기 -> 주문화면으로 이동
- 주문 화면 레이아웃
- 주문시, DB에 있는 제품 수량 업데이트 및 고객 포인트 쌓기
- 주문 취소시, DB에 있는 제품 수량 업데이트 및 고객 포인트 차감

## 기타 기능

### 남은 기능
[홈화면]
- [ ] 자동 Carousel
- [ ] Carousel 밑에 어떤 식으로 꾸밀지 레이아웃 그리기 (css 최대한 활용)

[제품디테일화면]
- [ ] 제품 상세 & 리뷰 페이지 레이아웃 고민

[기타]
- [ ] 스피너
- [ ] 회원가입시, 비밀번호 hash 알고리즘 사용하여 저장
- [ ] 로그아웃 한 후, 장바구니 주소 들어가면 캐시가 남아있어 이전 로그인했던 기록이 남아있음. 이같은 상황 수정
- [ ] 새로고침시에도 user 정보 저장 (redux-persist 사용)
- [ ] 사용하지 않는 버튼 제거
- [ ] 코드 정리 및 리팩토링
- [ ] 주소 검색 api를 활용한 주소 입력
