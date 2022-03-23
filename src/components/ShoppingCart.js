import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory, useLocation, withRouter} from 'react-router-dom';

import {Table, Radio, Divider, Tag, Space} from 'antd';

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street'
    }, {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street'
    }
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
    }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    }
];

const columns2 = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id'
    }, {
        title: 'customerId',
        dataIndex: 'customerId',
        key: 'customerId'
    }, {
        title: 'productId',
        dataIndex: 'productId',
        key: 'productId'
    }, {
        title: 'quantity',
        dataIndex: 'quantity',
        key: 'quantity'
    }
];

function ShoppingCart() {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const loginStatus = useSelector((state) => state);
    const hasSelected = selectedRows.length > 0
        ? true
        : false;
    const history = useHistory();
    const [userInfo, setUserInfo] = useState({});
    const [cartList, setCartList] = useState([]);

    const location = useLocation();
    const userId = loginStatus.currentUser.user;
    console.log('location: ', location);
    // console.log('Product: ', location.state.productInfo); const data =
    // location.state.productInfo; console.log('Product data in Shopping Cart: ',
    // data);

    useEffect(() => {
        // setIsUserLogin(loginStatus.currentUser.login);
        setUserInfo(loginStatus.currentUser.user);
        console.log('userInfo: ', userInfo);
        console.log('loginStatus.currentUser.user: ', loginStatus.currentUser.user);
        if (loginStatus.currentUser.user) {
            getCartList().then((data) => {
                if (data) {
                    console.log('성공!!!!! ');

                } else {
                    setCartList(data);
                    console.log('실패!!');
                }
            });
        }

    }, []);

    async function getCartList() {
        const requestOptions = {
            method: "post", //통신방법
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(loginStatus.currentUser.user)
        };

        const response = await fetch(
            'http://localhost:3001/getCartList',
            requestOptions
        );
        const data = await response.json();
        console.log('response: ', response);
        console.log('data: ', data);

        return data

    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {

            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                'selectedRows: ',
                selectedRows
            );
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRows(selectedRows);
            console.log('선택된 수: ', selectedRows.length);
            // setSelectedRowKeys(selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name
        })
    };

    const onSubmit = () => {}

    const handleClickDelete = () => {
        if (!hasSelected) 
            notSelectedItem();
        else {}
    }

    const handleClickOrder = () => {
        if (!hasSelected) 
            notSelectedItem();
        }
    
    const notSelectedItem = () => {
        alert('제품을 선택해주세요.');
    }

    return (
        <div>
            <div>
                Shopping Cart
            </div>

            <div class='mt-5'>

                <Divider/>
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection
                    }}
                    dataSource={dataSource}
                    columns={columns}/>
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection
                    }}
                    dataSource={cartList}
                    columns={columns2}/>

            </div>
            <div>
                총 상품 금액
            </div>
            <div>
                <button
                    class="shadow border hover:bg-slate-200 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4"
                    onClick={handleClickDelete}
                    type="submit">
                    선택 상품 삭제
                </button>
                <button
                    class="shadow ml-3 bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
                    onClick={handleClickOrder}
                    type="submit">
                    선택 상품 주문
                </button>

            </div>
        </div>
    )
}

export default ShoppingCart