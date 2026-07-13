import axios from "axios";

export const alertsAPI = async(fileId)=> {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/alert/alerts` , { params : {fileId} , withCredentials : true });
  return response.data;
}

export const alertAPI = async(alertId)=> {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/alert/${alertId}` , {withCredentials : true });
  return response.data;
}

export const updateStatusAPI = async ({id,status}) => {
  const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/alert/status`,{alertId : id,status},{withCredentials: true});
  return response.data;
};

export const filteredAlertsAPI = async ({fileId,severity,status,rule,attack}) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/alert/filteredAlerts`, {params: {fileId,severity,status,rule,attack} , withCredentials : true});
  return response.data;
}

export const deleteLogAPI = async ({fileId}) => {
  const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/alert/delete/${fileId}`,{withCredentials : true});
}