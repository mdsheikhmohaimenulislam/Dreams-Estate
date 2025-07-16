// import axios from 'axios'
// import useAuth from './useAuth'
// import { useEffect } from 'react'
// import { useNavigate } from 'react-router'

// export const axiosSecure = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// })

// const useAxiosSecure = () => {
//   const navigate = useNavigate()
//   const { logOutHandle } = useAuth()
//   useEffect(() => {
//     axiosSecure.interceptors.response.use(
//       res => {
//         return res
//       },
//       async error => {
//         console.log('Error caught from axios interceptor-->', error.response)
//         if (error.response.status === 401 || error.response.status === 403) {
//           // logOutHandle
//           logOutHandle()
//           // navigate to login
//           navigate('/login')
//         }
//         return Promise.reject(error)
//       }
//     )
//   }, [logOutHandle, navigate])
//   return axiosSecure
// }

// export default useAxiosSecure


import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://b11a12-server-side-six.vercel.app",
  withCredentials: true, // optional if using cookies
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOutHandle } = useAuth();

  useEffect(() => {
    //  Attach token before each request
// Add a request interceptor to attach token
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

    // Handle 401/403 errors globally
    axiosSecure.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          await logOutHandle();
          navigate("/login");
        }
        return Promise.reject(err);
      }
    );
  }, [logOutHandle, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;


