import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import '../styles/Table.css'

const OrderStatusDetail = (props) => {
  return (
    <div>
        <div className='container'>
        <table className='order-info'>
                    <thead>
                        <th>주문일</th>
                        <th>주문번호</th>
                        <th>상품정보</th>
                        <th>수량</th>
                        <th>상품금액</th>
                        <th>진행상황</th>
                        <th>상품평</th>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
        </div>
    </div>
  )
}

export default OrderStatusDetail