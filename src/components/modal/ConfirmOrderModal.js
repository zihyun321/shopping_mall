import React, {useState, useEffect} from 'react';
import {useHistory, withRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';

const ConfirmOrderModal = (props) => {
    const history = useHistory();
    // var productInfo = props.productInfo;

    const {orderId, close} = props;
    const [userInfo, setUserInfo] = useState({});
    console.log('props orderId: ', orderId);
    const loginStatus = useSelector((state) => state);

    // history.push("/ProfileMgmtPage/OrderStatusDetail/" + orderId);

    useEffect(() => {
        // setUserInfo(loginStatus.currentUser.user);
    }, [])

    const clickCheckOrderBtn = () => {
        console.log('clickCheckCartBtn 버튼 누름');
        history.push({
            pathname: '/ProfileMgmtPage/OrderStatusDetail/' + orderId,
        });
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
                                        <p class="text-sm text-black">주문이 완료되었습니다.</p>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                onClick={clickCheckOrderBtn}
                                class="w-full inline-flex justify-center border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-slate-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">주문내역 확인</button>
                            <button
                                type="button"
                                onClick={close}
                                class="mt-3 w-full inline-flex justify-center border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">닫기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}

export default ConfirmOrderModal