import React from 'react'
import { setPassengerDetails } from '../store/userSlice'
import { X } from 'lucide-react'
import { useSelector , useDispatch } from 'react-redux'
const ShowPassengerDetails = () => {
    const dispatch=useDispatch()
    const { passengerDetails }=useSelector(state=>state.user)

    const MapPassenger=({passenger})=>{
    return (
        <div className='text-center grid grid-cols-7 divide-x-4'>
            <div className='p-3'>
                {passenger?.bookedridesid}
            </div>
            <div className='p-3'>
                {passenger?.firstname+" "+passenger?.lastname}
            </div>
            <div className='p-3'>
                {passenger?.gender}
            </div>
            <div className='p-3 overflow-y-auto
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar]:h-2
                        [&::-webkit-scrollbar-track]:bg-gray-500
                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-300
                        dark:[&::-webkit-scrollbar-track]:rounded-full
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                        dark:[&::-webkit-scrollbar-thumb]:rounded-full
                        '>
                {passenger?.email}
            </div>
            <div className='p-3'>
                {passenger?.phoneno}
            </div>
            <div className='p-3'>
                {passenger?.seatsbooked}
            </div>
            <div className='p-3 overflow-y-auto
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar]:h-2
                        [&::-webkit-scrollbar-track]:bg-gray-500
                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-300
                        dark:[&::-webkit-scrollbar-track]:rounded-full
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                        dark:[&::-webkit-scrollbar-thumb]:rounded-full'>
                {passenger?.feedback!=null ? passenger?.feedback:''}
            </div>
        </div>
    )
  }
  return (
    <div>
        <div className='flex justify-center mt-32 mb-12'>
            <X className='cursor-pointer  bg-gray-500 rounded-full p-1 hover:bg-red-400' onClick={()=>dispatch(setPassengerDetails(null))}/>
        </div>
        <div className='bg-opacity-50 rounded-2xl p-5 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg '>
            <div className='text-center grid grid-cols-7 font-semibold'>
                <div>Ticket ID</div>
                <div>Name</div>
                <div>Gender</div>
                <div>Email</div>
                <div>Phone No</div>
                <div>Seats Booked</div>
                <div>Feedback</div>
            </div>
            { 
                passengerDetails?.map((passenger,key)=><MapPassenger key={key} passenger={passenger}/>) 
            }
        </div>
    </div>
  )
}

export default ShowPassengerDetails
