import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import '../styles/Table.css'
import Spinner from "./Spinner";

const Review = () => {


    const loginStatus = useSelector((state) => state);
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [reviewList, setReviewList] = useState(['']);

    async function handleGetReviewInfo(userInfo) {
        getReviewInfo(userInfo)
            .then((data) => {
                if (data.success) {
                    console.log('review 정보 가져오기');
                    console.log('data.result: ', data.result);
                    setReviewList(data.result);
                }
            })
            .then(setLoading(false))
    }

    async function getReviewInfo(userInfo) {
        console.log('== review 가져오기 ===');
        console.log('userInfo: ', userInfo);

        const requestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userInfo)
        }
        console.log('requestOptions: ', requestOptions);

        const response = await fetch(
            'http://localhost:3001/getReviewList',
            requestOptions
        );
        const data = await response.json();
        return data
    }

    useEffect(() => {
        setLoading(true);
        setUserInfo(loginStatus.currentUser.user);
        handleGetReviewInfo(loginStatus.currentUser.user);
    }, []);

    return (
        <div className='flex'>
            {
                loading && reviewList.length == 0 ? <Spinner/> : (
                    <div className='container'>
                        <div className='text-2xl font-bold mb-2 float-left'>리뷰내역</div>
                        <br/>
                        <table className='review-info'>
                            <thead>
                                <th>NO</th>
                                <th>주문내역</th>
                                <th>제목</th>
                                <th>내용</th>
                                <th>별점</th>
                            </thead>
                            <tbody>
                                {
                                    reviewList.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.id}</td>
                                                <img class="w-20 h-30" alt={data.imgUrl} src={data.imgUrl}/>
                                                <td>{data.title}</td>
                                                <td>{data.content}</td>
                                                <td>{data.rate}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    )
}

export default Review