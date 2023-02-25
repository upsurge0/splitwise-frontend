import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const useIsLoggedIn = () => {
  const user = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()

  console.log(user)

  useEffect(() => {
    if (!user.isLoggedIn) navigate('/login')
  }, [user])
}

export default useIsLoggedIn
