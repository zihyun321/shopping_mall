import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from "react-router";
import '../styles/Table.css'
import Spinner from "./Spinner";

const OrderStatusDetail = (props) => {

    console.log('===== OrderStatusDetail =====');
    const location = useLocation();
    console.log('location.state: ', location.state);
    const [orderItemList, setOrderItemList] = useState(['']);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        handleGetOrderItemInfo();
    }, []);

    async function handleGetOrderItemInfo() {
        getOrderItemInfo()
            .then((data) => {
                if (data.success) {
                    console.log('order 정보 가져오기');
                    console.log('data.result: ', data.result);
                    setOrderItemList(data.result);
                    console.log('orderItemList: ', orderItemList);
                }
            })
            .then(setLoading(false))
    }
    async function getOrderItemInfo() {
        const orderInfo = {
            orderId: location.state.orderId
        }
        const requestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(orderInfo)
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
            {
                loading && orderItemList.length == 0
                    ? <Spinner/>
                    : (
                        <div className='container'>
                            <table className='order-info'>
                                <thead>
                                    <th>상품정보</th>
                                    <th>수량</th>
                                    <th>상품금액</th>
                                    <th>진행상태</th>
                                </thead>
                                <tbody>
                                    {
                                        orderItemList.map((data) => {
                                          return (
                                            <tr>
                                                <td>
                                                    <img class="w-20 h-30" alt={data.imgUrl} src={data.imgUrl}/>
                                                </td>
                                                <td>
                                                    {data.orderQuantity}
                                                </td>
                                                <td>
                                                    {data.orderPrice}
                                                </td>
                                                <td>
                                                    {data.orderStatus}
                                                    <button
                                                    class="shadow ml-3 bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
                                                    >리뷰쓰기</button>
                                                </td>

                                            </tr>
                                          )

                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
            }

        </div>
    )
}

export default OrderStatusDetail