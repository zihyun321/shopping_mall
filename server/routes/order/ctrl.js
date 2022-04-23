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

exports.createOrder = (req, res) => {
    console.log('==== createOrder in server ====');
    const insertSql = 'INSERT INTO `order` SET ? ';
    const orderInfo = req.body;
    console.log('req: ', req.body);
    connection.query(insertSql, orderInfo, (error, rows, fields) => {
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

exports.getOrder = (req, res) => {
    console.log('==== order ctrl.js getOrder');
    let userId = req.body.id;
    console.log('req.body.id: ', req.body.id);

    let sql = ' SELECT * FROM `order`  WHERE customerId = ? ORDER BY orderDate DESC ';
    // let sql = ' SELECT id, DATE_FORMAT(orderDate, "%Y-%m-&d"), totalSalePrice, totalSaleQty, repProdName, repProdImg';
    // sql += ' FROM order             ';
    // sql += ' WHERE customerId = ?   ';
    // console.log('sql : ',sql );
    connection.query(sql, userId, (error, rows, fields) => {
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
 
