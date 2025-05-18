import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../services/createApi'; 
import { toast, ToastContainer } from 'react-toastify';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [resetPassword] = useResetPasswordMutation();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ token, password }).unwrap();
      toast.success('Password reset successful');
      navigate('/login');
    } catch (err) {
      toast.error(err.data?.message || 'Reset failed');
    }
  };

  return (
<>
  <form onSubmit={handleReset} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto my-14 gap-4 text-gray-800"><div className="inline-flex items-center gap-2 mt-10 mb-2"><p className="text-2xl prata-regular">Set Password</p><hr className="border-none h-[1.5px] w-8 bg-gray-800"/></div><input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full px-3 py-2 border border-gray-800" placeholder="New Password" required="" /><button className="px-8 py-2 mt-4 font-light text-white bg-black">Confirm</button></form></>
  );
};

export default ResetPasswordPage;
