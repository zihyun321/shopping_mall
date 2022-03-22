/* eslint-disable */

import React, {useState, useEffect} from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import {useSelector} from 'react-redux';

const Modal = (props) => {
    const history = useHistory();
    // var productInfo = props.productInfo;

    const {productInfo, close, quantity} = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const loginStatus = useSelector((state) => state);

    useEffect(() => {
        setUserInfo(loginStatus.currentUser.user);
    }, [loginStatus])


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        // onClose();
    };

    const clickCheckCartBtn = () => {
        // console.log('clickCheckCartBtn 버튼 누름');

        // user DB에 장바구니 데이터 넣기
        // addProductToCart().then(
        //     (data) => {
        //         if (data.success) {
        //             console.log('성공!!!!! ');
        //             // alert(data.msg);
        //             // window.location.href = '/';                                
        //         } else {
        //             alert(data.msg);
        //         }
        //     } 
        // );

        // 이동
        // history.push({
        //    pathname: '/ShoppingCart',
        //    state: {
        //        productInfo: productInfo
        //    }  
        // });
    }

    // async function addProductToCart() {

    //     const createCartInfo = {
    //         customerId: userInfo.id,
    //         productId: productInfo.id,
    //         quantity: quantity 
    //     }

    //     const requestOptions = {
    //         method: "post", //통신방법
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify(createCartInfo)
    //     };

    //     const response = await fetch('http://localhost:3001/createCart', requestOptions);
    //     const data = await response.json();
    //     console.log('response: ', response);
    //     console.log('data: ', data);

    //     return data
    // }

    return (
        <div>
            <div
                class="fixed z-10 inset-0 overflow-y-auto"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true">
                <div
                    class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    {/* <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    --> */
                    }
                    <div
                        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        aria-hidden="true"></div>

                    {/*  <!-- This element is to trick the browser into centering the modal contents.
 *  --> 
 */
                    }
                    <span
                        class="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true">&#8203;</span>

                    {/* <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    --> */
                    }
                    <div
                        class="relative inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                
                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <div class="mt-2">
                                        <p class="text-sm text-black">선택하신 제품이 쇼핑카트에 추가되었습니다.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                onClick={clickCheckCartBtn}
                                class="w-full inline-flex justify-center border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-slate-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">쇼핑카트 확인</button>
                            <button
                                type="button"
                                onClick={close}
                                class="mt-3 w-full inline-flex justify-center border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">쇼핑 계속하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;