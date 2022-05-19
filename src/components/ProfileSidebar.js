import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router";
import '../styles/ProfileSidebar.css'

const ProfileSidebar = props => {

    // const active = {
    //     marginTop: '1px',
    //     fontWeight: 'bold',
    //     fontSize: '16px',
    // }
    console.log('=== props: ', props);    
    console.log('props.selectedTitle: ', props.selectedTitle);
    console.log('!!props.selectedTitle: ', !!props.selectedTitle);
    
    const [selectedTitle, setSelectedTitle] = useState('');

    // if (!!props.selectedTitle) setSelectedTitle(props.selectedTitle);

    const handleClickLink = (e) => {
        console.log('=== handleClickLink ===');
        console.log('e.target.id: ', e.target.id);
        // e.preventDefault();
        setSelectedTitle(e.target.id);

        // getElementById로 css 지정하는법 알기
        // let selectedTag =  document.getElementById(e.target.id);
        // selectedTag.className = 'active'
        
    }

    useEffect(() => {
        // 다른 카테고리 선택시 한번에 선택이 안됨
        console.log('=== useEffect ===');
        setSelectedTitle(props.selectedTitle);

    }, []);

  return (
    <div className='w-60'>
        <div className='font-bold text-xl mb-2'>
            나의 쇼핑정보
        </div>
        <ul>
            <li className='mt-1'>
                <Link onClick={(e) => handleClickLink(e)} id='주문조회'
                className={selectedTitle === '주문조회' ? 'active' : 'text-black'} 
                to={'/ProfileMgmtPage/OrderStatus'}>주문배송조회</Link>
            </li>
            <li className='mt-1'>
                <Link onClick={(e) => handleClickLink(e)} id='취소내역'
                className={selectedTitle === '취소내역' ? 'active' : 'text-black'} 
                to={'/ProfileMgmtPage/OrderCancel'}>주문취소내역</Link>
            </li>
            <li className='mt-1'>
                <Link onClick={(e) => handleClickLink(e)} id='상품리뷰'
                className={selectedTitle === '상품리뷰' ? 'active' : 'text-black'} 
                to={'/ProfileMgmtPage/Review'}>상품리뷰내역</Link>
            </li>
        </ul>
        <div className='font-bold text-xl mb-2'>
            내 정보 설정
        </div>
        <ul>
            <li className='mt-1'>
                <Link onClick={(e) => handleClickLink(e)} id='회원정보'
                className={selectedTitle === '회원정보' ? 'active' : 'text-black'} 
                to={'/ProfileMgmtPage/MyInfo'}>회원정보수정</Link>                
            </li>
            {/* <li className='mt-1'>포인트 현황</li> */}
        </ul>
    </div>
  )
}

export default ProfileSidebar