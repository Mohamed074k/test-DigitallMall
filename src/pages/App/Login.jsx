// src/pages/App/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register" className="font-medium text-black hover:text-gray-800">
              Register here
            </Link>
          </p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <form className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <div className="relative">
                <input
                  type="email"
                  className="w-full pl-4 pr-4 pt-3 pb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  id="floatingEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => !email && setIsEmailFocused(false)}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {/* <Mail className="w-5 h-5" /> */}
                </div>
              </div>
              <label
                htmlFor="floatingEmail"
                className={`absolute left-3 transition-all duration-200 ease-in-out transform pointer-events-none bg-white px-1 ${
                  isEmailFocused || email
                    ? 'text-xs text-black -translate-y-4 top-1'
                    : 'text-gray-500 translate-y-3 top-0'
                }`}
              >
                Email address
              </label>
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-4 pr-4 pt-3 pb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  id="floatingPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => !password && setIsPasswordFocused(false)}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {/* <Lock className="w-5 h-5" /> */}
                </div>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <label
                htmlFor="floatingPassword"
                className={`absolute left-3 transition-all duration-200 ease-in-out transform pointer-events-none bg-white px-1 ${
                  isPasswordFocused || password
                    ? 'text-xs text-black -translate-y-4 top-1'
                    : 'text-gray-500 translate-y-3 top-0'
                }`}
              >
                Password
              </label>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-black">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white !rounded-full font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
              >
                Login
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;