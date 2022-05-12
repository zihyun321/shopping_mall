"use strict";
/**
 * DB 연동
 */
 require('dotenv').config(); // DB 환경변수
 const mysql = require('mysql2/promise');
 

 // DB 연결시작
 // createPool: 미리 정해진 갯수의 연결을 생성. Request가 발생하면 해당 Req에 연결을 할당하고 다시 반납
 const pool = mysql.createPool({
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
    pool.query(sql, userId, (error, rows, fields) => {
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

// async function 안해도 되나?
async function createOrder(req, res) {
    console.log('==== createOrder ====');
    console.log('req.body: ', req.body);
    let orderInfo = req.body.orderInfo;
    const orderItemsInfo = req.body.orderItemsInfo;
    const productInfo = req.body.productsInfo;
    const userInfo = req.body.userInfo;

    console.log('')

    console.log('orderItemInfo: ', orderItemsInfo);

    // Order [Object Object]로 나와서 변환함
    // console.log('orderInfo는 이거다:  ', orderInfo);
    
    // let insertOrderSql = 'INSERT INTO `order` SET ? ' + orderInfo;
    let insertOrderSql = 'INSERT INTO `order` SET ? ';
    // let insertOrderSql = 'INSERT INTO `order` (id, customerId, orderDate, orderer, ordererPhone, shippingAddress, totalSalePrice, totalSaleQty, repProdName, repProdImg) VALUES ';
    let orderDetailInfo = [orderInfo.id, orderInfo.customerId, orderInfo.orderDate, orderInfo.orderer, orderInfo.ordererPhone, orderInfo.shippingAddress, orderInfo.totalSalePrice, orderInfo.totalSaleQty, orderInfo.repProdName, orderInfo.repProdImg];
    console.log('orderDetailInfo: ', orderDetailInfo);
    // insertOrderSql += '( ' + orderDetailInfo + ' ) ';
    // console.log('insertOrderSql: ', insertOrderSql);

    // console.log('orderInfo: ', orderInfo);
    // insertOrderSql += " ( '" + orderInfo.id + "'" + ', ';
    // insertOrderSql += "'" + orderInfo.customerId + "'" + ', ';
    // insertOrderSql += orderInfo.orderDate + ', ';
    // insertOrderSql += "'" + orderInfo.orderer + "'" + ', ';
    // insertOrderSql += "'" + orderInfo.ordererPhone + "'" + ', ';
    // insertOrderSql += "'" + orderInfo.shippingAddress + "'" + ', ';
    // insertOrderSql += orderInfo.totalSalePrice + ', ';
    // insertOrderSql += orderInfo.totalSaleQty + ', ';
    // insertOrderSql += "'" + orderInfo.repProdName + "'" + ', ';
    // insertOrderSql += "'" + orderInfo.repProdImg + "'" + ' ) ';

    console.log('req.body.orderInfo: ', req.body.orderInfo);
    console.log('req.body.orderInfo.customerId: ', req.body.orderInfo.customerId);

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
    
    const connection = await pool.getConnection();

    try {

        // 에러남: SyntaxError: await is only valid in async functions and the top level bodies of modules
        // await new Promise(resolve => transaction.begin(resolve));        
        // const request = new mysql.Request(transaction);

        // let insertOrderSqlResult = request.query(insertOrderSql);        
        // let insertOrderItemSqlResult = request.query(insertOrderItemSql);
        // let updateProductSqlResult = request.query(updateProductSql);
        // let updateUserSqlResult = request.query(updateUserSql);

        // transaction.commit();

        // TODO 비동기 함수와 동기 함수가 똑같이 쓰면 ?... (orderItem은 꼭 order가 생성된 후에 생성되어야 한다.)
        await connection.beginTransaction(); // START TRANSACTION

        console.log('***** insertOrderSql: ', insertOrderSql);

        // let insertOrderSqlResult = await connection.query(insertOrderSql, [orderInfo]);        
        let insertOrderData = {
            id: orderInfo['id'],
            customerId: orderInfo['customerId'],
            orderDate: orderInfo['orderDate'],
            orderer: orderInfo['orderer'],
            ordererPhone: orderInfo['ordererPhone'],
            shippingAddress: orderInfo['shippingAddress'],
            totalSalePrice: orderInfo['totalSalePrice'],
            // totalSaleQty: orderInfo['totalSaleQty'],
            // repProdName: orderInfo['repProdName'],
            // repProdImg: orderInfo['repProdImg']
        }
        let insertOrderSqlResult = await connection.query(insertOrderSql, [insertOrderData]);        

        let updateProductSqlResult = await connection.query(updateProductSql);
        let updateUserSqlResult = await connection.query(updateUserSql);
        let insertOrderItemSqlResult = connection.query(insertOrderItemSql);

        await connection.commit(); // COMMIT

        console.log('insertOrderSqlResult: ', insertOrderSqlResult);
        console.log('insertOrderItemSqlResult: ', insertOrderItemSqlResult);
        console.log('updateProductSqlResult: ', updateProductSqlResult);
        console.log('updateUserSqlResult: ', updateUserSqlResult);


    } catch(err) {
        console.log('에러! ', err);
        await connection.rollback(); // ROLLBACK
        console.log('Query Error');

    } finally {
        connection.release();

    }
}

module.exports.createOrder = createOrder;
