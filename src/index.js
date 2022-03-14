import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
// import store from "./redux/store";
import { createStore } from 'redux';
import rootReducer from "./redux/reducers";

const user = {};

const initialState = {

}
// reducer: store에 저장할 state와 state를 바꿀 함수를 정의하는 것
function reducer(state = user, action) {
  console.log('=== reducer 함수 실행');
  console.log('user: ', user);
  switch (action.type) {
    case 'LOG_IN':
      console.log('test');
      return {
        ...state, 
      }  
    default:
      return state;
  }
}

let store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </BrowserRouter> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();