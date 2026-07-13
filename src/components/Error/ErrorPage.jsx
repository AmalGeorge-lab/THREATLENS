import "./errorPage.css";
import { ShieldAlert , Home } from "lucide-react";
import { useContext, useEffect } from "react";
import {useLocation , useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";




const ErrorPage = () => {

  const {setIsAuthenticated} = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const errorMessage = location.state?.errorMessage || "Page Not Found";

  useEffect(() => {
    if (errorMessage === "Session Expired") {
      setIsAuthenticated(false);
    }
  }, [errorMessage, setIsAuthenticated]);

  useEffect(() => {
    document.title = "Error";
  }, []);

  return (
    <section className="error-container">
      <ShieldAlert className="error-shield" size={80}/>
      <h1>404</h1>
      <h4>{errorMessage}</h4>
      <p>We couldn't load the page you're looking for. <br/>Please try again or go back to the dashboard.</p>
      <button onClick={()=>{
        if(errorMessage === "Session Expired"){
          return navigate("/login");
        }
        navigate("/dashboard");
      }}><Home size={15}/>GO TO DASHBOARD</button>
    </section>
  )
}

export default ErrorPage;