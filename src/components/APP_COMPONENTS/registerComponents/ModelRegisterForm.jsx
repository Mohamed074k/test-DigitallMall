// src/components/APP_COMPONENTS/registerComponents/ModelRegisterForm.jsx
import React from 'react';
import FloatingInput from './FloatingInput';

const ModelRegisterForm = ({ formData, onInputChange, onFocus, onBlur }) => {
  return (
    <>
      <FloatingInput
        id="name"
        name="name"
        label="Model Name"
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
      <FloatingInput
        id="proof"
        name="proof"
        type="file"
        label="Personal Proof (ID/Passport)"
        accept="image/*,.pdf"
        onChange={onInputChange}
      />
    </>
  );
};

export default ModelRegisterForm;