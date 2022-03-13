// // store: application 전체의 상태(state)를 관리

// import { createStore } from "redux";
// import rootReducer from "./rootReducer";

// const store = createStore(rootReducer);

// export default store;

// import { createStore, applyMiddleware} from 'redux';
// import {Provider} from 'react-redux';
// import thunk from 'redux-thunk';

// import rootReducer from './reducers/index';

// import {composeWithDevTools} from 'redux-devtools-extension';
// // 
// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk))
// )

// const DataProvider = ({children})=>{
//     return(
//         <Provider store={store}>
//             {children}
//         </Provider>
//     )
// }

// export default DataProvider;