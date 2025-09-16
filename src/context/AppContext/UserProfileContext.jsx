// src/context/userProfileContext/UserProfileContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import mockUserProfile from '../../data/mockUserProfile';

const UserProfileContext = createContext();

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate API call to fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // In real app, this would be an API call:
        // const response = await fetch('/api/user/profile');
        // const data = await response.json();
        
        setUserProfile(mockUserProfile);
        setError(null);
      } catch (err) {
        setError('Failed to load user profile');
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const updateUserProfile = (updatedData) => {
    setUserProfile(prev => ({ ...prev, ...updatedData }));
  };

  const value = {
    userProfile,
    loading,
    error,
    updateUserProfile
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
};