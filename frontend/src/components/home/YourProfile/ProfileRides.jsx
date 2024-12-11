import { CarFront } from 'lucide-react';
import { Bike , IndianRupee  , CircleChevronRight} from 'lucide-react';
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

export function ProfileRides({upcomingRides,pastRides,pastRidesButton}){
    
    function ProfRide({ride , pastRidesButton}){
        const dispatch=useDispatch()
        const passengers=useSelector(state=>state.user)
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
        const Lable=()=>{
            return (
                <>
                    {   !loading ?
                            <>
                                Delete
                            </>
                        :
                            <div className='w-10 h-10'>
                                <LoadingRed/>
                            </div>
                    }
                </>
            )
        }
        
        function Seats({numberOfSeats,numberOfSeatsAvailable}){
            const divs=[]
            {    
                for(let i=0;i<numberOfSeats;i++){
                    divs.push(
                        i<numberOfSeatsAvailable?
                            <CircleUser key={i} className='text-green-400 '/>
                            :
                            <CircleUser key={i} className='text-red-400'/>
                    )
                }
            }       
            return (
                <div className='flex mt-3 ml-4 space-x-1 items-center '>
                    {divs}
                </div>
            )
        }

        const GetPassengerDetails=async ()=>{
            if(seatsBooked==0){
                toast("No User Booked This Ride...")
                return;
            }
            try {
                setLoadingUserDetails(true)
                const response=await axios.post("http://localhost:3000/user/rides/getpassengerdetailes",{
                    rideId
                },{
                    headers:{
                        authorization:localStorage.getItem("token")
                    }
                })
                dispatch(setPassengerDetails(response.data.passengers))
                
            } catch (error) {
                
            }finally{
                setLoadingUserDetails(false)
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


                            <div className=' mt-3 ml-14 mr-14'>
                                <div className="flex space-x-5 items-center">    
                                    <div className="flex flex-col items mt-1 ml-3 text-lg font-medium space-y-1">
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
                                        <div>
                                            <CircleChevronRight className="text-slate-500 "/>
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
                            <div onClick={async()=>{
                                    if(!boolRide)
                                        return;
                                    setLoading(true)
                                    const response=await axios.post("http://localhost:3000/user/deleteride",{
                                        rideId
                                    },{
                                        headers:{
                                            authorization:localStorage.getItem("token")
                                        }
                                    })
                                    if(response){
                                        setLoading(false)
                                    }
                                    if(response.status==500 || response.status==403){
                                        toast.error("Internal Server Error")
                                    }else if(response.status==200){
                                        toast.success("Ride Deleted Successfully")
                                    }

                            }} className={`border-2 rounded-2xl shadow-xl p-2 flex flex-col justify-center ${boolRide ? `cursor-pointer transition ease-in-out duration-300 hover:-translate-y-1 bg-red-300 border-red-300 hover:shadow-red-400 `:`bg-gray-300` } `}>
                                <button className={`flex flex-col items-center text-sm font-medium ${!boolRide?'cursor-not-allowed':''}`}>
                                    <Lable/>
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
                                        {upcomingRides.map((ride,key)=><ProfRide key={key} ride={ride} />)}
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
                                        {pastRides.map((ride,key)=><ProfRide key={key} ride={ride} />)}
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