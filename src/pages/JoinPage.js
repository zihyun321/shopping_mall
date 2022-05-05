import React from 'react';
import Join from '../components/Join';
import {Divider} from 'antd';

export default function JoinPage() {
    return(
        <div className='mt-10 '>
            <div className='text-3xl'>SIGN UP</div>
            <Divider/>
            <div>
                <Join/>
            </div>
        </div>
    )
}