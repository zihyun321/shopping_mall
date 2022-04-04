import React, {useState, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useHistory, useLocation, withRouter} from 'react-router-dom';

import {Table, Radio, Divider, Tag, Space} from 'antd';
import ReactTable from "react-table";

function ShoppingCart() {

    const history = useHistory();

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const loginStatus = useSelector((state) => state);
    
    const [userInfo, setUserInfo] = useState({});
    const [cartList, setCartList] = useState([]);

    const location = useLocation();
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedAmount, setSelectedAmount] = useState(0);

    console.log('location: ', location);

    const columns = [
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
        console.log('cartList: ', cartList);
        console.log('record: ', record);
        console.log('text: ', text);
        var prodId = record.id;
        return (
            <div class='grid '>
                <div class="box-border h-4 w-4 p-4 border">
                    {record.quantity}
                </div>
                <button 
                class="shadow text-black font-bold w-3"
                type='submit' onClick={()=> clickTochangeQuantity(record, 'plus')}>
                +
                </button>
                <button 
                class="shadow text-black font-bold w-3"
                type='submit' onClick={()=> clickTochangeQuantity(record, 'minus')}>
                -
                </button>
                <button 
                    class="shadow text-black font-bold w-3"
                    onClick={() => submitChangedQuantity(record)}                    
                >
                    변경
                </button>
            </div>        
        )
    }

    /**
     * @param {object} record 
     * @param {string} type 
     * @description +, - 버튼 선택시 제품 수량 증가 및 감소 
     */
    const clickTochangeQuantity = (record, type) => {

        let prodQuan = record.quantity;
        let targetIndex = cartList.findIndex(v => record.id == v.id);

        if (type === 'minus') {
            if (prodQuan != 0) prodQuan --;
        } else prodQuan ++;

        let changedList = cartList[targetIndex];
        changedList.quantity = prodQuan;

        let changedListAll = [...cartList];
        changedListAll[targetIndex] = changedList;

        setCartList(changedListAll);
    }

    /**
     * @param {List<object>} record 
     * @description 제품 수량 변경 버튼 클릭시, DB 장바구니 수량 업데이트
     */
    const submitChangedQuantity = (record) => {

        // 이제 product 업데이트
        let targetIndex = cartList.findIndex(v => record.id == v.id);

        updateCart(cartList[targetIndex]).then((data) => {
            if (data) {
                console.log('성공!!!!! ');
            } else {
                console.log('실패');
            }
        })
    }

    /**
     * @param {List<object>} cartList 
     * @returns json
     */
    async function updateCart(cartList) {
        const requestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(cartList)
        };

        const response = await fetch(
            'http://localhost:3001/updateCart',
            requestOptions
        );
        const data = await response.json();
        return data
    }

    useEffect(() => {
        // setIsUserLogin(loginStatus.currentUser.login);
        setUserInfo(loginStatus.currentUser.user);
        if (loginStatus.currentUser.user) {
            getCartList().then((data) => {
                if (data) {
                    console.log('성공!!!!! ');
                    setCartList(data);
                    calcTotalAmount(cartList);
                } else {
                    console.log('실패!!');
                }
            });
        }

    }, []);

    /**
     * @param {List<object>} cartList 
     * @description cart list에 있는 Product의 총 합계
     */
    function calcTotalAmount(cartList) {
        var total = 0;
        if (cartList) {
            cartList.map((data) => {
                total += data.productPrice;
            })
            console.log('total: ', total);
            setTotalAmount(total);
        }
    }

    /**
     * @returns data
     * @description 로그인 유저의 장바구니 List 가져옴
     */
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
        return data
    }

    /**
     * @returns data
     * @description 장바구니 리스트에서 해당 목록 삭제
     */
    async function deleteCart() {
        const requestOptions = {
            method: "post", //통신방법
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(selectedRowKeys)
        };
        const response = await fetch(
            'http://localhost:3001/deleteCart',
            requestOptions
        );
        const data = await response.json();
        return data
    }

    const rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onSelectAll: (selected, selectedRows, changeRows) => {
          if (selectedRowKeys.length !== 0) {
            setSelectedRowKeys([]);
          }
        },
        
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('--- selectedRowKeys: ', selectedRowKeys);
            console.log('--- selectedRows: ', selectedRows);
            console.log('--- selectedRows.length: ', selectedRows.length);


            setSelectedRowKeys(selectedRowKeys);
            var selected = 0;
            selectedRows.map((data) => {
                selected += data.productPrice;
            })
            setSelectedRows(selectedRows);
            setSelectedAmount(selected);
        }
        
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name
        // })
    };

    /**
     * @description 선택 항목 삭제 버튼 클릭시, 해당 목록 장바구니 리스트에서 제거
     */
    const handleClickDelete = () => {       
        deleteCart().then((data) => {
            if (data) {
                console.log('성공!!!!! ');
            } else {
                console.log('실패!!');
            }
        });
    }

    const handleClickOrder = (type) => {
        console.log('selectedRowKeys: ', selectedRowKeys);
        console.log('selectedRows: ', selectedRows);

        if (type === 'part') {
            console.log('selectedRows.length: ', selectedRows.length);
            if (selectedRows.length === 0) alert('제품을 선택해주세요.');
        }
        else {
            history.push({pathname: '/Order', state: {productList: cartList}});
        }
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
                    dataSource={cartList}
                    columns={columns}
                    rowKey="id"
                    />

            </div>
            <div>
                <div>
                    선택 상품 금액: {selectedAmount}
                </div>
                <div class='ml-1'>
                    총 상품 금액: {totalAmount}
                </div>
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
                    onClick={() => handleClickOrder('part')}
                    type="submit">
                    선택 상품 주문
                </button>
                <button
                    class="shadow ml-3 bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
                    onClick={() => handleClickOrder('all')}
                    type="submit">
                    전체 상품 주문
                </button>

            </div>
        </div>
    )
}

export default ShoppingCart