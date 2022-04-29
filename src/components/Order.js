import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from "react-router";
import '../styles/Table.css'
import DaumPostcode from 'react-daum-postcode';
import SearchAddressModal from './modal/SearchAddressModal';

const Order = props => {

    console.log('=== Order ===');
    const location = useLocation();
    console.log('location.state: ', location.state);
    const productList = location.state.productList;
    const paymentAmount = location.state.paymentAmount;
    const earnedAmount = paymentAmount * 0.01;

    console.log('productList: ', productList.length);
    console.log('productList: ', productList[0]);

    let productIdList = [];
    productList.map((data) => {
        productIdList.push(data.id);
    })


    console.log('paymentAmount: ', paymentAmount);
    console.log('earnedAmount: ', earnedAmount);

    const loginStatus = useSelector((state) => state);
    const [selectFirstPN, setSelectFirstPN] = useState('1');
    const [isSearchAddressModalOpen, setSearchAddressModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [originProductList, setOriginProductList] = useState([]);


    // 주문자정보
    const [orderer, setOrderer] = useState('');
    const [ordererPhone, setOrdererPhone] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [totalSalesVolume, setTotalSalesVolume] = useState();
    const [userPoints, setUserPoints] = useState(0);

    const handleSelectFirstPN = (e) => {
        setSelectFirstPN(e.target.value);
    }

    const handleOpenSearchModal = () => {
        setSearchAddressModalOpen(!isSearchAddressModalOpen);
    }

    const onComplete = (data) => {
        console.log(data);
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
     */
    const handleOrder = () => {
        console.log('order 클릭');
        let todayDateTime = new Date();
        let currentDate = getCurrentDate(todayDateTime);
        let currentTime = getCurrentTime(todayDateTime);

        const orderId = currentDate + '_' + currentTime;
        console.log('orderId: ', orderId);

        handleCreateOrder(orderId, currentDate);
        handleUpdateProduct();
        handleUpdateUserPoints();
        // deleteCart();
    }

    // 여기다가 async를 또 써도 되는가?
    // handleCreateOrder 실행 성공시, handleCreateOrderItem 처리되도록 해놨는데... 다른 것들도 처리안될시엔 롤백처리 어케하지?
    async function handleCreateOrder(orderId, currentDate) {
        createOrder(orderId, currentDate).then(
            (data) => {
                if (data.success) {
                    console.log('create order 성공');
                    handleCreateOrderItem(orderId);
                } else {
                    console.log('에러');
                }

            }
        )
    }

    async function createOrder(orderId, currentDate) {
        console.log('=== createOrder ===');
        const orderInfo = {
            id: orderId,
            customerId: userInfo.id,
            orderDate: currentDate,
            orderer: orderer,
            ordererPhone: ordererPhone,
            shippingAddress: shippingAddress,
            totalSalePrice: paymentAmount,
            totalSaleQty: productList.length,
            repProdName: productList[0].name,
            repProdImg: productList[0].imgUrl
        }

        const requestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(orderInfo)
        };

        const response = await fetch(
            'http://localhost:3001/createOrder',
            requestOptions
        );
        const data = await response.json();
        return data
    }

    async function handleCreateOrderItem(orderId) {
        createOrderItem(orderId).then(
            (data) => {
                if (data.success) {
                    console.log('create order 성공');

                } else {
                    console.log('에러');
                }

            }
        )
    }

    async function createOrderItem(orderId) {
        let orderItems = [];
        let orderItem;
        productList.map(data => {
            orderItem = {
                customerId: userInfo.id,
                orderId: orderId,
                productId: data.id,
                orderQuantity: data.quantity,
                orderPrice: data.quantity * data.price,
                // deliveryStatus: '배송 준비중',
                orderStatus: '주문완료'
            }
            orderItems.push(orderItem);
        });
        console.log('=== orderItems ===', orderItems);
    
        const requestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(orderItems)
        };

        const response = await fetch(
            'http://localhost:3001/createOrderItem',
            requestOptions
        );
        const data = await response.json();
        return data

    }

    async function handleUpdateProduct() {

        // originProductList => [{id: 6, quantity: 1}, ] (재고정보)
        // productList 비교 =>  [{id: 6, quantity: 1}, ] (주문정보)
        
        console.log('originProductList: ', originProductList);
        console.log('productList: ', productList);

        // 배열 크기가 똑같다는 가정하에 
        let remainQuantity;
        let updateProductsInfo = [];
        let updateProductInfo = {};
        for (let i=0; i<productList.length; i++) {
            remainQuantity = originProductList[i].quantity - productList[i].quantity;
            updateProductInfo = {id: productList[i].id, quantity: remainQuantity};
            updateProductsInfo.push(updateProductInfo);
        }
        console.log('updateProductsInfo: ', updateProductsInfo);

        updateProduct(updateProductsInfo).then(
            (data) => {
                if (data.success) {
                    console.log('update product 성공');

                } else {
                    console.log('에러');
                }

            }
        )
    }
    
    async function updateProduct(updateProductsInfo) {    
        const requestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updateProductsInfo)
        };

        const response = await fetch(
            'http://localhost:3001/updateProduct',
            requestOptions
        );
        const data = await response.json();
        return data
    }

    async function handleUpdateUserPoints() {
        console.log('=== handleUpdateUserPoints ===');
        let updatePoints = userPoints + earnedAmount;
        let updateUserInfo = {
            id: userInfo.id,
            points: updatePoints
        }
        console.log('updateUserInfo: ', updateUserInfo);
        updateUserPoints(updateUserInfo).then(
            (data) => {
                if (data.success) {
                    console.log('update product 성공');

                } else {
                    console.log('에러');
                }

            }
        )
    }
    
    async function updateUserPoints(updateUserInfo) {    
        const requestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updateUserInfo)
        };

        const response = await fetch(
            'http://localhost:3001/updateUserPoints',
            requestOptions
        );
        const data = await response.json();
        return data
    }


    useEffect(() => {
        console.log('=== useEffect ===');
        console.log('loginStatus.currentUser.user: ', loginStatus.currentUser.user);
        setUserInfo(loginStatus.currentUser.user);
        setOrderer(loginStatus.currentUser.user.name);
        setOrdererPhone(loginStatus.currentUser.user.phone);
        setShippingAddress(loginStatus.currentUser.user.address);
        loginStatus.currentUser.user.points !== null ? setUserPoints(loginStatus.currentUser.user.points) : setUserPoints(0);
        handleGetProductStock();    // 기존 product 재고 - 주문한 product 갯수를 뺴주기 위해 해당 화면 렌더링할때 product 불러왔는데 해당 과정이 맞나?..
    }, []);

    
    async function handleGetProductStock() {
        getProductStock().then((data) => {
            if (data.success) {
                console.log('update product 성공');
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
                                    className='focus:bg-white focus:outline-black outline-1'
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
                                    className=' focus:bg-white focus:outline-black outline-1'
                                    value={ordererPhone}
                                    onChange={(e) => setOrdererPhone(e.target.value)}
                                    ></input>
                                </td>
                            </tr>
                            <tr>
                                <th>배송 주소</th>
                                <td className=''>
                                    <button
                                        className="font-semibold border-r border-gray-300 h-full w-20 flex rounded-l focus:outline-none cursor-pointer"
                                        type="button"
                                        onClick={() => {
                                            handleOpenSearchModal()
                                        }}>주소찾기</button>
                                    <input 
                                    className='focus:bg-white focus:outline-black outline-1'
                                    value={shippingAddress}
                                    onClick={(e) => setShippingAddress(e.target.value)}
                                    ></input>
                                    {/* <input type="text" id="sample4_postcode" placeholder="우편번호"></input> */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <div className='table-name'>주문상품</div>
                    <table className='order-info'>
                        <thead>
                            <th>상품정보</th>
                            <th>수량</th>
                            <th>가격</th>
                            <th>총 상품금액</th>
                            {/* <th>배송비</th> */}
                        </thead>
                        <tbody>
                            {
                                productList.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>
                                                <a href={'http://localhost:3000/ProductDetail/' + data.id}>
                                                    <img class="w-20 h-30" alt={data.imgUrl} src={data.imgUrl}/>
                                                    <div>
                                                        <p>{data.name}</p>
                                                        <p>{data.color}</p>
                                                        <p>{data.size}</p>
                                                    </div>
                                                </a>
                                            </td>
                                            <td>
                                                {data.quantity}
                                            </td>
                                            <td>
                                                {data.price}
                                            </td>
                                            <td>
                                                {data.price}
                                            </td>
                                            {/* <td>
                                                3000원
                                            </td> */}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div>
                    <div className='table-name'>할인받기</div>
                    <table className='point-info'>
                        <tbody>
                            <tr>
                                <th>결제 예정금액</th>
                                <td>{paymentAmount}</td>
                            </tr>
                            <tr>
                                <th>포인트</th>
                                <td>{userPoints}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="payment-info">
                <h3>최종 결제금액</h3>
                <button
                    onClick={handleOrder}
                    class="shadow ml-3 bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
                    type="submit">
                    주문하기
                </button>                
            </div>

            {
                isSearchAddressModalOpen && (
                    <div>
                        <SearchAddressModal/>
                    </div>
                )
            }
        </div>
    )
}

export default Order