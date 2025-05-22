import { GoogleLogin } from '@react-oauth/google'
import { useLoginWithGoogleMutation } from '../services/createApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function GoogleSignIn() {
    
  const [loginWithGoogle] = useLoginWithGoogleMutation()
  const navigate = useNavigate()

  return (
    <div className="flex justify-center mt-4">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            const res = await loginWithGoogle({
              credential: credentialResponse.credential,
            }).unwrap()

            // ✅ Save token to localStorage
            if  (res.token) {
              localStorage.setItem('token', res.token)
          toast.success("Logged in Successfully")
              

               
                setTimeout(() => {
     navigate('/'); window.location.reload() }, 1000)
               
    //      
       }

           

            
          } catch (err) {
            toast.error(err?.data?.message || 'Google login failed')
          }
        }}
        onError={() => {
          toast.error('Google Login Failed')
        }}
      />
    </div>
  )
}

export default GoogleSignIn
