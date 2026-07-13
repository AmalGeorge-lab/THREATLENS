import { BrowserRouter , Route , Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import PublicNavbar from "./components/Navbar/PublicNavbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar/PrivateNavbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Upload from "./components/Upload/Upload";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import ProtectRoute from "./Protect/ProtectRoute";
import Analysis from "./components/Analysis/Analysis";
import BruteAttack from "./components/LinuxComponents/BruteAttack/BruteAttack";
import DistributedAttack from "./components/LinuxComponents/DistributedAttack/DistributedAttack";
import PasswordSpraying from "./components/LinuxComponents/PasswordSpraying/PasswordSpraying";
import InvalidUser from "./components/LinuxComponents/InvalidUser/InvalidUser";
import ErrorPage from "./components/Error/ErrorPage";
import UnsupportedScreen from "./UnsupportedScreen/UnsupportedScreen";
import RulesPage from "./components/Rules/RulesPage";


function App() {

  const { isAuthenticated } = useContext(AuthContext);

  const mediaQuery = window.matchMedia("(min-width: 1300px)");
  const [supported, setSupported] = useState(mediaQuery.matches);

  useEffect(() => {
    const handler = (e) => setSupported(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (!supported) {
    return <UnsupportedScreen/>
  }

  return (
    <BrowserRouter>
      {isAuthenticated ? <PrivateNavbar/> : <PublicNavbar/>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/rules" element={<RulesPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<ProtectRoute><Dashboard/></ProtectRoute>}/>
        <Route path="/upload" element={<ProtectRoute><Upload/></ProtectRoute>}/>
        <Route path="/linux/analysis/:fileId" element={<ProtectRoute><Analysis/></ProtectRoute>}/>
        <Route path="/linux/analysis/brute-attack/:id" element={<ProtectRoute><BruteAttack/></ProtectRoute>}/>
        <Route path="/linux/analysis/distributed-attack/:id" element={<ProtectRoute><DistributedAttack/></ProtectRoute>}/>
        <Route path="/linux/analysis/password-spraying/:id" element={<ProtectRoute><PasswordSpraying/></ProtectRoute>}/>
        <Route path="/linux/analysis/username-enumeration/:id" element={<ProtectRoute><InvalidUser/></ProtectRoute>}/>
        <Route path="/*" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;