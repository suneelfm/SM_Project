import { createStore, combineReducers, applyMiddleware} from "redux";
import { signInReducer } from "../Reducers/signInReducer";
import thunk from "redux-thunk"

export const store = createStore(combineReducers({signInReducer}), applyMiddleware(thunk));

