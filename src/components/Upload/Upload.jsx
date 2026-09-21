import { useEffect, useState } from "react";
import "./upload.css";
import {FolderOpen,CloudUpload, Microscope} from "lucide-react";
import { analyseAPI } from "../../api/analyseAPI";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import Loading from "../Loading/Loading";





const Upload = () => {

  const [file , setFile] = useState(null);
  const [fileType , setFileType] = useState("");
  const [alerts , setAlerts] = useState(true);
  const navigate = useNavigate();

  const {mutateAsync , isPending , isError , error} = useMutation({ mutationFn : analyseAPI , mutationKey : ["fileUpload"] })

  const uploadLog = ()=> {
    if (!file) return;
    if (!fileType) return;
    const formData = new FormData();
    formData.append("logFile",file);
    formData.append("type",fileType);
    mutateAsync(formData).then((data)=>{
      if (fileType == "1" && data._id){
        navigate(`/auth/analysis/${data._id}`)
      }else if(fileType == "2" && data._id){
        navigate(`/web/analysis/${data._id}`)
      }else if(fileType == "3" && data._id){
        navigate(`/firewall/analysis/${data._id}`)
      }else{
        setAlerts(false);
      }
    });
  }

  useEffect(()=>{
    if(isError){
      navigate("/error",{state : { errorMessage : error.response?.data?.message }});
    }
  },[isError]);


  useEffect(() => {
    document.title = "Upload";
  }, []);


  return (
    <>
      {!isPending ?
        <section className="upload-container">
          <h2>UPLOAD LOG</h2>
          <p>Upload your log files for analysis and threat detection.</p>
          <div>
            {!alerts && <div className="no-alerts">No Alerts were generated!</div>}
            <CloudUpload size={50} className="fa-cloud-arrow-up"/>
            <p>Drag & Drop your log file here</p>
            <p>or</p>
            <label htmlFor="logFile">BROWSE FILE<FolderOpen size={15}/></label>
            <input type="file" id="logFile" hidden accept=".log,.txt" onChange={(event)=>setFile(event.target.files[0])}/>
            <select onChange={(event)=>setFileType(event.target.value)} value={fileType}>
              <option value="">SELECT FILE TYPE</option>
              <option value="1">LINUX</option>
              <option value="2">WEB</option>
              <option value="3">FIREWALL</option>
            </select>
            {file ? <p className="message">{file.name} ( {(file.size / 1024).toFixed(2)} KB )</p> : ""}
            <span>Supported formats : .log , .txt</span>
            <button onClick={uploadLog}><Microscope size={18}/>ANALYSE</button>
          </div>
        </section>
      : <Loading/>}
    </>
  )
}

export default Upload;