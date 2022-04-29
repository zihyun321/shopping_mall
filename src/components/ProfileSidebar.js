import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../styles/ProfileSidebar.css'

const ProfileSidebar = (props) => {

    // const active = {
    //     marginTop: '1px',
    //     fontWeight: 'bold',
    //     fontSize: '16px',
    // }

    const [selectedTitle, setSelectedTitle] = useState('');
    const handleClickLink = (e) => {
        console.log('e.target.id: ', e.target.id);
        console.log('=== handleClickLink ===');
        // e.preventDefault();
        setSelectedTitle(e.target.id);


        // let allTag = document.querySelectorAll('Link');
        // console.log('allTag: ', allTag);
        // allTag.className = '';

        // let selectedTag =  document.getElementById(e.target.id);
        // selectedTag.className = 'active'
        
    }
  return (
    <div className='w-60'>
        <div className='font-bold text-xl mb-2'>
            나의 쇼핑정보
        </div>
        <ul>
            <li className='mt-1 font-bold text-base'>
                <Link onClick={(e) => handleClickLink(e)} id='주문조회'
                className={selectedTitle === '주문조회' ? 'active' : 'text-black'} 
                to={'/ProfileMgmtPage/OrderStatus'}>주문배송조회</Link>
            </li>
            <li className='mt-1'>
                <Link onClick={(e) => handleClickLink(e)} id='취소내역'
                className={selectedTitle === '취소내역' ? 'active' : 'text-black'} 
                to={'/ProfileMgmtPage/OrderCancel'}>주문취소내역</Link>
            </li>
            <li className='mt-1'>상품 리뷰</li>
        </ul>
        <div className='font-bold text-xl mb-2'>
            내 정보 설정
        </div>
        <ul>
            <li className='mt-1'>회원정보수정</li>
            <li className='mt-1'>포인트 현황</li>
        </ul>
    </div>
  )
}

export default ProfileSidebar