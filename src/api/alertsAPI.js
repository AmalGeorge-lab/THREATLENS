import axios from "axios";

export const linuxAlertsAPI = async(fileId)=> {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/alert/linux/alerts` , { params : {fileId} , withCredentials : true });
  return response.data;
}

export const linuxAlertAPI = async(alertId)=> {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/alert/linux/${alertId}` , {withCredentials : true });
  return response.data;
}

export const linuxUpdateStatusAPI = async ({id,status}) => {
  const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/alert/linux/status`,{alertId : id,status},{withCredentials: true});
  return response.data;
};

export const linuxFilteredAlertsAPI = async ({fileId,severity,status,rule,attack}) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/alert/linux/filteredAlerts`, {params: {fileId,severity,status,rule,attack} , withCredentials : true});
  return response.data;
}

export const linuxDeleteLogAPI = async ({fileId}) => {
  const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/alert/linux/delete/${fileId}`,{withCredentials : true});
}




















export const webAlertsAPI = async(fileId)=> {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/alert/web/alerts` , { params : {fileId} , withCredentials : true });
  return response.data;
}

export const webAlertAPI = async(alertId)=> {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/alert/web/${alertId}` , {withCredentials : true });
  return response.data;
}

export const webUpdateStatusAPI = async ({id,status}) => {
  const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/alert/web/status`,{alertId : id,status},{withCredentials: true});
  return response.data;
};

export const webFilteredAlertsAPI = async ({fileId,severity,status,rule,attack}) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/alert/web/filteredAlerts`, {params: {fileId,severity,status,rule,attack} , withCredentials : true});
  return response.data;
}

export const webDeleteLogAPI = async ({fileId}) => {
  const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/alert/web/delete/${fileId}`,{withCredentials : true});
}














export const firewallAlertsAPI = async(fileId)=> {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/alert/firewall/alerts` , { params : {fileId} , withCredentials : true });
  return response.data;
}

export const firewallAlertAPI = async(alertId)=> {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/alert/firewall/${alertId}` , {withCredentials : true });
  return response.data;
}

export const firewallUpdateStatusAPI = async ({id,status}) => {
  const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/alert/firewall/status`,{alertId : id,status},{withCredentials: true});
  return response.data;
};

export const firewallFilteredAlertsAPI = async ({fileId,severity,status,rule,attack}) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/alert/firewall/filteredAlerts`, {params: {fileId,severity,status,rule,attack} , withCredentials : true});
  return response.data;
}

export const firewallDeleteLogAPI = async ({fileId}) => {
  const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/alert/firewall/delete/${fileId}`,{withCredentials : true});
}