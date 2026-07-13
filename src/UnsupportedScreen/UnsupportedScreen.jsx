import { useEffect } from "react";
import "./unSupportedScreen.css";
import { ShieldAlert , Maximize2 } from "lucide-react";




const UnsupportedScreen = () => {


  useEffect(() => {
    document.title = "Resize Screen";
  }, []);

  return (
    <section className="error-container">
      <ShieldAlert className="error-shield" size={80}/>
      <h1>404</h1>
      <h4>Resize windows width</h4>
      <section>
        <div>
          <h4>Increase window size</h4>
          <p style={{ fontSize : "13px" , maxWidth : "300px" }}>ThreatLens is optimized for larger screens.Please use a window width of atleast <span>1300px</span> for the best experience.</p>
        </div>
        <div className="size-info">
          <p>Minimum required width</p>
          <h3><Maximize2/>1300px</h3>
        </div>
      </section>
    </section>
  )
}

export default UnsupportedScreen