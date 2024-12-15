// import { Cld } from "../components/Cloudinary"
import { useEffect, useState } from "react"
import { getEmailJsRideBookedEvent } from "../components/EmailJsEvents/emailJsEvents"
export function Test(){
    
    function send(){
        const sendEmail=getEmailJsRideBookedEvent({
            captain_name:"harshad",
            captain_email:"harshadbondarde2206@gmail.com",
            src:'pune',
            dest:'mumbai',
            ride_date:'11-07-2024',
            user_name:'me',
            user_emailID:'user@gmail.com',
            user_phoneno:'100',
            user_seatsBooked:'2'
        })
    }
    useEffect(()=>{
        // send()

    },[])
    const boardingpoint=useState([])
    return(
        <>
            {/* <Cld/> */}

            {/* <input type="text" value={boardingpoint} onChange={()=>}/> */}
        </>
    )
}
