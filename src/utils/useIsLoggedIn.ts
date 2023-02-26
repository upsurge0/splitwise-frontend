import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const useIsLoggedIn = () => {
  const user = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const pathname = useLocation().pathname

  useEffect(() => {
    if(pathname !== '/') {
      if (!user.isLoggedIn) return navigate('/login')
      if (pathname === '/login') return navigate('/home')
    } else {
      if (user.isLoggedIn) return navigate('/home')
    }
  }, [user])
}

export default useIsLoggedIn
