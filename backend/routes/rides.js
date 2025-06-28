const express=require("express")
const router=express.Router()
const {userMiddleware}=require("../middlewares/userMiddleware")
const {client}=require("../db")
const {clientR}=require("../redis")

router.post("/addRide",userMiddleware,async(req,res)=>{
    const userId=req.userId
    const info=req.body;

    const fromLocationInfo=req.body.fromLocationInfo
    const toLocationInfo=req.body.toLocationInfo

    const fromLocation=fromLocationInfo.name_preferred+"-"+fromLocationInfo.place_formatted
    const toLocation=toLocationInfo.name_preferred+"-"+toLocationInfo.place_formatted
    
    const fromCoordinates=fromLocationInfo.coordinates
    const toCoordinates=toLocationInfo.coordinates

    const fromMapboxId=req.body.fromMapboxId
    const toMapboxId=req.body.toMapboxId
    try{           
        await client.query('BEGIN')     
        const text=`insert into rides (userId,
                                       fromtime,
                                       fromlocation,
                                       totime,
                                       tolocation,
                                       fromlongitude,
                                       fromlatitude,
                                       tolongitude,
                                       tolatitude,
                                       date,
                                       boolcar,
                                       vehiclename,
                                       numberofseats,
                                       price,
                                       facilities,
                                       numberofseatsavailable,
                                       boardingpoint,
                                       droppingpoint,
                                       frommapboxid,
                                       tomapboxid,
                                       path)
                    values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21);`
        const response1=await client.query(text,[userId,
                                        info.fromTime,
                                        fromLocation, 
                                        info.toTime,
                                        toLocation, 
                                        fromCoordinates.longitude,
                                        fromCoordinates.latitude,
                                        toCoordinates.longitude,
                                        toCoordinates.latitude,
                                        info.date,
                                        info.boolCar,
                                        info.vehicleName,
                                        info.numberOfSeats,
                                        info.price,
                                        info.facilities,
                                        info.numberOfSeats,
                                        info.boardingPoint,
                                        info.droppingPoint,
                                        fromMapboxId,
                                        toMapboxId,
                                        JSON.stringify(info.path)
                                        ])
        const text2=`update users
                    set numberofrides=numberofrides+1
                    where id=$1`
        const response2=await client.query(text2,[userId])
        if(response1.rowCount>0 && response2.rowCount>0){
            await client.query('COMMIT');
            //Redis
            const cachedRides=await clientR.get(`availableRides:${fromMapboxId}-${toMapboxId}-${info.date}`)
            if(cachedRides){
                const updatedRides=JSON.parse(cachedRides)
                const newRides=[
                    ...updatedRides,
                    response1.rows[0]
                ]
                clientR.set(`availableRides:${fromMapboxId}-${toMapboxId}-${info.date}`,JSON.stringify(newRides))
            }   
            return res.status(200).json({
                message:"Ride Inserted"
            })
        }

        await client.query('ROLLBACK')
        return res.status(503).json({
            message:"Something Went Wrong Try Again..."
        })                             
    }catch(e){
        await client.query('ROLLBACK');
        console.log(e)
        return res.status(403).json({
            message:`Error while inserting ride`
        })
    }   
})


router.post("/AvailableRides",userMiddleware,async(req,res)=>{
    const userId=req.userId;
    const date=req.body.date;
    const fromMapboxId=req.body.fromMapboxId
    const toMapboxId=req.body.toMapboxId
    
    //Redis
    const cachedRide=await clientR.get(`availableRides:${fromMapboxId}-${toMapboxId}-${date}`)
    if(cachedRide){
        return res.status(200).json({
            rides:JSON.parse(cachedRide)
        })
    }
    
    try{
        const text=`select * from rides 
                    where frommapboxid=$1 and 
                          tomapboxid=$2 and  
                          date=$3 and boolride=$4 and userid!=$5`
        const response=await client.query(text,[
                                    fromMapboxId,
                                    toMapboxId,
                                    date,
                                    true,
                                    userId
        ]);

        await clientR.set(`availableRides:${fromMapboxId}-${toMapboxId}-${date}`,JSON.stringify(response.rows))
        console.log(response.rows)
        
        return res.status(200).json({
            rides:response.rows
        })
    }
    catch(e){
        console.log(e)
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
                        bookedrides.captainfirstname,
                        bookedrides.captainlastname,
                        bookedrides.feedback,
                        rides.userid as captainid,
                        rides.rideid,
                        rides.userid,
                        rides.fromtime,
                        rides.fromlocation,
                        rides.fromlongitude,
                        rides.fromlatitude,
                        rides.totime,
                        rides.tolocation,
                        rides.tolongitude,
                        rides.tolatitude,
                        rides.date,
                        rides.boolcar,
                        rides.boolride,
                        rides.vehiclename,
                        rides.price,
                        rides.facilities,
                        rides.boardingpoint,
                        rides.droppingpoint,
                        rides.path 
                    from bookedrides 
                    join rides on bookedrides.rideid=rides.rideid
                    where bookedrides.userid=$1
                    order by date`
        const response=await client.query(text,[userId]);
        return res.status(200).json({
            bookedRides:response.rows
        })
    }
    catch(e){
        console.log(e)
        return res.status(500).json({
            message:"internal server error "
        })
    }
})


//get captainrides
router.get("/getrides",userMiddleware,async (req,res)=>{
    
    const userId=req.userId;
    try{
        const text=`select * from rides 
                    where userid=$1 order by (boolride is false),date`
        const response=await client.query(text,[userId])
        return res.status(200).json({
            rides:response.rows
        })
    
    }catch(e){
        console.log(e)
        return res.status(503).json({
            error:"error while getting the rides :"
        })
    }
})

router.post("/getpassengerdetailes",userMiddleware,async (req,res)=>{
    const userId=req.userId;
    const { rideId }=req.body
    const text=`select users.firstname,
                       users.lastname,
                       users.email,
                       users.gender,
                       users.phoneno,
                       bookedrides.seatsbooked,
                       bookedrides.bookedridesid,
                       bookedrides.feedback
                       from users 
                       join bookedrides on bookedrides.userid=users.id 
                       where rideid=$1`
    try {
        const response=await client.query(text,[rideId])
        return res.status(200).json({
            passengers:response.rows
        })
    } catch (e) {
        console.log(e)
        return res.status(503).json({
            message:"something went wrong"
        })
    }
})

router.post("/getpassengernameemail",async (req,res)=>{
    const rideId=req.body.rideId;
    const text=`select users.firstname,
                       users.lastname,
                       users.email
                       from users
                       join bookedrides on bookedrides.userid=users.id
                       where rideid=$1` 
    try {
        const response=await client.query(text,[rideId]);
        return res.status(200).json({
            passengers:response.rows
        })
        console.log(response)
    } catch (error) {
        console.log(error)
        return res.status(503).json({
            message:"something went wrong while getting user info" 
        })
    }
})

router.post("/addfeedback",async(req,res)=>{
    const { bookedRidesId , feedback , captainId , rating }=req.body
    console.log(req.body)
    const text1=`update bookedrides
                set feedback=$1
                where bookedridesid=$2`
    const text2=`update users 
                 set rating=rating+$1 ,
                     ratingsgiven=ratingsgiven+1
                 where id=$2`
    await client.query('BEGIN')
    try {
        const response1=await client.query(text1,[ feedback , bookedRidesId ])
        const response2=await client.query(text2,[ rating , captainId ])
        if(response1.rowCount==1 && response2.rowCount==1){
            await client.query('COMMIT')
            return res.status(200).json({
                message:"Thank You For Feedback"
            })
        }else{
            await client.query('ROLLBACK')
            console.log(error.message)
            return res.status(503).json({
                message:"Something Went Wrong..."
            })
        }
    } catch (error) {
        await client.query('ROLLBACK')
        console.log(error.message)
        return res.status(503).json({
            message:"Something Went Wrong..."
        })
    }             
})

module.exports=router;


