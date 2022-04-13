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

exports.updateProduct = (req, res) => {
    console.log('=== server updateProduct ===');
    console.log('req.body: ', req.body);
    let productInfo = req.body;
    let sql = 'UPDATE product SET quantity=? WHERE id=? ;';
    let updateInfos = [[]];
    let updateInfo = [];
    
    if (productInfo.length > 1) {
        for (let i=0; i<productInfo.length; i++) {
            connection.query(sql, [productInfo[i].quantity, productInfo[i].id], (error, rows, fields) => {
                if (error) throw error;
                else {
                    return res.json({
                        success: true
                    })
                }
            })
        }
    } 
    else {
        connection.query(sql, [productInfo.quantity, productInfo['id']], (error, rows, fields) => {
            if (error) throw error;
            else {
                return res.json({
                    success: true
                })
            }
        })
    }

    // connection.query(sql, )
}
 
exports.getProductStock = (req, res) => {
    let sql;
    let productIds = req.body;
    console.log('req.body: ', req.body);
    console.log('productIds: ', productIds);
    console.log('productIds.length: ', productIds.length);
    if (productIds.length === 1) {
        sql = 'SELECT id, quantity FROM product WHERE id=? ';
        connection.query(sql, [productIds], (error, rows, fields) => {
            if (error) throw error;
            else {
                return res.json({
                    success: true,
                    result: rows
                });
            }
        })    
    } 
    else {
        sql = 'SELECT id, quantity FROM product WHERE id IN (?) ';
        connection.query(sql, [productIds], (error, rows, fields) => {
            if (error) throw error;
            else {
                return res.json({
                    success: true,
                    result: rows
                });
            }
        })
    }
    
}