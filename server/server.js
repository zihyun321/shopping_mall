const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Module 가져오기
const router = require('./routers');

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

app.post("/userJoin", router);      // 회원가입
app.post("/getProduct", router);    // 제품 정보 조회
app.post("/userLogin", router);     // 로그인
app.post("/getUserInfo", router);   // user 정보 조회

// connection.end();
