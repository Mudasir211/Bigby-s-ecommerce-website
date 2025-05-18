import { useEffect, useState } from 'react';
import { useForgotPasswordMutation } from '../services/createApi'; 
import { toast, ToastContainer } from 'react-toastify';

const COOLDOWN_SECONDS = 60;
const COOKIE_KEY = 'reset_cooldown_timestamp';

// Helper to read cookie by name
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

// Helper to set cookie with expiry seconds
const setCookie = (name, value, seconds) => {
  const expires = new Date(Date.now() + seconds * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [forgotPassword] = useForgotPasswordMutation();

  useEffect(() => {
    // On mount, check if cooldown cookie exists
    const saved = getCookie(COOKIE_KEY);
    if (saved) {
      const elapsed = Math.floor((Date.now() - Number(saved)) / 1000);
      const remaining = COOLDOWN_SECONDS - elapsed;
      if (remaining > 0) setCooldown(remaining);
    }
  }, []);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {const now = Date.now();
      setCookie(COOKIE_KEY, now, COOLDOWN_SECONDS);
      setCooldown(COOLDOWN_SECONDS);
      await forgotPassword(email).unwrap();
      toast.success('Reset link sent to your email');
      setEmail('');
      
    } catch (err) {
      toast.error(err.data?.message || 'Error sending reset link');
    }
  };

  return (
    <>
    
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto my-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mt-10 mb-2">
          <p className="text-2xl prata-regular">Recover Password</p>
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

        <button
          className="px-8 py-2 mt-4 font-light text-white bg-black disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={cooldown > 0}
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : 'Send Reset Link'}
        </button>
      </form>
    </>
  );
};

export default ForgotPasswordPage;
