const {createClient} =require('redis');
const dotenv=require("dotenv")
dotenv.config()
const clientR=createClient({
    url: process.env.REDIS_URL
})

async function connectRedis() {
    clientR.on('error', err => console.log('Redis Client Error', err));
    clientR.connect();
}
connectRedis().then(() => {
    console.log("Redis connected");
}).catch(err => {
    console.error("Redis connection error:", err);
}); 

module.exports={
    clientR
}