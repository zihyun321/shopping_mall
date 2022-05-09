import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from "react-router";
import '../styles/Table.css'
import Spinner from "./Spinner";
import CreateReviewModal from './modal/CreateReviewModal';

const OrderStatusDetail = (props) => {

    console.log('===== OrderStatusDetail =====');
    const location = useLocation();
    console.log('location.state: ', location.state);
    const orderId = location.state.orderId;
    const [orderItemList, setOrderItemList] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedProd, setSelectedProd] = useState({});
    const [selectedItem, setSelectedItem] = useState({});

    const loginStatus = useSelector((state) => state);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        setLoading(true);
        handleGetOrderItemInfo();
        setUserInfo(loginStatus.currentUser.user);
    }, []);

    const clickCreateReviewBtn = (item) => {
        console.log('=== clickCreateReviewBtn ===');
        console.log('item: ', item);
        setShowReviewModal(!showReviewModal);
        setSelectedItem(item);
    }

    const handleShowModal = () => {
        setShowReviewModal(!showReviewModal);
    }

    /**
     * 주문취소시
     * 1) order 필드 변경 (totalSaleQty, repProdName, repProdImg)
     *      => TODO 로직이 너무 이상한 것 같아서 삭제예정
     * 2) orderItem 필드 변경 (orderStatus)
     * 3) product 재고 변경 (quantity)
     * 4) 고객 보유 포인트 변경 (points)
     *
     */
    const clickCancelOrderItemBtn = (item) => {
        console.log('item: ', item);
        console.log('userInfo: ', userInfo);
        handleCancelOrder(item);
    }

    const handleCancelOrder = (item) => {
        console.log('=== handleCancelOrder ===');
        handleUpdateUserPoints(item.orderPrice * 0.01);
        handleGetProductStock(item.id, item.orderQuantity);
        handleUpdateOrderItemInfo(orderId, item.id);

        // ============ TODO ============ ******** return 값 활용하여 한개라도 실행안되었을시, rollback
        // 처리하기 어떻게 ??????

    }

    async function handleUpdateOrderItemInfo(orderId, productId) {
        const orderItemInfo = {
            orderId: orderId,
            productId: productId
        };

        updateOrderItemInfo(orderItemInfo).then((data) => {
            if (data.success) {
                console.log('성공');
            } else {
                console.log('에러');
            }
        })
    }

    async function updateOrderItemInfo(orderItemInfo) {
        const requestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(orderItemInfo)
        };

        const response = await fetch(
            'http://localhost:3001/updateOrderItem',
            requestOptions
        );
        const data = await response.json();
        return data
    }

    async function handleGetProductStock(productId, orderQuantity) {
        getProductStock(productId).then((data) => {
            if (data.success) {
                console.log('update product 성공');
                console.log('data.result: ', data.result);
                handleUpdateProduct(data.result, orderQuantity);
            } else {
                console.log('에러');
            }
        })
    }

    async function getProductStock(productId) {
        const productInfo = {
            id: productId
        }
        const requestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(productInfo)
        };

        const response = await fetch(
            'http://localhost:3001/getProductStock',
            requestOptions
        );
        const data = await response.json();
        return data
    }

    async function handleUpdateProduct(productInfo, orderQuantity) {
        let updateProductInfo = {
            id: productInfo[0].id,
            quantity: productInfo[0].quantity - orderQuantity
        }
        updateProduct(updateProductInfo).then((data) => {
            if (data.success) {
                console.log('성공')
            } else {
                console.log('에러');
            }
        })
    }

    async function updateProduct(updateProductInfo) {
        const requestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updateProductInfo)
        };

        const response = await fetch(
            'http://localhost:3001/updateProduct',
            requestOptions
        );
        const data = await response.json();
        return data
    }

    async function handleUpdateUserPoints(itemPoints) {
        console.log('itemPoints: ', itemPoints);
        updateUserPoints(itemPoints).then((data) => {
            if (data.success) {
                console.log('update product 성공');

            } else {
                console.log('에러');
            }
        })
    }

    async function updateUserPoints(itemPoints) {
        let updatePoints = userInfo.points - itemPoints < 0
            ? 0
            : userInfo.points - itemPoints;
        const updateUserInfo = {
            id: userInfo.id,
            points: updatePoints
        }

        const requestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updateUserInfo)
        }

        const response = await fetch(
            'http://localhost:3001/updateUserPoints',
            requestOptions
        )
        const data = await response.json();
        return data
    }

    // 주문 정보 가져오기
    async function handleGetOrderItemInfo() {
        getOrderItemInfo()
            .then((data) => {
                if (data.success) {
                    console.log('order 정보 가져오기');
                    console.log('data.result: ', data.result);
                    setOrderItemList(data.result);
                }
            })
            .then(setLoading(false))
    }

    async function getOrderItemInfo() {
        const orderInfo = {
            orderId: location.state.orderId,
            orderStatus: '주문완료'
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
                        <div className='text-2xl font-bold mb-2 float-left'>주문상세내역</div>
                        <br/>
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
                                                            onClick={() => clickCreateReviewBtn(data)}
                                                            class="shadow ml-3 bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4">리뷰쓰기</button>
                                                        <button
                                                            onClick={() => clickCancelOrderItemBtn(data)}
                                                            class="shadow ml-3 bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4">취소하기</button>
                                                    </td>

                                                </tr>
                                            )

                                        })
                                    }
                                </tbody>
                            </table>
                            {
                                showReviewModal && (
                                    <div>
                                        <CreateReviewModal close={handleShowModal} orderItem={selectedItem}/>
                                    </div>
                                )
                            }
                        </div>
                    )
            }

        </div>
    )
}

export default OrderStatusDetail