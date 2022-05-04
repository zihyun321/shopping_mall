import React from 'react';
import Order from '../components/Order';
import {Divider} from 'antd';

export default function OrderPage() {
    return(
        <div className='mt-10'>
            <div className='text-3xl'>CHECK OUT</div>
            <Divider/>
            <div className='ml-20'>
                <Order/>
            </div>
        </div>
    )
}