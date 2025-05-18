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

            toast.success('Google login successful')
            navigate('/')
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
