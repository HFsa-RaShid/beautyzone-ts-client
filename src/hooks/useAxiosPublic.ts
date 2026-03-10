import axios, { AxiosInstance } from "axios";


const axiosPublic: AxiosInstance = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
});


const useAxiosPublic = (): AxiosInstance => {
  return axiosPublic;
};

export default useAxiosPublic;