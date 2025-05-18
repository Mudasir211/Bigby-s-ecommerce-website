import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignupMutation } from '../services/createApi'
import { toast, ToastContainer } from 'react-toastify'
import GoogleSignIn from '../components/GoogleSignin'

function Signin() {
  
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [signup,{isError,error}] =useSignupMutation()
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
const submithandler =async (e)=>{
    e.preventDefault()
    try {
        if (name.length>0&&email.length>0&&password.length>0){
            await  signup({name,email,password})
      notify('success','Signed in Successfulyy')
      navigate("/");window.location.reload()
        }else{
            notify('error','Please fill in all the details')

        }
    } catch (error) {
        
    }
    


}
            const navigate = useNavigate()
            useEffect(() => {
                if (isError && error) {
                  notify('error',error?.data.message)
                  
                }
              }, [isError, error]);
  return (
    <div>
        
           
      <form onSubmit={submithandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"><div className="inline-flex items-center gap-2 mt-10 mb-2"><p className="text-3xl prata-regular">Sign Up</p><hr className="border-none h-[1.5px] w-8 bg-gray-800"/></div><input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="w-full px-3 py-2 border border-gray-800" placeholder="Name" required="" /><input value={email} onChange={(e)=>setEmail(e.target.value)}type="email" className="w-full px-3 py-2 border border-gray-800" placeholder="Email" required="" /><input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full px-3 py-2 border border-gray-800" placeholder="Password" required="" /><div className="w-full flex justify-between text-sm mt-[-8px]"><p className="cursor-pointer ">Forgot your password?</p><p onClick={()=>navigate('/Login')} className="cursor-pointer ">Login Here</p></div><button className="px-8 py-2 mt-4 font-light text-white bg-black">Sign Up</button></form>
      <GoogleSignIn/>
    </div>
  )
}
export default Signin
