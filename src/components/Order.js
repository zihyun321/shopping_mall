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
    console.log('productList: ', productList);

    const loginStatus = useSelector((state) => state);
    const [selectFirstPN, setSelectFirstPN] = useState('1');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [isSearchAddressModalOpen, setSearchAddressModalOpen] = useState(false);
    const [loginInfo, setLoginInfo] = useState({});
    const [userInfo, setUserInfo] = useState({});

    const handleSelectFirstPN = (e) => {
        setSelectFirstPN(e.target.value);
    }

    const handleOpenSearchModal = () => {
        setSearchAddressModalOpen(!isSearchAddressModalOpen);
    }

    const onComplete = (data) => {
        console.log(data);
    }

    useEffect(() => {
        setLoginInfo(loginStatus.currentUser.user);
        if (loginStatus.currentUser.user) {
            getUserInfo(loginInfo).then((data) => {
                if (data) {
                    console.log('성공!!!!! ');
                    console.log('data: ', data);
                    setUserInfo(data);
                    console.log('userInfo: ', userInfo);
                } else {
                    console.log('실패!!');
                }
            })
        }
    }, []);

    async function getUserInfo(loginInfo) {
        console.log('=== getUserInfo ===');
        console.log('loginInfo: ', loginInfo);
        const requestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(loginInfo)
        }

        const response = await fetch (
            'http://localhost:3001/getUserInfo',
            requestOptions
        );
        const data = await response.json();
        return data
    }

    return (
        <div>
            <div>

                <div className='cart-info'>
                    <div>배송지 정보</div>
                    <table className='shipping-info'>
                        <tbody>
                            <tr>
                                <th>받으시는 분</th>
                                <td class=''>
                                    <input class=' focus:bg-white focus:outline-black outline-1'></input>
                                </td>
                            </tr>
                            <tr>
                                <th>휴대폰 번호</th>
                                <td class=''>
                                    <select className="ml-1" onChange={handleSelectFirstPN} value={selectFirstPN}>
                                        <option value="1">010</option>
                                        <option value="2">011</option>
                                        <option value="4">017</option>
                                        <option value="5">018</option>
                                    </select>
                                    <input class=' focus:bg-white focus:outline-black outline-1 w-124 ml-1'></input>
                                    <input class=' focus:bg-white focus:outline-black outline-1'></input>
                                </td>
                            </tr>
                            <tr>
                                <th>배송 주소</th>
                                <td class=''>
                                    <button
                                        class="font-semibold border-r border-gray-300 h-full w-20 flex rounded-l focus:outline-none cursor-pointer"
                                        type="button"
                                        onClick={() => {
                                            handleOpenSearchModal()
                                        }}>주소찾기</button>
                                    <input class=' focus:bg-white focus:outline-black outline-1'></input>

                                    <input type="text" id="sample4_postcode" placeholder="우편번호"></input>
                                </td>
                            </tr>
                            <tr>
                                <th>배송 메세지</th>
                                <td class=''>
                                    <input class='focus:bg-white focus:outline-black outline-1'></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <div>주문상품</div>
                    <table className='order-info'>
                        <thead>
                            <th>상품정보</th>
                            <th>수량</th>
                            <th>가격</th>
                            <th>총 상품금액</th>
                            <th>배송비</th>
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
                                            <td>
                                                3000원
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div>
                    <div>할인받기</div>
                    <table className='point-info'>
                        <tbody>
                            <tr>
                                <th>결제 예정금액</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>포인트</th>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="payment-info">
                <h3>최종 결제금액</h3>
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