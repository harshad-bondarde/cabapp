import axios from "axios"
import toast from "react-hot-toast"
import { url } from "../../../assets/url"
// import { useNavigate } from "react-router-dom"
export async function HandleBooking({rideId,seatsBooked,captainId,captainFirstname,captainLastname,navigate,setLoading}){
    
    let date=new Date()
    let day=date.getDate()
    let month=date.getMonth()+1
    let year=date.getFullYear()

    // const navigate=useNavigate()
    
    try{ 
        setLoading(true)
        const response=await axios.post(`${url}/user/bookride`,{
            rideId:rideId,
            seatsBooked:seatsBooked,
            date:`${day}-${month}-${year}`,
            captainId:captainId,
            captainFirstname:captainFirstname,
            captainLastname:captainLastname
        },{
            headers:{
                authorization:localStorage.getItem("token")
            }
        })
        console.log(response)

        if(response.status==200){
            toast.success("Ride Booked !!!")
        }
    }catch(e){
        if(e.response && e.response.status==403){
            console.log(e.response)
            toast.error("You are not Signed In !!!")
            navigate("/cabapp")
        }
        if(e.response && e.response.status==503){
            console.log(response)
            toast.error("Internal Server Error")
        }
    }finally{
        setLoading(false)
    }
    
}