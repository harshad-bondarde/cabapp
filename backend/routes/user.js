const express=require("express")
const router=express.Router();
const zod=require("zod");
const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../config")
const {client}=require("../db")
const {userMiddleware}=require("../middlewares/userMiddleware")
const rides=require("./rides");

router.use("/rides",rides);

const signupSchema=zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string().min(6),
    email:zod.string().email(),
    gender:zod.string(),
    phoneNo:zod.string()
})
router.post("/signup",async(req,res)=>{
    const body=req.body;
    // const {success,error}=signupSchema.safeParse(body);
    const parsed=signupSchema.safeParse(body);
    if (!parsed.success) {
        console.log("Validation Error:", parsed.error);
        return res.json({
            message: "Incorrect inputs",
            errors: parsed.error.errors, 
        });
    }


    const text=`select id from users where email=$1`
    const response=await client.query(text,[body.email])

    if(response.rows.length==1){
        return res.json({
            message:'email already exists'
        })
    }

    const addquery=`insert into users (firstname,lastname,password,email,gender,phoneno) 
                    values ($1,$2,$3,$4,$5,$6)`
    try {
        const response2=await client.query(addquery,[body.firstName,body.lastName,body.password,body.email,body.gender,body.phoneNo])
        if(response2.rows.length>0){

        }
        res.status(200).json({
            msg:"user inserted"
        })
    } catch (error) {
        console.log(error);
        return res.status(503).json({
            msg:"error while inserting in database"
        })
    }



})



const signinSchema=zod.object({
    email:zod.string().email(),
    password:zod.string()
})
router.post("/signin",async(req,res)=>{
    const body=req.body;
    const parsed=signinSchema.safeParse(body);
    if(!parsed.success){
        return res.status(403).json({
            message:"invalid credentials"
        })
    }

    const text=`select * from users where email=$1 and password=$2`;
    const response=await client.query(text,[body.email,body.password]);
    if(response.rows.length==0){
        return res.status(403).json({
            message:"User Not Found"
        })
    }

    const userId=response.rows[0].id;
    const token=jwt.sign({userId:userId},JWT_SECRET);
    return res.status(200).json({
        token:token,
        authUser:response.rows[0]
    })
})


//to select a user
router.post("/getuser",userMiddleware,async(req,res)=>{
    let userId=req.body.userId; //if we wan
    console.log(userId)
    if(userId==null)
            userId=req.userId
    try{
        const text=`select firstname,lastname,email,gender,phoneno,rating,numberofrides,ratingsgiven from users where id=$1`;
        const response=await client.query(text,[userId])
        if(response.rows.length==0){
            return res.status(200).json({
                message:"user not found"
            })
        }
        return res.status(200).json({
            userInfo:response.rows[0]
        })
    }catch(e){
        console.log("error while searching user in database: ",e)
        res.status(503).json({
            message:"Something Went Wrong try again"
        })
    }

})

router.post("/bookride",userMiddleware,async(req,res)=>{
    const userId=req.userId
    const body=req.body;
    try{
        client.query('BEGIN')
        const text1=`insert into bookedrides (userid,
                                              rideid,
                                              seatsbooked,
                                              date,
                                              captainfirstname,
                                              captainlastname) 
                                              values ($1,$2,$3,$4,$5,$6)`
                                            //   captainid,
        const response1=await client.query(text1,[userId,
                                                 body.rideId,
                                                 body.seatsBooked,
                                                 body.date,
                                                //  body.captainId,
                                                 body.captainFirstname,
                                                 body.captainLastname])
        
        const text2=`update rides 
                    set numberofseatsavailable=numberofseatsavailable-$1 
                    where rideid=$2`
        const response2=await client.query(text2,[body.seatsBooked,body.rideId]);
        if(response1.rowCount==1 && response2.rowCount==1){
            client.query('COMMIT');
            res.status(200).json({
                message:"ride is booked..."
            })
        }else{
            client.query('ROLLBACK')
            res.status(503).json({
                messgae:"rows not affect during transaction"
            })
        }
    }catch(e){
        client.query('ROLLBACK')
        console.log(e)
        res.status(503).json({
            message:"error during Booking Transaction"
        })
    }   
})


//cancel rides for user
router.post("/cancelride",userMiddleware,async(req,res)=>{
    const body=req.body;
    console.log(body)
    try{
        await client.query('BEGIN')
        const text1=`delete from bookedrides
                    where bookedridesid=$1`
        const response1=await client.query(text1,[body.bookedRidesId])
        console.log(response1)
        const text2=`update rides
                     set numberofseatsavailable=numberofseatsavailable+$1
                     where rideid=$2`
        const response2=await client.query(text2,[body.seatsBooked , body.rideId])
        console.log(response2)
        if(response1.rowCount==1 && response2.rowCount==1){
            await client.query('Commit')
            return res.status(200).json({
                message:"ride deleted successfully"
            })
        }else{
            await client.query('ROLLBACK')
            res.status(503).json({
                message:"rows not affetcted during transaction..."
            })
        }

    }catch(e){
        return res.status(503).json({
            error:"error while deleting ride query : "+e
        })
    }
})

// deleteride for captain
router.post("/deleteride",userMiddleware, async(req,res)=>{
    const userId=req.userId
    const body=req.body;
    console.log(body)
    console.log(userId)
    try{
        await client.query('BEGIN')
        
        const text1=`update rides
                     set boolride=$1
                     where rideid=$2`
        const response1=await client.query(text1,[false,body.rideId])
        // console.log(response1)
        const text2=`update users
                     set numberofrides=numberofrides-1
                     where id=$1`
        const response2=await client.query(text2,[userId]);
        console.log(response2)
        if(response1.rowCount>0 && response2.rowCount>0){
            await client.query('COMMIT')
            return res.status(200).json({
                message:"ride deleted successfully..."
            })
        }else{
            await client.query('ROLLBACK')
            res.status(503).json({
                error:"error while deleting rides.."
            })
        }
    }catch(e){
        await client.query('ROLLBACK')
        return res.status(503).json({
            message:"Error while deleting the ride"
        })
    }
})

module.exports=router;
