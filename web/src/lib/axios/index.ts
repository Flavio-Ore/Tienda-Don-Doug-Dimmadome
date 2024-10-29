import axios from 'axios'
export default axios.create({
  baseURL: import.meta.env.VITE_LOCAL_API_URL,
  withCredentials: false
})
