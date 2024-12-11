import axios from "axios"

import { Heading } from "../components/heading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { useState } from "react"
import { Warning } from "./warning"
export function SignUp({ setSignIn }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const [phoneNo, setPhoneNo] = useState("")

    const [firstNameWarning, setFirstNameWarning] = useState('')
    const [lastNameWarning, setLastNameWarning] = useState('')
    const [emailWarning, setEmailWarning] = useState('')
    const [passwordWarning, setPasswordWarning] = useState('')
    const [genderWarning, setGenderWarning] = useState('')
    const [phoneNoWarning, setPhoneNoWarning] = useState('')
    const [userExists, setUserExists] = useState('')
    const [loading,setLoading]=useState(false)

    const validateInputs = () => {
        let valid=true;

        const regex = /^[A-Za-z]+$/
        if(!regex.test(firstName)){
            setFirstNameWarning("* Only characters are required")
            valid=false;
        }else{
            setFirstNameWarning("")
        }

        if(!regex.test(lastName)){
            setLastNameWarning("* Only characters are required")
            valid=false
        }else{
            setLastNameWarning("")            
        }

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

        if(!(gender.toLowerCase() == "male" || gender.toLowerCase() == "female")){
            setGenderWarning("* Invalid gender")
            valid=false;
        }else{
            setGenderWarning("")
        }

        const numberRegex = /^\d+$/;
        if (!numberRegex.test(phoneNo) || phoneNo.length != 10){
            setPhoneNoWarning("* Invalid number ")
            valid=false;
        }else{
            setPhoneNoWarning("")
        }

        return valid
    }
    console.log(gender)
    return (
        <div>
            <div className="border-8  shadow-2xl  w-96 h rounded-2xl p-3 mb-10 ">

                <div className="flex flex-col items-center">
                    <Heading label="SignUp" />
                    <div className="w-full">
                        <InputBox label="FirstName" OnChange={e => setFirstName(e.target.value.toLowerCase())} />
                        <Warning label={firstNameWarning} />

                        <InputBox label="LastName" OnChange={e => setLastName(e.target.value.toLowerCase())} />
                        <Warning label={lastNameWarning} />

                        <InputBox label="Email" OnChange={e => setEmail(e.target.value)} />
                        <Warning label={emailWarning} />

                        <InputBox label="Password" OnChange={e => setPassword(e.target.value)} />
                        <Warning label={passwordWarning} />

                        <div className="flex">
                            <InputBox label="Gender" OnChange={e => setGender(e.target.value.toLowerCase())} />
                            <Warning label={genderWarning} />
                        </div>
                        
                        <InputBox label="PhoneNo" OnChange={e => setPhoneNo(e.target.value)} />
                        <Warning label={phoneNoWarning} />

                        <Button label="SignUp" loading={loading} OnClick={async () => {
                            const valid=validateInputs()
                            if(valid){
                                setLoading(true)
                                try {
                                    const response = await axios.post("http://localhost:3000/user/signup", {
                                        firstName,
                                        lastName,
                                        password,
                                        email,
                                        gender,
                                        phoneNo
                                    })
                                    console.log(response)
                                    if (response.data.message == "email already exists") {
                                        setUserExists("* Email already exists")
                                    }
                                    else
                                        setSignIn(prevState => !prevState)
                                }
                                catch (error) {
                                    console.log("error during SignUp: ", error);
                                }finally{
                                    setLoading(false)
                                }
                            }
                        }} />
                        <Warning label={userExists} />
                        <div className="font-thin flex justify-center mt-1">
                            <div className="mr-2">Already have an account ?</div> <div className="underline text-blue-600 cursor-pointer" onClick={() => { setSignIn(prevState => !prevState) }}>SignIn</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}