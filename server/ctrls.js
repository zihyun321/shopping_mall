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

exports.addUser = (req, res) => {
    console.log('req.body: ', req.body);
    // const user_id = req.body.inText; console.log(user_id); //query문 추가할 곳/////
    console.log('req.body.id: ', req.body.id);
    connection.query(
        'INSERT INTO customer(id, password, name, phone, address, gender) values(?, ?, ?, ?, ?, ?)',
        [
            req.body.id,
            req.body.password,
            req.body.name,
            req.body.phone,
            req.body.address,
            req.body.gender
        ],
        (error, rows, fields) => {
            console.log('error: ', error);
            if (error) {
                console.log('실패');
            } else {
                console.log('성공');
            }
        }
    );    
};

exports.getProductList = (req, res) => {
    console.log('req.body: ', req.body.category);
    var category = req.body.category;
    var sql = 'SELECT * FROM product WHERE category = ? ';

    connection.query(sql, [category], (error, rows, fields) => {
        if (error) 
            throw error;
        else {
            console.log('Product info is: ', rows);
            return res.send(rows);
        }
    });
}

exports.getUserInfo = (req, res) => {
    console.log('=== userLogin ');
    console.log('req.body: ', req.body);
    console.log('req.body.id: ', req.body.id);
        
    const loginInfo = req.body;
    // const resultInfo;

    connection.query(
        // `SELECT id, password FROM customer WHERE id = "`+ req.body.id + `" and password = "` + req.body.password + `"`,
        `SELECT id, password FROM customer WHERE id = "`+ req.body.id + `"`,

        (error, result, fields) => {

            if (error) {
                // TODO (에러처리 어떻게 할지 생각하기)                
                // return res.json({
                //     success: true
                // })
            } else {
                if (result[0]?.id == req.body.id) {
                    if (result[0]?.password == req.body.password) {
                        return res.json({
                            success: true
                        })
                    } else {
                        return res.json({
                            success: false,
                            errorCode: 'checkPassword',
                            msg: '비밀번호를 확인하세요.'
                        })
                    }
                } else {
                    return res.json({
                        success: false,
                        errorCode: 'thereIsNoInfo',
                        msg: '일치하는 정보가 없습니다.'
                    })
                }
            }
        }
    );
}

// exports.getUserInfo = (req, res) => {
//     connection.query("SELECT id FROM customer", function(error, rows, fields) {
//         if (error) {
//             console.log('실패');
//             console.log('res: ', res);
//         } else {
//             console.log('성공');
//         }
//     })
// }

