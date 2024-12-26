const express=require("express");
const app=express();
const PORT=3000
const mainRouter=require("./routes/index")
const axios=require("axios")

const cors=require("cors")
const corsOptions={
    origin: ["https://cabapp-delta.vercel.app","http://localhost:5173","http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE"]
}
app.use(cors(corsOptions))
// app.use(cors())
app.use(express.json());
app.use("/",mainRouter)

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})
