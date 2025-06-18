import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api`,
  withCredentials: true,
});

export default instance;
