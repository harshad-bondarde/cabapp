import axios from "axios"
import toast from "react-hot-toast"
import { url } from "../../../assets/url"

export async function HandleBooking({rideId,seatsBooked,captainInfo , ride ,setLoading,setShowBookTicket ,authUser , getEmailJsRideBookedEvent}){
    
    console.log("hi")
    //captainId captainFirstname captainLastname
    const captainId=captainInfo.id
    const captainFirstname=captainInfo.firstname
    const captainLastname=captainInfo.lastname

    const fromLocation=ride.fromlocation;
    const fromLocationArray=fromLocation.split("-")
    
    const toLocation=ride.tolocation;
    const toLocationArray=toLocation.split("-")
    let date=new Date()
    let day=date.getDate()
    let month=date.getMonth()+1
    let year=date.getFullYear()
    const sendEmail=getEmailJsRideBookedEvent({
        captain_name:captainFirstname+' '+captainLastname,
        captain_email:captainInfo.email,
        src:fromLocationArray[0]+","+fromLocationArray[1],
        dest:toLocationArray[0]+","+toLocationArray[1],
        ride_date:ride.date,
        user_name:authUser.firstname+" "+authUser.lastname,
        user_emailID:authUser.email,
        user_phoneno:authUser.phoneno,
        user_seatsBooked:seatsBooked
    })
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
            await sendEmail()
            toast.success("Ride Booked Successfully")
            
        }
    }catch(e){
        if(e.response && e.response.status==403){
            console.log(e.response)
            toast.error("You are not Signed In !!!")
            navigate("/")
        }
        if(e.response && e.response.status==503){
            console.log(e.response)
            toast.error("Internal Server Error")
        }
    }finally{
        await setLoading(false)
        setShowBookTicket(false)  
    }
    
}