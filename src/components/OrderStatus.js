import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import '../styles/Table.css'
import {useHistory, useLocation, withRouter} from 'react-router-dom';

const OrderStatus = () => {
    
    const history = useHistory();

    const loginStatus = useSelector((state) => state);
    console.log('loginStatus: ', loginStatus);
    const [userInfo, setUserInfo] = useState({});
    const [orderItemList, setOrderItemList] = useState([]);
    const [orderList, setOrderList] = useState([]);

    console.log('orderList: ', orderList);
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
                    console.log('data.result: ', data.result);
                    setOrderList(data.result);
                }
            }
        )
    }

    async function getOrderInfo() {
        const requestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(loginStatus.currentUser.user)
        }
        console.log('requestOptions: ', requestOptions);

        const response = await fetch(
            'http://localhost:3001/getOrder',
            requestOptions
        );
        const data = await response.json();
        return data
    }
    
    // async function handleGetOrderItemInfo() {
    //     console.log('=== handleGetOrderInfo ===');
    //     getOrderItemInfo().then(
    //         (data) => {
    //             if (data.success) {
    //                 console.log('order 정보 가져오기');
    //                 setOrderItemList(data.result);
    //                 console.log('data.result: ', data.result);
    //             }
    //             else {
    //                 console.log('에러');
    //             }
    //         }
    //     )
    // }

    // async function getOrderItemInfo() {
    //     console.log('=== getOrderItemInfo ===');
    //     const requestOptions = {
    //         method: "post",
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify(loginStatus.currentUser.user)
    //     }
    //     console.log('requestOptions: ', requestOptions);

    //     const response = await fetch(
    //         'http://localhost:3001/getOrder',
    //         requestOptions
    //     );
    //     const data = await response.json();
    //     return data
    // }


    return (
        <div className='flex'>
            <div className='container'>
                <table className='order-info'>
                    <thead>
                        <th>주문일</th>
                        <th>주문번호</th>
                        <th>주문내역</th>
                        <th>결제금액</th>
                    </thead>
                    <tbody>
                        {
                            orderList.map((data) => {
                                return (
                                    <tr key={data.id}>
                                        <td>{data.orderDate.split('T')[0]}</td>
                                        <td onClick={() => {history.push({pathname: '/ProfileMgmtPage/OrderStatusDetail', state: {orderId: data.id}})}}>{data.id}</td>
                                        <td>
                                            <img class="w-20 h-30" alt={data.repProdImg} src={data.repProdImg}/>
                                            {
                                                data.totalSaleQty === 1 ? data.repProdName : data.repProdName + " 외 " + (data.totalSaleQty - 1) + "건"
                                            }
                                        </td>
                                        <td>{data.totalSalePrice}</td>
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