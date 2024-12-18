import React from 'react'
import { CircleUser } from 'lucide-react'

export const Seats = ({numberOfSeats,numberOfSeatsAvailable}) => {
    const divs=[]
    {    
        for(let i=0;i<numberOfSeats;i++){
            divs.push(
                i<numberOfSeatsAvailable?
                    <CircleUser key={i} className='text-green-400 '/>
                    :
                    <CircleUser key={i} className='text-red-400'/>
            )
        }
    }       
    return (
        <div className='flex mt-3 ml-4 space-x-1 items-center '>
            {divs}
        </div>
    )
}

export default Seats
