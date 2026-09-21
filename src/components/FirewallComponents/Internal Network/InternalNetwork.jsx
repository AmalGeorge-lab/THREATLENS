import {useMutation, useQuery} from "@tanstack/react-query";
import { firewallAlertAPI, firewallUpdateStatusAPI } from "../../../api/alertsAPI";
import {useNavigate,useParams} from "react-router-dom";
import Loading from "../../Loading/Loading";
import { useEffect } from "react";
import { BadgeAlert, Calendar, CircleAlert, Clock, Crosshair, FileCode, Fingerprint, Globe, Globe2, Network, ScrollText, Server, Timer, Wrench } from "lucide-react";
import { formatDuration } from "../../../utils/time";
import "./internalNetwork.css";







const InternalNetwork = () => {

  const navigate = useNavigate();
  const {id} = useParams();

  const {data,isSuccess,refetch,isPending,isError,error} = useQuery({ queryFn : ()=>firewallAlertAPI(id) , queryKey : [id] , enabled : !!id , retry : false });
  const { mutateAsync , isError : isUpdatingError , error : updatingError } = useMutation({ mutationFn : firewallUpdateStatusAPI , mutationKey : [id] });

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
    <section className="internal-network-section">

      {!isPending ?
        isSuccess && 
          <>
            <section className="alert-info-section">

              <div className="left-section">
                <Network size={52} style={{ color : "red" }}/>
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
                <p><Globe2 size={15}/>Destination IPs : <span>
                  {data.destination_ips.map((ip)=>`${ip} , `)}
                </span></p>
                <p><Server size={15}/>Host : <span>{data.host}</span></p>
                <p><Wrench size={15}/>Service : <span>{data.service}</span></p>
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

            <section className="summary-section">
              <h4>ATTACK SUMMARY</h4>
              <p>
                {`An internal network access attempt was detected originating from ${data.source_ip} and targeting the 
                internal systems ${data.destination_ips?.map((ip) => `${ip} `)} on the ${data.host} host via the ${data.service} 
                service. The monitoring system identified communication from the source system toward internal destination IP 
                addresses, indicating an attempt to access or interact with systems within the internal network. This behavior may 
                indicate network reconnaissance or an attempt to discover accessible internal hosts and services after gaining network 
                access. The activity should be investigated by reviewing the source IP, targeted destination systems, network 
                connection logs, and any subsequent activity involving the identified hosts. Restricting unnecessary internal network 
                access, applying network segmentation and access controls, and monitoring unusual communication between internal 
                systems are recommended to reduce the risk of unauthorized network access.`}
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

export default InternalNetwork