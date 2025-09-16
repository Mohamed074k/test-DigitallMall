// src/pages/App/profiles/CheckBrandProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Video } from 'lucide-react';
import BrandProfileHeader from '../../../components/APP_COMPONENTS/PROFILES_COMPONENTS/brandProfileComponents/BrandProfileHeader';
import BrandProductsSection from '../../../components/APP_COMPONENTS/PROFILES_COMPONENTS/brandProfileComponents/BrandProductsSection';
import BrandReelsSection from '../../../components/APP_COMPONENTS/PROFILES_COMPONENTS/brandProfileComponents/BrandReelsSection';
import { AppBrandProfileProvider, useBrandProfile } from '../../../context/AppContext/AppBrandProfileContext';
import { mockBrandReels } from '../../../data/AppMockReels';

// Inner component that uses context
const BrandProfileContent = () => {
  const { brand, loading } = useBrandProfile();
  const [activeSection, setActiveSection] = useState('products');

    // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  if (loading || !brand) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading brand profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-0 px-4 max-w-4xl">

        {/* Brand Profile Header */}
        <BrandProfileHeader />

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mt-8 mb-8 gap-2">
          <button
            onClick={() => setActiveSection('products')}
            className={`px-6 py-3 !rounded-full font-medium transition-colors flex items-center gap-2 ${
              activeSection === 'products'
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products</span> 
          </button>
          <button
            onClick={() => setActiveSection('reels')}
            className={`px-6 py-3 !rounded-full font-medium transition-colors flex items-center gap-2 ${
              activeSection === 'reels'
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Reels</span>
          </button>
        </div>

        {/* Section Content with Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === 'products' && (
              <BrandProductsSection brandName={brand.name} />
            )}
            
            {activeSection === 'reels' && (
              <BrandReelsSection reels={brand ? mockBrandReels.filter(reel => reel.brand === brand.name) : []} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Main exported component
const AppBrandProfile = () => {
  const { brandSlug } = useParams(); // ✅ Get from URL: /brand/:brandSlug

  if (!brandSlug) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <p className="text-red-500">Brand not specified</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto md:mx-10 p-4">
      <AppBrandProfileProvider brandSlug={brandSlug}>
        <BrandProfileContent />
      </AppBrandProfileProvider>
    </div>
  );
};
export default AppBrandProfile;
