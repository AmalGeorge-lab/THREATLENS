import "./analysis.css";
import { Doughnut , Bar } from "react-chartjs-2";
import { Chart as ChartJS , ArcElement , Tooltip , Legend, plugins , CategoryScale , LinearScale , BarElement , Title } from "chart.js";
import {Eye} from "lucide-react";
import {useNavigate , useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import { firewallAlertsAPI, firewallFilteredAlertsAPI } from "../../api/alertsAPI";
import { alertOrganiser, attackCalculator, ruleCalculator, severityCalculator } from "../../utils/firewallAnalysisUtils";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
ChartJS.register( ArcElement,Tooltip,Legend , CategoryScale , LinearScale , BarElement , Title);








const FirewallAnalysis = () => {


  const navigate = useNavigate();
  const {fileId} = useParams();



  const [filterData , setFilterData] = useState({ fileId , severity : "*" , status : "*" , rule : "*" , attack : "*" });
  const [filterApplied, setFilterApplied] = useState(false);


  const {data,isSuccess,isPending,isError,error} = useQuery({ 
    queryFn : ()=>firewallAlertsAPI(fileId) ,
    queryKey : [fileId] , 
    enabled: !!fileId,
    retry : false 
  });


  const { data:filteredAlerts , isSuccess : filterDataFetched , isPending : filteredAlertsPending , isError : isFiltererdError , error : filteringError } = useQuery({
    queryKey: ["firewallFilteredAlerts",filterData],
    queryFn: ()=>firewallFilteredAlertsAPI(filterData)  ,
    retry : false ,
    enabled : filterApplied
  });



  useEffect(() => {
    document.title = "Firewall Analysis Result";
  }, []);



  const showFilterLoading = filterApplied && filteredAlertsPending;
  const alerts = filterApplied && filterDataFetched ? alertOrganiser(filteredAlerts) : isSuccess ? alertOrganiser(data.alerts) : null;



  useEffect(()=>{
    if(isError){
      navigate("/error",{state : { errorMessage : error.response?.data?.message }});
    }
    if(filteringError){
      navigate("/error",{state : { errorMessage : filteringError.response?.data?.message }});
    }
  },[isError , isFiltererdError]);






  const severityValues = isSuccess ?  severityCalculator(data.alerts) : {};
  const ruleValues = isSuccess ? ruleCalculator(data.alerts) : {};
  const attackValues = isSuccess ?  attackCalculator(data.alerts) : {};


  const severityData = {
    labels : ["Critical" , "High" , "Medium" , "Low"] ,
    datasets : [{
      data : [severityValues.CRITICAL , severityValues.HIGH , severityValues.MEDIUM , severityValues.LOW] ,
      backgroundColor: ["#f41616", "#fc9105", "#fcf409" , "#0a89f9"],
      //borderColor: "#f1e9e9",
      borderWidth: 0,
      hoverOffset: 15
    }]
  }

  const severityOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins : {
      title : {
        display: true,
        text: "ALERTS BY SEVERITY",
        font: {
          size: 15,
          weight: "bold",
          family : "Quicksand"
        },
        color : "#fffdfd",
        padding: {
          top: 10,
          bottom: 20
        }
      } ,
      legend : {
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 5,
          boxHeight: 5 ,
          font: {
            size: 10,
            weight: "400" ,
            family : "Quicksand"
          },
          color : "#f0f1f4" ,
          padding : 20
        }
      } ,
      tooltip : {
        backgroundColor: "#111827",
        titleFont: {size: 10},
        bodyFont: {size: 10},
        padding: 12,
        cornerRadius: 5
      }
    } ,
    animation : {
      animateRotate: true,
      duration: 1500
    }
  }

  const rulesData = {
    labels: ["FW-001", "FW-002", "FW-003", "FW-004"],
    datasets : [{
      data: [ruleValues["FW-001"], ruleValues["FW-002"], ruleValues["FW-003"], ruleValues["FW-004"]],
      backgroundColor: ["#03782e","#f80202","#593803", "#580568"],
      borderRadius: 4,
      barPercentage: 0.7 ,
      categoryPercentage: 0.7
    }]
  }

  const rulesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins:{
      title : {
        display: true,
        text: "ALERTS BY RULE",
        font: {
          size: 15,
          weight: "bold" ,
          family : "Quicksand" ,
        },
        color : "#fffdfd" ,
        padding: {
          top: 10,
          bottom: 20
        }
      } ,
      legend : {
        display : false
      } ,
      tooltip: {
        backgroundColor: "#111827",
        titleFont: {
          size: 12
        },
        bodyFont: {
          size: 10
        },
        padding: 12,
        cornerRadius: 8
      }
    } ,
    scales: {
      x: {
        grid: {display: false},
        border: {display: true , color : "#ffffff" , width : 1},
        ticks: { font: {size: 10,weight: "bold",family : "Quicksand"} , color: "#ffffff",}
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "ALERTS COUNT",
          color : "#fffdfd" ,
          font: {size: 10,weight: "700",family : "Quicksand"}
        },
        grid: {display: false},
        border: {display: true , color : "#ffffff" , width : 1},
        ticks: {stepSize: 2 , color: "#ffffff", font : { family : "Quicksand" }}
      }
    } ,
    animation: {duration: 1200}
  }

  const attackData = {
    labels: [
      "EXCESSIVE BLOCKED CONNECTIONS", 
      "INTERNAL NETWORK ACCESS ATTEMPT", 
      "PORT SCANNING DETECTION" ,
      "SSH TARGETING" ,
    ],
    datasets : [{
      data: [
        attackValues["Excessive Blocked Connections"],
        attackValues["Internal Network Access Attempt"],
        attackValues["Port Scanning Detection"],
        attackValues["SSH Targeting"],
      ],
      backgroundColor: ["#03782e","#f80202","#593803", "#580568"],
      borderRadius: 2,
      barPercentage: 0.4 ,
      categoryPercentage: 0.7
    }]
  }

  const attackOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis : "y" ,
    plugins:{
      title : {
        display: true,
        text: "ATTACKS BY TYPE",
        font: {
          size: 15,
          weight: "bold" ,
          family : "Quicksand" ,
        },
        color : "#fffdfd" ,
        padding: {
          top: 10,
          bottom: 20
        }
      } ,
      legend : {
        display : false
      } ,
      tooltip: {
        backgroundColor: "#111827",
        titleFont: {
          size: 12
        },
        bodyFont: {
          size: 10
        },
        padding: 12,
        cornerRadius: 8
      }
    } ,
    scales: {
      y: {
        grid: {display: false},
        border: {display: true , color : "#ffffff" , width : 1},
        ticks: { font: {size: 10,weight: "bold",family : "Quicksand"} , color: "#ffffff",}
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "ATTACKS COUNT",
          color : "#fffdfd" ,
          font: {size: 10,weight: "700",family : "Quicksand"}
        },
        grid: {display: false},
        border: {display: true , color : "#ffffff" , width : 1},
        ticks: {stepSize: 2 , color: "#ffffff", font : { family : "Quicksand" }}
      }
    } ,
    animation: {duration: 1200}
  }




  const handleChange = (event)=>{
    const {name , value} = event.target;
    setFilterData((prev)=>({...prev,[name] : value}));
    setFilterApplied(true);
  }




  

  return (
    
        <section className="analysis-container">

      {!isPending ? 
        isSuccess &&
          <>
            <section className="logs-parsed-count">
              <h3>TOTAL LOGS PARSED</h3>
              <p>{data.file.parsedLogs}</p>
            </section>
            
            <section className="chart-container">
              <section className="side-charts">
                <section className="severity-chart">
                  <Doughnut data={severityData} options={severityOptions}/>
                </section>
                <section className="rules-chart">
                  <Bar data={rulesData} options={rulesOptions}/>
                </section>
              </section>
              <section className="main-chart">
                <Bar data={attackData} options={attackOptions}/>
              </section>
            </section>

            <section className="alert-container">
              <section>
                <h3>ALERTS ({alerts.length})</h3>
                <div>

                  <select name="severity" onChange={handleChange} defaultValue={filterData.severity}>
                    <option value="*">All Severity</option>
                    {severityData.labels.map((severity)=>{
                      return <option key={severity} value={severity.toUpperCase()}>{severity.toUpperCase()}</option>
                    })}
                  </select>

                  <select name="status" onChange={handleChange} defaultValue={filterData.status}>
                    <option value="*">All Status</option>
                    {["OPEN","CLOSED"].map((status)=>{
                      return <option key={status} value={status}>{status}</option>
                    })}
                  </select>

                  <select name="rule" onChange={handleChange} defaultValue={filterData.rule}>
                    <option value="*">All Rules</option>
                    {rulesData.labels.map((rule)=>{
                      return <option key={rule} value={rule}>{rule}</option>
                    })}
                  </select>

                  <select name="attack" onChange={handleChange} defaultValue={filterData.attack} style={{ width : "400px" }}>
                    <option value="*">All Alerts</option>
                    {["Excessive Blocked Connections","Internal Network Access Attempt" ,"Port Scanning Detection" ,"SSH Targeting"].map((attack)=>{
                      return <option key={attack} value={attack}>{attack}</option>
                    })}
                  </select>

                </div>
              </section>

              {!showFilterLoading ?
                alerts.length ?
                  <table>
                    <thead>
                      <tr>  
                        <th>Alert ID</th>
                        <th>Timestamp</th>
                        <th>Severity</th>
                        <th>Rule ID</th>
                        <th>Rule Name</th>
                        <th>Alert Type</th>
                        <th>Status</th>
                        <th>View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alerts.map((alert)=>{
                        return (
                          <tr key={alert._id}>
                            <td>{alert.alert_id}</td>
                            <td>{new Date(alert.timestamp).toLocaleString("en-US",{
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            }).replace(",","")}</td>
                            <td className={alert.severity.toLowerCase()}><span>{alert.severity}</span></td>
                            <td>{alert.rule_id}</td>
                            <td>{alert.rule_name}</td>
                            <td>{alert.alert_type}</td>
                            <td className={alert.status.toLowerCase()}><span>{alert.status}</span></td>
                            <td><Eye size={15} className="lui-eye" onClick={()=>navigate(`/firewall/analysis/${alert.path}/${alert._id}`)}/></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                : <p className="message">No alerts found</p>
              : <section className="filter-loading-container"><Loading/></section>}
            </section>
          </>
      : <Loading/>}
      
    </section>

  )
}

export default FirewallAnalysis;