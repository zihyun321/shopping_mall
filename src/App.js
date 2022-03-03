import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Link, Route, Switch} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Join from './components/Join';
import ProductList from './components/ProductList';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null
        };
    }

    componentDidMount() {
        fetch('http://localhost:3001/api')
            .then(res => res.json())
            .then(data => this.setState({username: data.username}));
    }

    render() {
        const {username} = this.state;
        return (

            <div className="App">
                <BrowserRouter>
                    <Header/>
                    <div class="mt-10">
                        <Route exact="exact" path="/">
                            <Home/>
                        </Route>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/join">
                            <Join/>
                        </Route>
                        <Route path='/ProductList'>
                          <ProductList/>
                        </Route>
                    </div>

                    {/* <Route path='/어쩌구' component={Modal}></Route> */}
                </BrowserRouter>
                {/* <p>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </p> */
                }

                {/* <header className="App-header">
            ========== 테스트
            {username ? `Hello ${username}` : 'Hello World'}
          </header>
          <h1 className="text-3xl font-bold underline">
            Hello world!
          </h1>
          <div class="w-72 bg-white shadow rounded">
            w-72
          </div>
          <h1 className="text-3xl font-bold underline">
            Hello world!
          </h1>
          <div class="chat-notification-content">
            <h4 class="chat-notification-title">ChitChat</h4>
            <p class="chat-notification-message">You have a new message!</p>
          </div> */
                }
            </div>
        );;
    }
}

export default App;