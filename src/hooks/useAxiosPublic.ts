import axios, { AxiosInstance } from "axios";

// Axios ইন্সট্যান্স তৈরি
const axiosPublic: AxiosInstance = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
});

// হুক হিসেবে এক্সপোর্ট
const useAxiosPublic = (): AxiosInstance => {
  return axiosPublic;
};

export default useAxiosPublic;