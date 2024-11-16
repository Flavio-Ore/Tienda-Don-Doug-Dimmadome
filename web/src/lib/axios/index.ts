import axios from 'axios'
const baseURL = import.meta.env.DEV
  ? import.meta.env.VITE_LOCAL_API_URL
  : import.meta.env.VITE_PROD_API_URL

export default axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
})
