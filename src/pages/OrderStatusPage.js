import React from 'react'
import OrderStatus from '../components/OrderStatus';
import {Divider} from 'antd';
import Order from '../components/Order';


const OrderStatusPage = () => {
  return (
    // <div><OrderStatus/></div>
    <div className='mt-10'>
        <div className='text-3xl'>Order Status</div>
        <Divider/>
        <OrderStatus/>
    </div>

  )
}

export default OrderStatusPage