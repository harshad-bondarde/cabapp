import React from 'react'
import { X } from 'lucide-react';
import { useDispatch ,useSelector } from 'react-redux';
import { setShowCaptainInfo } from '../store/userSlice';
import { Profile } from './home/YourProfile/Profile';
const ShowCaptainInfo = () => {
    const dispatch=useDispatch()
    const {showCaptainInfo}=useSelector(state=>state.user)
  return (
    <>
        <div>
            <div className='flex justify-center mt-32'>
                <X className=' bg-gray-500 rounded-full p-1 hover:bg-red-500' onClick={()=>dispatch(setShowCaptainInfo(null))}/>
            </div>
            <Profile userInfo={showCaptainInfo}/>
        </div> 
    </>
  )
}

export default ShowCaptainInfo
