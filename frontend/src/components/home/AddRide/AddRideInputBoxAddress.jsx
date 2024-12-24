import { useState } from "react"
import { useGetSuggestions } from "../../mapboxAPI/useGetSuggestions"
import { MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setShowMap ,setMapCoordinates } from "../../../store/mapSlice";

export function AddRideInputBoxAddress({ label , placeholder ,setFinalLocation ,setFinalLocationInfo ,finalLocationInfo , setMapboxId}){
    const dispatch=useDispatch()    
    const [location,setLocation]=useState("")
    const [suggestions,setSuggestions]=useState([])
    const getSuggestions=useGetSuggestions({setSuggestions,setLocation})    
    const handlePinClick=()=>{
        console.log("hi")
        const coordinates=finalLocationInfo.coordinates
        if(!coordinates){
            toast.error("Select a Location !!!")
            return;
        }
        dispatch(setMapCoordinates(coordinates))
        dispatch(setShowMap(true))
    }
    return (
        <>    
            <div className="mb-2">
                
                <div className="flex justify-between text-sm mb-1 mx-2 font-medium items-center">
                    <div>
                        {label}
                    </div>
                    <div className="mt-1 flex items-center text-gray-400 cursor-pointer">
                       View <MapPin size={15} className="ml-1 " onClick={()=>handlePinClick()}/>
                    </div>
                </div>

                <input  type="text" value={location} 
                    placeholder={placeholder ? placeholder : label} 
                    onChange={
                            e=>{
                                setFinalLocationInfo({})
                                if(e.target.value==""){
                                    setLocation("")
                                    setSuggestions([])
                                    return;
                                }
                                getSuggestions(e) 
                                setMapboxId("")
                            } 
                    } 
                                                                                            
                    className={`p-4 border-2 border-slate-300 rounded-lg shadow-lg font-medium hover:shadow-blue-300 transition ease-in-out duration 300ms hover:-translate-y-1 h-12 w-full`}/>

            </div>

            {
               suggestions?.length>0 &&
               <div className='absolute border-2 rounded-xl shadow-md mt-1 bg-gray-100'>
                   {   
                       suggestions?.map((location,key)=>

                           <div 
                               onClick={
                                   ()=>{
                                       setFinalLocation(location.properties.full_address)
                                       setLocation(location.properties.full_address)
                                       setMapboxId(location.properties.mapbox_id)
                                       setFinalLocationInfo({
                                        name_preferred:location.properties.name_preferred,
                                        place_formatted:location.properties.place_formatted,
                                        coordinates:location.properties.coordinates
                                       })
                                       setSuggestions([])
                                   }
                               }
                                                           
                               className="p-2 font-extralight text-sm  rounded hover:bg-gray-300 hover:cursor-pointer " key={key}>
                               
                               <div className='font-normal m-1'>
                                   {location.properties.name}
                               </div>
                               <div className='font-light text-xs ml-1'>
                                   {location.properties.full_address}
                               </div>
                               <hr className='border shadow ' />
                           
                           </div>)
                   }
               </div>         
            }
        </>        
    )
}