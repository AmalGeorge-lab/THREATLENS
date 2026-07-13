import { Link, useNavigate } from "react-router-dom";
import "./privateNavbar.css";
import Logo from "../../../images/ThreatLens_Logo.png";
import {LogOut} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { logOutAPI } from "../../../api/userAPI";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";



const PrivateNavbar = () => {

  const {setIsAuthenticated} = useContext(AuthContext);
  const {mutateAsync} = useMutation({mutationFn : logOutAPI , mutationKey : ["logOutAPI"]});
  const navigate = useNavigate();


  return (
    <header className="header-section">
      <div className="name-section">
        <img src={Logo} alt="ThreatLens_logo"/>
        <div>
          <h2><span>Threat</span>Lens</h2>
          <p>Log analysis platform</p>
        </div>
      </div>

      <nav className="navigation-section">
        <Link to="/dashboard">DASHBOARD</Link>
        <Link to="/upload">UPLOAD LOG</Link>
        <Link to="/rules">RULES</Link>
      </nav>

      <div className="buttons-section">
        <button onClick={()=>mutateAsync().then(()=>{
          setIsAuthenticated(false);
          navigate("/");
        })}><LogOut size={14}/>LOGOUT</button>
      </div>

    </header>
  )
}

export default PrivateNavbar;