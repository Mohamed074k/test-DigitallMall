// src/components/APP_COMPONENTS/registerComponents/FloatingInput.jsx
import React from 'react';

const FloatingInput = ({
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  required = false,
  accept,
  placeholder = '',
}) => {
  return (
    <div className="relative mb-6">
      {type === 'file' ? (
        <input
          id={id}
          name={name}
          type={type}
          accept={accept}
          onChange={onChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 pt-6"
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          placeholder={placeholder}
          className="w-full px-4 pt-3 pb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />
      )}

      <label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-200 ease-in-out transform pointer-events-none bg-white px-1 ${
          value || document.activeElement?.id === id
            ? 'text-xs text-black -translate-y-4 top-1'
            : 'text-gray-500 translate-y-3 top-0'
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  );
};

export default FloatingInput;