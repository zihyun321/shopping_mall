# 쇼핑몰 구축 프로젝트

`사용언어` <br>
Server: Node Express <br>
Front: React <br>
CSS: Tailwind, antd <br>
DB: MySQL <br>

## 1. 설치

`DB 구축`
방법1: MySQL 다운로드: https://www.mysql.com/ <br>
방법2: homebrew mysql 설치 (해당 방법 이용)<br>

```
brew install mysql
```

`MySQL 실행/중지 명령어`

```
mysql.server start  // 실행
mysql_secure_installation   // 초기 설정
mysql.server stop   // 종료
```

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

- redux-devtools-extension: 크롬 확장 프로그램에서 redux dev tools를 통해 설치 할 수 있고, redux의 데이터 흐름을 알아보기 쉽게 하기 위해 사용
- redux-logger: redux를 통해 바뀔 이전 state, dispatch 실행으로 인해 바뀐 state가 콘솔에 찍혀 디버깅 쉽게 해주는 라이브러리
- redux-persist: 새로고침 시, 데이터 날라가는 것 방지

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

`dotenv 설치`

```
npm install --save dotenv
```

`주소 검색 api`

```
npm i react-daum-postcode
```

`React Hook Form 설치`

```
npm i react-hook-form
```

## 2. 회원가입 기능

**_Note: 회원가입시, 비밀번호는 암호화해야한다!_**

- 사용자가 회원가입 form 작성 후 회원가입
- 회원가입할 때, 입력한 id와 기존 사용자와 id 중복시 에러처리
- 주소 입력할 때, 카카오톡 map api 연동
- [ ] 회원가입시, 비밀번호 암호화

## 3. 로그인 기능

**_Note: 로그인 유지하기 위해선 redux 사용!_**

- 사용자가 아이디와 패스워드를 입력한 후 로그인
- 로그인할 때, id가 DB에 저장되어 있지 않거나 비밀번호가 틀렸을 경우 에러처리
- 로그인 후, 해당 user 정보를 전역 state 값에 저장 (redux)
- 로그인 후, Header 변경 (ex. Login → Logout)

## 4. 장바구니 기능

- 로그인 상태시에만 장바구니 사용 가능
- 고객 id와 연결되어 있는 장바구니 DB 정보에서 레코드 가져옴 (단, FOREIGN KEY 제약 조건 끄고 작업 => 'SET FOREIGN_KEY_CHECKS=0;')
- Header에서 장바구니 아이콘을 누르면, 고객 장바구니 목록을 볼 수 있음
- 제품 상세 페이지에서 제품 선택 후, Add to Cart 버튼을 누르면 고객 Cart DB 데이터 생성
- 장바구니 테이블에서 수량 변경할 땐, Cart DB에서 제품 수량 업데이트
- 제품 선택을 통해, Cart에서 해당 제품을 삭제하거나 선택할 수 있고 이때 선택된 상품된 총 금액이 하단에 나오게 됨
- [ ] 제품이 너무 많아질경우, pagination 필요
- [ ] 장바구니안에 있는 제품 구매시, 장바구니 리스트에서 해당 제품 삭제 => 꼭 필요한가? 어떻게 효율적으로 구현할 것인가?

## 5. 주문 기능

- 장바구니 화면 혹은 제품 상세 페이지 화면에서 주문하기 버튼을 클릭하면 주문하기 페이지로 이동
- 주문시,
  <br> 1) Order 및 OrderItem 레코드 생성
  <br> 2) 고객 포인트 획득
  <br> 3) 제품 재고 수 차감
  <br> [ ] 주문한 제품은 Cart 목록에서 삭제

- 위에 해당하는 과정 하나라도 중간에 에러날 경우, 롤백 필요 (하나의 메서드에서 일괄 구현)
- [ ] 주소 입력할 때, 카카오톡 map api 연동 => 꼭 필요할까?
- [ ] 장바구니와 마찬가지로, 주문하는 제품이 너무 많아졌을 경우를 위해 pagination 필요
      ~~- [ ] 주문시, 배송 레코드도 생성~~

## 6. 주문 취소 기능

- 주문 상세 페이지에서 주문 취소
- 주문 취소 버튼 클릭후, alert창 및 새로고침
- 주문 취소시, 해당 orderItem의 orderStatus가 '주문완료' => '취소완료'로 변경 (앞으론 orderStatus 필드 항목을 한글로 구현 x)
- 상세 페이지내에서 주문 취소가 된 항목은 '리뷰쓰기', '주문취소' 버튼 안보이도록 구현

## 7. 리뷰 기능

- 주문 상세 페이지에서 리뷰 쓰기
- [ ] 리뷰가 작성 완료된 항목은 '리뷰쓰기' 버튼 안보이도록 구현. (플래그 필드 사용 예정)

## 기타 기능

### 남은 기능

[전체]

- [ ] 화면 렌더링시, 스피너 추가
- [ ] 사용하지 않는 버튼 제거
- [ ] 코드 정리 및 리팩토링
- [x] 새로고침시에도 user 정보 저장 (redux-persist 사용)
- [ ] 제품 상세 & 리뷰 페이지 레이아웃 고민
- [ ] 제품 검색 기능 <br>

- [ ] ?! 마이페이지 기능
- [ ] ?! 리뷰 기능
- [ ] ?! 배송현황 기능
- [ ] ?! 주문상태 화면
      ~~ - [ ] ?! 결재 기능 ~~

[홈화면]

- [ ] 자동 Carousel
- [ ] Carousel 밑에 어떤 식으로 꾸밀지 레이아웃 그리기 (css 최대한 활용)

[배포]

- [ ] Heroku를 통해 배포 (+ 도메인 사기)
- [ ] Heroku Git 연동
- [ ] Heroku DB 연동

### 고민해볼것

- 주문취소 실행시, 주문취소 테이블을 생성해야 하나
- orderItem 구현시, 한 아이템을 여러개 살경우에도 쪼개서 보여줘야 하나?...
- app.js 말고 다른 component 안에서 (여기선 ProfileMgmtPage) route를 사용해도 되나
- page 나눈 것이 다음과 나눈 것이 맞나
- 주문취소시 제품 삭제 어떻게 할지..

### 기타수정사항

- class => className으로 수정
- 최대한 style 사용하지 않기. react style은 좋지 않다에 대한 글 찾아보기 (https://ko.reactjs.org/docs/dom-elements.html)

### 아쉬운점

1. 초반 쇼핑몰 설계를 너무 간단하게 하고 시작했더니 중간에 DB 구조를 바꾸는 일이 많았다. 아무리 간단한 프로세스라도 자세하게 생각해보고 짜는 것이 필요할 것 같다.
2. 통일성이 부족하다. 네이밍룰같은 것과 에러처리 등이 통일화가 부족하다.

### 어려웠던점

1. MySQL Server 오류가 났는데 (계속 꺼지고 2002 에러가 났다.) 해결을 못해서 결국 homebrew로 다시 깔았다. 재구축할 생각하니 막막하다. (4/18)

- 처음 시작은 DB 쿼리시, 숫자가 아닌 항목들을 group by 할 경우 설정하고 나서 오류가 났다.
- 결국 mysql을 다 삭제하고 homebrew로 깔았는데, root 로그인할 때도 오류가 났다.
- 초기 비밀번호 설정이 암호화가 되어 있지 않은 것을 확인하고 초기화하고 암호화를 통해 비밀번호를 재설정하는 과정을 통해 해결하였다.

2. 주문 내역(order) 화면에서 주문한 제품 이미지와 제품 정보를 어떻게 뿌려줄 지 고민하다가, 주문 레코드 생성할 때 대표 제품 이미지와 이름을 넣기로 결정했다. (DB로 orderItem을 쿼리하여 group by를 하자니 orderItem이 많을 경우에 좋지 않을 것 같았고, JS로 한번 더 처리를 하자니 특성에 맞지 않는 것 같아서 다음과 같이 결정했다.)
