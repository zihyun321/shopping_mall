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
    const insertSql = 'INSERT INTO orderItem (orderId, productId, orderQuantity, customerId, orderPrice, orderStatus) VALUES ? ';
    const orderItems = [];
    console.log('req.body: ', req.body);

    req.body.forEach(item => {
        let orderItem = [item.orderId, item.productId, item.orderQuantity, item.customerId, item.orderPrice, item.orderStatus];
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

// exports.getOrder = (req, res) => {
//     console.log('==== orderItem ctrl.js getOrderItem');
//     let userId = req.body.id;
//     console.log('userId: ', userId);

//     let sql = ' SELECT item.id, item.orderQuantity, item.orderStatus, item.deliveryStatus, item.orderPrice ';
//     sql += ' ,order.orderDate, order.id, p.name, p.price, p.imgUrl ';
//     sql += ' FROM orderItem as item                         ';
//     sql += ' Join product as p on p.id = item.productId     ';
//     sql += ' Join `order` on order.id = item.orderId        ';
//     sql += ' Where item.customerId = ?                      ';
//     // sql += ' GROUP BY order.id                              ';
 
//     connection.query(sql, [userId], (error, rows, fields) => {
//         if (error) {
//             throw error
//         } else {
//             return res.json({
//                 success: true,
//                 result: rows
//             })
//         }
//     })
// }

exports.getOrderItem = (req, res) => {

    console.log('==== orderItem ctrl.js getOrderItem');
    let orderInfo = req.body;
    console.log('orderInfo: ', orderInfo);
    console.log('orderInfo.orderId: ', orderInfo.orderId);
    console.log('orderInfo.orderStatus: ', orderInfo.orderStatus);
    // let orderStatus = req.body.orderStatus;
    // console.log('orderId: ', orderId);
    // console.log('orderStatus: ', orderStatus);

    let sql = ' SELECT item.id, item.orderQuantity, item.orderStatus, item.orderPrice ';
    sql += ' ,order.orderDate, order.id, p.id, p.name, p.price, p.imgUrl ';
    sql += ' FROM orderItem as item                         ';
    sql += ' Join product as p on p.id = item.productId     ';
    sql += ' Join `order` on order.id = item.orderId        ';
    sql += ' Where order.id = ?                             ';
    if (orderInfo.orderStatus !== 'All') sql += ' AND item.orderStatus = ? ;                     ';

    connection.query(sql, [orderInfo.orderId, orderInfo.orderStatus], (error, rows, fields) => {
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

exports.getOrderItem22 = (req, res) => {

    console.log('==== orderItem ctrl.js getOrderItem');
    let orderInfo = req.body;
    console.log('orderInfo: ', orderInfo);
    // let orderStatus = req.body.orderStatus;
    // console.log('orderId: ', orderId);
    // console.log('orderStatus: ', orderStatus);

    let sql = ' SELECT item.id, item.orderQuantity, item.orderStatus, item.orderPrice, item.orderId, item.orderCancelDate ';
    sql += ' , order.orderDate, order.id, p.id, p.name, p.price, p.imgUrl ';
    sql += ' FROM orderItem as item                         ';
    sql += ' Join product as p on p.id = item.productId     ';
    sql += ' Join `order` on order.id = item.orderId        ';
    sql += ' Where item.customerId = ?                      ';
    sql += ' AND item.orderStatus = ? ;                     ';

    connection.query(sql, [orderInfo.customerId, orderInfo.orderStatus], (error, rows, fields) => {
        if (error) {
            throw error
        } else {
            console.log('=== rows: ', rows);
            return res.json({
                success: true,
                result: rows
            })
        }
    })
}

// 추후에 productId, orderId가 아닌 orderItemId로 변경하기
exports.updateOrderItem = (req, res) => {
    let orderItemInfo = req.body;
    let query = '';
    query += ` UPDATE orderItem SET orderStatus='주문취소', orderCancelDate='${orderItemInfo.orderCancelDate}' `;
    query += ` WHERE orderId='${orderItemInfo.orderId}' AND productId='${orderItemInfo.productId}' `;
    connection.query(query, (error, rows, field) => {
        if (error) throw error;
        else {
            return res.json({
                success: true
            })
        }
    })
}

exports.deleteOrderItem = (req, res) => {

}