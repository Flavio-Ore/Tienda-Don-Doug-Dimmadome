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

newAxios.interceptors.request.use(
  onSuccess => {
    const cookies = Cookies.get()
    console.log({
      'interceptor request': onSuccess
    })
    console.log({
      cookies_on_resquest: cookies
    })
    if (cookies.token != null) {
      onSuccess.headers.Authorization = `Bearer ${cookies.token}`
    }
    return onSuccess
  },
  error => {
    console.log({
      'interceptor request error': error
    })
    return Promise.reject(error)
  }
)

newAxios.interceptors.response.use(
  response => response,
  requestConfig => {
    console.log({
      'interceptor response': requestConfig
    })
    if (requestConfig.status === 401 || requestConfig.status === 403) {
      console.log('Unauthorized, loggin out...')
      Cookies.remove('token')
      removeFromLocalStorage('CURRENT_USER')
    }
    return requestConfig
  }
)

export default newAxios
