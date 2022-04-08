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
    console.log('=== server getProductList ===');
    console.log('req.body.category: ', req.body.category);
    var category = req.body.category;
    var sql = 'SELECT * FROM product WHERE category = ? ';

    connection.query(sql, [category], (error, rows, fields) => {
        if (error) 
            throw error;
        else {
            console.log('rows: ', rows);
            return res.send(rows);
        }
    });
}
 
