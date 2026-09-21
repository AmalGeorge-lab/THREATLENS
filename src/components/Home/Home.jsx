import { Link } from "react-router-dom";
import Logo from "../../images/ThreatLens_Logo.png";
import { 
  Rocket ,  
  Shield , 
  Zap , 
  ScanSearch , 
  CloudUpload , 
  Brain ,
  TriangleAlert ,
  FileText,
  FolderOpen,
  Cpu,
  Bell,
  ChartColumn,
  ShieldCheck,
  Database,
  Globe,
  Flame,
} from "lucide-react";
import "./home.css";
import {useNavigate} from "react-router-dom";










const Home = () => {

  const navigate = useNavigate();

  return (
    <section className="home-section">

    <section className="banner-section">
      <h2>Analyze Logs , Detect Threats<br/><span>Strengthen Security</span></h2>
      <p>
        Upload your log files, run analysis, and uncover security threats with detection rules and detailed reports.
        Automate your incident response workflows to neutralize risks instantly.
        Stay ahead of attackers with continuous monitoring and real-time alerts.
      </p>
      <div className="buttons-section">
        <button onClick={()=>navigate("/login")} className="getting-started"><Rocket size={15}/>Get Started Free</button>
        <button onClick={()=>navigate("/rules")} className="view-demo"><FileText size={15}/>View Rules</button>
      </div>
      <div className="features">

        <div>
          <Shield size={15} className="icon lui-shield"/>
          <div>
            <h3>Secure & Private</h3>
            <p>Your data is safe</p>
          </div>
        </div>

        <div>
          <Zap size={15} className="icon lui-bolt"/>
          <div>
            <h3>Fast & Accurate</h3>
            <p>Results in seconds</p>
          </div>
        </div>

        <div>
          <ScanSearch size={15} className="icon lui-scan-search"/>
          <div>
            <h3>Trusted by Analysts</h3>
            <p>Build for SOC teams</p>
          </div>
        </div>

      </div>
    </section>

    <section className="working-section">
      <h3>HOW IT WORKS</h3>
      <h4>SIMPLE STEPS. POWERFUL RESULTS.</h4>
      <div className="working-manual">

        <div>
          <CloudUpload size={22} className="icon lui-cloud-arrow-up"/>
          <h5 className="number1">01</h5>
          <h3>Upload Log File</h3>
          <p>Upload your log file securely.We support multiple log formats.</p>
        </div>

        <div>
          <Brain size={22} className="icon lui-brain"/>
          <h5 className="number2">02</h5>
          <h3>Intelligent Analysis</h3>
          <p>Our engine parses and analyses log using advanced algorithms.</p>
        </div>

        <div>
          <TriangleAlert size={22} className="icon lui-exclamation"/>
          <h5 className="number3">03</h5>
          <h3>Threat Detection</h3>
          <p>Detect threats using custom rules and industry best practices.</p>
        </div>

        <div>
          <FileText size={22} className="icon lui-file"/>
          <h5 className="number4">04</h5>
          <h3>Detailed Reports</h3>
          <p>Get comprehensive reports with alerts , timelines and insights.</p>
        </div>

      </div>
    </section>

    <section className="features-section" id="features">
      <h3>FEATURES</h3>
      <h4>EVERYTHING YOU NEED FOR LOG ANALYSIS</h4>
      <div className="features">

        <div>
          <FolderOpen size={22} className="icon lui-folder-open"/>
          <h3>Multi Log Support</h3>
          <p>Analyze Linux Auth,Web Access and Firewall logs seamlessly.</p>
        </div>

        <div>
          <Cpu size={22} className="icon lui-cpu"/>
          <h3>Intelligent Engine</h3>
          <p>Advanced parsing & correlation for accurate threat detection.</p>
        </div>

        <div>
          <Bell size={22} className="icon lui-bell"/>
          <h3>Smart Alerts</h3>
          <p>Rule-based detections with severity levels and MITRE mapping.</p>
        </div>

        <div>
          <ChartColumn size={22} className="icon lui-chart-column"/>
          <h3>Comprehensive Reports</h3>
          <p>Detailed insights with timelines, raw logs and recommendations.</p>
        </div>

        <div>
          <ShieldCheck size={22} className="icon lui-shield-check"/>
          <h3>Secure & Private</h3>
          <p>Your data is never stored without your consent.100% secure.</p>
        </div>

      </div>
    </section>

    <section className="log-types-section" id="log-types">
      <h3>SUPPORTED LOG TYPES & THREATS IDENTIFIED</h3>
      <div>

        <div>
          <div className="type-heading">
            <Database size={40} className="lui-database"/>
            <div>
              <h3>LINUX AUTH LOGS</h3>
              <p>Detect unauthorized access and brute force attacks</p>
            </div>
          </div>
          <div className="threats">
            <h2 className="linux">THREATS IDENTIFIED</h2>
            <ul className="linux-ul">
              <li>Brute Force Attacks</li>
              <li>Root Login Attempt</li>
              <li>Success After Failures</li>
              <li>Invalid User Scanning</li>
            </ul>
          </div>
        </div>

        <div>
          <div className="type-heading">
            <Globe size={40} className="lui-globe"/>
            <div>
              <h3>WEB ACCESS LOGS</h3>
              <p>Detect web based attacks and malicious activities.</p>
            </div>
          </div>
          <div className="threats">
            <h2 className="web">THREATS IDENTIFIED</h2>
            <ul className="web-ul">
              <li>Directory Enumeration</li>
              <li>Sensitive File Access</li>
              <li>SQL Injection Attempts</li>
              <li>Web Shell Access</li>
            </ul>
          </div>
        </div>

        <div>
          <div className="type-heading">
            <Flame size={40} className="lui-fire"/>
            <div>
              <h3>FIREWALL LOGS</h3>
              <p>Detect network scanning and malicious connections</p>
            </div>
          </div>
          <div className="threats">
            <h2 className="firewall">THREATS IDENTIFIED</h2>
            <ul className="firewall-ul">
              <li>Port Scanning</li>
              <li>Excessive Blocked Connections</li>
              <li>SSH Targeting</li>
              <li>Internal Network Access Attempt</li>
            </ul>
          </div>
        </div>

      </div>
    </section>

    <section className="about-section" id="about">
      <h3>ABOUT SOC ANALYST</h3>
      <h4>BUILT FOR ANALYSTS. DESIGNED FOR SECURITY.</h4>
      <p>
        SOC Analyst is a log analysis platform designed to help security professionals and analysts detect threats faster and respond 
        smarter. By combining intelligent parsing, rule-based detections, and detailed reporting, it transforms complex log data into 
        actionable security insights. The platform enables users to upload and analyze system, network, and application logs 
        through an intuitive interface. Advanced detection mechanisms identify suspicious activities, security anomalies, 
        failed authentication attempts, brute-force attacks, privilege escalation indicators, and other potential threats in real time.
        SOC Analyst simplifies the investigation process by organizing findings into clear dashboards, visual summaries, and 
        comprehensive reports. This allows analysts to quickly understand security events, prioritize incidents based on severity, 
        and make informed decisions without manually reviewing thousands of log entries.
      </p>
    </section>

    <footer>
      <p>&copy; 2026 SOC Analyst. All rights reserved.</p>
      <p>Developed by Amal George</p>
    </footer>

    </section>
  )
}

export default Home;