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



exports.createCart = (req, res) => {
    console.log('req.body: ', req.body);
    // var customerId = req.body.customerId;
    // var productId = req.body.productId;
    // var quantity = req.body.quantity;

    // var category = req.body.category;
    var sql = 'INSERT INTO shoppingCart SET ? ';
    // var sql = 'INSERT INTO shoppingCart() values(?, ?, ?)';

    var insertInfo = {
        customerId: req.body.customerId,
        productId: String(req.body.productId),
        quantity: req.body.quantity
    };

    console.log('req: ', req);
    
    connection.query(sql, [insertInfo], (error, rows, fields) => {
        if (error) 
            throw error;
        else {
            console.log('성공!!');
            return res.send(rows);
        }
    });
}
 
