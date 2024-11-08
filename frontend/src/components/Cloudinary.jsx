// import { useState } from "react"
// import axios from "axios"

// export function Cld(){
//     const [image,setImage]=useState("")
//     return (
//         <>
//             <div className="m-5">
//                 <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                
//                 <button onClick={async ()=>{
//                     const data=new FormData()
//                     data.append("file",image)
//                     data.append("upload_preset","cabapp")
//                     data.append("cloud_name","harsh-cloud")

//                     const response=await axios.post("https://api.cloudinary.com/v1_1/harsh-cloud/upload",{
//                         data
//                     })
//                     console.log(response)


//                 }} className="border-2" >Upload</button>
//             </div>
//         </>
//     )
// }
// Msd_Sqag5U5lfrTQMXyjCKE0fSM
import { useState } from "react";
import axios from "axios";

export function Cld() {
  const [image, setImage] = useState("");

  return (
    <>
      <div className="m-5">
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button
          onClick={async () => {
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "cabapp");
            data.append("cloud_name", "harsh-cloud");

            try {
              // Correct axios request without wrapping `data` in an object
              const response = await axios.post(
                "https://api.cloudinary.com/v1_1/harsh-cloud/upload",
                data, // Send FormData directly
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              );
              console.log(response.data); // Response from Cloudinary
            } catch (error) {
              console.error("Error uploading image:", error);
              if (error.response) {
                console.log("Response data:", error.response.data);
                console.log("Response status:", error.response.status);
              } else if (error.request) {
                console.log("No response received:", error.request);
              } else {
                console.log("Error setting up request:", error.message);
              }
            }
          }}
          className="border-2"
        >
          Upload
        </button>
      </div>
    </>
  );
}
