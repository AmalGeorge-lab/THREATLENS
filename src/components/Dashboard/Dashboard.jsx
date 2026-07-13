import "./dashboard.css";
import {useNavigate} from "react-router-dom";
import { AlertTriangle, CircleCheck, Trash, Files ,  Eye } from "lucide-react";
import {useMutation, useQuery} from "@tanstack/react-query";
import { dashboardAPI } from "../../api/userAPI";
import { useEffect } from "react";
import { totalAlertCalculator, totalLogsCalculator } from "../../utils/dashboardUtils";
import Loading from "../Loading/Loading";
import { deleteLogAPI } from "../../api/alertsAPI";






const Dashboard = () => {

  const navigate = useNavigate();

  const {data , isSuccess , isPending , isError , error , refetch} = useQuery({ 
    queryFn : dashboardAPI , 
    queryKey : ["dashboardAPI"] , 
    retry : false 
  });

  const {mutateAsync , isError : isDeletingError , error : deleteError} = useMutation({ mutationFn : deleteLogAPI , mutationKey : ["deleteLog"] });

  const totalLogsParsed = isSuccess ? totalLogsCalculator(data) : 0;
  const totalAlerts = isSuccess ? totalAlertCalculator(data) : 0;


  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  useEffect(()=>{
    if(isError){
      navigate("/error",{state : { errorMessage : error.response?.data?.message }});
    }
    if(isDeletingError){
      navigate("/error",{state : { errorMessage : deleteError.response?.data?.message }});
    }
  },[isError , isDeletingError]);

  const deleteLogFn = (fileId) => {
    mutateAsync({fileId}).then(()=>{
      refetch()
    });
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
                <AlertTriangle size={30} className="icon lui-alert-triangle"/>
                <div>
                  <p>Alerts Generated</p>
                  <h3 style={{ color : "rgb(216, 166, 28)" }}>{totalAlerts}</h3>
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
                          <td>{info.logType}</td>
                          <td>{info.parsedLogs}</td>
                          <td style={{ color : "rgb(8, 159, 173)" }}>{info.alertsGenerated.low}</td> 
                          <td style={{ color : "rgb(193, 187, 8)" }}>{info.alertsGenerated.medium}</td> 
                          <td style={{ color : "rgb(173, 99, 8)" }}>{info.alertsGenerated.high}</td>
                          <td style={{ color : "rgb(173, 8, 8)" }}>{info.alertsGenerated.critical}</td>
                          <td>{new Date(info.createdAt).toLocaleDateString("en-US",{ month : "long" , day : "numeric" , year : "numeric" })}</td>
                          <td className="actions"><Eye size={15} className="icon" onClick={()=>navigate(`/linux/analysis/${info._id}`)}/><Trash onClick={()=>deleteLogFn(info._id)} size={15} className="icon" /></td>
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