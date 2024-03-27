import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UserDetailReducer } from "./Reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const rootreducer=combineReducers({userreducer:UserDetailReducer})
const userstore=configureStore({reducer:rootreducer,middleware:[thunk,logger]})
export default userstore;