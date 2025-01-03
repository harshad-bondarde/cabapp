import { createSlice } from "@reduxjs/toolkit";

const mapSlice=createSlice({
    name:"map",
    initialState:{
        showMap:false,
        coordinates:{},
        pathCoordinates:[]
    },

    reducers:{
        setShowMap:(state,action)=>{
            state.showMap=action.payload
        },
        setMapCoordinates:(state,action)=>{
            state.coordinates=action.payload
        },
        setPathCoordinates:(state,action)=>{
            state.pathCoordinates=action.payload
        }
    }
})

export const { setShowMap , setMapCoordinates , setPathCoordinates}=mapSlice.actions
export default mapSlice.reducer