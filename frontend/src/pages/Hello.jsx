import React from 'react'
import { useNavigate } from 'react-router-dom'
const Hello = () => {
const navigate=useNavigate()
  return (
    <div onClick={navigate("/cabapp")}>
      hihihihihi
    </div>
  )
}

export default Hello
