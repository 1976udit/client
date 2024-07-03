import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input"
import { json, useNavigate } from "react-router-dom";


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

    const navigate = useNavigate()

    // this is how we do the work of postman connecting to the backend or server
    const handleSubmit = async (e) => {
        console.log(data)
        e.preventDefault()
        const res =await fetch(`http://localhost:5000/api/${isSignedIn? "login" : "register"}` , {
            method : "POST",
            headers : {
                "content-type" : "Application/json"
            },
            body : JSON.stringify(data)
        })
        // This the place where the control comes after the frontend form submission
        if(res.status === 400){
            alert("Invalid Credentials")
        }else{
            const resData =  await res.json()
            if(resData.token){
            localStorage.setItem("user:token" , resData.token)
            localStorage.setItem("iser:details" , JSON.stringify(resData.user))
            navigate("/")
          }
        }
        
    }

    // console.log(data)
    return(
  <div className="h-screen flex justify-center items-center bg-light">     
    <div className="bg-white w-[600px] h-[600px] shadow-lg rounded-lg flex flex-col justify-center items-center">
        <div className="text-4xl font-extrabold ">Welcome {isSignedIn && "Back"}</div>
        <div className="text-xl font-light mb-10">{isSignedIn ? "Sign In" : "Sign Up"}</div>
       
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col items-center w-full">

       { !isSignedIn && <Input lable="Full Name" name="name" placeholder="Enter your full name" className="mb-4 w-[50%]" value={data.fullname} onChange={(e) => setData({...data , fullname : e.target.value}) }/>}

        <Input lable="E-Mail" name="email" type="email" placeholder="Enter your email" className="mb-4 w-[50%]" value={data.email} onChange={(e) => setData({...data , email : e.target.value}) }/>

        <Input lable="Password" name="password" type="password" placeholder="Enter password" className="mb-4 w-[50%]" value={data.password} onChange={(e) => setData({...data , password : e.target.value}) }/>

        <Button lable={isSignedIn ? "Sign In" : "Sign Up"} type="submit" className="w-64% mb-2" />
        </form>

        <div>{isSignedIn ? "Don't have an account?" : "Already have an account?"} <span className="text-primary cursor-pointer underline" onClick={()=> navigate(`/users/${isSignedIn ? "sign-up" : "sign-in"}`) }> {isSignedIn ? "Sign Up" : "Sign In"} </span></div>
    </div>
</div>   
    )
}

export default Form;