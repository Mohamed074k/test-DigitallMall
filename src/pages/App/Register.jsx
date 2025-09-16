// src/pages/App/Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Briefcase, Camera } from 'lucide-react';

// Import Components
import UserRegisterForm from '../../components/APP_COMPONENTS/registerComponents/UserRegisterForm';
import BrandRegisterForm from '../../components/APP_COMPONENTS/registerComponents/BrandRegisterForm';
import ModelRegisterForm from '../../components/APP_COMPONENTS/registerComponents/ModelRegisterForm';
import FloatingInput from '../../components/APP_COMPONENTS/registerComponents/FloatingInput';

const RegisterPage = () => {
  const [registerType, setRegisterType] = useState('user'); // 'user' | 'brand' | 'model'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    brandName: '',
    brandType: 'online',
    address: '',
    instagram: '',
    facebook: '',
    proof: null,
  });

  // Track focus for each field — optional, but matches your Login style
  const [focusedField, setFocusedField] = useState('');

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = (fieldName) => {
    if (!formData[fieldName]) {
      setFocusedField('');
    }
  };

  const handleBrandTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      brandType: type,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registering as:', registerType, formData);
    alert(`Registration as ${registerType} submitted!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Create your account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-black hover:text-gray-800">
              Sign in
            </Link>
          </p>
        </div>

        {/* Toggle Buttons — Each takes 1/3 width */}
        <div className="flex justify-between mb-8 bg-white p-0 rounded-full shadow-sm">
          <button
            onClick={() => setRegisterType('user')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 !rounded-full font-medium transition-colors ${
              registerType === 'user'
                ? 'bg-black text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <User className="w-4 h-4" />
            User
          </button>
          <button
            onClick={() => setRegisterType('brand')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 !rounded-full font-medium transition-colors ${
              registerType === 'brand'
                ? 'bg-black text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Brand
          </button>
          <button
            onClick={() => setRegisterType('model')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 !rounded-full font-medium transition-colors ${
              registerType === 'model'
                ? 'bg-black text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Camera className="w-4 h-4" />
            Model
          </button>
        </div>

        {/* Animated Form */}
        <motion.div
          key={registerType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Shared Fields */}
            <FloatingInput
              id="email"
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              required
            />

            <FloatingInput
              id="password"
              name="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password')}
              required
            />

            <FloatingInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onFocus={() => handleFocus('confirmPassword')}
              onBlur={() => handleBlur('confirmPassword')}
              required
            />

            {/* Render Specific Form */}
            {registerType === 'user' && (
              <UserRegisterForm
                formData={formData}
                onInputChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            )}

            {registerType === 'brand' && (
              <BrandRegisterForm
                formData={formData}
                onInputChange={handleInputChange}
                onBrandTypeChange={handleBrandTypeChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            )}

            {registerType === 'model' && (
              <ModelRegisterForm
                formData={formData}
                onInputChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white !rounded-full font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
              >
                Register
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;