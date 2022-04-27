import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/ProfileSidebar.css'

const ProfileSidebar = (props) => {

    const active = {
        marginTop: '1px',
        fontWeight: 'bold',
        fontSize: '16px',
    }
  return (
    <div className='w-60'>
        <div className='font-bold text-xl mb-2'>
            나의 쇼핑정보
        </div>
        <ul>
            <li className='mt-1 font-bold text-base'>
                <Link className='no-underline' to={'/ProfileMgmtPage/OrderStatus'}>주문배송조회</Link>
            </li>
            <li className='mt-1'>취소 내역</li>
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