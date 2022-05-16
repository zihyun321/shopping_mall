import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {StarFilled} from '@ant-design/icons';
import styled from 'styled-components';
// import { updateUserPoints } from '../../../server/routes/user/ctrl';

const CreateReviewModal = (props) => {
    const {close, orderItem} = props;
    const [clickedStar, setClickedStar] = useState(
        [false, false, false, false, false]
    );
    const [rate, setRate] = useState(0);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const loginStatus = useSelector((state) => state);

    console.log('orderItem: ', orderItem);
    const handleClickStar = (index) => {
        console.log('index: ', index);
        let tempClickedStar = [false, false, false, false, false];
        for (let i = 0; i <= index; i++) {
            tempClickedStar[i] = true;
        }
        setClickedStar(tempClickedStar);
        setRate(index + 1);
        console.log('tempClickedStar: ', tempClickedStar);

        // let clickStates = [...clickedStar]; for (let i = 0; i < 5; i++) {
        // clickStates[i] = i <= index ? true : false; } setClickedStar(clickStates);
    }

    let isActive = false;
    let inputStyle = {
        border: '1px solid black'
    };

    useEffect(() => {}, []);

    // TODO 두가지중 하나라도 안되면 rollback
    const handleSubmitReview = () => {
        handleCreateReview();
        close();
        alert('작성이 완료되었습니다.');
        // TODO customer points 적립 (50점)
    }

    async function handleUpdateUserPoints() {
        // updateUserPoints().then((data) => {        if (data.success) {        } else
        // {}    })
    }

    async function handleCreateReview() {
        createReview().then((data) => {
            if (data.success) {} else {}
        })
    }

    async function createReview() {
        let todayDateTime = new Date();
        let currentDate = getCurrentDate(todayDateTime);
        console.log('currentDate: ', currentDate);
        console.log('new Date: ', new Date(currentDate));

        let reviewInfo = {
            customerId: loginStatus.currentUser.user.id,
            orderItemId: orderItem.id,
            content: content,
            createdDate: currentDate,
            rate: rate
        }
        console.log('reviewInfo: ', reviewInfo);

        const requestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(reviewInfo)
        }

        const response = await fetch(
            'http://localhost:3001/createReview',
            requestOptions
        );
        const data = await response.json();
        return data
    }

    const getCurrentDate = (todayDateTime) => {
        let year = todayDateTime.getFullYear();
        let month = ('0' + (
            todayDateTime.getMonth() + 1
        )).slice(-2);
        let day = ('0' + todayDateTime.getDate()).slice(-2);
        let dateString = year + month + day;
        return dateString
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

                            <div class="">
                                <div class="mt-3 sm:mt-0 sm:ml-4">
                                    <div class="mt-2">
                                        <div>
                                            <div className='h3'></div>
                                            <div className='float-left w-20'>
                                                <img className="w-20 h-30" alt={orderItem.imgUrl} src={orderItem.imgUrl}/>
                                                <div className='text-xs mt-1 text-center'>{orderItem.name}</div>
                                            </div>
                                            <div className='ml-24'>
                                                <div>
                                                    적립 예상 마일리지: 50
                                                </div>
                                                <div className='my-1'>
                                                    상품은 어떠셨나요? {
                                                        [0, 1, 2, 3, 4].map((index) => {
                                                            return (
                                                                <StarFilled style={clickedStar[index]
                                                                        ? {
                                                                            color: '#fcc419'
                                                                        }
                                                                        : {
                                                                            color: 'gray'
                                                                        }}
                                                                    // className={clickedStar[index] && 'yellowStar'}
                                                                    onClick={() => handleClickStar(index)}/>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div>
                                                    <textarea
                                                        value={content}
                                                        placeholder='내용을 입력해주세요.'
                                                        onChange={(e) => setContent(e.currentTarget.value)}
                                                        className='inputStyle w-80 h-28 border focus:outline-none focus:border-solid focus:border-slate-600'></textarea>
                                                </div>
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
                                onClick={() => handleSubmitReview()}
                                class="w-full inline-flex justify-center border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-slate-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">작성하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateReviewModal

const Stars = styled.span `

//   & svg {
//     color: gray;
//     cursor: pointer;
//   }

//   :hover svg {
//     color: #fcc419;
//   }

//   & svg:hover ~ svg {
//     color: gray;
//   }

//   .yellowStar {
//     color: #fcc419;
//   }
`;