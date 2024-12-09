import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        authUser:null,
        showCaptainInfo:null
    },

    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser=action.payload
        },
        setShowCaptainInfo:(state,action)=>{
            state.showCaptainInfo=action.payload
        }
    }
})

export const { setAuthUser ,setShowCaptainInfo } =userSlice.actions
export default userSlice.reducer