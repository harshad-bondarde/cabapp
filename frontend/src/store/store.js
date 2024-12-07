import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import mapReducer from "./mapSlice"
const store=configureStore({
    reducer:{
        user:userReducer,
        map:mapReducer,
        
    }
})

export default store;
