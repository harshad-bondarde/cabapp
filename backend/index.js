const express=require("express");
const app=express();
const PORT=3000
const mainRouter=require("./routes/index")
const axios=require("axios")

const cors=require("cors")
app.use(cors())
app.use(express.json());
app.use("/",mainRouter)

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})
