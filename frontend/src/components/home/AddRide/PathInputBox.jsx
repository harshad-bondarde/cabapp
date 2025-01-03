import React, { useState } from 'react'
import { useGetSuggestions } from '../../mapboxAPI/useGetSuggestions'
import { MapPin , Minus} from 'lucide-react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setShowMap , setMapCoordinates, setPathCoordinates } from '../../../store/mapSlice';

const PathInputBox = ({path , setPath}) => {
    const dispatch=useDispatch()
    const [location,setLocation]=useState("")
    const [suggestions,setSuggestions]=useState([])
    const [finalLocationInfo,setFinalLocationInfo]=useState({})
    const getSuggestions=useGetSuggestions({setSuggestions,setLocation})    
    
    return (
        <div className='mt-4 mb-4 flex flex-col gap-2 items-center'>
            <div className='text-slate-500 italic text-base '>
                Add destinations along your planned route
            </div>
            <div className='flex items-center gap-3'>
                <div className=''>
                    <input  type="text" value={location} 
                            placeholder="Enter Location ..." 
                            onChange={
                                    e=>{
                                        if(e.target.value==""){
                                            setLocation("")
                                            setSuggestions([])
                                            return;
                                        }
                                        getSuggestions(e) 
                                    } 
                            } 
                                                                                                    
                            className={`p-4 border-2 border-slate-300 rounded-lg shadow-lg font-medium hover:shadow-blue-300 transition ease-in-out duration 300ms hover:-translate-y-1 h-12 w-72`}/>
                </div>
                {
                    suggestions?.length>0 &&
                    <div className='absolute bottom-1 border-2 rounded-xl shadow-md mt-1 bg-gray-100'>
                        {   
                            suggestions?.map((location,key)=>
    
                                <div 
                                    onClick={
                                        ()=>{
                                            setLocation(location.properties.full_address)
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

                <button
                    onClick={()=>{
                        if(Object.keys(finalLocationInfo).length==0){
                            toast.error("Please select a location")
                            return 
                        }
                        setPath(e=>[...e,finalLocationInfo])
                        setFinalLocationInfo({})
                        setLocation("")
                    }} 
                className='border cursor-pointer w-20 h-10 bg-blue-500 text-white p-2 text-center border-blue-500 rounded-lg shadow-lg  transition ease-in-out'>
                    Add
                </button>
            </div>
            {
                path.length>0 && path.map((location,key)=>{
                    return <div key={key} className='p-2 font-extralight text-sm bg-slate-300  rounded w-96 '>
                                <div className='flex justify-between italic'>    
                                    <div>
                                        <div className='font-normal m-1'>
                                                {location.name_preferred}
                                        </div>
                                        <div className='font-light text-xs ml-1'>
                                            {location.place_formatted}
                                        </div>
                                    </div>
                                    <div className='flex gap-4 mr-3 items-center text-slate-600'>
                                        <Minus onClick={()=>{ setPath(e=>e.filter((e,i)=>i!=key)) }}  size={18} className='bg-red-300 rounded-full cursor-pointer'/>
                                        <MapPin onClick={async()=>{
                                            await dispatch(setMapCoordinates(location.coordinates))
                                            dispatch(setShowMap(true))
                                        }} size={18} className='cursor-pointer'/>
                                    </div>
                                </div>
                                <hr className='border shadow ' />
                            </div>
                })
            }

            {   path.length>0 && 
                <div onClick={async()=>{
                    await dispatch(setPathCoordinates(path))
                    dispatch(setShowMap(true))
                }} className='border cursor-pointer w-full bg-blue-500 text-white p-2 text-center border-blue-500 rounded-lg shadow-lg hover:bg-blue-700 transition ease-in-out'>
                    View Path
                </div>
            }
        </div>                
  )
}

export default PathInputBox
