import Button from "../../components/Button";
import Input from "../../components/Input"
const Form = ({
    isSignedIn = false
}) => {
    return(
    <div className="bg-white w-[600px] h-[600px] shadow-lg rounded-lg flex flex-col justify-center items-center">
        <div className="text-4xl font-extrabold ">Welcome {isSignedIn && "Back"}</div>
        <div className="text-xl font-light mb-10">{isSignedIn ? "Sign In" : "Sign Up"}</div>
       { !isSignedIn && <Input lable="Full Name" name="name" placeholder="Enter your full name" className="mb-4"/>}
        <Input lable="E-Mail" name="email" placeholder="Enter your email" className="mb-4"/>
        <Input lable="Password" name="password" placeholder="Enter password" className="mb-4"/>
        <Button lable={isSignedIn ? "Sign In" : "Sign Up"} className="w-[50.33%] mb-2" />
        <div>{isSignedIn ? "Don't have an account?" : "Already have an account?"} <span className="text-primary cursor-pointer underline">{isSignedIn ? "Sign Up" : "Sign In"}</span></div>
    </div>
    )
}

export default Form;