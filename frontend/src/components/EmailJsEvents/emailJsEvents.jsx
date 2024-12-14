import React, { useEffect } from 'react'
import axios from 'axios'
export const getEmailJsRideBookedEvent = ({
          captain_name, 
          captain_email ,
          src,
          dest,
          ride_date,
          user_name,
          user_emailID,
          user_phoneno,
          user_seatsBooked}) => { 
  //to_email as captain email 
  const message= `Your Ride ${src}  to  ${dest} on date  `+ String(ride_date) +` has been booked by  ${user_name} , Email ID :   ${user_emailID} , PhoneNo. : `+ String(user_phoneno) + ` , SeatsBooked :  `+ String(user_seatsBooked)
  const serviceId=import.meta.env.VITE_EMAILJS_SERVICEID
  const publickKey=import.meta.env.VITE_EMAILJS_PUBLICKEY
  const templateId=import.meta.env.VITE_EMAILJS_TEMPLATEID
  
    const data={
      service_id:serviceId,
      template_id:templateId,
      user_id: publickKey,
      template_params:{
        to_name:captain_name,
        from_name:'CabApp',
        to_email:captain_email,
        message:message
      }
    }
  const sendEmail=async ()=>{
    try {
      const res=await axios.post('https://api.emailjs.com/api/v1.0/email/send',data)
      console.log(res.data);
      console.log("email sent")
    } catch (error) {
      console.log(error)
    }
  }

  
  return sendEmail;
}


export const getEmailJsRideDeletedEvent = ({ 
              passenger_name, 
              passenger_email , 
              src , 
              dest , 
              ride_date , 
              user_name , 
              user_emailID , 
              user_phoneno }) => {
  //to_email as passenger email 
  const message= `Your Booked Ride ${src}  to  ${dest} on date  `+ String(ride_date) +` has been deleted by  ${user_name} , Email ID :   ${user_emailID} , PhoneNo. : `+ String(user_phoneno)
  const serviceId=import.meta.env.VITE_EMAILJS_SERVICEID
  const publickKey=import.meta.env.VITE_EMAILJS_PUBLICKEY
  const templateId=import.meta.env.VITE_EMAILJS_TEMPLATEID

  const data={
    service_id:serviceId,
    template_id:templateId,
    user_id: publickKey,
    template_params:{
      to_name:passenger_name,
      from_name:'CabApp',
      to_email:passenger_email,
      message:message
    }
  }

  const sendEmail=async ()=>{
    try {
      const res=await axios.post('https://api.emailjs.com/api/v1.0/email/send',data)
      console.log(res.data);
      console.log("email sent to passenger")
    } catch (error) {
      console.log(error)
    }
  }

  // sendEmail()
  return sendEmail
}

