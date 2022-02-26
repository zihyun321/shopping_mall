const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config(); // DB 환경변수

/**
 * DB 연동
 */
const mysql = require('mysql2');
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

app.post("/userLogin", (req, res) => {
    console.log('=== userLogin ');
    console.log('req.body: ', req.body);
    console.log('req.body.id: ', req.body.id);
    
    const tempUserInfo = {id : 'jihyun', password: 'jihyun321'};
    const tempUserInfo2 = {id : '', password: ''};
    
    const loginInfo = req.body;

    connection.query(
        `SELECT id, password FROM customer WHERE id = "`+ req.body.id + `" and password = "` + req.body.password + `"`,
        (error, result, fields) => {
            console.log('error: ', error);
            if (error) {
                console.log('실패');
            } else {
                console.log('성공');
                console.log('== result: ', result); 
                // console.log('== result: ', JSON.parse(result));                
                console.log('== result: ', result.length); 
                if (result.length == 1) {
                    // res.redirect('/Home');
                    // res.sendFile(path.join(__dirname , "../src/components/Home.js"));
                    res.send(loginInfo);
                } else {
                    res.send(loginInfo);
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
