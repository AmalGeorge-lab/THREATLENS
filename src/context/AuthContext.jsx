import { createContext, useState , useEffect } from "react";
import { refreshValidatorAPI } from "../api/userAPI";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isAuthenticated , setIsAuthenticated] = useState(false);
  const [ loading , setLoading ] = useState(true);

  const refreshPage = async () => {
    try {
      const response = await refreshValidatorAPI();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    refreshPage();
  },[]);

  return (
    <AuthContext.Provider value={{ isAuthenticated , setIsAuthenticated , loading }}>
      {children}
    </AuthContext.Provider>
  );
};