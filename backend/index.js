const express=require("express");
const app=express();
const PORT=3000
const mainRouter=require("./routes/index")
const axios=require("axios")
const path=require("path")
const cors=require("cors")
const dir=path.resolve()

app.use(cors())
app.use(express.json());
app.use("/",mainRouter)


if(process.env.NODE_ENV=='production'){
  app.use(express.static(path.join(dir,"/frontend/dist")))

  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(dir,"frontend","dist","index.html"))
  })
}

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})
