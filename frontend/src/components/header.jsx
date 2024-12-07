import {IconCircleDashedPlus} from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setAuthUser } from "../store/userSlice";
export function Header({setRenderButton , firstname}){
    const navigate=useNavigate();
    const dispatch=useDispatch()
    return (
        <div className="bg-slate-100 p-2 mx-2 rounded-xl mt-1 shadow-md border-slate-500 flex justify-between ">
            <div className="bg-green-500 rounded-full w-20 h-20 text-center flex flex-col justify-center text-slate-50 text-lg p-1 ml-6 shadow-lg border-green-500 border-4 shadow-green-300 ">
                CabApp
            </div>

            <div className="p-1 flex space-x-8 items-center mr-2">
                <div className="bg-slate-500 w-12 h-12 rounded-full text-center flex flex-col justify-center font-bold  text-white border-2 border-slate-500 text-2xl shadow-xl cursor-pointer " 
                  onClick={()=>{
                    setRenderButton(3)
                  }}  >
                    {/* H */}
                    {firstname? firstname[0].toUpperCase() : null}
                </div>
                <div className="flex bg-red-200 border-2 font-medium text-sm border-red-200 rounded-lg p-3 shadow-xl cursor-pointer hover:shadow-red-300 transition ease-in-out duration-300">
                    <div onClick={()=>{
                        localStorage.removeItem("token")
                        dispatch(setAuthUser(null))
                        navigate("/cabapp")
                    }}>
                        Sign Out
                    </div>
                </div>
            
            </div>

        </div>
    )
}