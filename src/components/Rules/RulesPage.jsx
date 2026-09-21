import { useEffect } from "react";
import "./rule.css";
import {ShieldAlert , Bell , Laptop , User , ArrowLeftRight , CircleCheck, BadgeInfo, FileLock2, DatabaseZap, SquareTerminal, Plug, CircleX, Ampersands, Globe, Server} from "lucide-react";



const bruteForceAlertRules = [
  {
    id : 1 ,
    heading : (<>SINGLE IP <ArrowLeftRight size={10}/> SINGLE USER</>),
    subHeading : "Classical Brute Force" ,
    laptop : "IP" ,
    user : "user" ,
    thresholdStatement : (<>More than <span style={{ color : "rgb(244, 116, 5)" }}>3</span> attempts</>) ,
    riskScoreStatement : "Increases with more attempts"
  } ,
  {
    id : 2 ,
    heading : (<>SINGLE IP <ArrowLeftRight size={10}/> MULTIPLE USER</>) ,
    subHeading : "Password Spraying" ,
    laptop : "IP" ,
    user : "users" ,
    thresholdStatement : (<>More than <span style={{ color : "rgb(244, 116, 5)" }}>4</span> user attempts</>) ,
    riskScoreStatement : "Increases with more attempts and users"
  } ,
  {
    id : 3 ,
    heading : (<>MULTIPLE IPs <ArrowLeftRight size={10}/> SINGLE USER</>) ,
    subHeading : "Distribute Brute Force" ,
    laptop : "IPs" ,
    user : "user" ,
    thresholdStatement : (<>More than <span style={{ color : "rgb(244, 116, 5)" }}>3</span> IP attempts</>) ,
    riskScoreStatement : "Increases with more attempts and IPs"
  } ,
  {
    id : 4 ,
    heading : "SINGLE IP TARGETING ROOT" ,
    subHeading : "Root Account Brute Force" ,
    laptop : "IP" ,
    user : "root" ,
    thresholdStatement : (<>More than <span style={{ color : "rgb(244, 116, 5)" }}>3</span> attempts</>) ,
    riskScoreStatement : "Increases with more attempts"
  } ,
  {
    id : 5 ,
    heading : "MULTIPLE IPs TARGETING ROOT" ,
    subHeading : "Distributed Root Brute Force" ,
    laptop : "IPs" ,
    user : "root" ,
    thresholdStatement : (<>More than <span style={{ color : "rgb(244, 116, 5)" }}>3</span> IP attempts</>) ,
    riskScoreStatement : "Increases with more attempts and IPs"
  }
]

const bruteForceSuccessAlerts = [
  {
    id : 1 ,
    heading : (<>SINGLE IP <ArrowLeftRight size={10}/> SINGLE USER</>),
    subHeading : "Brute Force Account Success" ,
    laptop : "IP" ,
    user : "user" ,
    thresholdStatement : (<>Success after more than <span style={{ color : "rgb(244, 116, 5)" }}>3</span> attempts within 1 minute</>),
    riskScoreStatement : "Increases with more attempts"
  } ,
  {
    id : 2 ,
    heading : (<>MULTIPLE IPs <ArrowLeftRight size={10}/> SINGLE USER</>) ,
    subHeading : "Distribute Brute Force Account Success" ,
    laptop : "IPs" ,
    user : "user" ,
    thresholdStatement : (<>Success after more than <span style={{ color : "rgb(244, 116, 5)" }}>3</span> IP attempts within 1 minute</>) ,
    riskScoreStatement : "Increases with more attempts and IPs"
  } ,
  {
    id : 3 ,
    heading : "SINGLE IP TARGETING ROOT" ,
    subHeading : "Root Account Brute Force Success" ,
    laptop : "IP" ,
    user : "root" ,
    thresholdStatement : (<>Success after more than <span style={{ color : "rgb(244, 116, 5)" }}>3</span> attempts within 1 minute</>) ,
    riskScoreStatement : "Increases with more attempts"
  } ,
  {
    id : 4 ,
    heading : "MULTIPLE IPs TARGETING ROOT" ,
    subHeading : "Distributed Root Brute Force Account Success" ,
    laptop : "IPs" ,
    user : "root" ,
    thresholdStatement : (<>Success after more than <span style={{ color : "rgb(244, 116, 5)" }}>3</span> IP attempts within 1 minute</>) ,
    riskScoreStatement : "Increases with more attempts and IPs"
  }
]

const webRules = [
  {
    id : 1 ,
    heading : (<>SAME IP <ArrowLeftRight size={10}/> 404 STATUS CODE</>),
    subHeading : "Directory Enumeration" ,
    icon1 : <Laptop size={35}/> ,
    icon1Text : "IP" ,
    icon2 : <BadgeInfo size={30}/> ,
    icon2Text : "404 status code" ,
    thresholdStatement : (<>More than <span style={{ color : "rgb(244, 116, 5)" }}>20</span> attempts</>) ,
    riskScoreStatement : "Increases with more attempts"
  } ,
  {
    id : 2 ,
    heading : (<>IP <ArrowLeftRight size={10}/> SENSITIVE FILE</>),
    subHeading : "Sensitive File Access Attempt" ,
    icon1 : <Laptop size={35}/> ,
    icon1Text : "IP" ,
    icon2 : <FileLock2 size={30}/> ,
    icon2Text : "sensitive file" ,
    thresholdStatement : "Contains: .env , config.php , backup.zip , database.sql etc" ,
    riskScoreStatement : "Fixed"
  } ,
  {
    id : 3 ,
    heading : (<>IP <ArrowLeftRight size={10}/> SQL PATTERN</>),
    subHeading : "SQL Injection Detection" ,
    icon1 : <Laptop size={35}/> ,
    icon1Text : "IP" ,
    icon2 : <DatabaseZap size={30}/> ,
    icon2Text : "sql patterns" ,
    thresholdStatement : "Patterns: --UNION SELECTOR 1=1 SLEEP(" ,
    riskScoreStatement : "Fixed"
  } ,
  {
    id : 4 ,
    heading : (<>IP <ArrowLeftRight size={10}/> SHELL ACCESS</>),
    subHeading : "Web Shell Detection" ,
    icon1 : <Laptop size={35}/> ,
    icon1Text : "IP" ,
    icon2 : <SquareTerminal size={30}/> ,
    icon2Text : "shell extensions" ,
    thresholdStatement : "shell extensions (such as .php, .jsp, .asp, .aspx, .cgi)" ,
    riskScoreStatement : "Fixed"
  }
]

const firewallRules = [
  {
    id : 1 ,
    heading : (<>SAME IP <ArrowLeftRight size={10}/> DESTINATION PORTS</>),
    subHeading : "Port Scanning Detection" ,
    icon1 : <Laptop size={35}/> ,
    icon1Text : "IP" ,
    icon2 : <Plug size={30}/> ,
    icon2Text : "Destination ports" ,
    thresholdStatement : (<>More than <span style={{ color : "rgb(244, 116, 5)" }}>20</span> different ports</>) ,
    riskScoreStatement : "Increases with more attempts"
  } ,
  {
    id : 2 ,
    heading : (<>SAME IP <ArrowLeftRight size={10}/> DROP ACTIONS</>),
    subHeading : "Excessive Blocked Connections" ,
    icon1 : <Laptop size={35}/> ,
    icon1Text : "IP" ,
    icon2 : <CircleX size={30}/> ,
    icon2Text : "Drop action" ,
    thresholdStatement : (<>More than <span style={{ color : "rgb(244, 116, 5)" }}>50</span> drop actions</>) ,
    riskScoreStatement : "Increases with more attempts"
  } ,
  {
    id : 3 ,
    heading : (<>DSTN PORT(22) <Ampersands size={10}/> DROP ACTION</>),
    subHeading : "SSH Targeting Detection" ,
    icon1 : <Plug size={35}/> ,
    icon1Text : "Destination port" ,
    icon2 : <CircleX size={30}/> ,
    icon2Text : "Drop action" ,
    thresholdStatement : (<>More than <span style={{ color : "rgb(244, 116, 5)" }}>10</span> attempts</>) ,
    riskScoreStatement : "Increases with more attempts"
  } ,
  {
    id : 4 ,
    heading : (<>EXTERNAL IP <ArrowLeftRight size={10}/> INTERNAL HOST</>),
    subHeading : "Internal Network Access Attempt" ,
    icon1 : <Globe size={35}/> ,
    icon1Text : "External IP" ,
    icon2 : <Server size={30}/> ,
    icon2Text : "Internal Host" ,
    thresholdStatement : (<>More than <span style={{ color : "rgb(244, 116, 5)" }}>5</span> hosts</>) ,
    riskScoreStatement : "Increases with more attempts"
  } 
]




const RulesPage = () => {

  useEffect(() => {
    document.title = "Rules";
  }, []);


  return (
    <section className="rules-container">

      <section className="brute-force-rules">

        <header>
          <ShieldAlert size={50} style={{ color : "rgb(255, 0, 157)" }}/>
          <div>
            <h3 style={{ fontFamily : "Rowdies" }}>BRUTE FORCE DETECTION RULES</h3>
            <p style={{ color : "gray" , fontSize : "13px" }}>All rules uses a <span style={{ color : "rgb(0, 149, 255)" }}>1 minute </span>time window. Risk score increases with more attempts.</p>
          </div>
        </header>

        <section className="alert-rules">

          <div className="heading">
            <Bell size={30} style={{ color : "red" }}/>
            <div>
              <h3 style={{ fontFamily : "Rowdies" , fontSize : "16px" }}>ALERT RULES</h3>
              <p style={{ color : "gray" , fontSize : "13px" }}>Alerts are triggered when the threshold is exceeded within 1 minute</p>
            </div>
          </div>

          <section className="rules">

            {bruteForceAlertRules.map((alert)=>{
              return (
                <div key={alert.id}>
                  <div className="rule-heading">
                    <h3 style={{ backgroundColor : "rgba(255, 0, 0, 0.5)" }}>{alert.id}</h3>
                    <div>
                      <h4 style={{ fontFamily : "Rowdies" }}>{alert.heading}</h4>
                      <p style={{ color : "gray" , fontSize : "10px" }}>{alert.subHeading}</p>
                    </div>
                  </div>
                  <div className="rule-figure">
                    <div style={{ display : "flex" , flexDirection : "column" , rowGap : "10px" , alignItems : "center" , color : "rgb(229, 6, 77)" }}>
                      <Laptop size={35}/>
                      <p>{alert.laptop}</p>
                    </div>
                    <ArrowLeftRight style={{ color : "gray" }}/>
                    <div style={{ display : "flex" , flexDirection : "column" , rowGap : "10px" , alignItems : "center" , color : "rgb(10, 158, 233)" }}>
                      <User size={35}/>
                      <p>{alert.user}</p>
                    </div>
                  </div>
                  <div style={{ fontSize : "10px" , display : "flex" , flexDirection : "column" , rowGap : "5px" }}>
                    <p style={{ color : "orange" }}>Threshold</p>
                    <p>{alert.thresholdStatement}</p>
                  </div>
                  <div style={{ fontSize : "10px" , display : "flex" , flexDirection : "column" , rowGap : "5px" }}>
                    <p style={{ color : "rgb(248, 40, 4)" }}>Risk Score</p>
                    <p>{alert.riskScoreStatement}</p>
                  </div>
                </div>
              )
            })}

          </section>

        </section>

        <section className="alert-rules">

          <div className="heading">
            <CircleCheck size={30} style={{ color : "rgba(40, 244, 8, 0.84)" }}/>
            <div>
              <h3 style={{ fontFamily : "Rowdies" , fontSize : "16px" }}>SUCCESSFUL LOGIN RULES</h3>
              <p style={{ color : "gray" , fontSize : "13px" }}>Login within 1 minute is considered normal if success is within 3 attempts , else an alert is generated</p>
            </div>
          </div>

          <section className="rules">

            {bruteForceSuccessAlerts.map((alert)=>{
              return (
                <div key={alert.id}>
                  <div className="rule-heading">
                    <h3 style={{ backgroundColor : "rgba(0, 255, 4, 0.38)" }}>{alert.id}</h3>
                    <div>
                      <h4 style={{ fontFamily : "Rowdies" }}>{alert.heading}</h4>
                      <p style={{ color : "gray" , fontSize : "10px" }}>{alert.subHeading}</p>
                    </div>
                  </div>
                  <div className="rule-figure">
                    <div style={{ display : "flex" , flexDirection : "column" , rowGap : "10px" , alignItems : "center" , color : "rgb(6, 229, 17)" }}>
                      <Laptop size={35}/>
                      <p>{alert.laptop}</p>
                    </div>
                    <ArrowLeftRight style={{ color : "gray" }}/>
                    <div style={{ display : "flex" , flexDirection : "column" , rowGap : "10px" , alignItems : "center" , color : "rgb(10, 158, 233)" }}>
                      <User size={35}/>
                      <p>{alert.user}</p>
                    </div>
                  </div>
                  <div style={{ fontSize : "10px" , display : "flex" , flexDirection : "column" , rowGap : "5px" }}>
                    <p style={{ color : "orange" }}>Threshold</p>
                    <p>{alert.thresholdStatement}</p>
                  </div>
                  <div style={{ fontSize : "10px" , display : "flex" , flexDirection : "column" , rowGap : "5px" }}>
                    <p style={{ color : "rgb(248, 40, 4)" }}>Risk Score</p>
                    <p>{alert.riskScoreStatement}</p>
                  </div>
                </div>
              )
            })}

          </section>

        </section>

      </section>

      <section className="brute-force-rules">

        <header>
          <ShieldAlert size={50} style={{ color : "rgb(255, 0, 157)" }}/>
          <div>
            <h3 style={{ fontFamily : "Rowdies" }}>WEB ALERTS DETECTION RULES</h3>
            <p style={{ color : "gray" , fontSize : "13px" }}>Risk score increases with more attempts.</p>
          </div>
        </header>

        <section className="alert-rules">

          <section className="rules">

            {webRules.map((alert)=>{
              return (
                <div key={alert.id}>
                  <div className="rule-heading">
                    <h3 style={{ backgroundColor : "rgba(179, 0, 255, 0.5)" }}>{alert.id}</h3>
                    <div>
                      <h4 style={{ fontFamily : "Rowdies" }}>{alert.heading}</h4>
                      <p style={{ color : "gray" , fontSize : "10px" }}>{alert.subHeading}</p>
                    </div>
                  </div>
                  <div className="rule-figure">
                    <div style={{ display : "flex" , flexDirection : "column" , rowGap : "10px" , alignItems : "center" , color : "rgb(229, 6, 77)" }}>
                      {alert.icon1}
                      <p>{alert.icon1Text}</p>
                    </div>
                    <ArrowLeftRight style={{ color : "gray" }}/>
                    <div style={{ display : "flex" , flexDirection : "column" , rowGap : "10px" , alignItems : "center" , color : "rgb(10, 158, 233)" }}>
                      {alert.icon2}
                      <p>{alert.icon2Text}</p>
                    </div>
                  </div>
                  <div style={{ fontSize : "10px" , display : "flex" , flexDirection : "column" , rowGap : "5px" }}>
                    <p style={{ color : "orange" }}>Threshold</p>
                    <p>{alert.thresholdStatement}</p>
                  </div>
                  <div style={{ fontSize : "10px" , display : "flex" , flexDirection : "column" , rowGap : "5px" }}>
                    <p style={{ color : "rgb(248, 40, 4)" }}>Risk Score</p>
                    <p>{alert.riskScoreStatement}</p>
                  </div>
                </div>
              )
            })}

          </section>

        </section>

      </section>

      <section className="brute-force-rules">

        <header>
          <ShieldAlert size={50} style={{ color : "rgb(255, 0, 157)" }}/>
          <div>
            <h3 style={{ fontFamily : "Rowdies" }}>FIREWALL ALERTS DETECTION RULES</h3>
            <p style={{ color : "gray" , fontSize : "13px" }}>All rules uses either <span style={{ color : "rgb(0, 149, 255)" }}>10 minute or 5 minute </span>time window. Risk score increases with more attempts.</p>
          </div>
        </header>

        <section className="alert-rules">

          <section className="rules">

            {firewallRules.map((alert)=>{
              return (
                <div key={alert.id}>
                  <div className="rule-heading">
                    <h3 style={{ backgroundColor : "rgba(255, 119, 0, 0.5)" }}>{alert.id}</h3>
                    <div>
                      <h4 style={{ fontFamily : "Rowdies" }}>{alert.heading}</h4>
                      <p style={{ color : "gray" , fontSize : "10px" }}>{alert.subHeading}</p>
                    </div>
                  </div>
                  <div className="rule-figure">
                    <div style={{ display : "flex" , flexDirection : "column" , rowGap : "10px" , alignItems : "center" , color : "rgb(229, 6, 77)" }}>
                      {alert.icon1}
                      <p>{alert.icon1Text}</p>
                    </div>
                    <ArrowLeftRight style={{ color : "gray" }}/>
                    <div style={{ display : "flex" , flexDirection : "column" , rowGap : "10px" , alignItems : "center" , color : "rgb(10, 158, 233)" }}>
                      {alert.icon2}
                      <p>{alert.icon2Text}</p>
                    </div>
                  </div>
                  <div style={{ fontSize : "10px" , display : "flex" , flexDirection : "column" , rowGap : "5px" }}>
                    <p style={{ color : "orange" }}>Threshold</p>
                    <p>{alert.thresholdStatement}</p>
                  </div>
                  <div style={{ fontSize : "10px" , display : "flex" , flexDirection : "column" , rowGap : "5px" }}>
                    <p style={{ color : "rgb(248, 40, 4)" }}>Risk Score</p>
                    <p>{alert.riskScoreStatement}</p>
                  </div>
                </div>
              )
            })}

          </section>

        </section>

      </section>

    </section>
  )
}

export default RulesPage;