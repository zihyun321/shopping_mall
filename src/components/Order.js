import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from "react-router";
import '../styles/Table.css'
import DaumPostcode from 'react-daum-postcode';
import SearchAddressModal from './modal/SearchAddressModal';
import { Divider } from 'antd';
import {useHistory, withRouter} from 'react-router-dom';
import ConfirmOrderModal from "./modal/ConfirmOrderModal";
import Spinner from "./Spinner";

const Order = props => {

    console.log('=== Order ===');
    const location = useLocation();
    console.log('location.state: ', location.state);
    console.log('location.state.cartList: ', location.state.cartList);
    console.log('location.state.productList: ', location.state.productList);
    console.log('location.state.paymentAmount: ', location.state.paymentAmount);
    
    const productList = location.state.productList;
    const deleteCartList = location.state.deleteCartList;
    // let tempProd = {};
    // const productList = !!location.state.productList ? location.state.productList : (
    //     cartList.map((data) => {
    //         tempProd = {
    //             id: data.productId,
    //             name: data.name,
    //             imgUrl: data.imgUrl,
    //             quantity: data.quantity,  // 주문한 제품 갯수
    //             price: data.price,
    //             size: data.size,
    //             color: data.color
    //         }
    //         productList.push();
    //     })
    // );
    const paymentAmount = location.state.paymentAmount;
    const earnedAmount = paymentAmount * 0.01;

    let productIdList = [];
    console.log('********* 페이지 업로드됨 *******');
    console.log('productList: ', productList);
    productList.map((data) => {
        console.log('data: ', data);
        productIdList.push(data.id);
    })    


    const loginStatus = useSelector((state) => state);
    const [selectFirstPN, setSelectFirstPN] = useState('1');
    const [isSearchAddressModalOpen, setSearchAddressModalOpen] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [originProductList, setOriginProductList] = useState([]);
    const [createdOrderId , setCreatedOrderId] = useState();
    const history = useHistory();

    // 주문자정보
    const [orderer, setOrderer] = useState(loginStatus.currentUser.user.name);
    const [ordererPhone, setOrdererPhone] = useState(loginStatus.currentUser.user.phone);
    const [shippingAddress, setShippingAddress] = useState(loginStatus.currentUser.user.address);
    const [totalSalesVolume, setTotalSalesVolume] = useState();
    const [userPoints, setUserPoints] = useState(0);
    const [isCreatedOrder, setIsCreatedOrder] = useState(false);

    const handleSelectFirstPN = (e) => {
        setSelectFirstPN(e.target.value);
    }

    const handleOpenSearchModal = () => {
        setSearchAddressModalOpen(!isSearchAddressModalOpen);
    }

    const onComplete = (data) => {
        console.log(data);
    }

    const handleCreatedOrder = () => {
        setIsCreatedOrder(!isCreatedOrder);
    }

    const getCurrentDate = (todayDateTime) => {
        let year = todayDateTime.getFullYear();
        let month = ('0' + (todayDateTime.getMonth() + 1)).slice(-2);
        let day = ('0' + todayDateTime.getDate()).slice(-2);
        let dateString = year + month + day;
        return dateString
    }

    const getCurrentTime = (todayDateTime) => {
        let hours = ('0' + todayDateTime.getHours()).slice(-2); 
        let minutes = ('0' + todayDateTime.getMinutes()).slice(-2);
        let seconds = ('0' + todayDateTime.getSeconds()).slice(-2); 
        let timeString = hours + minutes + seconds;
        return timeString
    }

    /**
     * 주문시
     * 1) order 레코드 생성 (고객id)
     * 2) orderItem 레코드 생성 (order id, product id)
     * 3) 고객 레코드 업데이트 (고객 보유 포인트)
     * 4) 제품 재고 및 판매수 업데이트 (제품 재고 차감)
     * 5) 제품 주문시, 장바구니에 있는 제품 주문하면 장바구니 삭제
     */

    const clickOrderBtn = () => {
        if (!!!orderer || !!!shippingAddress || !!!orderer) {
            alert('다 입력하세요');
        } else {
            handleCreateOrder();
        }
    }

    // 2022-05-11 transction 한꺼번에 합치기
    const handleCreateOrder = () => {
        console.log('=== handleCreateOrder ===');
        
        let todayDateTime = new Date();
        let currentDate = getCurrentDate(todayDateTime);
        let currentTime = getCurrentTime(todayDateTime);

        const orderId = currentDate + '_' + currentTime;
        setCreatedOrderId(currentDate + '_' + currentTime);

        // 데이터 생성
        // 1. Order 정보 생성
        const orderInfo = {
            id: orderId,
            customerId: user.id,
            orderDate: orderId.split('_')[0],
            orderer: orderer,
            ordererPhone: ordererPhone,
            shippingAddress: shippingAddress,
            totalSalePrice: paymentAmount,
            totalSaleQty: productList.length,
            repProdName: productList[0].name,
            repProdImg: productList[0].imgUrl
        }

        // 2. Order Item 정보 생성
        let orderItemsInfo = [];
        let orderItem;
        let cartIdsInfo = [];
        productList.map(data => {
            orderItem = {
                customerId: user.id,
                orderId: orderId,
                productId: data.id,
                orderQuantity: data.quantity,
                orderPrice: data.quantity * data.price,
                // deliveryStatus: '배송 준비중',
                orderStatus: '주문완료'
            }
            orderItemsInfo.push(orderItem);
            // cartIdsInfo.push(data.id); // 5. 주문시, 장바구니에 있는 아이템 삭제 => server에서 처리
        });

        // 3. Product 정보 생성
        let remainQuantity;
        let productsInfo = [];
        let productInfo = {};
        console.log('*** productList: ', productList);
        console.log('originProductList: ', originProductList);
        console.log('*** productList: ', productList[0]);
        console.log('originProductList: ', originProductList[0]);

        for (let i=0; i<productList.length; i++) {
            remainQuantity = originProductList[i].quantity - productList[i].quantity;
            productInfo = {id: productList[i].id, quantity: remainQuantity};
            productsInfo.push(productInfo);
        }
        console.log('*** productsInfo: ', productsInfo);

        // 4. User 정보 생성
        let updatePoints = userPoints + earnedAmount;
        let userInfo = {
            id: user.id,
            points: updatePoints
        }

        // 5. delete cart list
        console.log('#### deleteCartList: ', deleteCartList);

        const createOrderInfo = {
            orderInfo: orderInfo,
            orderItemsInfo: orderItemsInfo,
            productsInfo: productsInfo,
            userInfo: userInfo,
            cartIdsInfo: deleteCartList
        };

        console.log('=== 주문시 넘겨줄 리스트: ', createOrderInfo);

        createOrder(createOrderInfo).then(
            (data) => {
                if (data.success) {
                    setIsCreatedOrder(true);
                } else {
                    console.log('에러');
                }

            }
        )        
    }

    async function createOrder(createOrderInfo) {
        const requestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(createOrderInfo)
        };

        const response = await fetch(
            'http://localhost:3001/createOrder',
            requestOptions
        );
        const data = await response.json();
        return data
    }

    // const handleOrder = () => {
    //     console.log('order 클릭');
    //     let todayDateTime = new Date();
    //     let currentDate = getCurrentDate(todayDateTime);
    //     let currentTime = getCurrentTime(todayDateTime);

    //     // const orderId = currentDate + '_' + currentTime;
    //     setOrderId(currentDate + '_' + currentTime);
    //     console.log('***** 생성되는 orderId: ', currentDate + '_' + currentTime);

    //     handleCreateOrder();
    //     handleUpdateProduct();
    //     handleUpdateUserPoints();
    //     // deleteCart(); TODO 장바구니에 있는 제품 지우기???
    // }

    // 여기다가 async를 또 써도 되는가?
    // handleCreateOrder 실행 성공시, handleCreateOrderItem 처리되도록 해놨는데... 다른 것들도 처리안될시엔 롤백처리 어케하지?
    // async function handleCreateOrder() {
    //     createOrder().then(
    //         (data) => {
    //             if (data.success) {
    //                 console.log('create order 성공');
    //                 handleCreateOrderItem(orderId);
    //                 console.log('orderId: ', orderId);
    //                 console.log('data.result: ', data.result);
                    
    //             } else {
    //                 console.log('에러');
    //             }

    //         }
    //     )
    // }

    // TODO orderItem의 orderCancelDate 추가하기
    // async function createOrder() {
    //     console.log('=== createOrder ===');
    //     const orderInfo = {
    //         id: orderId,
    //         customerId: userInfo.id,
    //         orderDate: orderId.split('_')[0],
    //         orderer: orderer,
    //         ordererPhone: ordererPhone,
    //         shippingAddress: shippingAddress,
    //         totalSalePrice: paymentAmount,
    //         totalSaleQty: productList.length,
    //         repProdName: productList[0].name,
    //         repProdImg: productList[0].imgUrl
    //     }

    //     const requestOptions = {
    //         method: "post",
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify(orderInfo)
    //     };

    //     const response = await fetch(
    //         'http://localhost:3001/createOrder',
    //         requestOptions
    //     );
    //     const data = await response.json();
    //     return data
    // }

    // async function handleCreateOrderItem() {
    //     createOrderItem().then(
    //         (data) => {
    //             if (data.success) {
    //                 console.log('create order 성공');
    //                 // alert('주문이 완료되었습니다.');
    //                 // history.push("/ProfileMgmtPage/OrderStatusDetail/" + orderId);
    //                 console.log('***** 보내주는 orderId: ', orderId);
    //                 setIsCreatedOrder(true);
    //             } else {
    //                 console.log('에러');
    //             }

    //         }
    //     )
    // }

    // async function createOrderItem() {
    //     let orderItems = [];
    //     let orderItem;
    //     productList.map(data => {
    //         orderItem = {
    //             customerId: userInfo.id,
    //             orderId: orderId,
    //             productId: data.id,
    //             orderQuantity: data.quantity,
    //             orderPrice: data.quantity * data.price,
    //             // deliveryStatus: '배송 준비중',
    //             orderStatus: '주문완료'
    //         }
    //         orderItems.push(orderItem);
    //     });
    //     console.log('=== orderItems ===', orderItems);
    
    //     const requestOptions = {
    //         method: "post",
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify(orderItems)
    //     };

    //     const response = await fetch(
    //         'http://localhost:3001/createOrderItem',
    //         requestOptions
    //     );
    //     const data = await response.json();
    //     return data

    // }

    // async function handleUpdateProduct() {

    //     // originProductList => [{id: 6, quantity: 1}, ] (재고정보)
    //     // productList 비교 =>  [{id: 6, quantity: 1}, ] (주문정보)
        
    //     console.log('originProductList: ', originProductList);
    //     console.log('productList: ', productList);

    //     // 배열 크기가 똑같다는 가정하에 
    //     let remainQuantity;
    //     let updateProductsInfo = [];
    //     let updateProductInfo = {};
    //     for (let i=0; i<productList.length; i++) {
    //         remainQuantity = originProductList[i].quantity - productList[i].quantity;
    //         updateProductInfo = {id: productList[i].id, quantity: remainQuantity};
    //         updateProductsInfo.push(updateProductInfo);
    //     }
    //     console.log('updateProductsInfo: ', updateProductsInfo);

    //     updateProduct(updateProductsInfo).then(
    //         (data) => {
    //             if (data.success) {
    //                 console.log('update product 성공');

    //             } else {
    //                 console.log('에러');
    //             }

    //         }
    //     )
    // }
    
    // async function updateProduct(updateProductsInfo) {    
    //     const requestOptions = {
    //         method: "post",
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify(updateProductsInfo)
    //     };

    //     const response = await fetch(
    //         'http://localhost:3001/updateProduct',
    //         requestOptions
    //     );
    //     const data = await response.json();
    //     return data
    // }

    // async function handleUpdateUserPoints() {
    //     console.log('=== handleUpdateUserPoints ===');
    //     let updatePoints = userPoints + earnedAmount;
    //     let updateUserInfo = {
    //         id: userInfo.id,
    //         points: updatePoints
    //     }
    //     console.log('updateUserInfo: ', updateUserInfo);
    //     updateUserPoints(updateUserInfo).then(
    //         (data) => {
    //             if (data.success) {
    //                 console.log('update product 성공');

    //             } else {
    //                 console.log('에러');
    //             }

    //         }
    //     )
    // }
    
    // async function updateUserPoints(updateUserInfo) {    
    //     const requestOptions = {
    //         method: "post",
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify(updateUserInfo)
    //     };

    //     const response = await fetch(
    //         'http://localhost:3001/updateUserPoints',
    //         requestOptions
    //     );
    //     const data = await response.json();
    //     return data
    // }


    useEffect(() => {
        console.log('=== useEffect ===');
        console.log('loginStatus.currentUser.user: ', loginStatus.currentUser.user);
        setLoading(true);

        setUser(loginStatus.currentUser.user);
        loginStatus.currentUser.user.points !== null ? setUserPoints(loginStatus.currentUser.user.points) : setUserPoints(0);
        handleGetProductStock();    // 기존 product 재고 - 주문한 product 갯수를 뺴주기 위해 해당 화면 렌더링할때 product 불러왔는데 해당 과정이 맞나?..
        
        // let tempProd = {};
        // productList = !!productList ? location.state.productList : (
        //     cartList.map((data) => {
        //         tempProd = {
        //             id: data.productId,
        //             name: data.name,
        //             imgUrl: data.imgUrl,
        //             quantity: data.quantity,  // 주문한 제품 갯수
        //             price: data.price,
        //             size: data.size,
        //             color: data.color
        //         }
        //         productList.push();
        //     })
        // );
        setLoading(false);
    }, []);

    
    async function handleGetProductStock() {
        console.log('=== handleGetProductStock ===');
        getProductStock().then((data) => {
            if (data.success) {
                console.log('product 정보 가져오기 성공');
                // data.result.map((data) => {
                //     originProductList[data.id] = data.quantity
                // });
                // console.log('originProductList: ', originProductList);

                setOriginProductList(data.result);
                // originProductList = data.result;
                console.log('data.result: ', data.result);
            } else {
                console.log('에러');
            }
        }) 
    }


    async function getProductStock() {
        console.log('productIdList: ', productIdList);
        const requestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(productIdList)
        };

        const response = await fetch(
            'http://localhost:3001/getProductStock',
            requestOptions
        );
        const data = await response.json();
        return data
    }

    

    return (
        <div className='container'>
            <div className='cart-info'>
                <div>
                    <div className='table-name'>배송지 정보</div>
                    <table className='shipping-info'>
                        <tbody>
                            <tr>
                                <th>받으시는 분</th>
                                <td>
                                    <input 
                                    className='focus:bg-white focus:outline-black w-96'
                                    value={orderer}
                                    onChange = {(e) => setOrderer(e.target.value)}
                                    ></input>
                                </td>
                            </tr>
                            <tr>
                                <th>휴대폰 번호</th>
                                <td>
                                    {/* <select className="ml-1" onChange={handleSelectFirstPN} value={selectFirstPN}>
                                        <option value="1">010</option>
                                        <option value="2">011</option>
                                        <option value="4">017</option>
                                        <option value="5">018</option>
                                    </select>
                                    <input className='mr-2 focus:bg-white focus:outline-black outline-1 w-124 ml-1'></input> */}
                                    <input 
                                    className=' focus:bg-white focus:outline-black w-96'
                                    value={ordererPhone}
                                    onChange={(e) => setOrdererPhone(e.target.value)}
                                    ></input>
                                </td>
                            </tr>
                            <tr>
                                <th>배송 주소</th>
                                <td className=''>
                                    <input 
                                        className='focus:bg-white focus:outline-black w-96'
                                        value={shippingAddress}
                                        onChange={(e) => setShippingAddress(e.target.value)}
                                    ></input>
                                    {/* <button
                                    className="border-gray-300 w-20 flex focus:outline-none cursor-pointer bg-slate-200 hover:bg-slate-300 "
                                    type="button"
                                    onClick={() => {
                                        handleOpenSearchModal()
                                    }}>주소찾기</button> */}

                                    {/* <input type="text" id="sample4_postcode" placeholder="우편번호"></input> */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <div className='table-name mt-10'>주문상품</div>
                    <table className='order-info'>
                        <thead>
                            <th>상품정보</th>
                            <th>수량</th>
                            <th>가격</th>
                            <th>총 상품금액</th>
                        </thead>
                        <tbody>
                            {
                                loading ? <Spinner/> : 
                                (
                                    productList.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>
                                                    <a href={'http://localhost:3000/ProductDetail/' + data.id}>
                                                        <img class="w-20 h-30" alt={data.imgUrl} src={data.imgUrl}/>
                                                        <div>
                                                            <p style={{fontSize: '13px'}} className="mt-3">{data.name}</p>
                                                            <p style={{fontSize: '10px', color: 'gray'}}>옵션: {data.color} {data.size}</p>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td>
                                                    {data.quantity}
                                                </td>
                                                <td>
                                                    {data.price} 원
                                                </td>
                                                <td>
                                                    {data.price} 원
                                                </td>
                                            </tr>
                                        )
                                    })
                                )
                            }
                        </tbody>
                    </table>
                </div>

                <div className='mb-10'>
                    <div className='table-name mt-10'>할인받기</div>
                    <table className='point-info'>
                        <tbody>
                            <tr>
                                <th>결제 예정금액</th>
                                <td>{paymentAmount} 원</td>
                            </tr>
                            <tr>
                                <th>사용가능 포인트</th>
                                <td>{userPoints}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="payment-info sticky">
                <div className='sticky top-0 bg-slate-100'>     
                    
                    <h3 className='pt-10 mt-8 text-base'>최종 결제금액</h3>
                    <div className="decoration-slate-500">
                        <Divider/>
                    </div>
                    <div>
                        {/* <div className='mx-5'>
                            <div>
                                <div className=''>총 상품금액</div>
                                <div className=''>{paymentAmount}</div>
                            </div>
                            <div>
                                <div className='float-left'>총 상품금액</div>
                                <div className='float-right'>{paymentAmount}</div>
                            </div>
                        </div> */}

                        <ul className='mx-5 mt-2'>
                            {/* <li>
                                <span className='mr-10 text-left'>총 상품금액</span>
                                <span className='ml-10 text-base text-right'>{paymentAmount}</span>
                            </li>
                            <li>
                                <span className='mr-10 text-left'>배송비</span>
                                <span className='ml-16 text-base text-right'>3000</span>
                            </li>
                            <Divider style={{width: '8px'}}/> */}

                            <div style={{marginBottom: '-10px'}}>
                                <div className='inline-block w-44'>
                                    <div className='float-left mr-7'>총 상품금액</div>
                                    <div className='text-base float-right text-right'>
                                        {paymentAmount}
                                        <span className='text-sm ml-1'>원</span>
                                    </div>
                                </div>
                                <div className='inline-block w-44'>
                                    <div className='float-left mr-8'>배송비</div>
                                    <div className='text-base float-right text-right'>
                                        0
                                        <span className='text-sm ml-1'>원</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Divider style={{width: '10px'}}/>
                                <div className='inline-block w-44'>
                                    <div className='float-left mr-8'>총 결재금액</div>
                                    <div className='text-base float-right text-right text-amber-500 font-semibold'>
                                        {paymentAmount}
                                        <span className='text-sm ml-1 font-thin text-black'>원</span>
                                    </div>
                                </div>
                                <div className='inline-block w-44'>
                                    <div className='float-left mr-8 text-xs decoration-slate-200'>적립예정 포인트</div>
                                    <div className='float-right text-right text-xs '>
                                        {earnedAmount} 원
                                        {/* <span className='ml-1'>원</span> */}
                                    </div>
                                </div>
                            </div>


                            {/* <li className='inline-block'>
                                <span className='float-left'>배송비</span>
                                <span className='mr-7 text-base float-right'>3000</span>
                            </li> */}
                        </ul>
                        <div>
                            
                        </div>
                    </div>
                    <button
                        onClick={clickOrderBtn}
                        className="order-btn shadow bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
                        type="submit">
                        주문하기
                    </button>         
                </div>      
            </div>
            

            {
                isSearchAddressModalOpen && (
                    <div>
                        <SearchAddressModal/>
                    </div>
                )
            }

            {
                isCreatedOrder && (
                    <div>
                        <ConfirmOrderModal orderId={createdOrderId} close={handleCreatedOrder} />
                    </div>
                )
            }

        </div>
    )
}

export default Order