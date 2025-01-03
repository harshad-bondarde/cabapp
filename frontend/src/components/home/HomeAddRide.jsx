import { useState } from "react"
import { AddRideInputBoxAddress } from "./AddRide/AddRideInputBoxAddress"
import { AddRideInputBox2 } from "./AddRide/AddRideInputBox2"
import {Warning} from "../warning"
import {LoadingBlue} from "../Loading"
import { url } from "../../assets/url"

import axios from "axios"
import {DatePicker} from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs"
import { X } from 'lucide-react';
import toast from "react-hot-toast"
import { parsePath, useNavigate, useSubmit } from "react-router-dom"
import PathInputBox from "./AddRide/PathInputBox"

export function AddRide(){
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    
    const [fromTime,setFromTime]=useState("")
    const [fromLocation,setFromLocation]=useState("")
    const [fromLocationInfo,setFromLocationInfo]=useState({})
    const [boardingPoint,setBoardingPoint]=useState("")
    const [fromMapboxId,setFromMapboxId]=useState("")
    
    const [toTime,setToTime]=useState("")
    const [toLocation,setToLocation]=useState("")
    const [toLocationInfo,setToLocationInfo]=useState({})
    const [droppingPoint,setDroppingPoint]=useState("")
    const [toMapboxId,setToMapboxId]=useState("")

    const [date,setDate]=useState("")
    const [boolCar,setBoolCar]=useState(false)
    const [vehicleName,setVehicleName]=useState("")
    const [numberOfSeats,setNumberOfSeats]=useState(0)
    const [price,setPrice]=useState(0)
    const [facilities,setFacilities]=useState("")
    const [path,setPath]=useState([])

    const [fromLocationWarning,setFromLocationWarning]=useState("")
    const [toLocationWarning,setToLocationWarning]=useState("")
    const [numberOfSeatsWarning,setNumberOfSeatsWarning]=useState("")
    const [priceWarning,setPriceWarning]=useState("")

    const validateInputs=()=>{
        if(fromLocation =="" || toLocation=="" || boardingPoint=="" || droppingPoint==""){
            toast.error("Enter Locations !!!")
            return;
        }
        let ans=true;
        const regex = /^[A-Za-z]+$/
        if(date==""){
            toast.error("Enter the date")
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
                                SetValue(e)
                            }
                            }
                        />
                    </LocalizationProvider>
                    
                </div>
            </div>    
        )
    }

    function setAllEmpty(){
        setFromMapboxId("")
        setFromTime("")
        setFromLocation("")
        setFromLocationInfo({})
        setToMapboxId("")
        setToTime("")
        setToLocation("")
        setToLocationInfo({})
        setDate("")
        setBoolCar(false)
        setVehicleName("")
        setNumberOfSeats(0)
        setPrice(0)
        setFacilities("")    
        setFromLocationWarning("")
        setToLocationWarning("")
        setNumberOfSeatsWarning("")
        setPriceWarning("")
        setPath([])
    }

    const Lable=()=>{
        
        return(
            <div>
                {   !loading ? 
                        <>Publish</>
                    :
                        <div className="">
                            <div className="w-6 h-6 ml-4 ">
                                <LoadingBlue/>
                            </div>
                        </div>

                }
            </div>
        )
    }

    return (
        <div className="flex justify-center ">

            <div className=" flex flex-col min-h-screen h-fit justify-start ">
                
                <div className="m-8 font-semibold text-blue-500 rounded-3xl p-2 shadow-lg shadow-blue-200 text-center h-14 text-lg">
                    Become a Captain And Save Costs By Providing Rides To Passengers
                </div>

                <div className="border-2 items-center w-full h-full p-6 mb-16 flex flex-col justify-center rounded-xl border-slate-200 shadow-lg shadow-blue-200 bg-slate-200">
                    <div className="flex justify-between mx-16 space-x-24  ">
                        <div className="w-80">
                            <AddRideInputBoxAddress label="From" setMapboxId={setFromMapboxId} searchForAddress={true} setFinalLocation={setFromLocation} setFinalLocationInfo={setFromLocationInfo} finalLocationInfo={fromLocationInfo}/>
                                <Warning label={fromLocationWarning}/>
                            
                            <div className="flex space-x-2">
                                <div className="w-1/2">
                                    <AddRideInputBox2 value={fromTime} label="Pickup Time" OnChange={(e)=>{setFromTime(e.target.value)}}/>
                                </div>
                                <div className="w-1/2">
                                    <AddRideInputBox2 label="Drop Time" value={toTime}  OnChange={(e)=>{setToTime(e.target.value)}}/>
                                </div>
                            </div>
                            
                            <div className="flex flex-col space-y-3 cursor-pointer">    
                                <div onClick={()=>{
                                        setShowDate(e=>!e)
                                    }}>
                                    <AddRideInputBox2 label={"Date"} placeholder={datePlaceholder}  />
                                </div>    
                                {showDate?<DateComponent/>:null}
                            </div>

                            <AddRideInputBox2 label="Vehicle Name" value={vehicleName}  OnChange={(e)=>{setVehicleName(e.target.value)}}/>
                            <AddRideInputBox2 label="Boarding Point" value={boardingPoint}  OnChange={(e)=>{setBoardingPoint(e.target.value)}}/>
                            
                        </div>
                        <div className="w-80">
                            <AddRideInputBoxAddress label="To" setMapboxId={setToMapboxId} searchForAddress={true} setFinalLocation={setToLocation} setFinalLocationInfo={setToLocationInfo} finalLocationInfo={toLocationInfo}/>
                            <Warning label={toLocationWarning}/>
                            
                            
                            <div className="flex justify-between space-x-2 items-center">
                                <div>    
                                    <AddRideInputBox2 label="No of Passengers" value={numberOfSeats}  OnChange={(e)=>{setNumberOfSeats(e.target.value)}}/>
                                    <Warning label={numberOfSeatsWarning}/>
                                </div>
                                <div>    
                                    <AddRideInputBox2 label="Price" value={price}  OnChange={(e)=>{setPrice(e.target.value)}}/>
                                    <Warning label={priceWarning}/>
                                </div>    
                            </div>
                            <AddRideInputBox2 label="Facilities" value={facilities} OnChange={(e)=>{setFacilities(e.target.value)}}/>
                            <div className="flex justify-center space-x-9 mt-11 mb-5">
                                <div>
                                    <input className="mr-1" type="radio" name="vehicle" value={boolCar} onClick={()=>{setBoolCar(true)}}/>Car
                                </div>
                                <div>
                                    <input className="mr-1" type="radio" name="vehicle" value={boolCar} onClick={()=>{setBoolCar(false)}}/>Bike
                                </div>
                            </div>
                            <AddRideInputBox2 label="Dropping Point" value={droppingPoint} OnChange={(e)=>{setDroppingPoint(e.target.value)}}/>
                        </div>
     
                    </div>
                    
                    <PathInputBox path={path} setPath={setPath}/>
                    
                    <div className="border cursor-pointer w-20 mb-5 mt-2 h-10 bg-blue-700 text-white p-2 text-center border-blue-600 rounded-lg shadow-lg hover:shadow-blue-400 transition ease-in-out"
                       onClick={async ()=>{
                                    let valid=validateInputs();
                                    if(fromLocation==toLocation){
                                        valid=false;
                                        toast.error("Enter valid locations")
                                    }
                                    if(!valid)  return
                                    if(price==0){
                                        toast.error("Enter Price")
                                        return;
                                    }
                                    if(numberOfSeats==0){
                                        toast.error("Enter Seats")
                                        return;
                                    }
                                    console.log("sent")
                                        try{
                                            setLoading(true)
                                            const response=await axios.post(`${url}/user/rides/addRide`,{
                                                fromTime,
                                                fromLocationInfo,
                                                fromMapboxId,
                                                toTime,
                                                toLocationInfo,
                                                toMapboxId,
                                                date,
                                                boolCar,
                                                vehicleName,
                                                numberOfSeats,
                                                price,
                                                facilities,
                                                boardingPoint,
                                                droppingPoint,
                                                path
                                            },{
                                                headers:{
                                                    authorization:localStorage.getItem("token")
                                                }
                                            })
                                            console.log(response)
                                            toast.success("Ride Added")
                                            
                                        }catch(e){
                                            console.log(e)
                                            console.log("error while Adding Rides: ",e);
                                            if(e.response && e.response.status==401){
                                                toast.error("You are Not Signed In")
                                                navigate("/")
                                            }else{
                                                if(e.response && e.response.data && e.response.data.message)
                                                    toast.error(e.response.data.message)
                                                else    
                                                    toast.error("Unexpected Error Occured")
                                            }
                                        }finally{
                                            setLoading(false)
                                            // setAllEmpty()
                                        }
                                        
                                    
                                    }
                                }
                        ><Lable/></div>
                </div>
            </div>
            
        </div>
    )
}