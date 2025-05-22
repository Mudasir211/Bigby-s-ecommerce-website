import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../services/createApi'
import { toast, ToastContainer } from 'react-toastify'
import GoogleSignIn from '../components/GoogleSignin'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { isError, error, isSuccess, data }] = useLoginMutation()
  const navigate = useNavigate()

  const notify = (type, message) => {
    if (type === 'error') {
      toast.error(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    } else if (type === 'success') {
      toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }

  const submithandler = async (e) => {
    e.preventDefault()
    try {
      if (email.length > 0 && password.length > 0) {
        await login({ email, password })
      } else {
        notify('error', 'Please fill in all the details')
      }
    } catch (error) {
      // Handle unexpected error if needed
    }
  }

  useEffect(() => {
    if (isError && error) {
      notify('error', error?.data?.message || 'Login failed')
    } else if (isSuccess && data) {
      // Assuming your backend returns token in data.token
      localStorage.setItem('token', data.token)
      notify('success', 'Logged in Successfully')
      navigate('/')
      window.location.reload()
    }
  }, [isError, error, isSuccess, data, navigate])

  return (
    <div>
      <form
        onSubmit={submithandler}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mt-10 mb-2">
          <p className="text-3xl prata-regular">Login</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p onClick={() => navigate('/forgot-password')} className="cursor-pointer ">
            Forgot your password?
          </p>
          <p onClick={() => navigate('/Signin')} className="cursor-pointer ">
            Create account
          </p>
        </div>
        <button className="px-8 py-2 mt-4 font-light text-white bg-black">Sign In</button>
      </form>
      <GoogleSignIn />
      <ToastContainer />
    </div>
  )
}
