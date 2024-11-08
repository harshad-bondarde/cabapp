import { Profile } from "./YourProfile/Profile";
import { useEffect, useState } from "react";
import axios from "axios"
import { ProfileRides } from "./YourProfile/ProfileRides";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export function YourProfile({userInfo}){
    const navigate=useNavigate()
    const [pastRidesButton,setPastRidesButton]=useState(false)
    const [rides,setRides]=useState([])
    useEffect(()=>{
        const getrides=async ()=>{
            try{
                const response=await axios.get("http://localhost:3000/user/rides/getrides",{
                    headers:{
                        authorization:localStorage.getItem("token")
                    }
                })
                // console.log(response)
                setRides(response.data.rides)
            }catch(e){
                if(e.response && e.response.status==403){
                    toast.error("You are Not Signed")
                    
                    navigate("/cabapp")
                }

            }
        }
        getrides()
    },[])

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
                <div className="border-2  bg-gray-400 p-3 rounded-md text-xl font-medium border-gray-400">
                    Your Profile
                </div>  
                {userInfo ? <Profile userInfo={userInfo}/> : null}
            </div>

            <div className="flex justify-between w-full mx-3 space-x-1 mt-10">
                <div onClick={()=>{setPastRidesButton(false)}} className={`border-4 w-1/2 rounded border-gray-300 text-center bg-gray-300 p-3 cursor-pointer ${!pastRidesButton?"bg-gray-400 border-gray-400 font-medium":""}`}>
                    Upcoming Rides
                </div>
                <div onClick={()=>{setPastRidesButton(true)}} className={`border-4 w-1/2 rounded border-gray-300 text-center bg-gray-300 p-3 cursor-pointer ${pastRidesButton?"bg-gray-400 border-gray-400 font-medium":""}`}>
                    Past Rides
                </div>
            </div>

            <div>
                <ProfileRides upcomingRides={upcomingRides} bookedRides={pastRides} pastRidesButton={pastRidesButton}/>
            </div>
        </>
    )
}