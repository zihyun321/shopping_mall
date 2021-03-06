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
    queueLimit: 0
});

exports.checkAndCreateUser = (req, res) => {
    console.log('===checkAndCreateUser===');
    // const user_id = req.body.inText; console.log(user_id); query문 추가할 곳///// var
    // userInsertSQL = 'INSERT INTO customer(id, password, name, phone, address,
    // gender) values(?, ?, ?, ?, ?, ?)';
    var userInsertSQL = "INSERT INTO customer SET ? ";

    var userInfo = {
        id: req.body.id,
        password: req.body.password,
        name: req.body.name,
        phone: req.body.phone,
        zoneCode: req.body.zoneCode,
        regionAddress: req.body.regionAddress,
        detailAddress: req.body.detailAddress,
        // address: req.body.address,
        gender: req.body.gender,
        points: 0
    }

    var searchSameUserSQL = 'SELECT id FROM customer WHERE id = ? ';

    connection.query(
        searchSameUserSQL,
        userInfo['id'],
        (error, result, fields) => {
            console.log('error: ', error);
            if (error) {
                console.log('실패');
            } else {
                if (result.length == 0) {
                    createUser();
                } else {
                    return res.json(
                        {success: false, errorCode: 'duplicateId', msg: '중복된 아이디가 존재합니다.'}
                    )
                }
            }
        }
    );

    const createUser = () => {
        connection.query(userInsertSQL, userInfo, (error, result, fields) => {
            console.log('error: ', error);
            if (error) {
                console.log('실패');
            } else {
                return res.json({success: true, msg: '회원가입 성공!'})
            }
        });

    }

};

/**
 * 로그인 시 User와 연관된 기본 정보, 주문 정보, 장바구니 정보 다 불러와야한다?
 * 한꺼번에 모든 정보를 저장해야할지, 아니면 페이지 선택했을때 정보를 업데이트 해야할지
 * @param {*} req
 * @param {*} res
 */
// readUser로 변경
exports.checkUserInfo = (req, res) => {
    console.log('=== userLogin ');
    console.log('req.body: ', req.body);
    console.log('req.body.id: ', req.body.id);

    const loginInfo = req.body;
    // const resultInfo;

    connection.query(
        // `SELECT id, password FROM customer WHERE id = "`+ req.body.id + `" and
        // password = "` + req.body.password + `"`,
        `SELECT * FROM customer WHERE id = "` + req.body.id + `"`,

        (
            error,
            result,
            fields
        ) => {

            if (error) {
                console.log('error: ', error);
                // TODO (에러처리 어떻게 할지 생각하기) return res.json({     success: true })
            } else {
                if (
                    result[0]
                        ?.id == req.body.id
                ) {
                    if (
                        result[0]
                            ?.password == req.body.password
                    ) {
                        return res.json({success: true, userInfo: result})
                    } else {
                        return res.json(
                            {success: false, errorCode: 'checkPassword', msg: '비밀번호를 확인하세요.'}
                        )
                    }
                } else {
                    return res.json(
                        {success: false, errorCode: 'thereIsNoInfo', msg: '일치하는 정보가 없습니다.'}
                    )
                }
            }
        }
    );
}

exports.updateUserPoints = (req, res) => {
    let userInfo = req.body;
    console.log('userInfo: ', userInfo);
    // let query = ' UPDATE customer SET points = ? WHERE id = ? ';
    let query = `UPDATE customer SET points = ${userInfo.points} WHERE id = '${userInfo.id}' `;

    // let query = `UPDATE product SET quantity=${userInfo.quantity} WHERE
    // id='${item.id}';`;
    connection.query(query, (error, rows, field) => {
        if (error) 
            throw error;
        else 
            return res.json({success: true});
        }
    )
    // connection.query(query, [userInfo.points, userInfo.id], (error, rows, fields)
    // => {     if (error) throw error;     else return res.json({ success: true });
    // });
}

exports.updateUserInfo = (req, res) => {
    let changedUserInfo = req.body;
    let query = ` UPDATE customer `;
    if (changedUserInfo.zoneCode !== null) {
        query += ` SET zoneCode = '${changedUserInfo.zoneCode}', regionAddress = '${changedUserInfo.regionAddress}, detailAddress = '${changedUserInfo.detailAddress}' ' `
    }
}

// exports.getUserInfo = (req, res) => {     const userInfo = req.body;     var
// id = req.body.id;     var sql = 'SELECT * FROM customer WHERE id = ? ';
// connection.query(sql, [id], (error, rows, fields) => {         if (error)
// throw error;         else {             return res.send(rows);         } });
// }