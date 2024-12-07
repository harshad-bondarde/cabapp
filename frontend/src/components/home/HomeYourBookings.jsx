import { useEffect, useState } from "react"
import { UpcomingBookedRides } from "./YourBookings/UpcomingBookedRides"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import axios from "axios"

export function YourBookings(){
    const navigate=useNavigate()
    const [bookingsButton,setBookingsButton]=useState(false)
    const [bookings,setBookings]=useState([])

    useEffect(() => {
        const getBookingsArray = async () => {
            try {
                const response = await axios.get("http://localhost:3000/user/rides/bookings", {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                });
                setBookings(response.data.bookedRides);
            } catch (e) {
                setBookings([]);
                if(e.response && e.response.status==401){
                    toast.error("You are Not Signed In")
                    navigate("/cabapp")
                }else{
                    console.log(e)
                }
            }
        };
        getBookingsArray();
    }, []); 
    

    function convertToDateObject(dateString) {
        const [day, month, year] = dateString.split("-").map(Number);
        return new Date(year, month - 1, day);
    }

    // console.log(bookings)
    const [bookedRides,setBookedRides]=useState([])
    const [upcomingRides,setUpcomingRides]=useState([])
    useEffect(()=>{

        let past=bookings.filter((ride)=>{
            const date=new Date()
            return date>convertToDateObject(ride.date)
        })
        setBookedRides(past)
        
        let upcoming=bookings.filter((ride)=>{
            const date=new Date()
            return date<=convertToDateObject(ride.date)
        })
        setUpcomingRides(upcoming)
        
    },[bookings])
    
    return (
        <>
            <div className="flex justify-between w-full mx-3 space-x-1">
                <div onClick={()=>{setBookingsButton(false)}} className={`border-4 w-1/2 rounded border-gray-300 text-center bg-gray-300 p-3 cursor-pointer ${!bookingsButton?"bg-gray-400 border-gray-400 font-medium":""}`}>
                    Upcoming Rides
                </div>
                <div onClick={()=>{setBookingsButton(true)}} className={`border-4 w-1/2 rounded border-gray-300 text-center bg-gray-300 p-3 cursor-pointer ${bookingsButton?"bg-gray-400 border-gray-400 font-medium":""}`}>
                    Your Bookings
                </div>
            </div>

            {/* {  
                bookingsButton?
                
                <UpcomingBookedRides bookedRides={bookedRides}/>
                :
                <UpcomingBookedRides upcomingRides={upcomingRides}/>
            } */}

            <UpcomingBookedRides bookedRides={bookedRides} upcomingRides={upcomingRides} bookingsButton={bookingsButton}/>


        </>
    )
}