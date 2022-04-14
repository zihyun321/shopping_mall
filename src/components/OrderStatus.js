import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import '../styles/Table.css'

const OrderStatus = () => {
    

    const loginStatus = useSelector((state) => state);
    console.log('loginStatus: ', loginStatus);
    const [userInfo, setUserInfo] = useState({});
    const [orderItemList, setOrderItemList] = useState([]);

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
                    setOrderItemList(data.result);
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
                        <th>주문내역</th>
                        <th>주문번호</th>
                        <th>결제금액</th>
                    </thead>
                    <tbody>
                        {
                            orderItemList.map((data) => {
                                return (
                                    <tr key={data.id}>
                                        <td>{data.orderdate}</td>
                                        <td>
                                            <img class="w-20 h-30" alt={data.imgUrl} src={data.imgUrl}/>

                                        </td>
                                        <td>{data.orderdate}</td>
                                        <td>{data.orderdate}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderStatus