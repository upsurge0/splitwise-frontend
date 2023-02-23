import axios from 'axios'

// const BASE_URL = import.meta.env.VITE_BASE_URL
// console.log(import.meta.env.VITE_BASE_URL)

export const axiosInstance = axios.create({
  baseURL: 'https://walrus-app-t4ha4.ondigitalocean.app',
})
