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
import BruteAttack from "./components/LinuxComponents/BruteAttack/BruteAttack";
import DistributedAttack from "./components/LinuxComponents/DistributedAttack/DistributedAttack";
import PasswordSpraying from "./components/LinuxComponents/PasswordSpraying/PasswordSpraying";
import InvalidUser from "./components/LinuxComponents/InvalidUser/InvalidUser";
import ErrorPage from "./components/Error/ErrorPage";
import UnsupportedScreen from "./UnsupportedScreen/UnsupportedScreen";
import RulesPage from "./components/Rules/RulesPage";
import LinuxAnalysis from "./components/Analysis/LinuxAnalysis";
import WebAnalysis from "./components/Analysis/WebAnalysis";
import DirectoryEnumeration from "./components/WebComponents/DirectoryEnumeration/DirectoryEnumeration";
import SQLAttack from "./components/WebComponents/SQLattack/SQLAttack";
import SensitiveFile from "./components/WebComponents/Sensitive File/SensitiveFile";
import WebShell from "./components/WebComponents/Web Shell/WebShell";
import FirewallAnalysis from "./components/Analysis/FirewallAnalysis";
import PortScanning from "./components/FirewallComponents/Port Scanning/PortScanning";
import SSHTargeting from "./components/FirewallComponents/SSH Targeting/SSHTargeting";
import ExcessiveBlocked from "./components/FirewallComponents/Excessive Blocked/ExcessiveBlocked";
import InternalNetwork from "./components/FirewallComponents/Internal Network/InternalNetwork";








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

        <Route path="/auth/analysis/:fileId" element={<ProtectRoute><LinuxAnalysis/></ProtectRoute>}/>
        <Route path="/web/analysis/:fileId" element={<ProtectRoute><WebAnalysis/></ProtectRoute>}/>
        <Route path="/firewall/analysis/:fileId" element={<ProtectRoute><FirewallAnalysis/></ProtectRoute>}/>

        <Route path="/auth/analysis/brute-attack/:id" element={<ProtectRoute><BruteAttack/></ProtectRoute>}/>
        <Route path="/auth/analysis/distributed-attack/:id" element={<ProtectRoute><DistributedAttack/></ProtectRoute>}/>
        <Route path="/auth/analysis/password-spraying/:id" element={<ProtectRoute><PasswordSpraying/></ProtectRoute>}/>
        <Route path="/auth/analysis/username-enumeration/:id" element={<ProtectRoute><InvalidUser/></ProtectRoute>}/>


        <Route path="/web/analysis/directory-enumeration/:id" element={<ProtectRoute><DirectoryEnumeration/></ProtectRoute>}/>
        <Route path="/web/analysis/sql-injection/:id" element={<ProtectRoute><SQLAttack/></ProtectRoute>}/>
        <Route path="/web/analysis/sensitive-file-access/:id" element={<ProtectRoute><SensitiveFile/></ProtectRoute>}/>
        <Route path="/web/analysis/web-shell-access/:id" element={<ProtectRoute><WebShell/></ProtectRoute>}/>


        <Route path="/firewall/analysis/port-scanning/:id" element={<ProtectRoute><PortScanning/></ProtectRoute>}/>
        <Route path="/firewall/analysis/ssh-targeting/:id" element={<ProtectRoute><SSHTargeting/></ProtectRoute>}/>
        <Route path="/firewall/analysis/excessive-blocked/:id" element={<ProtectRoute><ExcessiveBlocked/></ProtectRoute>}/>
        <Route path="/firewall/analysis/internal-network-access/:id" element={<ProtectRoute><InternalNetwork/></ProtectRoute>}/>
        
        <Route path="/*" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;