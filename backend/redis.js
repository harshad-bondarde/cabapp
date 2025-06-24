import {createClient} from 'redis';
const client=createClient({
    url: process.env.REDIS_URL || 'redis://default:iHgurH3S9Oo4QoUYTp7WQwAqzP38NWaE@redis-19075.c301.ap-south-1-1.ec2.redns.redis-cloud.com:19075',
})

client.on('error', err => console.log('Redis Client Error', err));
await client.connect();

mofule.exports={
    client
}