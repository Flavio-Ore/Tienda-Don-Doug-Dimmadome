import axios from 'axios'
export default axios.create({
  baseURL: import.meta.env.DEV
    ? 'http://localhost:8089/'
    : 'https://tienda-don-doug-dimmadomev3-586821467377.us-central1.run.app/',
  withCredentials: false
})
