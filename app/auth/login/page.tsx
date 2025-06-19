 "use client";
import { useState , useEffect  } from "react";
import Image from 'next/image';
export default function LoginPage() {
  // State for current date and time display
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // State for password visibility toggle
  const [passwordShown, setPasswordShown] = useState(false);

  // State for selected login type ('admin' or 'user')
  const [loginType, setLoginType] = useState('admin');

  // States for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // States for input-specific error messages
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // State for general messages (success/error/info) displayed above the form
  const [message, setMessage] = useState({ text: '', type: 'info' });

  // State for global form error messages (e.g., "Invalid credentials")
  const [globalError, setGlobalError] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const optionsDate = { 
        weekday: 'long' as const, 
        year: 'numeric' as const, 
        month: 'long' as const, 
        day: 'numeric' as const 
      };
      const optionsTime = { 
        hour: '2-digit' as const, 
        minute: '2-digit' as const, 
        second: '2-digit' as const, 
        hour12: true 
      };

      setCurrentDate(now.toLocaleDateString('en-US', optionsDate));
      setCurrentTime(now.toLocaleTimeString('en-US', optionsTime));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSelectLoginType = (type:any) => {
    setLoginType(type);
    setUsername('');
    setPassword('');
    setUsernameError('');
    setPasswordError('');
    setMessage({ text: '', type: 'info' });
    setGlobalError('');
  };

  const displayMessage = (text:any, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: '', type: 'info' });
    }, 5000);
  };

  const validateAndLogin = () => {
    let isValid = true;
    setUsernameError('');
    setPasswordError('');
    setGlobalError('');
    setMessage({ text: '', type: 'info' });

    if (username.trim() === '') {
      setUsernameError('Please enter your username');
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setUsernameError('Username cannot contain special characters.');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Please enter your password');
      isValid = false;
    }

    if (isValid) {
      console.log(`Attempting to log in as ${loginType}:`, { username, password });

      setTimeout(() => {
        if (
          (username === 'admin' && password === 'password123' && loginType === 'admin') ||
          (username === 'user' && password === 'user123' && loginType === 'user')
        ) {
          displayMessage('Login successful! Redirecting...', 'success');
        } else {
          displayMessage('Invalid username or password.', 'error');
          setGlobalError('Invalid credentials.');
        }
      }, 1000);
    } else {
      setGlobalError('Please correct the errors above.');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5] font-sans text-gray-800">
      {/* Date and Time Display - Top Right */}
      <div className="absolute top-4 right-6 text-[#044b83] text-sm">
        <p className="date-display">{currentDate}</p>
        <p className="time-display text-right font-extrabold text-lg">{currentTime}</p>
      </div>

      {/* Company Title */}
      <div className="text-center mb-1 z-10">
      <h1
  className="text-[24px] font-bold text-[#044b83]"
  style={{ textShadow: '2px 2px 4px rgba(158, 158, 158, 0.3)' }}
>
  SHRI VARALAKSHMI SAGO FOODS PRIVATE LIMITED
</h1>

      </div>

      <div className="login-container w-full flex items-center justify-center p-4">
        <div className="login-card bg-white rounded-xl shadow-2xl flex overflow-hidden w-full max-w-6xl min-h-[600px]">
          
          <div className="login-left flex-1 bg-[#f8f8f8]  relative flex flex-col items-center justify-center p-8 min-h-[500px]">
            
            <div className="absolute top-5 left-5  rounded-full p-2 flex items-center justify-center  ">
               <Image src="/images/varalakshmi_logo.png" alt="InfoGreen Logo" width={40} height={32} />
            </div>

            {/* Large V Logo in Blue Circle */}
          
  <Image
    src="/images/varalakshmi_logo.png"
    alt="InfoGreen Logo"
    width={390}
    height={220}
    className="transition-transform duration-300 ease-in-out  hover:scale-110 items-center justify-center relative overflow-hidden group"
  />
 
            {/* Decorative elements */}
            <div className="absolute bg-blue-300 bg-opacity-60 rounded-full w-4 h-4" style={{ top: '15%', right: '15%' }}></div>
            <div className="absolute bg-blue-300 bg-opacity-60 rounded-full w-6 h-6" style={{ bottom: '10%', left: '20%' }}></div>
            <div className="absolute bg-blue-300 bg-opacity-60 rounded-full w-3 h-3" style={{ top: '30%', left: '10%' }}></div>
            <div className="absolute bg-blue-300 bg-opacity-60 rounded-full w-5 h-5" style={{ top: '60%', right: '5%' }}></div>
          </div>

          {/* Right side - Login Form */}
          <div className="login-right flex-[1.2] p-10 flex flex-col justify-center items-center bg-white">
            <div className="main-content w-full max-w-md">
              <h1 className="login-heading text-2xl font-bold text-gray-800 mb-8 text-center">Login to your account!</h1>
              
              {/* Message display area */}
              {message.text && (
                <div
                  className={`p-3 rounded mb-5 text-center text-sm ${
                    message.type === 'error'
                      ? 'bg-red-100 border border-red-200 text-red-800'
                      : message.type === 'success'
                      ? 'bg-green-100 border border-green-200 text-green-800'
                      : 'bg-yellow-100 border border-yellow-200 text-yellow-800'
                  }`}
                >
                  {message.text}
                </div>
              )}

              {/* Login Type Selection */}
              <div className="login-type-selector flex bg-gray-100 rounded-lg p-1 mb-6">
                <div
                  className={`flex-1 text-center py-2 px-2 cursor-pointer rounded-md font-medium transition-all duration-300 ${
                    loginType === 'admin' 
                      ? 'bg-[#044b83] text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => handleSelectLoginType('admin')}
                >
                  Admin Login
                </div>
                <div
                  className={`flex-1 text-center py-2 px-2 cursor-pointer rounded-md font-medium transition-all duration-300 ${
                    loginType === 'user' 
                      ? 'bg-[#044b83] text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => handleSelectLoginType('user')}
                >
                  User Login
                </div>
              </div>

              <div>
                {/* Global error display */}
                {globalError && <div className="text-red-500 w-full p-0.5 text-xs text-center mb-2">{globalError}</div>}

                <div className="mb-4">
                  <label htmlFor="username" className="block mb-2 font-medium text-gray-700 text-sm">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className={`w-full py-1 px-2 border ${usernameError ? 'border-red-500' : 'border-gray-300'} rounded-md   text-gray-800 transition-all duration-200 focus:outline-none focus:border-[#044b83] focus:ring-2 focus:ring-blue-200`}
                      autoFocus
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  {usernameError ? (
                    <div className="text-red-500 text-xs mt-1">{usernameError}</div>
                  ) : (
                    <div className="text-gray-500 text-xs mt-1">
                      The username cannot contain any special characters.
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="block mb-2 font-medium text-gray-700 text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={passwordShown ? 'text' : 'password'}
                      id="password"
                      name="password"
                      className={`w-full py-1 px-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md   text-gray-800 transition-all duration-200 focus:outline-none focus:border-[#044b83] focus:ring-2 focus:ring-blue-200`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 text-lg" onClick={togglePassword}>
                      {passwordShown ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <path d="M1 1l22 22"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </span>
                  </div>
                  {passwordError ? (
                    <div className="text-red-500 text-xs mt-1">{passwordError}</div>
                  ) : (
                    <div className="text-gray-500 text-xs mt-1">
                      Your strong password
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-1.5 px-5 bg-[#044b83] text-white font-semibold rounded-lg text-lg cursor-pointer transition-all duration-300 shadow-lg   hover:shadow-xl hover:-translate-y-0.5"
                  onClick={validateAndLogin}
                >
                  Login to Continue
                </button>
              </div>

              <div className="copyright text-xs text-gray-500 text-center mt-6">
                © 2025, Infogreen Cloud Solutions. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}