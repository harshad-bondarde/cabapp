import { useState } from "react"
import { BookRIdesInputBox } from "./BookaRide/HomeBookRIdesInputBox"
import axios from "axios"
import { Ride } from "./BookaRide/Ride"
import { EmptyRides } from "./BookaRide/EmptyRides"

import {DatePicker} from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs"
import { X } from 'lucide-react';

export function BookRides(){
    const [from,setFrom]=useState("");
    const [to,setTo]=useState("");
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

    const [value,SetValue]=useState(dayjs())
    const [showDate,setShowDate]=useState(false)
    const [dattePlaceholder,setDatePlaceholder]=useState("Date")

    function DateComponent(){

        return(
            <div className="">

                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col items-center pt-60 ">
                    <X className="ml-60 mb-2 cursor-pointer hover:bg-slate-600 hover:w-6 hover:h-6 rounded-full p-1" onClick={()=>{setShowDate(e=>!e)}}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>    
                        <DatePicker
                            value={value}
                            onChange={(e)=>{
                                SetValue(e)
                                const date=parseInt(e.$D)+"-"+(e.$M+1)+"-"+(e.$y)
                                setDate(date)
                                setDatePlaceholder(date)
                            }
                            }
                        />
                    </LocalizationProvider>
                    
                </div>
            </div>    
        )
    }

    return (
        <>  <div className="flex justify-center mt-5 text-xl font-medium text-stone-700">
                Find a Ride
            </div>
            <div className="flex space-x-6 justify-center  mt-5 ">    
                
                <BookRIdesInputBox label="From" OnChange={e=>{
                                                            setFrom(e.target.value)
                                                            setShowRides(false)
                                                        }}/>
                <BookRIdesInputBox label="To" OnChange={e=>{
                                                            setTo(e.target.value)
                                                            setShowRides(false)
                                                        }}/>
                
                <div>    
                    <div onClick={()=>{
                            setShowDate(e=>!e)
                            setShowRides(false)
                        }}>
                        <BookRIdesInputBox label={"Date"} placeholder={dattePlaceholder}  />
                    </div>    
                    {showDate?<DateComponent/>:null}
                </div>
                
                
                <button className="border-4 p-3 ml-6 mt-6 mb-20  bg-blue-500 border-blue-500 hover:shadow-md rounded-xl text-white"
                    onClick={async ()=>{
                            if(from!="" && to!="" && date!=""){    
                                const response=await axios.post("http://localhost:3000/user/rides/AvailableRides",{
                                    from ,
                                    to,
                                    date
                                })
                                console.log(response)
                                if(response.data.status==403){
                                    //error while connecting to database try after sometime
                                    console.log("error while connecting to database try after sometime") 
                                }else{
                                    if(response.data.rides.length==0){
                                        //no rides available for given slot 
                                        console.log("no rides available for given slot")
                                    }
                                    
                                    setRides(response.data.rides)
                                    setShowRides(true)
                                }
                            }
                    }}
                    >Search</button>
            </div>

            {   showRides?            
                
                <div>   
                         
                            { rides.length>0 ? rides.map((ride,index)=><Ride key={index} ride={ride}/>) :<EmptyRides/>}
                        
                </div>
                :            
                null
            }

            
        </>
    )
}