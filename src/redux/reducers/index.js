import currentUser from "./userReducer";
import {combineReducers} from "redux";
const rootReducer = combineReducers({currentUser});
export default rootReducer;
