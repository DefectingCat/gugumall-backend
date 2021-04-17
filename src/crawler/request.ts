import axios, { AxiosInstance } from 'axios';
const request: AxiosInstance = axios.create({
  baseURL: '',
  timeout: 1000000,
});
request.interceptors.response.use((value) => {
  return value.data;
});
export default request;
