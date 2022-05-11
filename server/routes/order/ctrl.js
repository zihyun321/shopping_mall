"use strict";
/**
 * DB 연동
 */
 require('dotenv').config(); // DB 환경변수
 const mysql = require('mysql2');
 

 // DB 연결시작
 // createPool: 미리 정해진 갯수의 연결을 생성. Request가 발생하면 해당 Req에 연결을 할당하고 다시 반납
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

// exports.createOrder = (req, res) => {
//     console.log('==== createOrder in server ====');
//     const insertSql = 'INSERT INTO `order` SET ? ';
//     const orderInfo = req.body;
//     console.log('req: ', req.body);
//     connection.query(insertSql, orderInfo, (error, rows, fields) => {
//         if (error) {
//             throw error
//         }
//         else {
//             return res.json({
//                 success: true,
//                 result: rows
//             })
//         }
//     })
// }

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

exports.updateOrder = (req, res) => {
    let sql = ' SELECT * FROM `order`  WHERE customerId = ? ORDER BY orderDate DESC ';
}

exports.createOrder = (req, res) => {
    console.log('==== createOrder ====');
    console.log('req.body: ', req.body);
    const orderInfo = req.body.orderInfo;
    const orderItemsInfo = req.body.orderItemsInfo;
    const productInfo = req.body.productsInfo;
    const userInfo = req.body.userInfo;

    console.log('')

    console.log('orderItemInfo: ', orderItemsInfo);

    // Order 
    const insertOrderSql = 'INSERT INTO `order` SET ' + orderInfo;
    console.log('insertOrderSql: ', insertOrderSql);

    // OrderItem
    const orderItems = [];
    orderItemsInfo.forEach(item => {
        let orderItem = [item.orderId, item.productId, item.orderQuantity, item.customerId, item.orderPrice, item.orderStatus];
        orderItems.push(orderItem);
    });
    const insertOrderItemSql = 'INSERT INTO orderItem (orderId, productId, orderQuantity, customerId, orderPrice, orderStatus) VALUES ' + orderItems;
    console.log('insertOrderItemSql: ', insertOrderItemSql);

    // Product
    let updateProductSql = '';
    productInfo.forEach(function(item) {
        console.log('item: ', item);
        // query += mysql.format("UPDATE product SET quantity=? WHERE id=? ;", [item.quantity, item.id]);
        updateProductSql += `UPDATE product SET quantity=${item.quantity} WHERE id='${item.id}';`;
    })    
    console.log('updateProductSql: ', updateProductSql);

    // User
    let updateUserSql = `UPDATE customer SET points = ${userInfo.points} WHERE id = '${userInfo.id}' `;
    console.log('updateUserSql: ', updateUserSql);

    // const transaction = new mysql.Transaction();
    
    try {

        // 에러남: SyntaxError: await is only valid in async functions and the top level bodies of modules
        // await new Promise(resolve => transaction.begin(resolve));        
        // const request = new mysql.Request(transaction);

        // let insertOrderSqlResult = request.query(insertOrderSql);        
        // let insertOrderItemSqlResult = request.query(insertOrderItemSql);
        // let updateProductSqlResult = request.query(updateProductSql);
        // let updateUserSqlResult = request.query(updateUserSql);

        // transaction.commit();

        let insertOrderSqlResult = connection.query(insertOrderSql);        
        let insertOrderItemSqlResult = connection.query(insertOrderItemSql);
        let updateProductSqlResult = connection.query(updateProductSql);
        let updateUserSqlResult = connection.query(updateUserSql);

        connection.commit();

        console.log('insertOrderSqlResult: ', insertOrderSqlResult);
        console.log('insertOrderItemSqlResult: ', insertOrderItemSqlResult);
        console.log('updateProductSqlResult: ', updateProductSqlResult);
        console.log('updateUserSqlResult: ', updateUserSqlResult);


    } catch(err) {

        console.log('err: ', err);
        connection.rollback();

    }
}
