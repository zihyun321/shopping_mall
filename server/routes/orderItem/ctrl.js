"use strict"

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

exports.createOrderItem = (req, res) => {
    const insertSql = 'INSERT INTO orderItem (orderId, productId, orderQuantity) VALUES ? ';
    const orderItems = [];
    console.log('req.body: ', req.body);

    req.body.forEach(item => {
        let orderItem = [item.orderId, item.productId, item.orderQuantity];
        orderItems.push(orderItem);
    });
    console.log('orderItems: ', orderItems);
    connection.query(insertSql, [orderItems], (error, rows, fields) => {
        if (error) {
            throw error
        }
        else {
            return res.json({
                success: true
            })
        }
    })

}