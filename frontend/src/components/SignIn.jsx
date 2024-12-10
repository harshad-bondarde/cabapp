import axios from "axios"

import { Heading } from "../components/heading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Warning } from "./warning"
import { useDispatch ,useSelector } from "react-redux"
import { setAuthUser } from "../store/userSlice"
import toast, { Toaster } from 'react-hot-toast';

export function SignIn({setSignIn}){
    const navigate=useNavigate();
    const dispatch=useDispatch()

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false)
    
    const notifySignedIn=()=>{
       toast.success('Signed In');
    }
    
    
    const [emailWarning,setEmailWarning]=useState("")
    const [passwordWarning,setPasswordWarning]=useState("")
    const [userExists,setUserExists]=useState("")


    const validateInputs = () => {
        let valid=true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            setEmailWarning("* Invalid Email")
            valid=false;
        }else{
            setEmailWarning("")
        }

        if(password.length < 6){
            setPasswordWarning("* Min 6 characters required")
            valid=false
        }else{
            setPasswordWarning("")
        }

        return valid
    }
    return(
        
        <div> 
            <div className="border-8 shadow-2xl w-96 h rounded-2xl p-3 mb-10 ">
                        
                        <div className="flex flex-col items-center">
                            <Heading label="SignIn"/>
                            <form className="w-full">
                                <InputBox label="Email" OnChange={e=>setEmail(e.target.value)}/>
                                <Warning label={emailWarning}/>
                                <InputBox label="Password" OnChange={e=>setPassword(e.target.value)}/>
                                <Warning label={passwordWarning}/>

                                    <Button label="SignIn" loading={loading} OnClick={async ()=>{
                                        const valid=validateInputs();
                                        if(valid){
                                            try{  
                                                
                                                setLoading(true)  
                                                const response=await axios.post("http://localhost:3000/user/signin",{
                                                    email,
                                                    password
                                                })
                                                
                                                dispatch(setAuthUser(response.data.authUser))
                                                const token=response.data.token;
                                                localStorage.setItem("token",token);
                                                notifySignedIn()
                                                localStorage.setItem("authUser",JSON.stringify(response.data.authUser));

                                                navigate("/cabapp/home")
                                                
                                            }catch(e){
                                                if(e.status==403){
                                                    setUserExists(e.response.data.message)
                                                }
                                                console.log("Error while signin: ",e)
                                            }finally{
                                                setLoading(false)
                                            }
                                        }
                                    }}
                                    />
                                <Warning label={userExists}/>

                                <div className="font-thin flex justify-center mt-1">
                                    <div className="mr-2">Don't have an account ?</div> <div className="underline text-blue-600 cursor-pointer" onClick={()=>{setSignIn(prevState=>!prevState)}}>SignUp</div> 
                                </div>
                            </form>
                        </div>
            </div> 
        </div>
    )
}