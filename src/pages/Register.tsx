import { useState } from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import { axiosInstance } from '../utils/axiosInstance'
import classnames from 'classnames'
import { AxiosError } from 'axios'

function Register() {
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [cpassword, setCPassword] = useState<string>('')
  const [error, setError] = useState<string>('error')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== cpassword) return setError('Passwords do not match')
    // console.log(axiosInstance.)
    const data = {
      user: {
        email,
        name,
        password,
      },
    }
    console.log(data)
    try {
      const res = await axiosInstance.post('/users', data)

      console.log(res.data)
    } catch (e) {
      setError(e.response?.data?.error[0])
    }
  }

  return (
    <div className="w-full  h-screen flex justify-center">
      <div className="max-w-[1024px] text-center flex-col flex justify-center items-center gap-6">
        <h1 className="text-4xl">Sign up for Splitwise</h1>
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
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="px-6 py-4 rounded-md bg-secondaryBackground focus:outline-primary outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="px-6 py-4 rounded-md bg-secondaryBackground focus:outline-primary outline-none"
            type="password"
            placeholder="Confirm Password"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary px-6 py-3 rounded-md text-lg font-medium tracking-wider hover:bg-[#584CAC] transition-all outline-none focus:bg-[#584CAC]"
          >
            Sign up
          </button>
          <div>
            <span className="pr-4">Already have an account?</span>
            <Link className="text-primary hover:underline" to="/login">
              Sign in
            </Link>
          </div>
          <span
            className={classnames(
              `text-red-500 ${error !== 'error' ? 'visible' : 'invisible'}`
            )}
          >
            {error}
          </span>
        </form>
      </div>
    </div>
  )
}

export default Register
