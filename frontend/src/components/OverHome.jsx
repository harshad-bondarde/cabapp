import React from 'react'
import { useDispatch , useSelector } from 'react-redux'
import GetRealTimeLocations from './mapboxAPI/getRealTimeLocations'
import ShowCaptainInfo from './ShowCaptainInfo'
const OverHome = () => {
    const dispatch=useDispatch()
    const { showMap , coordinates }=useSelector(state=>state.map)
    const {showCaptainInfo}=useSelector(state=>state.user)
    console.log(showCaptainInfo)
    return (
        <>
            {   showMap &&
                <div className="absolute z-50 inset-0 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0">
                    <div className="flex justify-center">
                        <div className="flex flex-col items-center w-full h-full ml-20 mr-20 ">
                            <GetRealTimeLocations INITIAL_ZOOM={5}/>
                        </div>
                    </div>
                </div>
            }
            {
                showCaptainInfo && 
                <div className="absolute z-50 inset-0 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0">
                    <div className="flex justify-center">
                        <div className="flex flex-col items-center w-full h-full ml-20 mr-20 ">
                            <ShowCaptainInfo/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default OverHome
