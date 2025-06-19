 // app/auth/login.tsx
'use client'; // Keep this at the top if you are using app router with client components

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout'; // Adjust the path as needed to your Layout component

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
  const [message, setMessage] = useState({ text: '', type: 'info' as 'info' | 'success' | 'error' });

  // State for global form error messages (e.g., "Invalid credentials")
  const [globalError, setGlobalError] = useState('');

  /**
   * useEffect hook to update current date and time.
   * Runs once on component mount and sets up an interval for updates every second.
   * Cleans up the interval on component unmount.
   */
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const optionsDate: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };

      setCurrentDate(now.toLocaleDateString('en-US', optionsDate));
      setCurrentTime(now.toLocaleTimeString('en-US', optionsTime));
    };

    // Initial call to display date/time immediately
    updateDateTime();
    // Set up interval for continuous updates
    const intervalId = setInterval(updateDateTime, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once on mount

  /**
   * Toggles the visibility of the password input field.
   * Changes the input type between 'password' and 'text'.
   */
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  /**
   * Handles the selection of login type (Admin or User).
   * Updates the `loginType` state and clears form fields and messages.
   * @param type - The selected login type ('admin' or 'user').
   */
  const handleSelectLoginType = (type: string) => {
    setLoginType(type);
    // Clear form fields, errors, and messages when switching login type
    setUsername('');
    setPassword('');
    setUsernameError('');
    setPasswordError('');
    setMessage({ text: '', type: 'info' });
    setGlobalError('');
  };

  /**
   * Displays a message to the user in the designated message area.
   * The message will automatically disappear after 5 seconds.
   * @param text - The message content.
   * @param type - The type of message ('info', 'success', or 'error') for styling.
   */
  const displayMessage = (text: string, type: 'info' | 'success' | 'error' = 'info') => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: '', type: 'info' }); // Clear message after 5 seconds
    }, 5000);
  };

  /**
   * Performs basic client-side validation for username and password.
   * Simulates a login attempt and displays appropriate success/error messages.
   */
  const validateAndLogin = () => {
    let isValid = true;
    // Clear previous errors and messages
    setUsernameError('');
    setPasswordError('');
    setGlobalError('');
    setMessage({ text: '', type: 'info' });

    // Validate username field
    if (username.trim() === '') {
      setUsernameError('Please enter your username');
      isValid = false;
    }

    // Validate password field
    if (password.trim() === '') {
      setPasswordError('Please enter your password');
      isValid = false;
    }

    // If all client-side validations pass
    if (isValid) {
      console.log(`Attempting to log in as ${loginType}:`, { username, password });

      // Simulate an asynchronous API call for authentication
      setTimeout(() => {
        // Mock authentication logic
        if (
          (username === 'admin' && password === 'password123' && loginType === 'admin') ||
          (username === 'user' && password === 'user123' && loginType === 'user')
        ) {
          displayMessage('Login successful! Redirecting...', 'success');
          // In a real Next.js application, you would use:
          // import { useRouter } from 'next/router';
          // const router = useRouter();
          // router.push('/dashboard'); or router.replace('/dashboard');
        } else {
          displayMessage('Invalid username or password.', 'error');
          setGlobalError('Invalid credentials.');
        }
      }, 1000); // Simulate network delay of 1 second
    } else {
      setGlobalError('Please correct the errors above.');
    }
  };

  return (
    // Wrap your entire login page content with the Layout component
    <Layout pageTitle="Login"> {/* You can pass a pageTitle prop if your Layout uses it */}
      <div className="page-container min-h-screen flex flex-col items-center justify-center p-5 box-border bg-gradient-to-br from-blue-50 to-blue-100">
        {/* Company Title */}
        <div className="company-title-container mb-5 text-center">
          <h1 className="company-title text-4xl font-bold text-gray-800 text-shadow-sm md:text-3xl sm:text-2xl">
            SHRI VARALAKSHMI SAGO FOODS PRIVATE LIMITED
          </h1>
        </div>

        {/* Date and Time Display */}
        <div className="date-time-container text-gray-600 text-sm mb-5 text-center flex gap-2">
          <p className="date-display">{currentDate}</p>
          <p className="time-display">{currentTime}</p>
        </div>

        <div className="login-container w-full flex items-center justify-center">
          <div className="login-card bg-white rounded-2xl shadow-2xl flex overflow-hidden w-11/12 max-w-4xl min-h-[500px] transition-all duration-300 ease-in-out md:flex-col md:w-11/12 md:min-h-auto">
            {/* Left side - Illustration */}
            <div className="login-left flex-1 bg-gradient-to-b from-indigo-600 to-purple-700 relative flex flex-col items-center justify-center p-5 text-white text-center min-h-[250px] md:min-h-[200px]">
              <div className="logo-container absolute top-5 left-5 bg-white bg-opacity-20 rounded-full p-2.5 flex items-center justify-center shadow-md">
                <img src="https://placehold.co/60x60/6a71fc/ffffff?text=LOGO" alt="Varalakshmi Logo" className="w-[60px] h-[60px] object-contain" />
              </div>
              {/* Decorative dots using inline styles for precise positioning */}
              <div className="absolute bg-white bg-opacity-40 rounded-full w-4 h-4" style={{ top: '10%', right: '10%' }}></div>
              <div className="absolute bg-white bg-opacity-40 rounded-full w-5 h-5" style={{ bottom: '5%', left: '15%' }}></div>
              <div className="absolute bg-white bg-opacity-40 rounded-full w-3 h-3" style={{ top: '25%', left: '5%' }}></div>
              <img src="https://placehold.co/300x300/4f55db/ffffff?text=LOGIN+ILLUSTRATION" alt="Login Illustration" className="max-w-[80%] h-auto mt-5 drop-shadow-lg" />
            </div>

            {/* Right side - Login Form */}
            <div className="login-right flex-[1.2] p-10 flex flex-col justify-center items-center md:p-8 sm:p-5">
              <div className="main-content w-full max-w-md">
                <h1 className="login-heading text-3xl font-bold text-gray-800 mb-8 text-center">Login to your account!</h1>
                {/* Message display area, conditionally rendered */}
                {message.text && (
                  <div
                    className={`p-3 rounded-lg mb-5 text-center text-sm ${
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
                <div className="login-type-selector flex bg-gray-100 rounded-lg p-1.5 mb-6">
                  <div
                    className={`flex-1 text-center py-3 px-4 cursor-pointer rounded-md font-semibold text-gray-600 transition-all duration-300 ${
                      loginType === 'admin' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-gray-200'
                    }`}
                    onClick={() => handleSelectLoginType('admin')}
                  >
                    <span>Admin Login</span>
                  </div>
                  <div
                    className={`flex-1 text-center py-3 px-4 cursor-pointer rounded-md font-semibold text-gray-600 transition-all duration-300 ${
                      loginType === 'user' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-gray-200'
                    }`}
                    onClick={() => handleSelectLoginType('user')}
                  >
                    <span>User Login</span>
                  </div>
                </div>

                <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
                  {/* Hidden inputs for client_id and login_type */}
                  <input type="hidden" name="client_id" value="" />
                  <input type="hidden" name="login_type" value={loginType} />
                  {/* Global error display */}
                  {globalError && <div className="text-red-500 w-full p-0.5 text-xs text-center mb-2">{globalError}</div>}

                  <div className={`mb-5 ${usernameError ? 'border border-red-500 rounded-lg p-2' : ''}`}> {/* Added visual error feedback */}
                    <label htmlFor="username" className="block mb-2 font-semibold text-gray-700 text-sm">
                      {loginType === 'admin' ? 'Admin Username' : 'User ID'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base text-gray-800 box-border transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    {usernameError && <div className="text-red-500 text-xs mt-1.5">{usernameError}</div>}
                    <div className="text-gray-500 text-xs mt-1.5">
                      {loginType === 'admin' ? 'Enter your admin username.' : 'Enter your user ID.'}
                    </div>
                  </div>

                  <div className={`mb-5 ${passwordError ? 'border border-red-500 rounded-lg p-2' : ''}`}> {/* Added visual error feedback */}
                    <label htmlFor="password" className="block mb-2 font-semibold text-gray-700 text-sm">
                      {loginType === 'admin' ? 'Admin Password' : 'User Password'}
                    </label>
                    <div className="relative">
                      <input
                        type={passwordShown ? 'text' : 'password'}
                        id="password"
                        name="password"
                        className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base text-gray-800 box-border transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500" onClick={togglePassword}>
                        <i className={`fa ${passwordShown ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </span>
                    </div>
                    {passwordError && <div className="text-red-500 text-xs mt-1.5">{passwordError}</div>}
                    <div className="text-gray-500 text-xs mt-1.5">
                      {loginType === 'admin' ? 'Enter your admin password.' : 'Enter your user password.'}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-5 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold rounded-xl text-lg cursor-pointer transition-all duration-300 shadow-lg mt-5 hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5"
                    onClick={validateAndLogin}
                  >
                    Login to Continue
                  </button>
                </form>

                <div className="copyright text-sm text-gray-600 text-center mt-8">
                  © 2024, Infogreen Cloud Solutions. All Rights Reserved.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}