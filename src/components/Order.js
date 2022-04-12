import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from "react-router";
import '../styles/Table.css'
import DaumPostcode from 'react-daum-postcode';
import SearchAddressModal from './modal/SearchAddressModal';

const Order = props => {

    console.log('=== Order ===');
    const location = useLocation();

    const productList = location.state.productList;
    const paymentAmount = location.state.paymentAmount;
    const earnedAmount = paymentAmount * 0.01;

    console.log('productList: ', productList);
    console.log('paymentAmount: ', paymentAmount);
    console.log('earnedAmount: ', earnedAmount);

    const loginStatus = useSelector((state) => state);
    const [selectFirstPN, setSelectFirstPN] = useState('1');
    const [isSearchAddressModalOpen, setSearchAddressModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);

    // 주문자정보
    const [ordererName, setOrdererName] = useState('');
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

    /**
     * 주문시
     * 1) order 레코드 생성 (고객id, 제품id, 주문자정보)
     * 2) 고객 레코드 업데이트 (고객 보유 포인트)
     * 3) 제품 재고 및 판매수 업데이트 (제품 재고 차감)
     */
    const handleOrder = () => {
        console.log('order 클릭');
        let todayDateTime = new Date();
        let currentDate = getCurrentDate(todayDateTime);
        let currentTime = getCurrentTime(todayDateTime);

        const orderId = currentDate + '_' + currentTime + '_' + loginStatus.currentUser.user.name;
        console.log('orderId: ', orderId);

        createOrder(orderId, currentDate);
        createOrderItem(orderId);
        updateProduct();
        updateUser();
    }

    const getCurrentDate = (todayDateTime) => {
        let year = todayDateTime.getFullYear();
        let month = ('0' + (todayDateTime.getMonth() + 1)).slice(-2);
        let day = ('0' + todayDateTime.getDate()).slice(-2);
        let dateString = year + '-' + month  + '-' + day;
        return dateString
    }

    const getCurrentTime = (todayDateTime) => {
        let hours = ('0' + todayDateTime.getHours()).slice(-2); 
        let minutes = ('0' + todayDateTime.getMinutes()).slice(-2);
        let seconds = ('0' + todayDateTime.getSeconds()).slice(-2); 
        let timeString = hours + ':' + minutes  + ':' + seconds;
        return timeString
    }

    async function createOrder(orderId, currentDate) {
        console.log('=== createOrder ===');
        const orderInfo = {
            id: orderId,
            customerId: userInfo.id,
            orderDate: currentDate,
            ordererName: ordererName,
            ordererPhone: ordererPhone,
            shippingAddress: shippingAddress
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

    async function createOrderItem(orderId) {

    }
    
    async function updateProduct() {

    }

    async function updateUser() {

    }

    useEffect(() => {
        console.log('=== useEffect ===');
        console.log('loginStatus.currentUser.user: ', loginStatus.currentUser.user);
        setUserInfo(loginStatus.currentUser.user);
        setOrdererName(loginStatus.currentUser.user.name);
        setOrdererPhone(loginStatus.currentUser.user.phone);
        setShippingAddress(loginStatus.currentUser.user.address);
        loginStatus.currentUser.user.points !== null ? setUserPoints(loginStatus.currentUser.user.points) : setUserPoints(0);
    }, []);

    

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
                                    value={ordererName}
                                    onChange = {(e) => setOrdererName(e.target.value)}
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
                                                        <p>{data.productName}</p>
                                                        <p>{data.color}</p>
                                                        <p>{data.size}</p>
                                                    </div>
                                                </a>
                                            </td>
                                            <td>
                                                {data.quantity}
                                            </td>
                                            <td>
                                                {data.productPrice}
                                            </td>
                                            <td>
                                                {data.productPrice}
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