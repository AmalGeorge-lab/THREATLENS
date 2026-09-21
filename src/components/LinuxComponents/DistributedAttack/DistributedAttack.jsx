import "./distributedAttack.css";
import { BadgeAlert, 
  Bell, 
  Calendar, 
  CircleAlert, 
  CircleCheck, 
  Clock, 
  Cog, 
  Cpu, 
  Crosshair, 
  Eye, 
  FileCode, 
  Fingerprint, 
  Globe, 
  OctagonAlert, 
  Radar, 
  ScrollText, 
  Server, 
  ShieldX, 
  Timer, 
  TriangleAlert, 
  User, 
Waypoints } from "lucide-react";
import {useNavigate,useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import { linuxAlertAPI, linuxUpdateStatusAPI } from "../../../api/alertsAPI";
import { formatDuration } from "../../../utils/time";
import Loading from "../../Loading/Loading";
import { useEffect } from "react";









const DistributedAttack = () => {

  const navigate = useNavigate();
  const {id} = useParams();

  const {data,isSuccess,refetch,isPending,isError,error} = useQuery({ queryFn : ()=>linuxAlertAPI(id) , queryKey : [id] , enabled : !!id , retry : false });
  const { mutateAsync , isError : isUpdatingError , error : updatingError } = useMutation({ mutationFn : linuxUpdateStatusAPI , mutationKey : [id] });


  const updateStatus = (status) => {
    mutateAsync({id,status}).then((data)=>{
      refetch();
    })
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
    <section className="distributed-attack-section">

      {!isPending ?
        isSuccess &&
          <>
            <section className="alert-info-section">

              <div className="left-section">
                <OctagonAlert size={52} style={{ color : "red" }}/>
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

            <section className="alert-target-details-section">

              {data.rule_id === "AUTH-003" ?
                <div>
                  <Globe className="icon" size={20}/>
                  <div>
                    <h4>SUCCESS IP</h4>
                    <p>{data.successIP}</p>
                  </div>
                </div>
              : <></> }

              <div>
                <User className="icon" size={20}/>
                <div>
                  <h4>TARGET USER</h4>
                  <p>{data.target_user}</p>
                </div>
              </div>

              <div>
                <Server className="icon" size={20}/>
                <div>
                  <h4>HOST</h4>
                  <p>{data.host}</p>
                </div>
              </div>

              <div>
                <Cog className="icon" size={20}/>
                <div>
                  <h4>SERVICE</h4>
                  <p>{data.service}</p>
                </div>
              </div>

              <div>
                <Waypoints className="icon" size={20}/>
                <div>
                  <h4>PROTOCOL/PORT</h4>
                  <p>{data.protocol}/{data.port}</p>
                </div>
              </div>


            </section>

            <section className="alert-details-section">
              <h4>ALERT DETAILS</h4>
              <div>
                <p><FileCode size={15}/>Rule ID : <span>{data.rule_id}</span></p>
                <p><ScrollText size={15}/>Rule Name : <span>{data.rule_name}</span></p>
                <p><CircleAlert size={15}/>Status : <span>{data.status}</span></p>
                <p><Cpu size={15}/>PID : <span>{data.pid}</span></p>
                <p><ShieldX size={15}/>Total Failed Attempts : <span>{data.failed_attempts}</span></p>
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
                <p><Radar size={15}/>IPs : <span>
                  {data.IPs.map((ip)=>`${ip} , `)}
                </span></p>
              </div>
            </section>

            {data.rule_id === "AUTH-003" ? 
              <section className="alert-timeline-section">
                <h4>TIMELINE OF EVENTS</h4>
                <section>

                  {data.relatedAlerts.map((alert)=>{
                    return (
                      <section key={alert._id}>
                        <div>
                          <p className="time">{new Date(alert.starting_time).toLocaleString("en-US",{
                            timeZone : "UTC" ,
                            hour: "2-digit",
                            minute: "2-digit",
                            second : "2-digit",
                            hour12 : false
                          })}</p>
                          <p>{new Date(alert.starting_time).toISOString().split("T")[0]}</p>
                        </div>
                        <Bell size={18} className="bell-icon"/>
                        <section className="related-alert-info">
                          <div>
                            <p className="alert-name"><span>{alert.alert_id}</span>{alert.alert_type}</p>
                            <p className="rule-details" style={{ color : "gray" , fontSize : "12px" }}>Rule : {alert.rule_id} ({alert.rule_name})</p>
                            <button onClick={()=>navigate(`/linux/analysis/distributed-attack/${alert._id}`)}><Eye size={13}/>VIEW DETAILS</button>
                          </div>
                          <div className="time-details">
                            <p>{new Date(alert.starting_time).toLocaleString("en-US",{
                              timeZone : "UTC" ,
                              hour: "2-digit",
                              minute: "2-digit",
                              second : "2-digit" ,
                              hour12 : false
                            })} - {new Date(alert.ending_time).toLocaleString("en-US",{
                              timeZone : "UTC" ,
                              hour: "2-digit",
                              minute: "2-digit",
                              second : "2-digit" ,
                              hour12 : false
                            })}</p>
                            <p>({formatDuration(alert.starting_time,alert.ending_time)})</p>
                          </div>
                        </section>
                      </section>
                    )
                  })}

                  <section>
                    <div>
                      <p style={{ color : "red" , fontSize : "17px" }}>{new Date(data.ending_time).toLocaleString("en-US",{
                        timeZone : "UTC" ,
                        hour: "2-digit",
                        minute: "2-digit",
                        second : "2-digit" ,
                        hour12 : false
                      })}</p>
                      <p>{new Date(data.ending_time).toISOString().split("T")[0]}</p>
                    </div>
                    <CircleCheck size={18} className="lui-circle-check"/>
                    <section className="success-occured"><TriangleAlert size={18} style={{ color : "red" }}/>SUCCESS OCCURED AFTER {data.failed_attempts} FAILED ATTEMPTS</section>
                  </section>

                </section>


              </section> 
            : <></> }

            <section className="summary-section">
              <h4>ATTACK SUMMARY</h4>
              <p>
                {data.rule_id === "AUTH-003" ? `A distributed brute force attack resulting in a successful login was detected 
                targeting the ${data.target_user} user account on the ${data.host} host via the ${data.service} service. 
                The monitoring system observed ${data.fail_attempts} failed login attempts originating from multiple source IP 
                addresses, followed by a successful authentication from IP ${data.successIP}. This sequence indicates that the 
                attacker was eventually able to obtain valid credentials after repeated authentication attempts. Immediate 
                investigation is recommended to verify the legitimacy of the login, assess the extent of potential unauthorized 
                access, and initiate appropriate containment measures if the activity is determined to be malicious.` : `A distributed 
                brute force attack was detected targeting the ${data.target_user} user account on the ${data.host} host via the 
                ${data.service} service. The monitoring system observed ${data.failed_attempts} failed login attempts originating 
                from multiple source IP addresses, exceeding the configured detection threshold. No successful authentication was 
                recorded during the attack, indicating that the repeated attempts to gain unauthorized access were unsuccessful. 
                Although the account does not appear to have been compromised, the activity should be investigated, and the source 
                IP addresses should be reviewed for potential blocking or other defensive actions.`}
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

export default DistributedAttack;