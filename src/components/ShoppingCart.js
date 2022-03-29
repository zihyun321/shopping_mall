import React, {useState, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useHistory, useLocation, withRouter} from 'react-router-dom';

import {Table, Radio, Divider, Tag, Space} from 'antd';
import ReactTable from "react-table";

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
    const [changedProductInfo, setChangedProductInfo] = useState([]);
    const [prodQuantity, setProdQuantity] = useState();
    const [totalAmount, setTotalAmount] = useState();

    console.log('location: ', location);
    // console.log('Product: ', location.state.productInfo); const data =
    // location.state.productInfo; console.log('Product data in Shopping Cart: ',
    // data);

    const columns2 = [
        {
            title: 'product',
            children: [
                {
                    title: 'productName',
                    dataIndex: 'productName',
                    key: 'productName'
                }, {
                    title: 'imgUrl',
                    dataIndex: 'imgUrl',
                    key: 'imgUrl',
                    width: 60,
    
                    render: imgUrl => <img alt={imgUrl} src={imgUrl} />
                }
            ]
        }, {
            title: 'size',
            dataIndex: 'size',
            key: 'size'
        }, 
        {
            title: 'color',
            dataIndex: 'color',
            key: 'color'
        }, 
        {
            title: 'productPrice',
            dataIndex: 'productPrice',
            key: 'productPrice'
        }, {
            title: 'quantity',
            dataIndex: 'quantity',
            key: 'quantity'
        },
        {
            title: 'Button Test',
            key: 'key',
            dataIndex: 'key',
            render: (text, record) => setProductCount(text, record) }
    ];

    const setProductCount = (text, record) => {
        var prodQuantity = record.quantity;
        return (
            <div class='grid '>
                <div class="box-border h-4 w-4 p-4 border">
                    {prodQuantity}
                </div>
                <button 
                class="shadow text-black font-bold w-3"
                type='submit' onClick={()=> console.log(record.id)}>
                +
                </button>
                <button 
                class="shadow text-black font-bold w-3"
                type='submit' onClick={()=> console.log(record.id)}>
                -
                </button>
            </div>        
        )
    }

    useEffect(() => {
        // setIsUserLogin(loginStatus.currentUser.login);
        setUserInfo(loginStatus.currentUser.user);
        console.log('userInfo: ', userInfo);
        console.log('loginStatus.currentUser.user: ', loginStatus.currentUser.user);
        if (loginStatus.currentUser.user) {
            getCartList().then((data) => {
                if (data) {
                    console.log('성공!!!!! ');
                    setCartList(data);
                    console.log('cartList: ', cartList);
                    setTableData();
                    calcTotalAmount(cartList);
                } else {
                    console.log('실패!!');
                }
            });
        }

    }, []);

    function calcTotalAmount(cartList) {
        console.log('=== calcTotalAmount ===');
        console.log('cartList: ', cartList);
        var total = 0;
        if (cartList) {
            cartList.map((data) => {
                total += data.productPrice;
            })
            setTotalAmount(total);
        }
    }

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

    function setTableData() {
        console.log('=== setTableData ===');

    }

    function onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        
        // selectedRowKeys,
        // onChange: onSelectChange

        // onChange: (selectedRowKeys, selectedRows) => {

        //     console.log(
        //         `selectedRowKeys: ${selectedRowKeys}`,
        //         'selectedRows: ',
        //         selectedRows
        //     );
        //     // setSelectedRowKeys(selectedRowKeys);
        //     // setSelectedRows(selectedRows);
        //     console.log('선택된 수: ', selectedRows.length);
        //     // setSelectedRowKeys(selectedRows);
        // },

        selectedRowKeys: selectedRowKeys,
        onSelectAll: (selected, selectedRows, changeRows) => {
          if (selectedRowKeys.length !== 0) {
            setSelectedRowKeys([]);
          }
        },
        
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('--- selectedRowKeys: ', selectedRowKeys);
            console.log('--- selectedRows: ', selectedRows);

            setSelectedRowKeys(selectedRowKeys);
        }
        
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name
        // })
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
            {/* <div>
                <ReactTable
                    data={cartList}
                    columns={[
                        {
                            Header: "product",
                            columns: [
                                {
                                    Header: "Product Name",
                                    accessor: "productName"
                                }, {
                                    Header: "",
                                    id: "imgUrl",
                                    accessor: d => d.lastName
                                }
                            ]
                        }, {
                            Header: "Info",
                            columns: [
                                {
                                    Header: "Age",
                                    accessor: "age"
                                }, {
                                    Header: "Status",
                                    Cell: (row) => {
                                        return <div><img height={34} src={row.original.ImgPath}/></div>
                                    },
                                    id: "status"
                                }
                            ]
                        }, {
                            Header: 'Stats',
                            columns: [
                                {
                                    Header: "Visits",
                                    accessor: "visits"
                                }
                            ]
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"/>
            </div> */}

            <div class='mt-5'>

                <Divider/>
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection
                    }}
                    dataSource={cartList}
                    columns={columns2}
                    rowKey="id"
                    />

            </div>
            <div>
                총 상품 금액: {totalAmount}
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