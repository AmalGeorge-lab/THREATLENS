import "./dashboard.css";
import {useNavigate} from "react-router-dom";
import { CircleCheck, Trash, Files ,  Eye, Terminal, Globe2, Flame } from "lucide-react";
import {useMutation, useQuery} from "@tanstack/react-query";
import { dashboardAPI } from "../../api/userAPI";
import { useEffect } from "react";
import { totalLogsCalculator, typeLogCalculator } from "../../utils/dashboardUtils";
import Loading from "../Loading/Loading";
import { firewallDeleteLogAPI, linuxDeleteLogAPI, webDeleteLogAPI } from "../../api/alertsAPI";






const Dashboard = () => {

  const navigate = useNavigate();

  const {data , isSuccess , isPending , isError , error , refetch} = useQuery({ 
    queryFn : dashboardAPI , 
    queryKey : ["dashboardAPI"] , 
    retry : false 
  });

  const {mutateAsync : authMutateAsync , isError : authIsDeletingError , error : authDeleteError} = useMutation({ mutationFn : linuxDeleteLogAPI , mutationKey : ["linuxDeleteLog"] });
  const {mutateAsync : webMutateAsync , isError : webIsDeletingError , error : webDeleteError} = useMutation({ mutationFn : webDeleteLogAPI , mutationKey : ["webDeleteLog"] });
  const {mutateAsync : firewallMutateAsync , isError : firewallIsDeletingError , error : firewallDeleteError} = useMutation({ mutationFn : firewallDeleteLogAPI , mutationKey : ["firewallDeleteLog"] });


  
  const totalLogsParsed = isSuccess ? totalLogsCalculator(data) : 0;
  const logTypes = isSuccess ? typeLogCalculator(data) : {};





  useEffect(() => {
    document.title = "Dashboard";
  }, []);







  useEffect(()=>{
    if(isError){
      navigate("/error",{state : { errorMessage : error.response?.data?.message }});
    }
    if(authIsDeletingError){
      navigate("/error",{state : { errorMessage : authDeleteError.response?.data?.message }});
    }
    if (webIsDeletingError){
      navigate("/error",{state : { errorMessage : webDeleteError.response?.data?.message }});
    }
    if (firewallIsDeletingError){
      navigate("/error",{state : { errorMessage : firewallDeleteError.response?.data?.message }});
    }
  },[isError , authIsDeletingError , webIsDeletingError , firewallIsDeletingError]);







  const deleteLogFn = (fileId , logType) => {
    if (logType === "auth"){
      authMutateAsync({fileId}).then(()=>{
        refetch();
      });
    }
    else if (logType === "web"){
      webMutateAsync({fileId}).then(()=>{
        refetch();
      });
    }
    else if(logType === "firewall"){
      firewallMutateAsync({fileId}).then(()=>{
        refetch();
      });
    }
  }


  return (
    <section className="dashboard">

      {!isPending ? 
        isSuccess && 
          <>
            <div className="heading-info">
              <h2>DASHBOARD</h2>
              <p>Overview of your uploaded and analyzed log files</p>
            </div>

            <div className="analysis-info">

              <div>
                <Files size={30} className="icon lui-files"/>
                <div>
                  <p>Files Analysed</p>
                  <h3>{data.length}</h3>
                  <p>Total files analysed</p>
                </div>
              </div>

              <div>
                <CircleCheck size={30} className="icon lui-circle-check"/>
                <div>
                  <p>Total Logs Parsed</p>
                  <h3 style={{ color : "rgb(17, 201, 39)" }}>{totalLogsParsed}</h3>
                  <p>Total log lines parsed</p>
                </div>
              </div>

              <div>
                <Terminal size={30} className="icon lui-alert-terminal"/>
                <div>
                  <p>Linux Files</p>
                  <h3 style={{ color : "rgb(126, 24, 173)" }}>{logTypes.AUTH}</h3>
                  <p>Across all files</p>
                </div>
              </div>

              <div>
                <Globe2 size={30} className="icon lui-alert-globe"/>
                <div>
                  <p>Web Files</p>
                  <h3 style={{ color : "rgb(36, 24, 173)" }}>{logTypes.WEB}</h3>
                  <p>Across all files</p>
                </div>
              </div>

              <div>
                <Flame size={30} className="icon lui-alert-flame"/>
                <div>
                  <p>Linux Files</p>
                  <h3 style={{ color : "rgb(173, 108, 24)" }}>{logTypes.FIREWALL}</h3>
                  <p>Across all files</p>
                </div>
              </div>

            </div>

            <div className="logs-section">
              <h2>All Analyses</h2>
              {data.length ?
                <table>
                  <thead>
                    <tr style={{ borderTop : "1px solid #333" }}>
                      <th rowSpan="2">File Name</th>
                      <th rowSpan="2">File Size</th>
                      <th rowSpan="2">Log Type</th>
                      <th rowSpan="2">Logs Parsed</th>
                      <th colSpan="4">Alerts</th>
                      <th rowSpan="2">Analysed At</th>
                      <th rowSpan="2">Actions</th>
                    </tr>
                    <tr style={{ borderBottom : "1px solid #333" }}>
                      <th style={{ color : "rgb(8, 159, 173)" }}>LOW</th>
                      <th style={{ color : "rgb(193, 187, 8)" }}>MEDIUM</th>
                      <th style={{ color : "rgb(173, 99, 8)" }}>HIGH</th>
                      <th style={{ color : "rgb(173, 8, 8)" }}>CRITICAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((info)=>{
                      return (
                        <tr key={info._id}>
                          <td>{info.fileName}</td>
                          <td>{`${(info.fileSize / 1024).toFixed(2)} KB`}</td>
                          <td>{info.logType.toUpperCase()}</td>
                          <td>{info.parsedLogs}</td>
                          <td style={{ color : "rgb(8, 159, 173)" }}>{info.alertsGenerated.low}</td> 
                          <td style={{ color : "rgb(193, 187, 8)" }}>{info.alertsGenerated.medium}</td> 
                          <td style={{ color : "rgb(173, 99, 8)" }}>{info.alertsGenerated.high}</td>
                          <td style={{ color : "rgb(173, 8, 8)" }}>{info.alertsGenerated.critical}</td>
                          <td>{new Date(info.createdAt).toLocaleDateString("en-US",{ month : "long" , day : "numeric" , year : "numeric" })}</td>
                          <td className="actions"><Eye size={15} className="icon" onClick={()=>navigate(`/${info.logType}/analysis/${info._id}`)}/><Trash onClick={()=>deleteLogFn(info._id,info.logType)} size={15} className="icon" /></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              : <p className="message">No files uploaded yet</p>}
            </div>
          </>
      : <Loading/>}

    </section>
  )
}

export default Dashboard;