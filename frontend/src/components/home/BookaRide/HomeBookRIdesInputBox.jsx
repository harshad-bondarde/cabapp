import { useState } from 'react'
import { useGetSuggestions } from '../../mapboxAPI/useGetSuggestions'
import { MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setShowMap , setMapCoordinates } from '../../../store/mapSlice';
export function BookRidesInputBox({label , placeholder , searchForAddress ,setFinalLocation , coordinates , setCoordinates}){
    
    const [suggestions,setSuggestions]=useState([])
    const [location,setLocation]=useState("")
    const getSuggestions=useGetSuggestions({setSuggestions,setLocation})

    const dispatch=useDispatch()

    const handlePinClick=()=>{
        console.log("hi")
        if(Object.keys(coordinates).length==0){
            toast.error("Select a Location !!!")
            return;
        }
        dispatch(setMapCoordinates(coordinates))
        dispatch(setShowMap(true))
    }
    return (
        
        <div className='w-72 relative z-10'>
            <div className='text-xs mx-2 my-1 font-semibold flex justify-between'>    
                <div className="">
                    {label} :
                </div>
                <div className=''>
                    {searchForAddress ? <div className='flex items-center text-gray-400'> View <MapPin className='cursor-pointer ml-1' onClick={handlePinClick} size={'15'}/> </div>: null}
                </div>
            </div>
            <input
                type="text" value={searchForAddress==true ? location : ''} onChange={e=>{ 
                                                                                    if(e.target.value==""){
                                                                                        setSuggestions([])
                                                                                        setLocation("")
                                                                                        return;
                                                                                    }else{
                                                                                        getSuggestions(e) 
                                                                                    }
                                                                                    setCoordinates({})
                                                                            }} 
                placeholder={placeholder ? placeholder : label} className="border-2 shadow-md w-full rounded-2xl p-2 transition ease-in-out duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer text-gray-900  h-14 "/>
            
            {
                searchForAddress && 
                <div>
                     {
                        suggestions?.length>0 &&
                            <div className='absolute border-2 rounded-xl shadow-md mt-1 bg-gray-100'>
                                {   
                                    suggestions?.map((location,key)=><div
                                        onClick={
                                            ()=>{
                                                console.log(location.properties)
                                                setFinalLocation(location.properties.full_address)
                                                setLocation(location.properties.full_address)
                                                setCoordinates(location.properties.coordinates)
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
                </div>
            }

        </div>
    )
}