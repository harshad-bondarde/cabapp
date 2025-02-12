
# CabApp

CabApp is a comprehensive cab booking application built using the PERN stack (PostgreSQL, Express.js, React, Node.js) and integrated with MapBox API. It enables users to register, book rides, and manage their journeys efficiently.

## Features ✨

- User Registration & Authentication: Secure sign-up and login
-  Ride Booking: Seamless interface to book rides to your desired destinations
- Ride Management: View and manage your current and past bookings
- Real Time Locations : Fetch & view Ride Origin and Destination Locations and Ride route points   
- Email Notifications :  Get Ride Updates through Email
## Tech Stack 🚀
 
**Framework :** Reactjs 

**Database :** PostgreSQL

**Server :** Nodejs , Expressjs

**Styling :** TailwindCSS

**API Integrations :** MapBox API






## Installation 🛠️

Clone the repository : 

```bash
https://github.com/harshad-bondarde/cabapp
```

Install dependencies :
```bash
npm install
cd frontend
npm install
```

Set up environment variables :

```bash
VITE_YOUR_MAPBOX_API_KEY=
VITE_YOUR_EMAILJS_SERVICEID=
VITE_YOUR_EMAILJS_TEMPLATEID=
VITE_YOUR_EMAILJS_PUBLICKEY=
DATABASE_URL=
```
Run backend and frontend
```bash
npm run dev
cd frontend
npm run dev
```

    
## Screenshots

![App Screenshot](https://i.postimg.cc/xjJzw4VM/Screenshot-2025-01-06-225243.png)

![](https://i.postimg.cc/jjbq2mvz/Screenshot-2025-01-06-225214.png)

```bash
  User Registration
```

***
![](https://i.postimg.cc/qM1V9Gmx/Screenshot-2025-01-06-230533.png)
![](https://i.postimg.cc/sX14g77S/Screenshot-2025-01-06-230633.png)
```bash
  Get real Time Locations Info through MapBox API
```
***

![](https://i.postimg.cc/GtWQNtBD/Screenshot-2025-01-06-231432.png)
![](https://i.postimg.cc/ydmKbgrq/Screenshot-2025-01-06-231512.png)
```bash
    - Captains can publish a Ride specifiying vehicle type,vehicle name 
      also boarding point and drop-off point
    - They Can also define route points to indicate intermediate stops
```
 ***
![](https://i.postimg.cc/mDc5htHc/Screenshot-2025-01-06-231859.png)
![](https://i.postimg.cc/mgQbNCTw/Screenshot-2025-01-06-231930.pnghttps://i.postimg.cc/mgQbNCTw/Screenshot-2025-01-06-231930.png)
![](https://i.postimg.cc/52SrHhkV/Screenshot-2025-01-06-232452.png)

```bash
    Users can fetch the Rides, View Ride route points  
```
***
![](https://i.postimg.cc/mkFmwJL8/Screenshot-2025-01-06-232400.png)
![](https://i.postimg.cc/XYQ73zW2/Screenshot-2025-01-06-232817.png)

```bash
    - Users will have two sections their booked upcoming rides and booked rides
    - after ride completions users can rate captain and can give feedback 
```

***
![](https://i.postimg.cc/rwLTms5t/Screenshot-2025-01-06-233016.png)

![](https://i.postimg.cc/DZDkKw20/Screenshot-2025-01-06-233027.png)

```bash
    - Captains will have two sections their published upcoming rides and past rides
    - Captains can view information of passengers 
    - after ride completions Captains can get rating and feedback
```

***
![](https://i.postimg.cc/mgRrn8Xq/Screenshot-2025-01-06-233212.png)

```bash
   - On Booking a ride Captains will get Email notification containing information about the passenger
   - Also on deletion of a particular ride notification mail will be sent to all passengers 
```









## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_YOUR_MAPBOX_API_KEY`

`VITE_YOUR_EMAILJS_SERVICEID`

`VITE_YOUR_EMAILJS_TEMPLATEID`

`VITE_YOUR_EMAILJS_PUBLICKEY`


