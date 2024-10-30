import axios from "axios";
const axiosInstance = axios.create({
//   baseURL: "http://127.0.0.1:5001/clone-8ade7/us-central1/api",
  //   baseURL: "https://api-7omcxzjdrq-uc.a.run.app",
  baseURL: "https://amazon-api-deploy-janv.onrender.com/",
});
export { axiosInstance };