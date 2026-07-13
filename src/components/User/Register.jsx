import "./common.css";
import {Link} from "react-router-dom";
import Logo from "../../images/ThreatLens_Logo.png";
import { useMutation } from "@tanstack/react-query";
import {Mail,Eye,EyeOff,Lock,User} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { registerAPI } from "../../api/userAPI";
import { AuthContext } from "../../context/AuthContext";
import StatusMessage from "../StatusMessage/StatusMessage";




const validationSchema = Yup.object({
  username: Yup.string().trim().min(3, "Username must be at least 3 characters").max(30, "Username cannot exceed 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/,"Username can contain letters, numbers and underscores").required("Username is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters long").max(64, "Password cannot exceed 64 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter").matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number").matches(/[@$!%*?&#^()_\-+=]/,"Password must contain at least one special character")
    .matches(/^\S*$/,"Password cannot contain spaces").required("Password is required") ,
  email: Yup.string().trim().email("Enter a valid email address")
    .matches(/^(?!.*\.\.)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,"Email must contain only lowercase letters")
    .max(50, "Email is too long").required("Email is required")
});









const Register = () => {

  const { setIsAuthenticated,isAuthenticated } = useContext(AuthContext);
  const [eye , setEye] = useState(false);

  useEffect(()=>{
    if(isAuthenticated){
      navigate("/dashboard");
    }
  },[isAuthenticated]);

  useEffect(() => {
    document.title = "Register";
  }, []);

  const { mutateAsync , isPending , isSuccess , isError , error } = useMutation({
    mutationFn : registerAPI ,
    mutationKey : ["registerAPI"]
  });


  const formik = useFormik({
    initialValues : {
      username : "" ,
      email : "" ,
      password : ""
    } ,
    validationSchema ,
    onSubmit : ( values )=> {
      mutateAsync(values).then((data)=>{
        formik.resetForm();
      });
    }
  });


  return (
    <section className="main-container">
      <section className="container">
        <div>
          <img src={Logo} alt="Logo"/>
          <h2>WELCOME NEW</h2>
          <p>Create an account to access your analysis platform</p>
        </div>

        {isPending && <StatusMessage type="loading" message="Loading....."/>}
        {isError && <StatusMessage type="error" message={error.response ? error.response.data.message : error.message}/>}
        {isSuccess && <StatusMessage type="success" message="Succesfully registered 🎉"/>}

        <form autoComplete="off" onSubmit={formik.handleSubmit}>

          <div>
            <Mail size={14} className="fa-envelope"/>
            <label htmlFor="email">Email Address</label>
            <input type="email" {...formik.getFieldProps("email")} placeholder="Enter email" id="email"/>
            {formik.touched.email && formik.errors.email && (<span>{formik.errors.email}</span>)}
          </div>

          <div>
            <User size={14} className="fa-user"/>
            <label htmlFor="username">Username</label>
            <input type="text" {...formik.getFieldProps("username")} placeholder="Enter username" id="username"/>
            {formik.touched.username && formik.errors.username && (<span>{formik.errors.username}</span>)}
          </div>

          <div>
            <Lock size={14} className="fa-lock"/>
            {!eye ? <EyeOff size={14} className="fa-eye-slash" onClick={()=>setEye(!eye)}/> : <Eye size={14} className="fa-eye-slash" onClick={()=>setEye(!eye)}/>}
            <label htmlFor="password">Password</label>
            <input type={eye ? "text" : "password"} {...formik.getFieldProps("password")} placeholder="Enter password" id="password"/>
            {formik.touched.password && formik.errors.password && (<span>{formik.errors.password}</span>)}
          </div>

          <button type="submit" disabled={isPending ? true : false}><User size={15} />REGISTER</button>
          
        </form>
        <p>
          Already have an account ?
          <Link to="/login">Log In</Link>
        </p>
      </section>
    </section>
  )
}

export default Register;