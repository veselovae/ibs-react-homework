import axios, { AxiosInstance } from "axios";

const API_URL = "http://localhost:3006";

export const ApiInstance: AxiosInstance = axios.create({
  baseURL: `${API_URL}/`,
});
