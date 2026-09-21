import "./portScanning.css";
import {useMutation, useQuery} from "@tanstack/react-query";
import { firewallAlertAPI, firewallUpdateStatusAPI } from "../../../api/alertsAPI";
import {useNavigate,useParams} from "react-router-dom";
import Loading from "../../Loading/Loading";
import { useEffect } from "react";
import { ArrowLeftFromLine, BadgeAlert, BadgeCheck, Calendar, CircleAlert, Clock, Crosshair, FileCode, Fingerprint, Globe, Globe2, Network, ScanSearch, ScrollText, Server, Timer, Wrench, Zap } from "lucide-react";
import { formatDuration } from "../../../utils/time";









const PortScanning = () => {

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
    
    <section className="port-scanning-section">

      {!isPending ?
        isSuccess && 
          <>
            <section className="alert-info-section">

              <div className="left-section">
                <ScanSearch size={52} style={{ color : "red" }}/>
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
                <p><Globe2 size={15}/>Destination IP : <span>
                  {data.destination_ips.map((ip)=>`${ip} , `)}
                </span></p>
                <p><Network size={15}/>Destination ports : <span>
                  {data.destination_ports.map((port)=>`${port} , `)}
                </span></p>
                <p><ArrowLeftFromLine size={30}/>Source ports : <span>
                  {data.source_ports.map((port)=>`${port} , `)}
                </span></p>
                <p><BadgeCheck size={15}/>Accepted Destination ports : <span>
                  {data.accepted_destination_ports.map((port)=>`${port} , `)}
                </span></p>
                <p><Zap size={15}/>Actions : <span>{data.actions.map((action)=>`${action} , `)}</span></p>
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
                {`A port scanning activity was detected originating from ${data.source_ip} targeting the ${data.host} host via 
                the ${data.service} service. The monitoring system identified connection attempts across ${data.destination_ports?.length || 0} 
                destination ports, involving source ports ${data.source_ports?.map((port) => `${port} `)} and targeting destination 
                ports ${data.destination_ports?.map((port) => `${port} `)}. Of the observed ports, ${data.accepted_destination_ports?.length || 0} 
                destination ports accepted connections, indicating that the source attempted to identify accessible services and open 
                ports on the target system. This behavior is consistent with reconnaissance activity intended to map the network 
                exposure of the ${data.host} host and identify potential services for further exploitation. The activity should be 
                investigated by reviewing the source IP, targeted ports, connection outcomes, and subsequent traffic for additional 
                suspicious behavior. Restricting unnecessary exposed services, applying firewall controls, and monitoring repeated 
                scanning attempts are recommended to reduce the attack surface.`}
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

export default PortScanning;