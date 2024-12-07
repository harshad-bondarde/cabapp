import { useState } from "react"
import { AddRideInputBoxAddress } from "./AddRide/AddRideInputBoxAddress"
import { AddRideInputBox2 } from "./AddRide/AddRideInputBox2"

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
    const [fromLocationInfo,setFromLocationInfo]=useState({})
    
    const [toTime,setToTime]=useState("")
    const [toLocation,setToLocation]=useState("")
    const [toLocationInfo,setToLocationInfo]=useState({})

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

    console.log(fromLocationInfo)
    console.log(toLocationInfo)
    const validateInputs=()=>{
        let ans=true;
        const regex = /^[A-Za-z]+$/
        if(fromLocation==toLocation){
            setToLocationWarning("Locations Must Be different")
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
    const [datePlaceholder,setDatePlaceholder]=useState("Date")
    function DateComponent(){
        return(
            <div className="">

                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col items-center pt-60">
                    <X className="ml-60 mb-2 cursor-pointer hover:bg-slate-600 hover:w-6 hover:h-6 rounded-full p-1" onClick={()=>{setShowDate(e=>!e)}}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>    
                        <DatePicker
                            value={value}
                            onChange={(e)=>{
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
                            <AddRideInputBoxAddress label="From" searchForAddress={true} setFinalLocation={setFromLocation} setFinalLocationInfo={setFromLocationInfo}/>
                                <Warning label={fromLocationWarning}/>

                            <AddRideInputBox2 value={fromTime} label="Pickup Time" OnChange={(e)=>{setFromTime(e.target.value)}}/>

                            
                            <div className="flex flex-col space-y-3 cursor-pointer">    
                                <div onClick={()=>{
                                        setShowDate(e=>!e)
                                    }}>
                                    <AddRideInputBox2 label={"Date"} placeholder={datePlaceholder}  />
                                </div>    
                                {showDate?<DateComponent/>:null}
                            </div>

                            <AddRideInputBox2 label="Vehicle Name" value={vehicleName}  OnChange={(e)=>{setVehicleName(e.target.value)}}/>
                            <div className="flex justify-center space-x-9 mt-4">
                                <div>
                                    <input className="mr-1" type="radio" name="vehicle" value={boolCar} onClick={()=>{setBoolCar(true)}}/>Car
                                </div>
                                <div>
                                    <input className="mr-1" type="radio" name="vehicle" value={boolCar} onClick={()=>{setBoolCar(false)}}/>Bike
                                </div>
                            </div>
                        </div>
                        <div>
                            <AddRideInputBoxAddress label="To" searchForAddress={true} setFinalLocation={setToLocation} setFinalLocationInfo={setToLocationInfo}/>
                            <Warning label={toLocationWarning}/>
                            
                            <AddRideInputBox2 label="Drop Time" value={toTime}  OnChange={(e)=>{setToTime(e.target.value)}}/>
                            <AddRideInputBox2 label="No of Passengers" value={numberOfSeats}  OnChange={(e)=>{setNumberOfSeats(e.target.value)}}/>
                            <Warning label={numberOfSeatsWarning}/>
                            
                            <AddRideInputBox2 label="Price" value={price}  OnChange={(e)=>{setPrice(e.target.value)}}/>
                            <Warning label={priceWarning}/>
                            
                            <AddRideInputBox2 label="Fascilities" value={facilities} OnChange={(e)=>{setFascilities(e.target.value)}}/>
                        </div>

                        
                    </div>
                    
                    <button className="border w-18 bg-blue-700 text-white p-2 text-center  border-blue-600 rounded-lg h-10 shadow-lg hover:shadow-blue-400 transition ease-in-out"
                       onClick={async ()=>{
                        let valid=validateInputs() ;
                        if(fromLocation==toLocation){
                            valid=false;
                            setFromLocationWarning("Both Locations Must be different")
                        }
                        if(valid){
                            console.log("sent")
                            try{
                                const response=await axios.post("http://localhost:3000/user/rides/addRide",{
                                    fromTime,
                                    fromLocationInfo,
                                    toTime,
                                    toLocationInfo,
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
                                console.log(response)
                                toast.success("Ride Added")
                                console.log("ride added")
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
                                if(e.response && e.response.status==401){
                                    toast.error("You are Not Signed In")
                                    navigate("/cabapp")
                                }else{
                                    toast.error(e.response.data.message)
                                }
                                
                            }
                        }
                       }} >Submit</button>
                </div>
            </div>
            
        </div>
    )
}