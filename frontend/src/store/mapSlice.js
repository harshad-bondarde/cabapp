import { createSlice } from "@reduxjs/toolkit";

const mapSlice=createSlice({
    name:"map",
    initialState:{
        showMap:false,
        coordinates:{},
    },

    reducers:{
        setShowMap:(state,action)=>{
            state.showMap=action.payload
        },
        setMapCoordinates:(state,action)=>{
            state.coordinates=action.payload
        }
    }
})

export const { setShowMap , setMapCoordinates }=mapSlice.actions
export default mapSlice.reducer