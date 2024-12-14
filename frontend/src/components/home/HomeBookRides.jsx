import { useState } from "react"
import { BookRidesInputBox } from "./BookaRide/HomeBookRIdesInputBox"
import axios from "axios"
import { Ride } from "./BookaRide/Ride"
import { EmptyRides } from "../EmptyRides"
import toast from "react-hot-toast"
import {DatePicker} from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs"
import { X } from 'lucide-react';
import EndofList from "../EndofList"
import {LoadingBlue} from "../Loading"
import { url } from "../../assets/url"
export function BookRides(){
    const [finalfrom,setFinalFrom]=useState("")
    const [finalTo,setFinalTo]=useState("")
    const [fromCoordinates,setFromCoordinates]=useState({})
    const [toCoordinates,setToCoordinates]=useState({})
    const [date,setDate]=useState("");
    const [rides,setRides]=useState([])
    // rideid:3,
    // userid:7,
    // fromtime:"9 am",
    // fromlocation:"pune",
    // totime:"6 pm",
    // tolocation:"mumbai",
    // date:"19-10-2024",
    // boolcar:true,
    // vehiclename:"Swift",
    // numberofseats:2,
    // price:1000,
    // numberofseatsavailable:2,
    // facilities:"AC WaterBottle" 
    const [showRides,setShowRides]=useState(false)
    const [loading,setLoading]=useState(false)

    const [value,SetValue]=useState(dayjs())
    const [showDate,setShowDate]=useState(false)
    const [datePlaceholder,setDatePlaceholder]=useState("Date")
    
    function DateComponent(){

        return(
            <div className="">

                <div className="fixed inset-0 z-20 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col items-center pt-60 ">
                    <X className="ml-60 mb-2 cursor-pointer hover:bg-slate-600 hover:w-6 hover:h-6 rounded-full p-1" onClick={()=>{setShowDate(e=>!e)}}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>    
                        <DatePicker
                            value={value}
                            onChange={(e)=>{
                                const date=parseInt(e.$D)+"-"+(e.$M+1)+"-"+(e.$y)
                                setDate(date)
                                setDatePlaceholder(date)
                                SetValue(e)
                            }
                            }
                        />
                    </LocalizationProvider>
                    
                </div>
            </div>    
        )
    }

    return (
        <div className="w-full">  
            <div className="flex justify-center mt-5 text-xl font-medium text-stone-700">
                Find a Ride
            </div>
            <div className="flex space-x-6 justify-center  mt-5 static">    
                
                <BookRidesInputBox searchForAddress={true}  setFinalLocation={setFinalFrom} setCoordinates={setFromCoordinates} coordinates={fromCoordinates} label="From"/>
                <BookRidesInputBox searchForAddress={true}  setFinalLocation={setFinalTo} setCoordinates={setToCoordinates} coordinates={toCoordinates} label="To"/>
                
                <div>    
                    <div onClick={()=>{
                            setShowDate(e=>!e)
                            setShowRides(false)
                        }}>
                        <BookRidesInputBox searchForAddress={false} label={"Date"} placeholder={datePlaceholder}  />
                    </div>    
                    {showDate?<DateComponent/>:null}
                </div>
                
                
                <button className="border-4 p-3 ml-6 mt-6 mb-20 w-20 h-14  bg-blue-500 border-blue-500 hover:shadow-md rounded-xl text-white"
                    onClick={async ()=>{
                            if(finalfrom!="" && finalTo!="" && date!=""){  
                                try{    
                                    setLoading(true)
                                    const response=await axios.post(`${url}/user/rides/AvailableRides`,{
                                        fromCoordinates,
                                        toCoordinates,
                                        date
                                    },{
                                        headers:{
                                            authorization:localStorage.getItem("token")
                                        }
                                    })
                                    console.log(response)
                                    if(response.data.status==403){
                                        //error while connecting to database try after sometime
                                        toast.error(response.message)
                                        console.log(response.message) 
                                    }else{
                                        setRides(response.data.rides)
                                        setShowRides(true)
                                    }
                                }catch(e){
                                    console.log(e)
                                    toast.error("Error while fetching rides")
                                }finally{
                                    setLoading(false)
                                }
                            }else{
                                toast.error("Enter Valid Inputs")
                            }
                    }}
                    >Search</button>
            </div>


            {   
                !loading?            
                
                    <div>  
                        {   showRides ?
                                <div>     
                                    { rides.length>0 ? 
                                        <>
                                            {rides.map((ride,index)=><Ride key={index} ride={ride}/>)} 
                                            <EndofList/>
                                        </>
                                        
                                    :
                                        <EmptyRides/>
                                    }
                                </div>
                            :
                            null
                        }
                    </div>
                :            
                <div className="flex justify-center mt-10 ">
                    <div className="w-20 h-20">
                        <LoadingBlue/>
                    </div>
                </div>
            }
            

            
        </div>
    )
}