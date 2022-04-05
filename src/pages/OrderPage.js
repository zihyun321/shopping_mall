import React from 'react';
import Order from '../components/Order';
import {Divider} from 'antd';

export default function JoinPage() {
    return(
        <div>
            <div>Check Out</div>
            <Divider/>
            <Order/>
        </div>
    )
}