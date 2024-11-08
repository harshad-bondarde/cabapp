const express=require("express")
const router=express.Router()
const {userMiddleware}=require("../middlewares/userMiddleware")
const {client}=require("../db")


router.post("/addRide",userMiddleware,async(req,res)=>{
    const userId=req.userId
    const info=req.body;
    try{           
        await client.query('BEGIN')     
        const text=`insert into rides (userId,
                                       fromtime,
                                       fromlocation,
                                       totime,
                                       tolocation,
                                       date,
                                       boolcar,
                                       vehiclename,
                                       numberofseats,
                                       price,
                                       facilities,
                                       numberofseatsavailable)
                    values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);`
        const response=await client.query(text,[userId,
                                        info.fromTime,
                                        info.fromLocation,
                                        info.toTime,
                                        info.toLocation,
                                        info.date,
                                        info.boolCar,
                                        info.vehicleName,
                                        info.numberOfSeats,
                                        info.price,
                                        info.facilities,
                                        info.numberOfSeats
                                        ])
        const text2=`update users
                    set numberofrides=numberofrides+1
                    where id=$1`
        await client.query(text2,[userId])

        await client.query('COMMIT');

            return res.status(200).json({
                message:"ride inserted"
            })
    }catch(e){
        await client.query('ROLLBACK');
        return res.status(403).json({
            message:`error while inserting ride ${e}`
        })
    }    
})


router.post("/AvailableRides",async(req,res)=>{
    const userId=req.userId;
    const info=req.body;
    try{
        const text=`select * from rides 
                    where fromlocation=$1 and tolocation=$2 and date=$3 `
        const response=await client.query(text,[info.from,info.to,info.date]);
        return res.status(200).json({
            rides:response.rows
        })
    }
    catch(e){
        return res.status(403).json({
            message:"error while searching for a ride..."
        })
    }
})


router.get("/bookings",userMiddleware, async(req,res)=>{
    const userId=req.userId;
    try{    
        const text=`select bookedrides.seatsbooked,
                        bookedrides.bookedridesid,
                        bookedrides.captainid,
                        bookedrides.captainfirstname,
                        bookedrides.captainlastname,
                        bookedrides."date",
                        bookedrides.boolride,
                        rides.userid,
                        rides.fromtime,
                        rides.fromlocation,
                        rides.totime,
                        rides.tolocation,
                        rides.date,
                        rides.boolcar,
                        rides.vehiclename,
                        rides.price,
                        rides.facilities
                    from bookedrides 
                    join rides on bookedrides.rideid=rides.rideid
                    where bookedrides.userid=$1`
        const response=await client.query(text,[userId]);
        return res.status(200).json({
            bookedRides:response.rows
        })
    }
    catch(e){
        return res.status(500).json({
            message:"internal server error "+e
        })
    }
})


//get captainrides
router.get("/getrides",userMiddleware,async (req,res)=>{
    
    const userId=req.userId;
    try{
        const text=`select * from rides 
                    where userid=$1`
        const response=await client.query(text,[userId])
        return res.status(200).json({
            rides:response.rows
        })
    
    }catch(e){
        return res.status(503).json({
            error:"error while getting the rides :"+e
        })
    }
})

module.exports=router;


