import React from 'react'
import MyInfo from '../components/MyInfo';
import {Divider} from 'antd';

const MyPage = () => {
    return (
        <div className='mt-10 '>
            <div className='text-3xl'>MY PAGE</div>
            <Divider/>
            <div>
                <MyInfo/>
            </div>
        </div>
    )
}

export default MyPage