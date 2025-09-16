// src/components/APP_COMPONENTS/registerComponents/UserRegisterForm.jsx
import React from 'react';
import FloatingInput from './FloatingInput';

const UserRegisterForm = ({ formData, onInputChange, onFocus, onBlur }) => {
  return (
    <>
      <FloatingInput
        id="name"
        name="name"
        label="Full Name"
        value={formData.name}
        onChange={onInputChange}
        onFocus={() => onFocus('name')}
        onBlur={() => !formData.name && onBlur('name')}
        required
      />
      <FloatingInput
        id="phone"
        name="phone"
        type="tel"
        label="Phone Number"
        value={formData.phone}
        onChange={onInputChange}
        onFocus={() => onFocus('phone')}
        onBlur={() => !formData.phone && onBlur('phone')}
        required
      />
    </>
  );
};

export default UserRegisterForm;