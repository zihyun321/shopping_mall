"use strict";
/**
 * DB 연동
 */
require('dotenv').config(); // DB 환경변수
const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');

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

const pool = mysqlPromise.createPool({
    host: process.env.DB_HOST, 
    port: process.env.SERVER_PORT, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,
    // Promise: Promise
});

/**
 * 
 * @param {*} req 
 * @param {*} res
 * @description
 * 1. Review 생성
 * 2. 해당하는 orderItem 플래그 필드 업데이트 (hasReview) 
 */
async function createReview(req, res) {

    const reviewInfo = req.body;
    console.log('reviewInfo: ', reviewInfo);

    // const sql = ' INSERT INTO review SET ? ;';

    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction(); // START TRANSACTION

        // 1. Review 생성
        let insertReviewSql = ' INSERT INTO review SET ? ';
        let insertReviewSqlResult = await pool.query(insertReviewSql, [reviewInfo]);

        // 2. OrderItem 업데이트
        let updateOrderItemSql = ` UPDATE orderItem SET hasReview=true WHERE id=${reviewInfo.orderItemId} `;
        console.log(reviewInfo.orderItemId);
        let updateOrderItemSqlResult = await pool.query(updateOrderItemSql);

        await conn.commit(); // COMMIT

        console.log('insertReviewSqlResult: ', insertReviewSqlResult);

        return res.json({
            success: true
        })

    } catch (err) {
        console.log('에러! ', err);
        await conn.rollback(); // ROLLBACK
        console.log('Query Error');

        return res.json({
            success: false,
            errorCode: err
        })
    } finally {
        
    }

    // connection.query(sql, [reviewInfo], (error, rows, field) => {
    //     if (error) {
    //         throw error
    //     } else {
    //         return res.json({success: true})
    //     }
    // })
}

module.exports.createReview = createReview;

exports.getReviewList = (req, res) => {
    console.log('==== getReviewList ====');
    console.log('req.body: ', req.body);
    const userInfo = req.body;
    let sql = ' SELECT review.id, review.content, review.createdDate, review.rate ';
    sql += ' , item.id, product.name, product.category, product.size, product.color, product.imgUrl';
    sql += ' FROM review ';
    sql += ' JOIN orderItem as item on item.id = review.orderItemId ';
    sql += ' JOIN product on product.id = item.productId ';
    sql += ' WHERE review.customerId = ? ;';

    connection.query(sql, [userInfo.id], (error, rows, field) => {
        if (error) {
            throw error
        } else {
            return res.json({success: true, result: rows})
        }
    })
}