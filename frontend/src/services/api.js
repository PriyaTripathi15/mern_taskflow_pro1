import axios from "axios";
const API=axios.create({baseURL:"https://mern-taskflow-pro1.onrender.com/api"});
API.interceptors.request.use(req=>{
 const t=localStorage.getItem("token");
 if(t) req.headers.Authorization=`Bearer ${t}`;
 return req;
});
export default API;
