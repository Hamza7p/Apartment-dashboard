import axios from "axios";
import { getToken, getLang } from "@/utils/methods";
import { toast } from 'react-toastify';
import { baseUrl } from "./apis";

const $lang = getLang() || 'en';

const axiosBase = axios.create({
    baseURL:  baseUrl, // your base url here
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': $lang,
    },
});

// include token if he is exists with any request
axiosBase.interceptors.request.use( (config) => {
    const token = getToken();
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config;
});


// show message of respnse in notification is called toast
axiosBase.interceptors.response.use(
  response => {
    const msg = response?.data?.message;
    if(msg){
      toast.success(msg, {
        className: 'font'
      });
    }
    return response;
  },
  error => {
    const msg = error.response.data.message || 'Error Response';
    toast.error(msg, {
      className: 'font'
    });
    return Promise.reject(error);
  }
);

export default axiosBase;