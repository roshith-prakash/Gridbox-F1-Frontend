import axios from "axios";

// const devURL = "http://localhost:4000/api/v1";
// const prodURL = "https://gridbox-new-prisma.onrender.com/api/v1"
const vercelProd = "https://gridbox-server.vercel.app/api/v1";

// Adding baseURL so that entire URL must not be types while calling API
export const axiosInstance = axios.create({
  baseURL: vercelProd,
});
