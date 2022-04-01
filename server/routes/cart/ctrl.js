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



exports.checkAndCreateCart = (req, res) => {
    console.log('checkAndCreateCart req.body: ', req.body);

    // var checkSql = 'SELECT * FROM shoppingCart WHERE customerId = ? ';
    var checkSql = 'SELECT * FROM shoppingCart WHERE customerId = ? AND productId = ? ';


    var insertSql = 'INSERT INTO shoppingCart SET ? ';

    console.log('checkSql: ', checkSql);
    var cartInfo = {
        customerId: req.body.customerId,
        productId: String(req.body.productId),
        quantity: req.body.quantity
    };
    console.log('cartInfo: ', cartInfo['customerId']);

    connection.query(checkSql, [cartInfo['customerId'], cartInfo['productId']], (error, rows, fields) => {
        if (error) {
            console.log('error: ', error);
        }
        else {
            console.log('rows: ', rows);
            // return rows
            if (rows.length == 0) {
                this.createCart(cartInfo);
                console.log('결과가 0이다.');

            } else {
                console.log('0이상');
                console.log('rows: ', rows.id);

                var result = JSON.parse(JSON.stringify(rows[0]));

                console.log('result: ', result.id);

                const updateInfo = {
                    id: result.id,
                    quantity: result.quantity + cartInfo['quantity']
                };
                this.updateCart(updateInfo);
                
            }            
        }        
    })
    

    // var getCartInfoResult = [{}];
    // getCartInfoResult = getCartList(cartInfo);
    // console.log('getCartInfoResult: ', getCartInfoResult);
}

exports.getCartList = (req, res) => {
    console.log('req: ', req.body);
    var customerId = req.body.id;


    var sql = ' SELECT cart.id, cart.customerId, customer.name, cart.productId, product.productName, product.productPrice, product.size, product.color, product.imgUrl, cart.quantity ';
    sql += ' FROM shoppingcart as cart ';
    sql += ' join customer on customer.id = cart.customerId  ';
    sql += ' join product on product.id = cart.productId ';
    sql += ' where customer.id = ? ';

    console.log('sql: ', sql);
    // var sql = 'SELECT * FROM shoppingCart WHERE customerId = ?';
    connection.query(sql, customerId, (error, rows, fields) => {
        if (error) {
            throw error;
        }
        else {
            return res.send(rows);
        }        
    })
}

exports.createCart = (cartInfo) => {
    var sql = 'INSERT INTO shoppingCart SET ? ';
    connection.query(sql, [cartInfo], (error, rows, fields) => {
        if (error) 
            throw error;
        else {
            console.log('성공!!');
            return rows
        }
    });
}

exports.updateCart = (updateInfo) => {
    console.log('=== updateInfo ===');
    var sql = 'UPDATE shoppingCart SET quantity=? WHERE id=? ';
    console.log('updateInfo: ', updateInfo.body);
    if (updateInfo.body == undefined) {
        connection.query(sql, [updateInfo['quantity'], updateInfo['id']], (error, rows, fields) => {
            if (error) 
                throw error;
            else {
                console.log('성공!!');
                return rows
            }
        });    
    } else {
        connection.query(sql, [updateInfo.body.quantity, updateInfo.body.id], (error, rows, fields) => {
            if (error) 
                throw error;
            else {
                console.log('성공!!');
                return rows
            }
        });    
    }
}

exports.deleteCart = (req, res) => {
    console.log('===deleteCart===');

    var idList = req.body;
    console.log('idList: ', idList);
    console.log('idList.length: ', idList.length);

    var sql = ' DELETE FROM shoppingCart ';
    // sql += ' WHERE id in ?';

    if (idList.length = 1) {
        sql += ' WHERE id=? ';
    } else {
        sql += ' WHERE id in ?';
    }

    connection.query(sql, [idList], (error, rows, fields) => {
        if (error)
            throw error;
        else {
            console.log('성공!!');
            return rows
        }
    })
}

 
