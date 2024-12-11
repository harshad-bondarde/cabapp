import { CarFront } from 'lucide-react';
import { Bike , IndianRupee  , CircleChevronRight} from 'lucide-react';
import axios from "axios"
import toast from 'react-hot-toast';
import { Profile } from '../YourProfile/Profile';
import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { setShowCaptainInfo } from '../../../store/userSlice';
import { EmptyRides } from '../../EmptyRides';
import EndofList from '../../EndofList';
import { LoadingRed } from '../../Loading';
export function UpcomingBookedRides({upcomingRides , bookedRides , bookingsButton }){
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(false)

    function UpRide({ride , bookingsButton }){
        
        const bookedRidesId=ride?.bookedridesid
        const date=ride?.date;
        const boolCar=ride?.boolcar
        const price=ride?.price
        const seatsBooked=ride?.seatsbooked
        const vehicleName=ride?.vehiclename

        const captainFirstname=ride?.captainfirstname
        const captainLastname=ride?.captainlastname
        const captainId=ride?.captainid 
        const {showCaptainInfo}=useSelector(state=>state.user)
        
        const fromTime=ride?.fromtime
        const fromLocationArray=ride?.fromlocation.split("-")
        const fromCoordinates={
            fromlongitude:ride?.fromlongitude,
            fromlatitude:ride?.fromlatitude,
        }

        const toTime=ride?.totime
        const toLocationArray=ride?.tolocation.split("-")
        const toCoordinates={
            tolongitude:ride?.tolongitude,
            tolatitude:ride?.tolatitude,
        }

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
            try{
                const response=await axios.post("http://localhost:3000/user/getuser",{
                    userId:captainId
                },{
                    headers:{
                        authorization:localStorage.getItem("token")
                    }
                })
                // console.log(response)
                dispatch(setShowCaptainInfo(response.data.userInfo))
                // console.log("HI")
            
            }catch (error) {
                toast.error("Error While Getting Info")
                console.log(error)
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
        return (
            <>  
                {   ride ?

                    <div className='flex justify-center m-3 '>
                        <div className="border-2 border-blue-200 shadow-blue-200 h-32 mx-3 rounded-xl p-2 shadow-md flex justify-between w-full">
                            <div className='w-44 flex justify-start'>
                                <div className='flex flex-col space-y-3 '>
                                    
                                    <div
                                        className="flex cursor-pointer mt-2 ml-2 transition ease-in-out duration-300 hover:-translate-y-1 "
                                        onClick={getCaptainInfo} >
                                        <div className="text-xl p-1 bg-gray-400 text-white border-2 rounded-full w-10 h-10 text-center">
                                            { captainFirstname?captainFirstname[0].toUpperCase():"?" }
                                        </div>
                                        <div className="flex items-center font-medium ml-2">
                                            {captainFirstname && captainLastname ? capitaliser(captainFirstname)+" "+capitaliser(captainLastname) : "?"}
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


                            <div className=' mt-3 ml-14 mr-14'>
                                <div className="flex space-x-5 items-center">    
                                    <div className="flex flex-col items mt-1 text-lg font-medium space-y-1">
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
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className='w-24'>
                                            <hr className='border-2 border-slate-500 rounded-full'/>
                                        </div>
                                        <div  className="text-slate-500 ">
                                            <CircleChevronRight/>
                                        </div>
                                        <div className='w-24'>
                                            <hr className='border-2 border-slate-500 rounded-full'/>
                                        </div>

                                    </div>
                                    <div className="flex flex-col items mt-1 ml-3 text-lg font-medium space-y-1">
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
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className='flex flex-col justify-between'>
                                <div className='items-center flex justify-between pl-1'>
                                    <div className='font-semibold border-2 p-1 rounded-lg bg-gray-300 pl-2 pr-2'>
                                        Ticket ID - {bookedRidesId}
                                    </div>
                                    <div className='font-medium text-lg mr-2 flex underline '>
                                        {date? date:"?"}
                                    </div>
                                </div>
                                <div className='flex space-x-2 mr-8'>    
                                    <div className='text-center font-medium text-'>
                                        <div className='flex space-x-5 font-medium text-sm'>
                                            <div>
                                                {seatsBooked ? "Seats Booked : "+seatsBooked:null}
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
                                                        {seatsBooked && price ? seatsBooked*price : "?"}
                                                    </div>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                    </div>
                                </div>
                            
                            </div>

                        </div>
                        
                        
                        { !bookingsButton ? 
                            <div onClick={async()=>{
                                    setLoading(true)
                                    const response=await axios.post("http://localhost:3000/user/cancelride",{
                                        bookedRidesId,
                                        rideId:ride?.rideid
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
                                    }

                                 }} 
                                
                                className='border-2 w-15 rounded-2xl shadow-xl p-2 flex flex-col justify-center cursor-pointer transition ease-in-out duration-300 hover:-translate-y-1 bg-red-300 border-red-300 hover:shadow-red-400 '>
                                
                                <div className='flex flex-col items-center text-sm font-medium'>
                                    <Label/>
                                </div> 
                            </div>
                            
                            :
                            null
                        }
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
                                    {upcomingRides.map((ride,key)=><UpRide key={key} ride={ride} />)}
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
                                    {bookedRides.map((ride,key)=><UpRide key={key} ride={ride} />)}
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