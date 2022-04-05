import React, {useState} from 'react';
import {useLocation} from "react-router";
import '../styles/Table.css'
import DaumPostcode from 'react-daum-postcode';

const Order = props =>  {
    
    console.log('=== Order ===');

    const location = useLocation();

    const productList = location.state.productList;
    console.log('productList: ', productList);

    const [selectFirstPN, setSelectFirstPN] = useState('1');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const handleSelectFirstPN = (e) => {
        setSelectFirstPN(e.target.value);
    }


    const onComplete = (data) => { console.log(data); }


    return (
        <div>
            <div>
                <div>
                <DaumPostcode onComplete={onComplete}/>

                </div>
                <div>배송지 정보</div>
                <table>
                    <tbody>
                        <tr>
                            <th>받으시는 분</th>
                            <td class=''>
                                <input class='bg-gray-200 focus:bg-white focus:outline-black outline-1'></input>
                            </td>
                        </tr>
                        <tr>
                            <th>휴대폰 번호</th>
                            <td class=''>
                                <select className="ml-1" onChange={handleSelectFirstPN} value={selectFirstPN}>
                                    <option value="1" >010</option>
                                    <option value="2">011</option>
                                    <option value="4">017</option>
                                    <option value="5">018</option>
                                </select>
                                <input class='bg-gray-200 focus:bg-white focus:outline-black outline-1 w-124 ml-1'></input>
                                <input class='bg-gray-200 focus:bg-white focus:outline-black outline-1'></input>
                            </td>
                        </tr>
                        <tr>
                            <th>배송 주소</th>
                            <td class=''>

                                <input class='bg-gray-200 focus:bg-white focus:outline-black outline-1'></input>


                                <input type="text" id="sample4_postcode" placeholder="우편번호"></input>                                
                            </td>
                        </tr>
                        <tr>
                            <th>배송 메세지</th>
                            <td class=''>
                                <input class='bg-gray-200 focus:bg-white focus:outline-black outline-1'></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <div>주문상품</div>
                <table>
                    <thead>
                        <th>상품정보</th>
                        <th>수량</th>
                        <th>가격</th>
                    </thead>
                    <tbody>
                        {
                            productList.map((data) => {
                                return (
                                    <tr key={data.id}>
                                        <tb>
                                            <span>
                                                <img class="w-20 h-30" alt={data.imgUrl} src={data.imgUrl} />
                                                <span>{data.productName}</span>
                                                <span>{data.color}</span>
                                                <span>{data.size}</span>
                                            </span>
                                        </tb>
                                        <tb>
                                            {data.quantity}
                                        </tb>
                                        <tb>
                                            {data.productPrice}
                                        </tb>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div>
                <div>주문상품</div>
                <table>
                    <thead>
                        <th>결제 예정금액</th>
                        <th>포인트</th>
                    </thead>
                    <tbody>
                        <tb></tb>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Order