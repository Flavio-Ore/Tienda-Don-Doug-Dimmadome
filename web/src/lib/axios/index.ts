import { removeFromLocalStorage } from '@/lib/local-storage'
import axios from 'axios'
import Cookies from 'js-cookie'
const baseURL = import.meta.env.DEV
  ? import.meta.env.VITE_LOCAL_API_URL
  : import.meta.env.VITE_PROD_API_URL

const newAxios = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

newAxios.defaults.withCredentials = true

newAxios.interceptors.request.use(config => {
  const token = Cookies.get('token')
  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

newAxios.interceptors.response.use(null, requestConfig => {
  console.log({
    'interceptor response': requestConfig
  })
  if (requestConfig.status === 401 || requestConfig.status === 403) {
    console.log('Unauthorized')
    Cookies.remove('token')
    removeFromLocalStorage('CURRENT_USER')
    window.location.href = '/'
  }
  return requestConfig
})

export default newAxios
