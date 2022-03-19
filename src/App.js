import React from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';

import Header from './layouts/Header';
import Home from './components/Home';
import Login from './components/Login';
import Join from './components/Join';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ShoppingCart from './components/ShoppingCart';

import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductListPage from './pages/ProductListPage';
import ShoppingCartPage from './pages/ShoppingCartPage';

// TODO 나중에 이런 형식으로 고치기 import { ProductList } from './components/ProductList'

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <Header/>
                <div class="mt-10">
                    {/* <Route exact path='/ProductDetail/:id' component={ProductDetailPage} /> */}
                    <Route
                        exact="exact"
                        path='/ProductDetail/:id'
                        render={({location}) => {
                            return (<ProductDetail/>)
                        }}/>
                    <Switch>

                        <Route exact="exact" path="/">
                            <HomePage/>
                        </Route>
                        <Route path="/login">
                            <LoginPage/>
                        </Route>
                        <Route path="/join">
                            <JoinPage/>
                        </Route>
                        <Route exact="exact" path='/ProductList'>
                            <ProductList category="Top"/>
                        </Route>
                        <Route exact="exact" path='/ProductList/Outer'>
                            <ProductList category="Outer"/>
                        </Route>
                        <Route exact="exact" path='/ProductList/Top'>
                            <ProductList category="Top"></ProductList>
                        </Route>
                        <Route exact="exact" path='/ProductList/Bottom'>
                            <ProductList category="Bottom"></ProductList>
                        </Route>
                        <Route exact="exact" path='/ProductList/Shoes'>
                            <ProductList category="Shoes"></ProductList>
                        </Route>
                        <Route exact="exact" path='/ProductList/Bag'>
                            <ProductList category="Bag"></ProductList>
                        </Route>
                        <Route exact="exact" path='/ProductList/Acc'>
                            <ProductList category="Acc"></ProductList>
                        </Route>
                        <Route exact="exact" path='/ShoppingCart'>
                            <ShoppingCartPage/>
                        </Route>
                    </Switch>
                </div>
            </div>
        );;
    }
}

export default App;