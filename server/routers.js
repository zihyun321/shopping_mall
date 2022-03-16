const express = require('express'); 
const router = express.Router();

const ctrl = require('./ctrls');

/**
 * DB 연동
 */
 require('dotenv').config(); // DB 환경변수
 const mysql = require('mysql2');

 // DB 연결시작
//  const connection = mysql.createPool({
//      host: process.env.DB_HOST, 
//      port: process.env.SERVER_PORT, 
//      user: process.env.DB_USER, 
//      password: process.env.DB_PASSWORD, 
//      database: process.env.DB_NAME,
//      waitForConnections: true,
//      connectionLimit: 10,
//      queueLimit: 0,
//  });

router.post("/userJoin", ctrl.addUser);
router.post("/getProduct", ctrl.getProductList);
router.post("/userLogin", ctrl.getUserInfo);

// router.post("/getUserInfo", (req, res) => {
//     connection.query("SELECT id FROM customer", function(error, rows, fields) {
//         if (error) {
//             console.log('실패');
//             console.log('res: ', res);
//         } else {
//             console.log('성공');
//         }
//     })
// })

module.exports = router;