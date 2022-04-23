import React, {useState, useEffect} from 'react';
import {StarFilled} from '@ant-design/icons';

const CreateReviewModal = (props) => {
    const {close, product} = props;
    console.log('product: ', product);
    const [clickedStar, setClickedStart] = useState([false, false, false, false, false]);
    const clickStar = (index) => {
        console.log('data: ', index);
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
                                <div>
                                    <div className='h3'>리뷰쓰기</div>
                                    <div>
                                        <img class="w-20 h-30" alt={product.imgUrl} src={product.imgUrl}/>
                                        
                                    </div>
                                    <div>
                                        적립 예상 마일리지: {product.price * 0.01}
                                    </div>
                                    <div>
                                        상품은 어떠셨나요? 
                                        {
                                            [0, 1, 2, 3, 4].map((index) => {
                                                return (
                                                    <StarFilled onClick={() => {clickStar(index)}}/>
                                                )    
                                            })
                                        }
                                        {/* <button type="button">
                                            <StarFilled/>
                                        </button> */}
                                    </div>
                                    <div>
                                        <textarea>내용을 적어주세요</textarea>   
                                    </div>
                                </div>
                                {/* <p class="text-sm text-black">선택하신 제품이 쇼핑카트에 추가되었습니다.</p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        class="w-full inline-flex justify-center border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-slate-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">작성하기</button>
                </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateReviewModal