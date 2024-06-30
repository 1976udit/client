import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input"
const Form = ({
    isSignedIn = false
}) => {
    const [data , setData] = useState({
        ...(!isSignedIn && {
            fullname : ""
        }),
        email : "",
        password : ""
    })

    console.log(data)
    return(
    <div className="bg-white w-[600px] h-[600px] shadow-lg rounded-lg flex flex-col justify-center items-center">
        <div className="text-4xl font-extrabold ">Welcome {isSignedIn && "Back"}</div>
        <div className="text-xl font-light mb-10">{isSignedIn ? "Sign In" : "Sign Up"}</div>
       
      <form onSubmit={() => console.log("Hello")} className="flex flex-col items-center w-full">

       { !isSignedIn && <Input lable="Full Name" name="name" placeholder="Enter your full name" className="mb-4" value={data.fullname} onChange={(e) => setData({...data , fullname : e.target.value}) }/>}

        <Input lable="E-Mail" name="email" type="email" placeholder="Enter your email" className="mb-4" value={data.email} onChange={(e) => setData({...data , email : e.target.value}) }/>

        <Input lable="Password" name="password" type="password" placeholder="Enter password" className="mb-4" value={data.password} onChange={(e) => setData({...data , password : e.target.value}) }/>

        <Button lable={isSignedIn ? "Sign In" : "Sign Up"} type="submit" className="w-64% mb-2" />
        </form>

        <div>{isSignedIn ? "Don't have an account?" : "Already have an account?"} <span className="text-primary cursor-pointer underline">{isSignedIn ? "Sign Up" : "Sign In"}</span></div>
    </div>
    )
}

export default Form;