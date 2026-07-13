import Logo from "../../images/ThreatLens_Logo.png";
import {Mail,Eye,EyeOff,Lock,LogIn} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import "./common.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import StatusMessage from "../StatusMessage/StatusMessage";
import { loginAPI } from "../../api/userAPI";



const validationSchema = Yup.object({
  email: Yup.string().trim().email("Enter a valid email address")
    .matches(/^(?!.*\.\.)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,"Email must contain only lowercase letters")
    .max(50, "Email is too long").required("Email is required") ,
  password: Yup.string().min(8, "Password must be at least 8 characters long").max(64, "Password cannot exceed 64 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter").matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number").matches(/[@$!%*?&#^()_\-+=]/,"Password must contain at least one special character")
    .matches(/^\S*$/,"Password cannot contain spaces").required("Password is required")
});





const Login = () => {

  const { setIsAuthenticated,isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [eye , setEye] = useState(false);

  useEffect(()=>{
    if(isAuthenticated){
      navigate("/dashboard");
    }
  },[isAuthenticated]);

  useEffect(() => {
    document.title = "Login";
  }, []);


  const { mutateAsync , isPending , isError , error } = useMutation({
    mutationFn : loginAPI ,
    mutationKey : ["loginAPI"]
  });

  const formik = useFormik({
    initialValues : {
      email : "" ,
      password : ""
    } ,
    validationSchema ,
    onSubmit : (values)=> {
      mutateAsync(values).then(()=>{
        setIsAuthenticated(true);
        navigate("/dashboard");
      });
    }
  });


  return (
    <section className="main-container">
      <section className="container">
        <div>
          <img src={Logo} alt="Logo"/>
          <h2>WELCOME BACK</h2>
          <p>Sign In to continue to your SOC Dashboard</p>
        </div>

        {isPending && <StatusMessage type="loading" message="Loading....."/>}
        {isError && <StatusMessage type="error" message={error.response ? error.response.data.message : error.message}/>}

        <form autoComplete="off" onSubmit={formik.handleSubmit}>

          <div>
            <Mail size={14}  className="fa-envelope"/>
            <label htmlFor="email">Email Address</label>
            <input type="email" {...formik.getFieldProps("email")} placeholder="Enter email" id="email"/>
            {formik.touched.email && formik.errors.email && (<span>{formik.errors.email}</span>)}
          </div>

          <div>
            <Lock size={14} className="fa-lock"/>
            {!eye ? <EyeOff size={14} className="fa-eye-slash" onClick={()=>setEye(!eye)}/> : <Eye size={14} className="fa-eye-slash" onClick={()=>setEye(!eye)}/>}
            <label htmlFor="password">Password</label>
            <input type={eye ? "text" : "password"} {...formik.getFieldProps("password")} placeholder="Enter password" id="password"/>
            {formik.touched.password && formik.errors.password && (<span>{formik.errors.password}</span>)}
          </div>

          <button type="submit" disabled={isPending ? true : false}><LogIn size={15}/>LOGIN</button>

        </form>
        <p>
          Don't have an account ?
          <Link to="/register">Sign Up</Link>
        </p>
      </section>
    </section>
  )
}

export default Login;