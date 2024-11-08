import { CarFront } from 'lucide-react';
import { Bike , IndianRupee  , CircleChevronRight} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export function ProfileRides({upcomingRides,pastRides,pastRidesButton}){
    
    function UpRide({ride , pastRidesButton}){
        const rideId=ride?.rideId
        const boolRide=ride?.boolride
        const boolCar=ride?.boolcar
        const date=ride?.date;
        const fromLocation=ride?.fromlocation
        const toLocation=ride?.tolocation
        const fromTime=ride?.fromtime
        const toTime=ride?.totime
        const price=ride?.price
        const seatsBooked=ride?.numberofseats-ride?.numberofseatsavailable
        const vehicleName=ride?.vehiclename
        
        function capitaliser(name){
            let ans=""
            for(let i=0;i<name.length;i++){
                if(i==0){
                    ans+=name[i].toUpperCase()
                }else[
                    ans+=name[i]
                ]
            }
            return ans;
        }
    
        return (
            <>  
                {   ride ?

                    <div className='flex justify-center m-3 w-full '>
                        <div className="border-2 border-blue-200 shadow-blue-200 h-32 mx-3 rounded-xl p-2 shadow-md flex justify-between w-fit">
                            
                            <div className='w-44 flex justify-start'>
                                <div className='flex flex-col space-y-3 '>
                                    
                                    <div className="flex">
                                        Vehicle Name
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


                            <div className=' mt-5 ml-14 mr-14'>
                                <div className="flex space-x-5 items-center">    
                                    <div className="flex flex-col items mt-1 ml-3 text-lg font-medium space-y-1">
                                        <div>
                                            {fromTime?fromTime:"?"}
                                        </div>
                                        <div>
                                            {fromLocation?capitaliser(fromLocation):"?"}
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
                                        <div>
                                            {toTime?toTime:"?"}
                                        </div>
                                        <div>
                                            {toLocation?capitaliser(toLocation):"?"}
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
                                        <div className='text-center font-medium text-'>
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
                                        <div className='border-2 p-4 rounded-lg bg-red-400 font-medium'>
                                            Ride Cancelled
                                        </div>
                                    }
                                </div>
                            
                            </div>

                        </div>
                        
                        
                        { !pastRidesButton && boolRide ? 
                            <div onClick={async()=>{
                                    const response=await axios.post("http://localhost:3000/user/deleteride",{
                                        rideId
                                    },{
                                        headers:{
                                            authorization:localStorage.getItem("token")
                                        }
                                    })

                                    if(response.status==500 || response.status==403){
                                        toast.error("Internal Server Error")
                                    }else if(response.status==200){
                                        toast.success("Ride Deleted Successfully")
                                    }

                            }} className='border-2 rounded-2xl shadow-xl p-2 flex flex-col justify-center cursor-pointer transition ease-in-out duration-300 hover:-translate-y-1 bg-red-300 border-red-300 hover:shadow-red-400 '>
                                <div className='flex flex-col items-center text-sm font-medium'>
                                    Cancel
                                </div> 
                            </div>
                            :
                            null
                        }
                    </div>

                :
                    <>
                        No Upcoming Rides
                    </>
                }
            </>
        )
    }
    return (
        <>
            { upcomingRides && !pastRidesButton ? upcomingRides.map((ride,key)=><UpRide key={key} ride={ride} pastRidesButton={pastRidesButton}  />) : null }
            { pastRides && pastRidesButton ?  pastRides.map((ride,key)=><UpRide key={key} ride={ride} pastRidesButton={pastRidesButton}  />) : null }
        </>
    )
}