import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";


const ProtectRoute = ({ children }) => {

  const { isAuthenticated , setIsAuthenticated , loading } = useContext(AuthContext);

  if(loading){
    document.title = "Loading";
    return <Loading/>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>;
  }

  return children;
}

export default ProtectRoute;