import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import '../styles/Table.css'

const OrderStatus = () => {
    

    const loginStatus = useSelector((state) => state);
    console.log('loginStatus: ', loginStatus);
    const [userInfo, setUserInfo] = useState({});
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        setUserInfo(loginStatus.currentUser.user);
        handleGetOrderInfo();
    }, []);
    
    async function handleGetOrderInfo() {
        console.log('=== handleGetOrderInfo ===');
        getOrderInfo().then(
            (data) => {
                if (data.success) {
                    console.log('order 정보 가져오기');
                    setOrderList(data.result);
                    console.log('data.result: ', data.result);
                }
                else {
                    console.log('에러');
                }
            }
        )
    }

    async function getOrderInfo() {
        console.log('=== getOrderInfo ===');
        const requestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(loginStatus.currentUser.user)
        }
        console.log('requestOptions: ', requestOptions);

        const response = await fetch(
            'http://localhost:3001/getOrderItem',
            requestOptions
        );
        const data = await response.json();
        return data
    }

    return (
        <div>
            <div className='container'>
                <table className='order-info'>
                    <thead>
                        <th>주문일</th>
                        <th>주문번호</th>
                        <th>상품정보</th>
                        <th>수량</th>
                        <th>상품금액</th>
                        <th>진행상황</th>
                        <th>상품평</th>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderStatus