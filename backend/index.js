const express=require("express");
const app=express();
const PORT=3000
const mainRouter=require("./routes/index")
const axios=require("axios")

const cors=require("cors")
app.use(cors())
app.use(express.json());
app.use("/",mainRouter)

if(process.env.NODE_ENV=='production'){
  app.use(express.static(path.join(__dirname,"/frontend/dist")))

  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
  })
}

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})
