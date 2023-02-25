import axios, { InternalAxiosRequestConfig } from 'axios'
import { RootState } from '../redux/store'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

// const BASE_URL = import.meta.env.VITE_BASE_URL
// console.log(import.meta.env.VITE_BASE_URL)
export const useAxiosInstance = () => {
  const user = useSelector((state: RootState) => state.user)

  let instance = axios.create({
    baseURL: 'https://walrus-app-t4ha4.ondigitalocean.app',
  })

  useEffect(() => {
    instance.interceptors.request.use(function (config) {
      const token = user.accessToken
      config.headers.Authorization = token ? `Bearer ${token}` : ''
      console.log({ config })
      return config
    })
  }, [user.accessToken])

  return instance
}
