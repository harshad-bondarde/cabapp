import {createClient} from 'redis';
const dotenv=require("dotenv")
dotenv.config()
const client=createClient({
    url: process.env.REDIS_URL
})

client.on('error', err => console.log('Redis Client Error', err));
await client.connect();

mofule.exports={
    client
}