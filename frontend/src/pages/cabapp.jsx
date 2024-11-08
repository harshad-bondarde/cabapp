import { useState } from "react"
import { SignUp } from "../components/SignUp"
import { SignIn } from "../components/SignIn";
import { Welcome } from "../components/welcome";
export function CabApp(){
    const [signIn,setSignIn]=useState(false);

    return (
        <>  
            <div className="h-screen flex justify-center bg-slate-100 ">
                
                <div className="flex flex-col justify-start items-center ">    
                    
                    <h1 className="text-4xl m-2 p-4 border-2 border-green-600 rounded-3xl  bg-green-600 text-white font-extrabold shadow-2xl shadow-blue-950 ">CabApp</h1>
                    
                    <div className="flex justify-between mt-5 ">
                        <div className=" flex flex-col justify-start m-14 mr-14  items-center ">    
                            <div className="mr-11 mb-14 flex flex-col items-center ">         
                                <Welcome/>
                            </div>
                        </div>
                        <div className="1/2 ">
                            {  signIn ? <SignIn setSignIn={setSignIn}/>:<SignUp setSignIn={setSignIn}/>}
                        </div>
                    </div>
                
                </div>
            </div>
        </>
    )
}