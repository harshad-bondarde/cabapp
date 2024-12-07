import React from 'react'
import { useGeocodingCore } from '@mapbox/search-js-react'

export const useGetSuggestions = ({ setSuggestions , setLocation}) => {
    
    const geocodingCore=useGeocodingCore({accessToken:import.meta.env.VITE_MAPBOX_KEY})
    const getSuggestions=async (e)=>{
        setLocation(e.target.value)
        const response=await geocodingCore.forward(e.target.value,{
            limit:5
        })
        setSuggestions(response.features)
        
    }
    return getSuggestions;
}

