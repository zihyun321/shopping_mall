"use strict";
/**
 * DB 연동
 */
 require('dotenv').config(); // DB 환경변수
 const mysql = require('mysql2');
 

 // DB 연결시작
 const connection = mysql.createPool({
     host: process.env.DB_HOST, 
     port: process.env.SERVER_PORT, 
     user: process.env.DB_USER, 
     password: process.env.DB_PASSWORD, 
     database: process.env.DB_NAME,
     waitForConnections: true,
     connectionLimit: 10,
     queueLimit: 0,
 });



exports.getProductList = (req, res) => {
    console.log('=== getProductList ===');
    var category = req.body.category;
    var sql = 'SELECT * FROM product WHERE category = ? ';

    connection.query(sql, [category], (error, rows, fields) => {
        if (error) 
            throw error;
        else {
            return res.send(rows);
        }
    });
}
 
