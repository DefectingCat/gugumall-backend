import axios, { AxiosInstance } from 'axios';
const request: AxiosInstance = axios.create({
  baseURL: 'http://152.136.185.210:7878/api/m5',
  timeout: 1000000,
});
request.interceptors.response.use((value) => {
  return value.data;
});
export default request;
