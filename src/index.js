import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
// import store from "./redux/store";
import { createStore } from 'redux';
import rootReducer from "./redux/reducers";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react';

const store = createStore(rootReducer);
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();