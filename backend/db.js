const dotenv=require("dotenv")
dotenv.config()
const {Client} =require('pg')

// local configuration 
// const client=new Client({
//         host:'localhost',
//         user:'postgres',
//         port:5432,
//         password:'post',
//         database:'CabApp'
//     })
    
//     client.connect();
//     console.log("connected")
//     module.exports={client};
    
//NEON DB Configuration

// const {Client} =require('pg')

const client=new Client({
    connectionString:process.env.DATABASE_URL
})
console.log(process.env.DATABASE_URL)

client.connect()
async function CreateUsersTable(){
    try {
        const response=await client.query(`
            create table if not exists users(
                id serial PRIMARY KEY,
                firstname varchar(20) not null,
                lastname varchar(20) not null,
                password varchar(255) unique not null,
                email varchar(255) unique not null,
                gender varchar(6) not null,
                phoneno varchar(10) not null,
                rating integer default 0,
                numberofrides integer default 0,
                ratingsgiven integer default 0
            )  
        `)
    } catch (error) {
        console.log(error)
    }
}

async function CreateRidesTable(){
    const response=await client.query(`
        create table if not exists rides(
            rideid serial PRIMARY KEY,
            userid integer references users(id),
            fromtime varchar(20) not null,
            fromlocation varchar(255) not null,
            totime varchar(20) not null,
            tolocation varchar(255) not null,
            date varchar(20) not null,
            boolcar boolean,
            vehiclename varchar(50) ,
            numberofseats integer default 0,
            price integer default 0,
            facilities varchar(255),
            numberofseatsavailable integer default 0,
            boolride boolean default true,
            fromlongitude real not null,
            fromlatitude real not null,
            tolongitude real not null,
            tolatitude real not null,
            boardingpoint varchar(255) not null,
            droppingpoint varchar(255) not null,
            frommapboxid varchar(255) not null,
            tomapboxid varchar(255) not null,
            path varchar(10000)
        )  
    `)
}

async function CreateBookedRidesTable(){
    const response=await client.query(`
        create table if not exists bookedrides(
            bookedridesid serial PRIMARY KEY,
            userid integer references users(id),
            rideid integer references rides(rideid),
            seatsbooked integer default 0,
            date varchar(20) ,
            captainfirstname varchar(255) not null,
            captainlastname varchar(255) not null,
            feedback varchar(255),
            path varchar(500) 
        )
    `)
}


CreateUsersTable() 
CreateRidesTable()
CreateBookedRidesTable()
console.log("connected")

module.exports={
    client
}