import React, { useState } from 'react';
import PasswordInput from '../../components/input/PasswordInput';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid email');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      if (response.data && response.data.token) {
        console.log(response);
        
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen bg-cyan-50 overflow-hidden relative">
      <div className="login-ui-box right-10 -top-40" />
      <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2" />
      <div className="container min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-20 mx-auto">
        <div className="hidden md:flex w-full lg:w-2/4 h-[90vh] items-end bg-login-bg-img bg-cover bg-center rounded-lg p-10 z-50">
          <div>
            <h4 className="text-3xl lg:text-5xl text-white font-semibold leading-tight lg:leading-[58px]">
              Capture the <br /> moment
            </h4>
            <p className="text-[15px] text-white leading-6 pr-7 mt-4">
              Share your photos with the world and get inspired by others.
            </p>
          </div>
        </div>
        <div className="w-full md:w-3/4 lg:w-2/4 min-h-[75vh] bg-white rounded-lg md:rounded-l-none md:rounded-r-lg relative p-6 md:p-12 lg:p-16 shadow-lg shadow-cyan-200/20">
          <form onSubmit={handleLogin} className="max-w-md mx-auto">
            <h4 className="text-2xl font-semibold mb-7">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-xs pb-1 text-red-500">{error}</p>}
            <button
              type="submit"
              className="btn-primary w-full relative"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="opacity-0">LOGIN</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </>
              ) : (
                'LOGIN'
              )}
            </button>
            <p className="text-xs text-slate-500 text-center my-4">Or</p>

            <button
              className="btn-primary btn-light w-full"
              type="button"
              onClick={() => {
                navigate('/signUp');
              }}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
