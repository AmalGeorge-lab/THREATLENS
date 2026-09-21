import "./sensitivefile.css";
import {useMutation, useQuery} from "@tanstack/react-query";
import { webAlertAPI, webUpdateStatusAPI } from "../../../api/alertsAPI";
import {useNavigate,useParams} from "react-router-dom";
import Loading from "../../Loading/Loading";
import { useEffect } from "react";
import { ArrowLeftRight, BadgeAlert, BadgeInfo, Calendar, CircleAlert, Clock, Crosshair, ExternalLink, FileCode, FileDown, FileWarning, Fingerprint, GitBranch, Globe, Link, MonitorSmartphone, ScrollText } from "lucide-react";







const SensitiveFile = () => {

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

    <section className="senstive-file-section">

      {!isPending ?
        isSuccess && 
          <>
            <section className="alert-info-section">

              <div className="left-section">
                <FileWarning size={52} style={{ color : "red" }}/>
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
                <p><Link size={15}/>Request URI : <span>{data.request_uri}</span></p>
                <p><ArrowLeftRight size={15}/>HTTP method : <span>{data.http_method}</span></p>
                <p><GitBranch size={15}/>HTTP version : <span>{data.http_version}</span></p>
                <p><FileDown size={15}/>Response Size : <span>{data.response_size}</span></p>
                <p><ExternalLink size={15}/>Referrer : <span>{data.referrer}</span></p>
                <p><MonitorSmartphone size={15}/>User Agent : <span>{data.user_agent}</span></p>
                <p><Fingerprint size={15}/>MITRE ID : <span>{data.mitre_technique}</span></p>
                <p><Crosshair size={15}/>MITRE Name : <span>{data.mitre_name}</span></p>
                <p><Clock size={15}/>TimeStamp : <span>{new Date(data.starting_time).toLocaleString("en-US",{
                  timeZone : "UTC" ,
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second : "2-digit",
                  hour12 : false
                }).replace(",","")}</span></p>
              </div>
            </section>

            <section className="summary-section">
              <h4>ATTACK SUMMARY</h4>
              <p>
                {`This security alert identifies a ${data.alert_type} against a public-facing application, detected by the 
                ${data.rule_name} rule and associated with MITRE ATT&CK technique ${data.mitre_technique} - 
                ${data.mitre_name}. The request originated from ${data.source_ip} and targeted ${data.request_uri} using 
                ${data.http_method} over ${data.http_version}. The server returned HTTP ${data.status_code} with a 
                response size of ${data.response_size} bytes. Additional request context, including the referrer ${data.referrer}
                and user agent ${data.user_agent}, is recorded to support investigation and threat correlation. The alert was 
                generated at ${data.starting_time}, and currently remains OPEN, requiring further analysis to determine whether the 
                attempted injection was successful and whether any application or database resources were compromised.`
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

export default SensitiveFile;