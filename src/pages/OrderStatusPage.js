import React from 'react'
import OrderStatus from '../components/OrderStatus';
import {Divider} from 'antd';
import Order from '../components/Order';
import ProfileSidebar from '../components/ProfileSidebar';

const OrderStatusPage = () => {
  return (
    // <div><OrderStatus/></div>
    <div className='mt-10'>
        <div className='text-3xl font-bold'>주문배송조회</div>
        <Divider/>
        <div className='flex mx-auto'>
          <div className='float-left'>
            <ProfileSidebar/>
          </div>
          <div className='float-right'>
            <OrderStatus/>
          </div>
        </div>
    </div>

  )
}

export default OrderStatusPage