import React from 'react'
import { useDispatch , useSelector } from 'react-redux'
import GetRealTimeLocations from './mapboxAPI/getRealTimeLocations'
import ShowCaptainInfo from './ShowCaptainInfo'
import ShowPassengerDetails from './ShowPassengerDetails'
const OverHome = () => {
    const dispatch=useDispatch()
    const { showMap , coordinates }=useSelector(state=>state.map)
    const { showCaptainInfo , passengerDetails }=useSelector(state=>state.user)
    return (
        <>
            {   showMap &&
                <div className="fixed z-50 inset-0 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0">
                    <div className="flex justify-center">
                        <div className="flex flex-col items-center w-full h-full ml-20 mr-20 ">
                            <GetRealTimeLocations INITIAL_ZOOM={7}/>
                        </div>
                    </div>
                </div>
            }
            {
                showCaptainInfo && 
                <div className="fixed z-50 inset-0 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0">
                    <div className="flex justify-center">
                        <div className="flex flex-col items-center w-full h-full ml-20 mr-20 ">
                            <ShowCaptainInfo/>
                        </div>
                    </div>
                </div>
            }

            {   
                passengerDetails?.length>0 && 
                <div style={{ overflow:'scroll' }} className="fixed z-50 inset-0 h-screen w-screen bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0">
                    <div className="flex justify-center">
                        <div className="flex flex-col items-center w-full h-full ml-20 mr-20 ">
                            <ShowPassengerDetails passengers={passengerDetails}/>
                        </div>
                    </div>
                </div>

            }
        </>
    )
}

export default OverHome
