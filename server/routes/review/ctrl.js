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
     multipleStatements: true
 });

 exports.createReview = (req, res) => {
     const reviewInfo = req.body;
     const sql = ' INSERT INTO review SET ? ;';
     console.log('reviewInfo: ', reviewInfo);

     connection.query(sql, [reviewInfo], (error, rows, field) => {
         if (error) {
             throw error
         } else {
             return res.json({
                 success: true
             })
         }
     })
 }

 exports.getReviewList = (req, res) => {
    console.log('==== getReviewList ====');
    console.log('req.body: ', req.body);
    const userInfo = req.body;
    let sql = ' SELECT review.id, review.title, review.content, review.createdDate, review.rate ';
    sql += ' , product.name, product.category, product.size, product.color, product.imgUrl ';
    sql += ' FROM review ';
    sql += ' JOIN orderItem as item on item.id = review.orderItemId ';
    sql += ' JOIN product on product.id = item.productId ';
    sql += ' WHERE review.customerId = ? ;';

    connection.query(sql, [userInfo.id], (error, rows, field) => {
        if (error) {
            throw error
        } else {
            return res.json({
                success: true,
                result: rows
            })
        }
    })
 }