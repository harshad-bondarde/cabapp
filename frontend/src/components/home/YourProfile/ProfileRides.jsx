import { CarFront } from 'lucide-react';
import { Bike , IndianRupee  , CircleChevronRight , MapPin} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { EmptyRides } from '../../EmptyRides';
import EndofList from '../../EndofList';
import { LoadingRed } from '../../Loading';
import { useState } from 'react';
import { CircleUser ,Info } from 'lucide-react';
import { LoadingBlue } from '../../Loading';
import { setPassengerDetails } from '../../../store/userSlice';
import { useDispatch , useSelector } from 'react-redux';
import { url } from '../../../assets/url';
import { getEmailJsRideDeletedEvent } from '../../EmailJsEvents/emailJsEvents';
import Seats from '../../Seats';
import { setShowMap , setMapCoordinates, setPathCoordinates } from '../../../store/mapSlice';
export function ProfileRides({upcomingRides , pastRides , pastRidesButton ,setRides}){
    
    function ProfRide({ride , pastRidesButton}){
        console.log(ride)
        const dispatch=useDispatch()
        const passengers=useSelector(state=>state.user)
        const {authUser}=useSelector(state=>state.user)

        const rideId=ride?.rideid
        const boolRide=ride?.boolride
        const boolCar=ride?.boolcar
        const date=ride?.date;
        const price=ride?.price
        const numberOfSeats=ride?.numberofseats
        const numberOfSeatsAvailable=ride?.numberofseatsavailable
        const seatsBooked=ride?.numberofseats-ride?.numberofseatsavailable
        const vehicleName=ride?.vehiclename
        const [loading,setLoading]=useState(false)
        const [loadingUserDetails,setLoadingUserDetails]=useState(false)
        const path=JSON.parse(ride?.path)
        // console.log(path)
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
        const CancelLable=()=>{
            return (
                <>
                    {   !loading ?
                            <div className='cursor-pointer'>
                                Delete
                            </div>
                        :
                            <div className='w-10 h-10'>
                                <LoadingRed/>
                            </div>
                    }
                </>
            )
        }

        const GetPassengerDetails=async ()=>{
            console.log("hi")
            if(seatsBooked==0){
                toast("No User Booked This Ride...")
                return;
            }
            try {
                setLoadingUserDetails(true)
                const response=await axios.post(`${url}/user/rides/getpassengerdetailes`,{
                    rideId
                },{
                    headers:{
                        authorization:localStorage.getItem("token")
                    }
                })
                console.log(response)
                dispatch(setPassengerDetails(response.data.passengers))
                
            } catch (error) {
                console.log(error)
            }finally{
                setLoadingUserDetails(false)
            }
        }

        const CancelRideHandler=async ()=>{
                if(!boolRide)
                    return;
                try{    
                    setLoading(true)
                    const response=await axios.post(`${url}/user/deleteride`,{
                        rideId,
                        fromMapboxId:ride?.frommapboxid,
                        toMapboxId:ride?.tomapboxid,
                        date,
                    },{
                        headers:{
                            authorization:localStorage.getItem("token")
                        }
                    })
                    if(response.status==500 || response.status==403){
                        toast.error("Internal Server Error")
                    }else if(response.status==200){
                        toast.success("Ride Deleted Successfully")
                        setRides(e=>{
                            return e.map((ride,index)=>{
                                if(ride.rideid==rideId){
                                    ride.boolride=false
                                }
                                return ride
                            })
                        })
                    }
                }catch(e){
                    console.log(error)
                    toast.error("Error while deleting ride")
                    return;
                }finally{
                    setLoading(false)
                    const response=await axios.post(`${url}/user/rides/getpassengernameemail`,{
                        rideId
                    })
                    const passengerInfo=response.data.passengers
                    console.log(passengerInfo)
                    passengerInfo.forEach((passenger)=>{
                        const sendEmail=getEmailJsRideDeletedEvent({
                            passenger_name:passenger?.firstname+" "+passenger?.lastname,
                            passenger_email:passenger?.email,
                            src:fromLocationArray[0]+", "+fromLocationArray[1],
                            dest:toLocationArray[0]+", "+toLocationArray[1],
                            ride_date:ride?.date ,
                            user_name:authUser?.firstname+" "+authUser?.lastname,
                            user_emailID:authUser?.email,
                            user_phoneno:authUser?.phoneno
                        })
                        const send=async()=>{
                            await sendEmail()
                        }
                        send()
                    })

                }
        }

        return (
            <>  
                {   ride ?

                    <div className='flex justify-center m-3 '>
                        <div className="border-2 border-blue-200 shadow-blue-200 h-32 mx-3 rounded-xl p-2 shadow-md flex justify-between w-full">
                            
                            <div className='w-44 flex justify-start'>
                                <div className='flex flex-col space-y-1 items-center'>
                                    
                                    <div className='ml-5 mb-1'>
                                        Vehicle Name
                                    </div>

                                    <div className='flex items-center w-30'>
                                        <div className="ml-4 ">
                                            {boolCar?<CarFront/>:<Bike/>}
                                        </div>
                                        <div className='ml-4  text-sm font-semibold'>
                                            {vehicleName?capitaliser(vehicleName):"?"}
                                        </div>
                                    </div>

                                    {   
                                        boolRide && 
                                            <div className='flex items-center cursor-pointer' onClick={()=>{GetPassengerDetails()}}>
                                                <div>                                                
                                                    <Seats numberOfSeats={numberOfSeats} numberOfSeatsAvailable={numberOfSeatsAvailable}/>
                                                </div>
                                                <div className='mt-3 ml-1'>
                                                    { !loadingUserDetails ?
                                                            <Info className='text-gray-500'/>
                                                        :
                                                        <div className='h-6 w-6'>
                                                            <LoadingBlue/>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                    }

                                </div>
                            </div>


                            <div className=' mt-1 ml-14 mr-14'>
                                <div className="flex space-x-5 items-center">    
                                    <div className="flex flex-col items  ml-3 text-lg font-medium space-y-1">
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
                                                    toast.error("Sorry path is not available")
                                                    return;
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
                        
                        
                        { !pastRidesButton ? 
                            <div onClick={CancelRideHandler} className={`border-2 rounded-2xl shadow-xl p-2 flex flex-col justify-center ${boolRide ? `cursor-pointer transition ease-in-out duration-300 hover:-translate-y-1 bg-red-300 border-red-300 hover:shadow-red-400 `:`bg-gray-300` } `}>
                                <button disabled={boolRide} className={`flex flex-col items-center text-sm font-medium ${!boolRide?'cursor-not-allowed':''}`}>
                                    <CancelLable/>
                                </button> 
                            </div>
                            :
                            null
                        }
                    </div>

                :
                    <>
                        {/* No Upcoming Rides */}
                    </>
                }
            </>
        )
    }
    return (
        <>
            {   !pastRidesButton ?

                        <div>
                            {
                                upcomingRides.length>0 ?
                                    <>
                                        {upcomingRides.map((ride,key)=><ProfRide key={key} ride={ride} pastRidesButton={pastRidesButton}/>)}
                                        <EndofList/>
                                    </>
                                :
                                    <div className='mt-10'>
                                        <EmptyRides/>
                                    </div>
                            }
                        </div>

                        :

                        <div>
                            {
                                pastRides?.length>0 ?
                                <>
                                        {pastRides.map((ride,key)=><ProfRide key={key} ride={ride} pastRidesButton={pastRidesButton} />)}
                                        <EndofList/>
                                    </>
                                :
                                    <div className='mt-10'>
                                        <EmptyRides/>
                                    </div>
                            }

                        </div>
            }
        </>
    )
}