import axios from "axios";

export const registerAPI = async ({ username, password , email }) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, {
    username, password, email
  });
  return response.data;
};

export const loginAPI = async ({ email , password }) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login` , {email , password} , { withCredentials : true });
  return response.data;
}

export const dashboardAPI = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/dashboard`,{withCredentials : true});
  return response.data;
}

export const refreshValidatorAPI = async ()=> {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/refresh` , { withCredentials : true });
  return response.data;
}

export const logOutAPI = async () => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/logout` , {} , { withCredentials : true });
  return response.data;
}