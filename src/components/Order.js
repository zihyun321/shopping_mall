import React, {useState} from 'react';
import {useLocation} from "react-router";

const Order = props =>  {
    
    console.log('=== Order ===');

    const location = useLocation();

    const productList = location.state.productList;
    console.log('productList: ', productList);

    return (
        <div>
            
        </div>
    )
}

export default Order