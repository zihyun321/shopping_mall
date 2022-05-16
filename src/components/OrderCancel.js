import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import '../styles/Table.css'
import Spinner from "./Spinner";

const OrderCancel = () => {

    const loginStatus = useSelector((state) => state);
    const [orderItemList, setOrderItemList] = useState(['']);
    const [loading, setLoading] = useState(false);

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        setLoading(true);
        setUserInfo(loginStatus.currentUser.user);
        handleGetOrderItemInfo(loginStatus.currentUser.user);
    }, []);

    async function handleGetOrderItemInfo(userInfo) {
        getOrderItemInfo(userInfo)
            .then((data) => {
                if (data.success) {
                    console.log('order 정보 가져오기');
                    console.log('data.result: ', data.result);
                    setOrderItemList(data.result);
                    data.result.map((data) => {
                      console.log('data: ', data);
                    })
                }
            })
            .then(setLoading(false))
    }

    async function getOrderItemInfo(userInfo) {
        const orderInfo = {
            customerId: userInfo.id,
            orderStatus: '주문취소'
        }
        console.log('orderInfo: ', orderInfo);
        const requestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(orderInfo)
        }
        console.log('requestOptions: ', requestOptions);

        const response = await fetch(
            'http://localhost:3001/getCancelOrderItem',
            requestOptions
        );
        const data = await response.json();
        return data
    }

    return (
        <div className='flex'>
            {
                loading && orderItemList.length == 0
                    ? <Spinner/>
                    : (
                    <div className='container'>
                      <div className='text-2xl font-bold mb-2 float-left'>취소내역</div>
                      <br/>
                      <table>
                        <thead>
                          <th>주문번호</th>
                          <th>취소일</th>
                          <th>주문상태</th>
                          <th>취소금액</th>
                        </thead>
                        <tbody>
                          {
                            orderItemList.map((data) => {
                              return (
                                <tr key={data.id}>
                                  <td>{data.orderId}</td>
                                  <td>
                                    {
                                      !!data.orderCancelDate ? 
                                      data.orderCancelDate.split('T')[0] : null
                                    }
                                  </td>
                                  <td>{data.orderStatus}</td>
                                  <td>{data.orderQuantity * data.orderPrice}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                    </div>)
            }
        </div>
    )
}

export default OrderCancel