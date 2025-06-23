import { CarFront, MapPin } from 'lucide-react';
import { Bike , IndianRupee  , CircleChevronRight} from 'lucide-react';
import axios from "axios"
import toast from 'react-hot-toast';

import { url } from '../../../assets/url';
import { Profile } from '../YourProfile/Profile';
import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { setShowCaptainInfo } from '../../../store/userSlice';
import { EmptyRides } from '../../EmptyRides';
import EndofList from '../../EndofList';
import { LoadingRed , LoadingBlue } from '../../Loading';
import { Star } from 'lucide-react';
import { setMapCoordinates, setShowMap ,setPathCoordinates } from '../../../store/mapSlice';

export function UpcomingBookedRides({upcomingRides , bookedRides , bookingsButton ,setBookings}){
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(false)

    function UpRide({ride  , showCancel }){
        // console.log(ride)
        const bookedRidesId=ride?.bookedridesid
        const date=ride?.date;
        const boolCar=ride?.boolcar
        const boolRide=ride?.boolride
        const price=ride?.price
        const seatsBooked=ride?.seatsbooked
        const vehicleName=ride?.vehiclename
        const [sendingFeedback,setSendingFeedback]=useState(false)
        const [feedback,setFeedback]=useState("")
        const [selectedStars,setSelectedStars]=useState(0)
        const [showFeedback,setShowFeedback]=useState(ride.feedback==null ? true : false)
        const [showFeedbackDiv,setShowFeedbackDiv]=useState(true)
        const path=JSON.parse(ride?.path)
        // console.log(ride.feedback)

        const captainFirstname=ride?.captainfirstname
        const captainLastname=ride?.captainlastname
        const captainId=ride.captainid 
        const {showCaptainInfo}=useSelector(state=>state.user)
        const [loadCaptainInfo,setLoadCaptainInfo]=useState(false)
        
        const fromTime=ride?.fromtime
        const fromLocationArray=ride?.fromlocation.split("-")
        const fromCoordinates={
            fromlongitude:ride?.fromlongitude,
            fromlatitude:ride?.fromlatitude,
        }
        const boardingPoint=ride.boardingpoint

        const toTime=ride?.totime
        const toLocationArray=ride?.tolocation.split("-")
        const toCoordinates={
            tolongitude:ride?.tolongitude,
            tolatitude:ride?.tolatitude,
        }
        const droppingPoint=ride.droppingpoint

        function capitaliser(name){
            let ans=""
            for(let i=0;i<name.length;i++){
                if(i==0){
                    ans+=name[i].toUpperCase()
                }else{
                    ans+=name[i]
                }
            }
            return ans;
        }

        async function getCaptainInfo(){
            setLoadCaptainInfo(true)
            try{
                const response=await axios.post(`${url}/user/getuser`,{
                    userId:captainId
                },{
                    headers:{
                        authorization:localStorage.getItem("token")
                    }
                })
                console.log(response)
                dispatch(setShowCaptainInfo(response.data.userInfo))
                // console.log("HI")
            
            }catch (error) {
                toast.error("Error While Getting Info")
                console.log(error)
            }finally{
                setLoadCaptainInfo(false)
            }
        }
        const Label=()=>{
            return (
                <>
                    {   !loading ?
                            <>Cancel</>
                        :
                            <div className='w-10 h-10'>
                                <LoadingRed/>
                            </div>
                    }
                </>
            )
        }

        const handleFeedback=async()=>{
            if(feedback=="" || selectedStars==0){
                toast.error("Please complete the details  !!!")
                return 
            }
            try {
                setSendingFeedback(true)
                const response=await axios.post("http://localhost:3000/user/rides/addfeedback",{
                    bookedRidesId,
                    feedback,
                    captainId,
                    rating:selectedStars
                })
                console.log(response)
                if(response.status==200){
                    toast.success(response.data.message)
                }
                setShowFeedback(false)
            } catch (error) {
                console.log(error)
                toast.error("Something Went Wrong...")
            }finally{
                setSendingFeedback(false)
            }
        }
        const RatingStars=({selectedStars})=>{
            const divs=[]
                 for(let i=1;i<=5;i++)
                        divs.push(<Star key={i} onClick={()=>setSelectedStars(i)} className={`${i<=selectedStars ? `text-yellow-300 bg-yellow-200 rounded-full w-9 h-7 `:``}`}/>)
            return (
                <>
                    {divs}
                </>
            )
        }
        return (
            <>  
                {   ride ?

                    <div className='flex justify-center m-5 '>
                        <div className='flex flex-col w-full '>
                            <div className='flex '>    
                                <div className="border-2 border-blue-200 shadow-blue-200 h-32 mx-3 rounded-xl p-2 shadow-md flex justify-between w-full">
                                    <div className='w-44 flex justify-start'>
                                        <div className='flex flex-col space-y-3 '>
                                            
                                            <div
                                                className="flex cursor-pointer mt-2 ml-2 items-center transition ease-in-out duration-300 hover:-translate-y-1 "
                                                onClick={getCaptainInfo} >
                                                <div className="text-xl p-1 bg-gray-400 text-white border-2 rounded-full w-10 h-10 text-center">
                                                    { captainFirstname?captainFirstname[0].toUpperCase():"?" }
                                                </div>
                                                <div>   {   !loadCaptainInfo ?
                                                                <div className="flex items-center font-medium ml-2">
                                                                    {captainFirstname && captainLastname ? capitaliser(captainFirstname)+" "+capitaliser(captainLastname) : "?"}
                                                                </div>
                                                            :
                                                                <div className='w-5 h-5 ml-4'>
                                                                    <LoadingBlue/>
                                                                </div>
                                                        }
                                                </div> 
                                            </div>

                                            <div className='flex items-center w-30'>
                                                <div className="mt-2 ml-4 ">
                                                    {boolCar?<CarFront/>:<Bike/>}
                                                </div>
                                                <div className='ml-4 mt-2 text-sm font-semibold'>
                                                    {vehicleName?capitaliser(vehicleName):"?"}
                                                </div>
                                            </div>

                                        </div>
                                    </div>


                                    <div className=' ml-14 mr-14'>
                                        <div className="flex space-x-5 items-center">    
                                            <div className="flex flex-col items text-lg font-medium space-y-1">
                                                <div className='flex flex-col items-center'>
                                                    <div className=''>
                                                        {fromTime}
                                                    </div>
                                                    <div className='text-xl'>
                                                        {fromLocationArray[0]}
                                                    </div>
                                                    <div className='text-sm '>
                                                        {fromLocationArray[1]}
                                                    </div>
                                                    <div className='italic text-xs mt-1 max-w-44 text-center font-normal'>
                                                        {boardingPoint} 
                                                    </div>
                                                </div>
                                            </div>
                                             <div className='flex flex-col items-center mt-5'>
                                                <div className="flex items-center space-x-1">
                                                    <div className='w-24 flex flex-col mb-4'>
                                                        <div onClick={()=>{
                                                                const coordinates={
                                                                    longitude:fromCoordinates.fromlongitude,
                                                                    latitude:fromCoordinates.fromlatitude
                                                                }
                                                                dispatch(setMapCoordinates(coordinates))
                                                                dispatch(setShowMap(true))
                                                            }} className='mb-1 mr-1 cursor-pointer text-slate-500'>
                                                            <MapPin size={13}/>
                                                        </div>
                                                        <hr className='border-2 border-slate-500 rounded-full'/>
                                                    </div>
                                                    <div>
                                                        <CircleChevronRight className="text-slate-500 "/>
                                                    </div>
                                                    <div className='w-24 flex flex-col mb-4'>
                                                            <div  onClick={()=>{
                                                                const coordinates={
                                                                    longitude:toCoordinates.tolongitude,
                                                                    latitude:toCoordinates.tolatitude
                                                                }
                                                                dispatch(setMapCoordinates(coordinates))
                                                                dispatch(setShowMap(true))
                                                            }} className='mb-1 mr-1 flex justify-end cursor-pointer text-slate-500'>
                                                                <MapPin size={13}/>
                                                            </div>
                                                        <hr className='border-2 border-slate-500 rounded-full'/>
                                                    </div>
                                                
                                                </div>
                                                <div
                                                    onClick={()=>{
                                                        if(!path){
                                                            toast.error("Sorry Path Not Available")
                                                            return 
                                                        }

                                                        dispatch(setPathCoordinates(path))
                                                        dispatch(setShowMap(true))
                                                    }} 
                                                    className='border-2 text-sm p-1 mt-1 bg-blue-500 border-blue-500 rounded-md cursor-pointer text-slate-200'>
                                                        View Path
                                                </div>
                                            </div>                                                                       
                                            <div className="flex flex-col items ml-3 text-lg font-medium space-y-1">
                                                <div className='flex flex-col items-center'>
                                                    <div className=''>
                                                        {toTime}
                                                    </div>
                                                    <div className='text-xl'>
                                                        {toLocationArray[0]}
                                                    </div>
                                                    <div className='text-sm'>
                                                        {toLocationArray[1]}
                                                    </div>
                                                    <div className='italic text-xs mt-1 max-w-44 text-center font-normal'>
                                                        {droppingPoint} 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-between'>
                                
                                <div className='font-medium text-lg mr-2 flex justify-end underline '>
                                    {date? date:"?"}
                                </div>
                                
                                <div>   
                                    { boolRide ?  
                                        <div className='text-center font-medium'>
                                            <div className='flex space-x-5 font-medium text-sm'>
                                                <div>
                                                    {seatsBooked ? "Seats Booked : "+seatsBooked:"Seats Booked : 0"}
                                                    
                                                </div>
                                                <div>
                                                    {price?"Ticket Price: "+price:""}
                                                </div>
                                            </div>

                                            <div className='bg-gray-400 p-1 rounded-full mt-2'>
                                                {price?
                                                    <div 
                                                    className='flex justify-center items-center'>
                                                        <div>
                                                            Net Price : 
                                                        </div>
                                                        <IndianRupee className='mt-1 ml-1' size={15}/>
                                                        <div>
                                                            {seatsBooked>0 && price ? seatsBooked*price : "0"}
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                                }
                                            </div>
                                        </div>
                                        :
                                        <div className='border-2 p-4 rounded-lg bg-red-400 font-medium w-56 text-center'>
                                            Ride Deleted
                                        </div>
                                    }
                                </div>
                            
                            </div>
                                    
                                </div>
                                { showCancel ? 
                                    <button disabled={boolRide} onClick={async()=>{
                                            setLoading(true)
                                            const response=await axios.post(`${url}/user/cancelride`,{
                                                bookedRidesId,
                                                rideId:ride?.rideid,
                                                seatsBooked
                                            },{
                                                headers:{
                                                    authorization:localStorage.getItem("token")
                                                }
                                            })
                                            if(response)
                                                setLoading(false)

                                            if(response.status==503 || response.status==401){
                                                toast.error("Internal Server Error")
                                            }else if(response.status==200){
                                                toast.success("Ride Cancelled Successfully")
                                                setBookings(e=>e.filter((ride)=>ride.bookedridesid!=bookedRidesId))
                                            }

                                        }} 
                                        
                                        className={`border-2 rounded-2xl shadow-xl p-2 flex flex-col justify-center ${boolRide ? `cursor-pointer transition ease-in-out duration-300 hover:-translate-y-1 bg-red-300 border-red-300 hover:shadow-red-400 `:`bg-gray-300` } `}>
                                        
                                        <div className={`flex flex-col items-center text-sm font-medium ${!boolRide?'cursor-not-allowed':''}`}>
                                            <Label/>
                                        </div> 
                                    </button>
                            
                                    :
                                        null
                                }

                            </div>    

                            {   !showCancel && showFeedback && showFeedbackDiv &&
                                    <div className='w-full mt-2 flex items-center space-x-3 ml-4 mb-3'>
                                        <input onChange={(e)=>setFeedback(e.target.value)} className='w-full bg-slate-200 p-2 border-1 border-blue-600 shadow-black-100 shadow-md rounded-md h-10 mt-1'
                                         placeholder='Send Feedback...'/>
                                        <RatingStars selectedStars={selectedStars}/>
                                        <button onClick={()=>handleFeedback()} className='bg-blue-500 p-2 rounded-full text-white font-medium cursor-pointer'>
                                            { !sendingFeedback ?
                                                    'Send'
                                                :
                                                <div className='w-10 text-center '>
                                                    <div className='h-4 w-4 ml-3'>
                                                        <LoadingBlue/>
                                                    </div>
                                                </div>
                                            } 
                                        </button>           
                                    </div>
                            }                        
                        </div>
                    </div>
                :
                    <>
                        {null}
                    </>
                }
            </>
        )
    }
    return (
        <div className="mt-16 space w-full relative">
            
            {   !bookingsButton ?

                    <div>
                        {
                            upcomingRides.length>0 ?
                                <>
                                    {upcomingRides.map((ride,key)=><UpRide key={key} ride={ride} showCancel={true}/>)}
                                    <EndofList/>
                                </>
                            :
                            <>
                                    <EmptyRides/>
                                </>
                        }
                    </div>
                
                :
                
                <div>
                        {
                            bookedRides.length>0 ?
                            <>
                                    {bookedRides.map((ride,key)=><UpRide key={key} ride={ride} showCancel={false}/>)}
                                    <EndofList/>
                                </>
                            :
                                <>
                                    <EmptyRides/>
                                </>
                        }

                </div>
            }
        </div>
    )
}