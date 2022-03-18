import React from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Join from './components/Join';
import ProductList from './components/ProductList';
import ProductDetailPage from './components/ProductDetailPage';
import ShoppingCart from './components/ShoppingCart';

// TODO 나중에 이런 형식으로 고치기 import { ProductList } from './components/ProductList'

class App extends React.Component {

    // constructor(props) {     super(props);     this.state = {         username:
    // null     }; } componentDidMount() {     fetch('http://localhost:3001/api')
    // .then(res => res.json())         .then(data => this.setState({username:
    // data.username})); }

    render() {
        // const {username} = this.state;
        return (

            <div className="App">
                <Header/>
                <div class="mt-10">
                    {/* <Route exact path='/ProductDetail/:id' component={ProductDetailPage} /> */}
                    <Route
                        exact="exact"
                        path='/ProductDetail/:id'
                        render={({location}) => {
                            return (<ProductDetailPage/>)
                        }}/>
                    <Switch>

                        <Route exact="exact" path="/">
                            <Home/>
                        </Route>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/join">
                            <Join/>
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
                            <ShoppingCart/>
                        </Route>
                    </Switch>
                </div>
            </div>
        );;
    }
}

export default App;