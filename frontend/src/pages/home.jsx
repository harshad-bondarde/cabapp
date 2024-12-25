import toast from "react-hot-toast"
import axios from "axios"
import { Header } from "../components/header"
import { NavButton } from "../components/navButton"
import { BookRides } from "../components/home/HomeBookRides"
import { YourBookings } from "../components/home/HomeYourBookings"
import { YourProfile } from "../components/home/HomeYourProfile"
import { AddRide } from "../components/home/HomeAddRide"
import { useEffect, useState } from "react"
import { useDispatch , useSelector } from 'react-redux'
import { setAuthUser } from "../store/userSlice"
import { useNavigate } from "react-router-dom"
import GetRealTimeLocations from "../components/mapboxAPI/getRealTimeLocations"
import OverHome from "../components/OverHome"
export function Home() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    let [renderButton, setRenderButton] = useState(1)
    let [userInfo, setUserInfo] = useState({})

    const { showMap , coordinates }=useSelector(state=>state.map)
    const {authUser}=useSelector(state=>state.user)
    if(!authUser){
        const authUserLocal=JSON.parse(localStorage.getItem("authUser"))
        if(authUserLocal){
            dispatch(setAuthUser(authUserLocal))
        }else{
            navigate('/')
            toast.error("You are not Signed In...")
        }
    }
    useEffect(()=>{
        setUserInfo(authUser)
    },[authUser])

    return (
        <div className="relative bg-slate-100 h-screen">

            <OverHome/>
            
            <Header setRenderButton={setRenderButton} firstname={userInfo.firstname} />
            
            <div className="flex h-fit overflow-auto">

                <div className="bg-slate-100 mx-1 ml-2 h-screen w-48 mt-2 rounded space-y-4 text-sm shadow-md border-slate-200  ">
                    <NavButton label="Book a Ride" renderNumber={1} setRenderButton={setRenderButton} />
                    <NavButton label="Your Bookings" renderNumber={2} setRenderButton={setRenderButton} />
                    <NavButton label="Your Profile" renderNumber={3} setRenderButton={setRenderButton} />
                    <NavButton label="Add Ride" renderNumber={4} setRenderButton={setRenderButton} />

                </div>

                <div className="bg-slate-100  w-full  mt-2 mr-2 ml-1 rounded-lg shadow-md ">
                    {renderButton == 1 ? <BookRides /> : null}
                    {renderButton == 2 ? <YourBookings /> : null}
                    {renderButton == 3 ? <YourProfile userInfo={userInfo} /> : null}
                    {renderButton == 4 ? <AddRide /> : null}
                </div>
                
            </div>

        </div>
    )
}