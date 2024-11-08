const express=require("express")
const router=express.Router();
const zod=require("zod");
const jwt=require("jsonwebtoken")
const {client}=require("../db")

const signupSchema=zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string().min(6),
    email:zod.string().email(),
    gender:zod.string(),
    phoneNo:zod.number().refine((val)=>{
        return val.toString().length==10;
    },{
        msg:"phone number should contain atleast 10 characters"
    })
})

router.post("/signup",async(req,res)=>{
    const body=req.body;
    const parsed=signupSchema.safeParse(body);
    if (!parsed.success) {
        console.log("Validation Error:", parsed.error); 
        return res.json({
            message: "Incorrect inputs",
            errors: parsed.error.errors, 
        });
    }


    const text=`select id from admins where email=$1`
    const response=await client.query(text,[body.email])
    
    if(response.rows.length>=1){
        return res.json({
            message:'email already exists'
        })
    }

    const addquery=`insert into admins (firstname,lastname,password,email,gender,phoneNo) 
                    values ($1,$2,$3,$4,$5,$6)`
    try {
        const res=await client.query(addquery,[body.firstName,body.lastName,body.password,body.email,body.gender,body.phoneNo])
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            msg:"error while inserting in database"
        })
    }

    res.json({
        msg:"user inserted"
    })
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

    const text=`select id from admins where email=$1`;
    const response=await client.query(text,[body.email]);
    if(response.rows.length==0){
        return res.status(403).json({
            message:"user not found"
        })
    }

    const adminid=response.rows[0].id;
    const token=jwt.sign({adminid:adminid},JWT_SECRET);
    return res.json({
        token:token
    })


})
module.exports=router;
