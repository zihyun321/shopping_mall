const express = require('express');
const app = express();

const router = express.Router();


router.post("/userJoin", (req, res) => {
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