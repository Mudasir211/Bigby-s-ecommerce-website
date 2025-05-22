import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminLoginMutation } from '../services/createApi'
import { toast, ToastContainer } from 'react-toastify'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [adminLogin, { data, isError, error, isSuccess }] = useAdminLoginMutation()
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
    if (email.length > 0 && password.length > 0) {
      await adminLogin({ email, password })
    } else {
      notify('error', 'Please fill in all the details')
    }
  }

  useEffect(() => {
    if (isError && error) {
      notify('error', error?.data?.message || 'Login failed')
    } else if (isSuccess && data) {
      // Assuming data contains { token: '...' }
      localStorage.setItem('adminToken', data.token)
      notify('success', 'Logged in Successfully')
      navigate('/AdminPanel')
      window.location.reload()
    }
  }, [isError, error, isSuccess, data, navigate])

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-4 text-2xl font-bold">Admin Panel</h1>
          <form onSubmit={submithandler}>
            <div className="mb-3 min-w-72">
              <p className="mb-2 text-sm font-medium text-gray-700">Email Address</p>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="your@email.com"
                required
                value={email}
              />
            </div>
            <div className="mb-3 min-w-72">
              <p className="mb-2 text-sm font-medium text-gray-700">Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
              />
            </div>
            <button className="w-full px-4 py-2 mt-2 text-white bg-black rounded-md" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AdminLogin
