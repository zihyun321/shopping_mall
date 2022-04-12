const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Module 가져오기
// const router = require('./routers');


require('dotenv').config(); // DB 환경변수

/**
 * 프론트와 연동
 */
const port = process.env.PORT || 3001;
app.use(cors());                // 이거 뭔데 꼭 필요하지 ?
app.use(bodyParser.json());     // 이거 뭔데 꼭 필요하지 ? 22

app.listen(port, () => {
    console.log(`express is running on ${port}`);
})

// 수정전
// app.post("/userJoin", router);      // 회원가입
// app.post("/getProduct", router);    // 제품 정보 조회
// app.post("/userLogin", router);     // 로그인
// app.post("/getUserInfo", router);   // user 정보 조회




// 수정후
// 라우팅 
const userRouter = require('./routes/user/index');
const productRouter = require('./routes/product/index');
const cartRouter = require('./routes/cart/index');
const orderRouter = require('./routes/order/index');
const orderItemRouter = require('./routes/orderItem/index');

console.log('서버탐');
/** User */
app.post("/createUser", userRouter);        // 회원가입
app.post("/checkUserInfo", userRouter);     // logi한 user 정보 확인
app.post("/getUserInfo", userRouter);       // user 정보 조회

/** Product */
app.post("/getProductList", productRouter);     // 제품 정보 조회
app.post("/getProductStock", productRouter);     // 제품 정보 조회
app.post("/updateProduct", productRouter);     // 제품 정보 조회

/** Cart */
app.post("/createCart", cartRouter);        // cart 생성
app.post("/getCartList", cartRouter);       // cart 조회
app.post("/deleteCart", cartRouter);       // cart 삭제
app.post("/updateCart", cartRouter);       // cart 업데이트

/** Order */
app.post("/createOrder", orderRouter);        // order 생성

/** Order Item */
app.post("/createOrderItem", orderItemRouter);   // orderItem 생성
