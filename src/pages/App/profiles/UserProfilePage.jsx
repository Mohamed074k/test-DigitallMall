// src/pages/App/UserProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, User, ShoppingBag, Store } from 'lucide-react'; // Import icons
import { useUserProfile } from '../../../context/AppContext/UserProfileContext';
import UserProfileHeader from '../../../components/APP_COMPONENTS/PROFILES_COMPONENTS/userProfileComponents/UserProfileHeader';
import EditInfoSection from '../../../components/APP_COMPONENTS/PROFILES_COMPONENTS/userProfileComponents/EditInfoSection';
import FollowingBrandsSection from '../../../components/APP_COMPONENTS/PROFILES_COMPONENTS/userProfileComponents/FollowingBrandsSection';
import FollowingModelsSection from '../../../components/APP_COMPONENTS/PROFILES_COMPONENTS/userProfileComponents/FollowingModelsSection';
import OrdersSection from '../../../components/APP_COMPONENTS/PROFILES_COMPONENTS/userProfileComponents/OrdersSection';
import { mockFollowingBrands, mockFollowingModels, mockOrderHistory } from '../../../data/mockUserProfile';
 
const UserProfilePage = () => {
  const { userProfile, loading, error, updateUserProfile } = useUserProfile();
  const [activeSection, setActiveSection] = useState('profile');

    // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  const handleUpdateProfile = (updatedData) => {
    updateUserProfile(updatedData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Huge Title and Small Text */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your Account & View your activity</p>
        </div>

        {/* Profile Header */}
        {userProfile && <UserProfileHeader userData={userProfile} />}

        {/* Navigation Tabs with Icons */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          <button
            onClick={() => setActiveSection('profile')}
            className={`px-6 py-3 !rounded-full font-medium transition-colors flex items-center gap-2 ${
              activeSection === 'profile'
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Info</span>
          </button>
          <button
            onClick={() => setActiveSection('brands')}
            className={`px-6 py-3 !rounded-full font-medium transition-colors flex items-center gap-2 ${
              activeSection === 'brands'
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Following Brands ({mockFollowingBrands.length})</span>
          </button>
          <button
            onClick={() => setActiveSection('models')}
            className={`px-6 py-3 !rounded-full font-medium transition-colors flex items-center gap-2 ${
              activeSection === 'models'
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Following Models ({mockFollowingModels.length})</span>
          </button>
          <button
            onClick={() => setActiveSection('orders')}
            className={`px-6 py-3 !rounded-full font-medium transition-colors flex items-center gap-2 ${
              activeSection === 'orders'
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders ({mockOrderHistory.length})</span>
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
            {activeSection === 'profile' && userProfile && (
              <EditInfoSection 
                userData={userProfile} 
                onUpdateProfile={handleUpdateProfile} 
              />
            )}
            
            {activeSection === 'brands' && (
              <FollowingBrandsSection brands={mockFollowingBrands} />
            )}
            
            {activeSection === 'models' && (
              <FollowingModelsSection models={mockFollowingModels} />
            )}
            
            {activeSection === 'orders' && (
              <OrdersSection orders={mockOrderHistory} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserProfilePage;