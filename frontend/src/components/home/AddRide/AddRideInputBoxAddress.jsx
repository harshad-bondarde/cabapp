import { useState } from "react"
import { useGetSuggestions } from "../../mapboxAPI/useGetSuggestions"

export function AddRideInputBoxAddress({ label , placeholder ,setFinalLocation ,setFinalLocationInfo }){
    
    const [location,setLocation]=useState("")
    const [suggestions,setSuggestions]=useState([])
    const getSuggestions=useGetSuggestions({setSuggestions,setLocation})    
    
    return (
        <>    
            <div className="mb-2">
                
                <div className="text-sm mb-1 mx-2">
                    {label}
                </div>

                <input  type="text" value={location} 
                    placeholder={placeholder ? placeholder : label} 
                    onChange={
                            e=>{
                                console.log(e.target.value)
                                setFinalLocationInfo({})
                                if(e.target.value==""){
                                    setLocation("")
                                    setSuggestions([])
                                    return;
                                }
                                getSuggestions(e) 
                            } 
                    } 
                                                                                            
                    className={`p-4 border-2 border-slate-300 rounded-lg shadow-lg hover:shadow-green-500 transition ease-in-out duration 300ms hover:-translate-y-1 h-12 w-72`}/>

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