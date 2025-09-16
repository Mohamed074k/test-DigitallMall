// src/components/APP_COMPONENTS/registerComponents/BrandRegisterForm.jsx
import React from 'react';
import FloatingInput from './FloatingInput';

const BrandRegisterForm = ({ formData, onInputChange, onBrandTypeChange, onFocus, onBlur }) => {
  return (
    <>
      <FloatingInput
        id="brandName"
        name="brandName"
        label="Brand Name"
        value={formData.brandName}
        onChange={onInputChange}
        onFocus={() => onFocus('brandName')}
        onBlur={() => !formData.brandName && onBlur('brandName')}
        required
      />

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Type
        </label>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="brandTypeToggle"
              checked={formData.brandType === 'online'}
              onChange={() => onBrandTypeChange('online')}
              className="form-radio text-black"
            />
            <span className="ml-2">Online</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="brandTypeToggle"
              checked={formData.brandType === 'offline'}
              onChange={() => onBrandTypeChange('offline')}
              className="form-radio text-black"
            />
            <span className="ml-2">Offline</span>
          </label>
        </div>
      </div>

      {formData.brandType === 'offline' && (
        <FloatingInput
          id="address"
          name="address"
          label="Address"
          value={formData.address}
          onChange={onInputChange}
          onFocus={() => onFocus('address')}
          onBlur={() => !formData.address && onBlur('address')}
          required
        />
      )}

      {formData.brandType === 'online' && (
        <>
          <FloatingInput
            id="instagram"
            name="instagram"
            type="url"
            label="Instagram Link"
            value={formData.instagram}
            onChange={onInputChange}
            onFocus={() => onFocus('instagram')}
            onBlur={() => !formData.instagram && onBlur('instagram')}
            // placeholder="https://instagram.com/yourbrand"
          />
          <FloatingInput
            id="facebook"
            name="facebook"
            type="url"
            label="Facebook Page Link"
            value={formData.facebook}
            onChange={onInputChange}
            onFocus={() => onFocus('facebook')}
            onBlur={() => !formData.facebook && onBlur('facebook')}
            // placeholder="https://facebook.com/yourbrand"
          />
        </>
      )}

      <FloatingInput
        id="proof"
        name="proof"
        type="file"
        label="Brand Proof (Document/Image)"
        accept="image/*,.pdf,.doc,.docx"
        onChange={onInputChange}
      />
    </>
  );
};

export default BrandRegisterForm;