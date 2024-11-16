import {InputBar} from "../components/inputbox";
import {Heading} from "../components/heading";
import {Subheading} from "../components/subheading";
import {Button} from "../components/button";
import {ButtonWarning} from "../components/buttonWarning";
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export const Signup = function(){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"}></Heading>
                <Subheading label={"Enter your information to create an account"}></Subheading>
                <InputBar onChange={function(event){return setFirstName(event.target.value) }} placeholder={"John"} label={"First Name"}></InputBar>
                <InputBar onChange={function(event){return setLastName(event.target.value)}} placeholder={"Doe"} label={"Last Name"}></InputBar>
                <InputBar onChange={function(event){return setUsername(event.target.value)}} placeholder={"johndoe@gmail.com"} label={"Email"}></InputBar>
                <InputBar onChange={function(event){return setPassword(event.target.value)}} placeholder={"123456"} label={"Password"}></InputBar>
                <div className="pt-2">
                    <Button onClick={()=> {
                        axios.post("http://localhost:3000/api/v1/user/signup", {
                            username,
                            firstName,
                            lastName,
                            password
                        })
                        navigate("/signin")

                    }} label={"Sign Up"}></Button>
                </div>
                <ButtonWarning label={"Already have an account?"} link={"Signin"} to={"/Signin"} ></ButtonWarning>
            </div>
        </div>

    </div>
}

