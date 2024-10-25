import axios from "axios";

const devURL = "http://localhost:4000/api/v1"
const prodURL = "https://gridbox-new-prisma.onrender.com/api/v1"

export const axiosInstance = axios.create({
    baseURL: prodURL
})