import "./passwordSpraying.css";
import { BadgeAlert, 
  Calendar, 
  CircleAlert, 
  Clock, 
  Cog, 
  Cpu, 
  Crosshair, 
  FileCode, 
  Fingerprint, 
  Globe,
  ScrollText, 
  Server, 
  ShieldX, 
  Timer, 
  UsersRound, 
  Waypoints
} from "lucide-react";
import {useMutation, useQuery} from "@tanstack/react-query";
import { alertAPI, updateStatusAPI } from "../../../api/alertsAPI";
import {useNavigate,useParams} from "react-router-dom";
import { formatDuration } from "../../../utils/time";
import Loading from "../../Loading/Loading";




const PasswordSpraying = () => {

  const navigate = useNavigate();
  const {id} = useParams();

  const {data,isSuccess,refetch,isPending,isError,error} = useQuery({ queryFn : ()=>alertAPI(id) , queryKey : [id] , enabled : !!id , retry : false });
  const { mutateAsync , isError : isUpdatingError , error : updatingError } = useMutation({ mutationFn : updateStatusAPI , mutationKey : [id] });


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
    <section className="password-spraying-section">

      {!isPending ?
        isSuccess && 
          <>
            <section className="alert-info-section">

              <div className="left-section">
                <UsersRound size={52} style={{ color : "red" }}/>
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

              <div>
                <Globe className="icon" size={20}/>
                <div>
                  <h4>SOURCE IP</h4>
                  <p>{data.source_ip}</p>
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
                <p><UsersRound size={15}/>Users : <span>
                  {data.users.map((user)=>`${user} , `)}
                </span></p>
              </div>
            </section>

            <section className="summary-section">
              <h4>ATTACK SUMMARY</h4>
              <p>
                {`A password spraying attack was detected originating from ${data.source_ip} targeting multiple user accounts on the 
                ${data.host} host via the ${data.service} service. The monitoring system recorded ${data.failed_attempts} failed login 
                attempts across the accounts ${data.users.map((user)=>`${user} `)} exceeding the configured detection threshold. 
                This activity indicates an attempt to gain unauthorized access by testing a small number of commonly used passwords 
                against multiple accounts, a technique designed to reduce the likelihood of triggering account lockout mechanisms. 
                The repeated authentication failures suggest persistent credential-guessing activity and warrant investigation. 
                Reviewing the source IP address, monitoring the targeted accounts, and strengthening authentication controls are 
                recommended to mitigate further attempts.`}
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

export default PasswordSpraying;