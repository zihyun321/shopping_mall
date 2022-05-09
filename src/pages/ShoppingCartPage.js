import React from 'react';
import ShoppingCart from '../components/ShoppingCart';
import {Divider} from 'antd';
// import ShoppingCartData from '../components/ShoppingCartData';

export default function ShoppingCartPage() {
    return(
        <div className='mt-10'>
            <div className='text-3xl'>SHOPPING CART</div>
            <Divider/>
            <div className='ml-20 mr-20'>
                <ShoppingCart/>
            </div>
            {/* <ShoppingCartData/> */}
        </div>
    )
}