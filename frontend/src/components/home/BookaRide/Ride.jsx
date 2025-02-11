import { Car, CircleChevronRight } from 'lucide-react';
import { IndianRupee } from 'lucide-react';
import { CarFront } from 'lucide-react';
import { Bike } from 'lucide-react';
import { CircleUser } from 'lucide-react';
import { Star } from 'lucide-react';
import { X } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';
import { LoadingBlue } from '../../Loading';

import { url } from '../../../assets/url';
import { useEffect, useState } from 'react';
import axios from "axios"
import {Warning} from "../../warning"
import { HandleBooking } from './HandleBooking';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getEmailJsRideBookedEvent } from '../../EmailJsEvents/emailJsEvents';
import Seats from '../../Seats';
import { setShowMap , setPathCoordinates  } from '../../../store/mapSlice';

export function Ride({ride}){
    const dispatch=useDispatch()
    const {authUser}=useSelector(state=>state.user)
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const [seatsBooked,setSeatsBooked]=useState(0)
    
    const rideId=ride.rideid;
    const captainId=ride.userid;

    const fromTime=ride.fromtime;
    const fromLocation=ride.fromlocation;
    const fromLocationArray=fromLocation.split("-")
    console.log(fromLocationArray)
    const fromCoordinates={
        fromLongitude:ride.fromlongitude,
        fromlatitde:ride.fromlatitude
    }
    const boardingPoint=ride.boardingpoint
    
    const toTime=ride.totime;
    const toLocation=ride.tolocation;
    const toLocationArray=toLocation.split("-")
    const toCoordinates={
        toLongitude:ride.tolongitude,
        tolatitde:ride.tolatitude
    }
    const droppingPoint=ride.droppingpoint
    
    const date=ride.date;
    const boolCar=ride.boolcar;
    const vehicleName=ride.vehiclename;
    const numberOfSeats=ride.numberofseats;
    const price=ride.price;
    const facilities=ride.facilities.split(" ");
    const numberOfSeatsAvailable=ride.numberofseatsavailable
    const path=JSON.parse(ride?.path)
    
    const [captainInfo,setCaptainInfo]=useState({});
    useEffect(()=>{
        const getinfo=async ()=>{
            try {
                const response=await axios.post(`${url}/user/getuser`,{
                    "userId":captainId
                },{
                    headers:{
                        authorization:localStorage.getItem("token")
                    }
                })
                setCaptainInfo(response.data.userInfo)
                
            } catch (error) {
                console.log(error)
            }  
        }
        getinfo()
        
    },[captainId])

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

    const BookingLabel=()=>{
        return (
            <>
                {   !loading ?
                        <>
                            Book
                        </>
                    :
                        <div className="w-5 ml-5">
                            <div>
                                <LoadingBlue/>
                            </div>
                        </div>
                }
            </>
        )
    }


    const [showBookTicket,setShowBookTicket]=useState(false)
    function BookTicket(){
        console.log(ride)
        return (
            <>  
                <div className='fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-blur-sm flex flex-col items-center pt-24'>
                    <div className='mb-10'>
                        <X onClick={()=>{setShowBookTicket(false)}} className='rounded-full bg-gray-400 p-1 hover:bg-red-300 hover:p-0 trasition ease-in-out duration-300'/>
                    </div>
                    <div className='border-2 border-blue-400 shadow-2xl  bg-gray-100 rounded-2xl p-2 w-fit h-fit'> 
                        
                        <div className='flex justify-between items-center'>    
                            
                            <div className='flex font-semibold text-lg'>
                                <div className='mt-3 ml-3 text-xl p-1 bg-gray-500 text-white border-2 shadow-xl rounded-full w-10 h-10 text-center '>
                                    { captainInfo.firstname? captainInfo.firstname[0].toUpperCase():"?"}
                                </div>

                                <div className='ml-3 flex flex-col items-center'>    
                                    <div className='flex space-x-1 mt-4'>
                                        <div>{captainInfo.firstname ? capitaliser(captainInfo.firstname) : "?"}</div>
                                        <div>{captainInfo.lastname ? capitaliser(captainInfo.lastname) : "?"}</div>
                                    </div>
                                    <div className='text-xs text-blue-500'>
                                        {captainInfo.numberofrides} Ride{captainInfo.numberofrides>1?"s":null} Published
                                    </div>
                                </div>
                            </div>

                            <div className='m-3 mt-6 mb-6 text-sm font-medium underline'>
                                Date: {date}
                            </div>
                        </div>

                        <div className='flex justify-center mt-5'>
                            <div className="flex space-x-5 items-center">    
                                <div className="flex flex-col items ml-3 text-sm font-medium space-y-1">
                                   <div className='flex flex-col items-center'>
                                        <div className='text-xl'>
                                            {fromLocationArray[0]}
                                        </div>
                                        <div>
                                            {fromLocationArray[1]}
                                        </div>
                                        <div>
                                            {fromTime}
                                        </div>
                                        <div className='italic text-xs mt-2 max-w-32 text-center font-normal'>
                                            {boardingPoint} 
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <div className="flex items-center space-x-1 mt-6">
                                        <div className='w-12'>
                                            <hr className='border-2 border-slate-500 rounded-full'/>
                                        </div>
                                        <div>
                                            <CircleChevronRight className="text-slate-500 "/>
                                        </div>
                                        <div className='w-12'>
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
                                            className='border-2 text-center p-1 text-xs w-fit mt-2 bg-blue-500 border-blue-500 rounded-md cursor-pointer text-slate-200'>
                                            View Path
                                    </div>
                                </div>
                                <div className="flex flex-col items mt-1 ml-3 font-medium text-sm space-y-1">
                                    <div className='flex flex-col items-center'>
                                        <div className='text-xl'>
                                            {toLocationArray[0]}
                                        </div>
                                        <div>
                                            {toLocationArray[1]}
                                        </div>
                                        <div>
                                            {toTime}
                                        </div>
                                        <div className='text-xs italic mt-2 max-w-32 font-normal text-center'>
                                             {droppingPoint} 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex text-sm justify-between mx-8 mt-8 mb-3 font-medium'>
                            <div>
                                Vehicle Name : {vehicleName} 
                            </div>
                            <div className='flex items-center'>
                                Price per Ticket : <IndianRupee className='mt-1' size={12}/> {price}
                            </div>
                        </div>

                        <div className='flex items-center w-full text-sm font-medium justify-end'>
                            
                            <div className='mr-20'> 
                                    Available Seats : {numberOfSeatsAvailable}
                            </div>
                            
                            <div className=' flex mt-1'>
                                    <div>
                                        No. of passengers :
                                    </div> 
                                    <div>
                                        <input value={seatsBooked} onChange={(e)=>{
                                                setSeatsBooked(e.target.value)
                                        }} type="number" className='border-2 w-20 pl-1 border-gray-400 rounded ml-2 font-medium'  />
                                            
                                    </div>
                            </div>
                        
                        </div>

                        { seatsBooked>0 ?    
                            <div className='flex justify-center mt-3 items-center'>
                                    <div className='text-lg font-medium'>
                                        Total Price : 
                                    </div>
                                    <div>
                                        <IndianRupee size={17} className='mt-1'/>
                                    </div>
                                    <div className='text-lg font-medium'>
                                        {price*seatsBooked}
                                    </div>
                            </div>
                            :
                            null
                        }
                        <hr className="border-1 mx-2 border-gray-300 rounded-2xl mt-3 mb-3"/>

                        <div className='mt-2 ml-8 text-sm font-medium space-x-5 flex'>
                            <div >Contact Details</div> 
                                        : 
                                        <div className='text-sm'>
                                            <div className='flex items-center space-x-1'>
                                                <Phone size={15}/> <div className=''> : {captainInfo.phoneno}</div>
                                            </div>
                                            <div className='flex items-center space-x-1'>
                                                <Mail size={15}/> <div className=''> : {captainInfo.email}</div>
                                            </div>
                                        </div>
                        </div>
                        <div className='flex justify-center'>
                            <div onClick={()=>{
                                if(seatsBooked>numberOfSeatsAvailable || seatsBooked<=0){
                                    toast.error("Enter Valid Number")
                                    return;
                                }
                                const rideId=ride.rideid
                                HandleBooking({rideId,seatsBooked,captainInfo, ride, setLoading,setShowBookTicket , authUser ,getEmailJsRideBookedEvent})
                                
                                }} className=' border-2 bg-blue-500 hover:border-blue-400  text-white p-2 mb-2 rounded-2xl text-center mt-4 w-20 cursor-pointer'>
                                <BookingLabel/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }


    
    return (
        <>  { showBookTicket ? <BookTicket/> : null }
            <div onClick={()=>{
                if(numberOfSeatsAvailable>0){
                    setShowBookTicket(e=>!e)
                }else{
                        toast.error('Sorry Ride is Full !!!');
                        return;
                    
                }
                }} className={`border-2 mb-7 h-38 mx-40 cursor-pointer rounded-xl p-2 shadow-md ${showBookTicket ?'': 'hover:border-blue-300 transition ease-in-out duration-300 hover:shadow-2xl hover:-translate-y-1'}`}>
                    <div className='flex justify-between'>   
                        
                        <div className="flex  space-x-5 items-center">    
                            <div className="flex mt-1 ml-3 items-center text-sm font-medium space-y-1">
                                <div className='flex flex-col items-center mr-4 mt-1'>
                                    <div className='text-xl'>
                                        {fromLocationArray[0]}
                                    </div>
                                    <div>
                                        {fromLocationArray[1]}    
                                    </div>
                                </div>
                                <div className='w-14'>
                                    {fromTime}
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
                            <div className="flex flex-col mt-1 ml-3 font-medium text-sm space-y-1">
                            <div className="flex mt-1 ml-3 items-center text-sm font-medium space-y-1">
                                <div className='w-14'>
                                    {toTime}
                                </div>
                                <div className='flex flex-col items-center'>
                                    <div className='text-xl'>
                                    {toLocationArray[0]}
                                    </div>
                                    <div>
                                    {toLocationArray[1]}
                                        
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className='flex text-3xl items-center font-medium mr-2 mb-3'>
                            <IndianRupee className="mt-1"/>
                            {price}
                        </div>
                    
                    </div> 


                    <hr className="border-1 mx-2 border-gray-300 rounded-2xl mt-2"/>
                    
                    
                    <div className='flex items-center justify-between ml-1'>
                        <div className='flex items-center space-x-4'>
                            
                            <div className='flex flex-col items-center'>
                                <div className="mt-2 ml-4 ">
                                    {boolCar?<CarFront/>:<Bike/>} 
                                </div>
                                <div className='ml-4 text-sm font-semibold'>
                                    {capitaliser(vehicleName)}
                                </div>
                            </div>
                            
                            <div className='mt-3 ml-6 text-xl p-1 bg-gray-400 text-white border-2 rounded-full w-10 h-10 text-center '>
                                { captainInfo.firstname? captainInfo.firstname[0].toUpperCase():"?"}
                            </div>

                            <div className=' flex items-center mt-3 ml-3 font-medium text-sm'>
                                
                                <div className='flex space-x-1'>
                                    <div>{captainInfo.firstname ? capitaliser(captainInfo.firstname) : "?"}</div>
                                    <div>{captainInfo.lastname ? capitaliser(captainInfo.lastname) : "?"}</div>
                                </div>

                                <div className='flex ml-3 items-center text-gray-500'>
                                    {captainInfo.ratingsgiven>0 ?
                                        <div className='text-xs mr-1'>{((captainInfo.rating)/(captainInfo.ratingsgiven))}</div>
                                        :
                                        0
                                    }
                                    <div className=''>
                                        <Star size={12} className='' />
                                    </div>
                                </div>
                            
                            </div>
                            
                            <div>
                                {  numberOfSeatsAvailable>0 ?
                                    <Seats numberOfSeats={numberOfSeats} numberOfSeatsAvailable={numberOfSeatsAvailable} />
                                    :
                                    <div className={`text-xs font-medium mt-3 ml-6 border-2 p-2 rounded-3xl bg-red-300 border-red-300 shadow-md `}>This Ride is full !!!</div>
                                }
                                
                            </div>
                        </div>

                        <div className='flex space-x-2 text-xs font-normal mt-3'>
                            {facilities.map((fac,index)=><div key={index}
                                                    className='border-2 p-1 rounded-md bg-blue-400 '
                                                >
                                                    {
                                                        fac!="" && <>{fac}</>
                                                    }
                                                </div>)}
                        </div>
                    </div>
            </div>
        </>
    )
}