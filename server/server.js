const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config(); // DB 환경변수

/**
 * DB 연동
 */
const mysql = require('mysql2');
const ResponseLike = require('responselike');
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

// connection.connect();

connection.query('SELECT * from customer', (error, rows, fields) => {
    if (error) 
        throw error;
    console.log('User info is: ', rows);
});

/**
 * 프론트와 연동
 */
const port = process.env.PORT || 3001;
app.use(cors());

app.use(bodyParser.json());
app.use('/api', (req, res) => res.json({username: 'jihyun22'}));

app.listen(port, () => {
    console.log(`express is running on ${port}`);
})

app.get("/", () => {
    console.log('잘작동중입니다');
});

app.post("/userJoin", (req, res) => {
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
});

app.post("/getProduct", (req, res) => {
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
    // connection.query('SELECT * from product', (error, rows, fields) => {
    //     if (error) 
    //         throw error;
    //     else {
    //         console.log('Product info is: ', rows);
    //         return res.send(rows);
    //     }
    // });
    
});

// const loginPage = require('./routes/home/index');
// app.use('/login', loginPage);

app.post("/userLogin", (req, res) => {
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
});

app.post("/getUserInfo", (req, res) => {
    connection.query("SELECT id FROM customer", function(error, rows, fields) {
        if (error) {
            console.log('실패');
            console.log('res: ', res);
            // console.log('res: ', rows);
            // console.log('res: ', fields);

            // res.send(rows[0]);
        } else {
            console.log('성공');
        }
    })
})

// connection.end();
