import {IconCircleDashedPlus} from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setAuthUser } from "../store/userSlice";
import { LoadingRed } from "./Loading";
import { useState } from "react";

export function Header({setRenderButton , firstname}){
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(false)
    return (
        <div className="bg-slate-100 p-2 mx-2 rounded-xl mt-1 shadow-md border-slate-500 flex justify-between ">
            <div className="bg-blue-500 rounded-full font-semibold w-20 h-20 text-center flex flex-col justify-center text-slate-200 text-lg p-1 ml-6 shadow-lg border-blue-500 border-4 shadow-blue-500 ">
                CabApp
            </div>

            <div className="p-1 flex space-x-8 items-center mr-2">
                <div className="bg-slate-500 w-12 h-12 rounded-full text-center flex flex-col justify-center font-bold  text-white border-2 border-slate-500 text-2xl shadow-xl cursor-pointer " 
                  onClick={()=>{
                    setRenderButton(3)
                  }}  >
                    {firstname? firstname[0].toUpperCase() : null}
                </div>
                <div className="flex bg-red-200 w-15 h-13 border-2 font-medium text-sm border-red-200 rounded-lg p-3 shadow-xl cursor-pointer hover:shadow-red-300 transition ease-in-out duration-300">
                    <div onClick={()=>{
                        setLoading(true)
                            localStorage.removeItem("token")
                            localStorage.removeItem("authUser")
                            dispatch(setAuthUser(null))
                        setLoading(false)
                        navigate("/")
                    }}>
                        {   !loading  ?
                                'Sign Out'
                                :
                                <div className="w-5 h-5 ">
                                    {/* 'Sign Out' */}
                                    <LoadingRed/>
                                </div>
                        }
                    </div>
                </div>
            
            </div>

        </div>
    )
}