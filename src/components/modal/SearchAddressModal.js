/* eslint-disable */

import React, {useState, useEffect} from 'react';
import {useHistory, withRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';
import DaumPostcode from 'react-daum-postcode';

const SearchAddressModal = (props) => {
    const history = useHistory();
    // var productInfo = props.productInfo;

    const {productInfo, close, quantity} = props;
    const [userInfo, setUserInfo] = useState({});

    const loginStatus = useSelector((state) => state);

    useEffect(() => {
        setUserInfo(loginStatus.currentUser.user);
    }, [loginStatus])

    const clickCheckCartBtn = () => {
        console.log('clickCheckCartBtn 버튼 누름');

        history.push({
            pathname: '/ShoppingCart',
            state: {
                productInfo: productInfo
            }
        });
    }

    const onComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (
                    extraAddress !== ''
                        ? `, ${data.buildingName}`
                        : data.buildingName
                );
            }
            fullAddress += (
                extraAddress !== ''
                    ? ` (${extraAddress})`
                    : ''
            );
        }

        console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    }

    return (
        <div>
            <div
                class="fixed z-10 inset-0 overflow-y-auto"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true">
                <div
                    class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                        onClick={close}
                        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        aria-hidden="true"></div>
                    <span
                        class="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true">&#8203;</span>
                    <div
                        class="relative inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                            <div class="sm:flex sm:items-start">
                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <div class="mt-2">
                                        <DaumPostcode onComplete={onComplete} {...props}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchAddressModal;