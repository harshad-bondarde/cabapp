const {Client} =require('pg')

const client=new Client({
    host:'localhost',
    user:'postgres',
    port:5432,
    password:'post',
    database:'CabApp'
})

client.connect();
console.log("connected")
module.exports={client};