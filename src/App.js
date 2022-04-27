import React from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';

import Header from './layouts/Header';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductListPage from './pages/ProductListPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import OrderStatusPage from './pages/OrderStatusPage';
import OrderStatusDetailPage from './pages/OrderStatusDetailPage';
import ProfileMgmtPage from './pages/ProfileMgmtPage';
// TODO 나중에 이런 형식으로 고치기 import { ProductList } from './components/ProductList'

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <Header/>
                <div >
                    {/* <Route exact path='/ProductDetail/:id' component={ProductDetailPage} /> */}
                    <Route
                        exact="exact"
                        path='/ProductDetail/:id'
                        render={({location}) => {
                            return (<ProductDetailPage/>)
                        }}/>
                    <Switch>
                        <Route exact="exact" path="/" component={props => <HomePage {...props}/>}/> 
                        <Route path="/login" component={props => <LoginPage {...props}/>}/>
                        <Route path="/join" component={JoinPage}/>
                        <Route path="/ProductList/:category" component={ProductListPage} />
                        <Route exact="exact" path='/ShoppingCart' component={ShoppingCartPage}/>
                        <Route exact="exact" path='/Order' component={OrderPage}/>
                        <Route path='/OrderStatus' component={OrderStatusPage}/>
                        <Route path='/OrderStatusDetailPage' component={OrderStatusDetailPage}/>
                        <Route path='/ProfileMgmtPage' component={ProfileMgmtPage}/>
                    </Switch>
                </div>
            </div>
        );;
    }
}

export default App;