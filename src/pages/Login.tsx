import classnames from 'classnames'
import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { loginOrRegister } from '../redux/user'
import { useAxiosInstance } from '../utils/useAxiosInstance'

function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('error')
  const axiosInstance = useAxiosInstance()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const data = { email, password }
    console.log(data)
    try {
      const res = await axiosInstance.post('/users/login', data)

      console.log(res.data)

      dispatch(
        loginOrRegister({
          accessToken: res.data.token,
          user: {
            email,
            name: 'test',
            id: 1,
          },
        })
      )

      navigate('/home')
    } catch (e: any) {
      setError(e.response?.data?.error)
    }
  }
  // useEffect(() => {
  //   console.log({axiosInstance})
  // }, [axiosInstance])

  return (
    <div className="w-full  h-screen flex justify-center">
      <div className="max-w-[1024px] text-center flex-col flex justify-center items-center gap-6">
        <h1 className="text-4xl">Sign in to Splitwise</h1>
        <img className="h-20" src={logo} alt="" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full px-4"
        >
          <input
            className="px-6 py-4 rounded-md bg-secondaryBackground focus:outline-primary outline-none"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="px-6 py-4 rounded-md bg-secondaryBackground focus:outline-primary outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary px-6 py-3 rounded-md text-lg font-medium tracking-wider hover:bg-[#584CAC] transition-all outline-none focus:bg-[#584CAC]"
          >
            Sign in
          </button>
          <div>
            <span className="pr-4">Don't have an account?</span>
            <Link className="text-primary hover:underline" to="/">
              Sign up
            </Link>
          </div>
          <span
            className={classnames(
              'text-red-500',
              error !== 'error' ? 'visible' : 'invisible'
            )}
          >
            {error}
          </span>
        </form>
      </div>
    </div>
  )
}

export default Login
