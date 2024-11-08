import { useState } from "react"
import { AddRideInputBox } from "./AddRide/AddRideInputBox"
import axios from "axios"
import {Warning} from "../warning"

import {DatePicker} from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs"
import { X } from 'lucide-react';
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export function AddRide(){
    const navigate=useNavigate()
    
    const [fromTime,setFromTime]=useState("")
    const [fromLocation,setFromLocation]=useState("")
    const [toTime,setToTime]=useState("")
    const [toLocation,setToLocation]=useState("")
    const [date,setDate]=useState("")
    const [boolCar,setBoolCar]=useState(false)
    const [vehicleName,setVehicleName]=useState("")
    const [numberOfSeats,setNumberOfSeats]=useState(0)
    const [price,setPrice]=useState(0)
    const [facilities,setFascilities]=useState("")

    const [fromLocationWarning,setFromLocationWarning]=useState("")
    const [toLocationWarning,setToLocationWarning]=useState("")
    const [numberOfSeatsWarning,setNumberOfSeatsWarning]=useState("")
    const [priceWarning,setPriceWarning]=useState("")

    const validateInputs=()=>{
        let ans=true;
        const regex = /^[A-Za-z]+$/
        if(!regex.test(fromLocation)){
            setFromLocationWarning("location must contain only characters")
            ans=false;
        }
        if(!regex.test(toLocation)){
            setToLocationWarning("location must contain only characters")
            ans=false;
        }
        
        const numberRegex = /^\d+$/;
        if(!numberRegex.test(numberOfSeats)){
            setNumberOfSeatsWarning("* Must be an Integer")
            ans=false
        }
        if(!numberRegex.test(price)){
            setPriceWarning("* Must be an Integer")
            ans=false
        }
        
        return ans;
        
    }


    const [value,SetValue]=useState(dayjs())
    const [showDate,setShowDate]=useState(false)
    const [dattePlaceholder,setDatePlaceholder]=useState("Date")
    
    function DateComponent(){
        return(
            <div className="">

                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col items-center pt-60">
                    <X className="ml-60 mb-2 cursor-pointer hover:bg-slate-600 hover:w-6 hover:h-6 rounded-full p-1" onClick={()=>{setShowDate(e=>!e)}}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>    
                        <DatePicker
                            value={value}
                            onChange={(e)=>{
                                // (e)=>SetValue(e)
                                const date=e.$D+"-"+(e.$M+1)+"-"+e.$y
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
        <div className="flex justify-center ">

            <div className=" flex flex-col h-screen justify-start">
                
                <div className="m-8 font-semibold text-green-700 rounded-3xl p-2 shadow-lg text-center h-14 text-lg">
                    Become a Captain And Save Costs By Providing Rides To Passengers
                </div>

                <div className="border-2 items-center w-full h-full mb-16 flex flex-col justify-center rounded-xl border-slate-200 shadow-lg bg-slate-200">
                    <div className="flex justify-between mx-16 space-x-24  ">
                        <div>
                            <AddRideInputBox label="From" OnChange={(e)=>{setFromLocation(e.target.value.toLowerCase())}}/>
                                <Warning label={fromLocationWarning}/>

                            <AddRideInputBox label="Pickup Time"  OnChange={(e)=>{setFromTime(e.target.value)}}/>

                            
                            <div className="flex flex-col space-y-3 cursor-pointer">    
                                <div onClick={()=>{
                                        setShowDate(e=>!e)
                                    }}>
                                    <AddRideInputBox label={"Date"} placeholder={dattePlaceholder}  />
                                </div>    
                                {showDate?<DateComponent/>:null}
                            </div>

                            <AddRideInputBox label="Vehicle Name"  OnChange={(e)=>{setVehicleName(e.target.value)}}/>
                            <div className="flex justify-center space-x-9 mt-4">
                                <div>
                                    <input className="mr-1" type="radio" name="vehicle" onClick={()=>{setBoolCar(true)}}/>Car
                                </div>
                                <div>
                                    <input className="mr-1" type="radio" name="vehicle" onClick={()=>{setBoolCar(false)}}/>Bike
                                </div>
                            </div>
                        </div>
                        <div>
                            <AddRideInputBox label="To"  OnChange={(e)=>{setToLocation(e.target.value.toLowerCase())}}/>
                            <Warning label={toLocationWarning}/>
                            
                            <AddRideInputBox label="Drop Time"  OnChange={(e)=>{setToTime(e.target.value)}}/>
                            <AddRideInputBox label="No of Passengers"  OnChange={(e)=>{setNumberOfSeats(e.target.value)}}/>
                            <Warning label={numberOfSeatsWarning}/>
                            
                            <AddRideInputBox label="Price"  OnChange={(e)=>{setPrice(e.target.value)}}/>
                            <Warning label={priceWarning}/>
                            
                            <AddRideInputBox label="Fascilities"  OnChange={(e)=>{setFascilities(e.target.value)}}/>
                        </div>

                        
                    </div>
                    
                    <button className="border w-18 bg-blue-700 text-white p-2 text-center  border-blue-600 rounded-lg h-10 shadow-lg hover:shadow-blue-400 transition ease-in-out"
                       onClick={async ()=>{
                        let valid=validateInputs() ;
                        console.log(valid)
                        if(fromLocation==toLocation){
                            valid=false;
                            setFromLocationWarning("Both Locations Must be different")
                        }
                        if(valid){
                            console.log("sent")
                            try{
                                const response=await axios.post("http://localhost:3000/user/rides/addRide",{
                                    fromTime,
                                    fromLocation,
                                    toTime,
                                    toLocation,
                                    date,
                                    boolCar,
                                    vehicleName,
                                    numberOfSeats,
                                    price,
                                    facilities
                                },{
                                    headers:{
                                        authorization:localStorage.getItem("token")
                                    }
                                })
                                toast.success("Ride Added")
                                
                                setFromTime("")
                                setFromLocation("")
                                setToTime("")
                                setToLocation("")
                                setDate("")
                                setBoolCar(false)
                                setVehicleName("")
                                setNumberOfSeats(0)
                                setPrice(0)
                                setFascilities("")

                            }catch(e){
                                console.log("error while Adding Rides: ",e);
                                if(e.response && e.response.status==403){
                                    toast.error("You are Not Signed In")
                                    navigate("/cabapp")
                                }
                                
                            }
                        }
                       }} >Submit</button>
                </div>
            </div>
            
        </div>
    )
}