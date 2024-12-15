import { Profile } from "./YourProfile/Profile";
import { useEffect, useState } from "react";
import axios from "axios"
import { url } from "../../assets/url";
import { ProfileRides } from "./YourProfile/ProfileRides";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import {LoadingBlue} from "../Loading";

export function YourProfile({userInfo}){
    const navigate=useNavigate()
    const [pastRidesButton,setPastRidesButton]=useState(false)
    const [rides,setRides]=useState([])
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        const getrides=async ()=>{
            try{
                setLoading(true)
                const response=await axios.get(`${url}/user/rides/getrides`,{
                    headers:{
                        authorization:localStorage.getItem("token")
                    }
                })
                // console.log(response)
                setRides(response.data.rides)
            }catch(e){
                if(e.response && e.response.status==401){
                    toast.error("You are Not Signed")
                    
                    navigate("/cabapp")
                }else{
                    toast.error("Error while getting Rides...")
                }
            }finally{
                setLoading(false)
            }
        }
        getrides()
    },[])

    // console.log(rides)

    function convertToDateObject(dateString) {
        const [day, month, year] = dateString.split("-").map(Number);
        return new Date(year, month - 1, day);
    }

    const [pastRides,setPastRides]=useState([])
    const [upcomingRides,setUpcomingRides]=useState([])
    useEffect(()=>{

        let past=rides.filter((ride)=>{
            const date=new Date()
            return date>convertToDateObject(ride.date)
        })
        setPastRides(past)
        
        let upcoming=rides.filter((ride)=>{
            const date=new Date()
            return date<=convertToDateObject(ride.date)
        })
        setUpcomingRides(upcoming)
        
    },[rides])

    // console.log(upcomingRides)
    return (
        <>  
            <div className="flex flex-col justify-center items-center mt-5">
                <div className="border-2  bg-blue-400 p-3 rounded-md text-xl font-semibold shadow-xl shadow-blue-300 bg-opacity-55 border-blue-300">
                    Your Profile
                </div>  
                {userInfo ? <Profile userInfo={userInfo}/> : null}
            </div>

            <div className="flex justify-between  mx-3 space-x-1 mt-10">
                <div onClick={()=>{setPastRidesButton(false)}} className={`border-4 w-1/2 rounded border-gray-300 text-center bg-gray-300 p-3 cursor-pointer ${!pastRidesButton?"bg-gray-400 border-gray-400 font-medium":""}`}>
                    Upcoming Rides
                </div>
                <div onClick={()=>{setPastRidesButton(true)}} className={`border-4 w-1/2 rounded border-gray-300 text-center bg-gray-300 p-3 cursor-pointer ${pastRidesButton?"bg-gray-400 border-gray-400 font-medium":""}`}>
                    Past Rides
                </div>
            </div>

            <div>
                {   !loading ?
                        <ProfileRides upcomingRides={upcomingRides} bookedRides={pastRides} pastRidesButton={pastRidesButton}/>
                    :
                        <div className="flex justify-center mt-20">
                            <div className="w-20 h-20">
                                <LoadingBlue/>
                            </div>
                        </div>
                }    
            </div>
        </>
    )
}