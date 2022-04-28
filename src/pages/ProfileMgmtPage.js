import React, {useState, useEffect} from 'react'
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';
import ProfileSidebar from '../components/ProfileSidebar';
import OrderStatus from '../components/OrderStatus';
import OrderPage from './OrderPage';
import {Divider} from 'antd';
import OrderStatusDetail from '../components/OrderStatusDetail';
import OrderCancel from '../components/OrderCancel';

const ProfileMgmtPage = () => {
    const [pageTitle, setPageTitle] = useState('');

    return (
        <div className='mt-10'>
            <div>
            <div className='text-3xl font-bold'>주문배송조회</div>
                <Divider/>
                <div className='flex mx-auto'>
                    <div className='float-left'>
                        <ProfileSidebar/>
                    </div>
                    <div className='float-right'>
                        <Switch>
                            <Route exact="exact" path="/ProfileMgmtPage/OrderStatus" component={props => <OrderStatus {...props}/>}/>
                            <Route path='/ProfileMgmtPage/OrderStatusDetail' component={OrderStatusDetail}/>
                            <Route path='/ProfileMgmtPage/OrderCancel' component={OrderCancel}/>

                            {/* <Route path="/login" component={props => <LoginPage {...props}/>}/>
                            <Route path="/join" component={JoinPage}/>
                            <Route path="/ProductList/:category" component={ProductListPage} />
                            <Route exact="exact" path='/ShoppingCart' component={ShoppingCartPage}/>
                            <Route exact="exact" path='/Order' component={OrderPage}/>
                            <Route path='/OrderStatus' component={OrderStatusPage}/>
                            <Route path='/OrderStatusDetailPage' component={OrderStatusDetailPage}/> */}
                        </Switch> 
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProfileMgmtPage