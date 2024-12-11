import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        authUser:null,
        showCaptainInfo:null,
        passengerDetails:[]
    },

    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser=action.payload
        },
        setShowCaptainInfo:(state,action)=>{
            state.showCaptainInfo=action.payload
        },
        setPassengerDetails:(state,action)=>{
            state.passengerDetails=action.payload
        }
    }
})

export const { setAuthUser ,setShowCaptainInfo , setPassengerDetails } =userSlice.actions
export default userSlice.reducer