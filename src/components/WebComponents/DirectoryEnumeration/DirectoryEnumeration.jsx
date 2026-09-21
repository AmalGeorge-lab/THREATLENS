import "./directoryAttack.css";
import {useMutation, useQuery} from "@tanstack/react-query";
import { BadgeAlert, BadgeInfo, Calendar, CircleAlert, Clock, Crosshair, FileCode, Fingerprint, FolderSearch, Globe, Hash, ScrollText, Timer } from "lucide-react";
import { webAlertAPI, webUpdateStatusAPI } from "../../../api/alertsAPI";
import {useNavigate,useParams} from "react-router-dom";
import { formatDuration } from "../../../utils/time";
import Loading from "../../Loading/Loading";
import { useEffect } from "react";





const DirectoryEnumeration = () => {

  const navigate = useNavigate();
  const {id} = useParams();

  const {data,isSuccess,refetch,isPending,isError,error} = useQuery({ queryFn : ()=>webAlertAPI(id) , queryKey : [id] , enabled : !!id , retry : false });
  const { mutateAsync , isError : isUpdatingError , error : updatingError } = useMutation({ mutationFn : webUpdateStatusAPI , mutationKey : [id] });


  const updateStatus = (status) => {
    mutateAsync({id,status}).then((data)=>{
      refetch();
    });
  }


  useEffect(()=>{
    if(isError){
      navigate("/error",{state : { errorMessage : error.response?.data?.message }});
    }
    if(updatingError){
      navigate("/error",{state : { errorMessage : updatingError.response?.data?.message }});
    }
  },[isError,isUpdatingError]);



  return (
    <section className="directory-enumeration-section">

      {!isPending ?
        isSuccess && 
          <>
            <section className="alert-info-section">

              <div className="left-section">
                <FolderSearch size={52} style={{ color : "red" }}/>
                <div>
                  <h4>{data.alert_type.toUpperCase()}</h4>
                  <p>
                    <span><BadgeAlert size={12}/>Alert ID : {data.alert_id}</span>
                    <span><Calendar size={12}/>Created At : {new Date(data.created_at).toLocaleString("en-US",{
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second : "2-digit",
                      hour12 : false
                    }).replace(",","")}</span>
                  </p>
                </div>
              </div>

              <div className="middle-section">
                <p>Risk Score</p>
                <h4>{data.risk_score} / 100</h4>
              </div>

              <div className="right-section">
                <p>Severity</p>
                <h4 className={data.severity.toLowerCase()}>{data.severity}</h4>
              </div>

            </section>

            <section className="alert-details-section">
              <h4>ALERT DETAILS</h4>
              <div>
                <p><FileCode size={15}/>Rule ID : <span>{data.rule_id}</span></p>
                <p><ScrollText size={15}/>Rule Name : <span>{data.rule_name}</span></p>
                <p><CircleAlert size={15}/>Status : <span>{data.status}</span></p>
                <p><Globe size={15}/>Source IP  : <span>{data.source_ip}</span></p>
                <p><BadgeInfo size={15}/>Status Code : <span>{data.status_code}</span></p>
                <p><Hash size={15}/>Request Count : <span>{data.request_count}</span></p>
                <p><Fingerprint size={15}/>MITRE ID : <span>{data.mitre_technique}</span></p>
                <p><Crosshair size={15}/>MITRE Name : <span>{data.mitre_name}</span></p>
                <p><Clock size={15}/>Start Time : <span>{new Date(data.starting_time).toLocaleString("en-US",{
                  timeZone : "UTC" ,
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second : "2-digit",
                  hour12 : false
                }).replace(",","")}</span></p>
                <p><Calendar size={15}/>End Time : <span>{new Date(data.ending_time).toLocaleString("en-US",{
                  timeZone : "UTC" ,
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second : "2-digit",
                  hour12 : false
                }).replace(",","")}</span></p>
                <p><Timer size={15}/>Duration : <span>{formatDuration(data.starting_time , data.ending_time)}</span></p>
              </div>
            </section>

            <section className="logs-section">
              <h4>LOGS</h4>
              <section>
                {data.logs.map((log,index)=>{
                  return <p key={index}>{log}</p>
                })}
              </section>
            </section>

            <section className="summary-section">
              <h4>ATTACK SUMMARY</h4>
              <p>
                {`A directory enumeration attack was detected from IP ${data.source_ip} targeting the web application. 
                  The monitoring system recorded ${data.request_count} requests  with repeated attempts to access potentially sensitive resources such as /admin, 
                  /phpmyadmin, /.env, /config.php, and /backup.zip. Most requests returned HTTP ${data.status_code} responses, 
                  indicating that the targeted resources were not found. The activity also included suspicious SQL injection-like 
                  request parameters, suggesting broader web application reconnaissance. This activity is mapped to MITRE 
                  ATT&CK technique ${data.mitre_technique} (${data.mitre_name}) and requires further investigation to 
                  determine whether the source represents an authorized scanner or malicious activity.`
                }
              </p>
            </section>

            <section className="status-section">
              <h4>UPDATE STATUS</h4>
              <select id="status" defaultValue={data.status} onChange={(event)=>{updateStatus(event.target.value)}}>
                <option value="OPEN">OPEN</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </section>
          </>
        : <Loading/>
      }

    </section>
  )
}

export default DirectoryEnumeration;