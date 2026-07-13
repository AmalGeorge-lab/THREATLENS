import "./statusmessage.css";
import {CircleCheck,CircleX,LoaderCircle} from "lucide-react";

const StatusMessage = ({ type , message }) => {

  let className;
  let icon;

  switch(type){
    case "error" :
      className = "error";
      icon = <CircleX size={14}/>
      break;
    case "loading" :
      className = "loading";
      icon = <LoaderCircle size={14}/>
      break;
    case "success" :
      className = "success";
      icon = <CircleCheck size={14}/>
      break;
    default :
      className = ""
      icon = null
  }

  return (
    <p className={className}>{icon}{message}</p>
  )
}

export default StatusMessage;