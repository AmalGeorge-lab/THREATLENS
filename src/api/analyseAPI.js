import axios from "axios";

export const analyseAPI = async(formData)=> {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/analysis/analyse` , formData , { withCredentials : true });
  return response.data;
}