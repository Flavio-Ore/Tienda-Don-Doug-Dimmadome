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

newAxios.interceptors.request.use(config => {
  const cookies = Cookies.get()
  console.log({
    'interceptor request': config
  })
  console.log({
    cookies_on_resquest: cookies
  })
  if (cookies.token != null) {
    config.headers.Authorization = `Bearer ${cookies.token}`
  }
  return config
})

newAxios.interceptors.response.use(null, requestConfig => {
  console.log({
    'interceptor response': requestConfig
  })
  console.log('Unauthorized, loggin out...')
  Cookies.remove('token')
  removeFromLocalStorage('CURRENT_USER')
  window.location.href = '/'
  if (requestConfig.status === 401 || requestConfig.status === 403) {
  }
  return requestConfig
})

export default newAxios
