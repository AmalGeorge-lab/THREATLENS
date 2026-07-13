import Logo from "../../../images/ThreatLens_Logo.png";
import { Link , useNavigate } from "react-router-dom";
import "./publicNavbar.css";
import { LogIn , UserPlus } from "lucide-react";




const PublicNavbar = () => {

  const navigate = useNavigate()

  return (
    <header className="header-section">
      <div className="name-section">
        <img src={Logo} alt="ThreatLens_logo" onClick={()=>navigate("/")}/>
        <div>
          <h2><span>Threat</span>Lens</h2>
          <p>Log analysis platform</p>
        </div>
      </div>

      <nav className="navigation-section">
        <a href="/#features">FEATURES</a>
        <a href="/#log-types">LOG TYPES</a>
        <a href="/#about">ABOUT</a>
      </nav>

      <div className="buttons-section">
        <Link to="/login"  className="login"><LogIn size={14}/>LOGIN</Link>
        <Link to="/register"  className="register"><UserPlus size={14}/>SIGN UP</Link>
      </div>

    </header>
  )
}

export default PublicNavbar;