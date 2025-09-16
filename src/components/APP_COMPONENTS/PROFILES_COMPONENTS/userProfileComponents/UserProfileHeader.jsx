// src/components/APP_COMPONENTS/profilesComponents/userProfileComponents/UserProfileHeader.jsx
import React from 'react';
import { Edit3, Mail, Calendar, Lock, LogOut } from 'lucide-react';

const UserProfileHeader = ({ userData }) => {
  const handleEditProfile = () => {
    // Implement edit profile functionality
    console.log('Edit profile clicked');
  };

  const handleSignOut = () => {
    // Implement sign out functionality
    console.log('Sign out clicked');
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        {/* Avatar with Name and Member Since */}
        <div className="relative flex flex-col items-center">
          <div className="relative">
            <img
              src={userData.profilePicture}
              alt={userData.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
            <button className="absolute bottom-0 right-0 bg-black text-white p-2 !rounded-full hover:bg-gray-800 transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
          
          {/* Name and Member Since behind avatar */}
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
            <p className="text-gray-600 text-sm">Member since {userData.joiningDate}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 !rounded-lg">
            <Mail className="text-gray-400 w-5 h-5" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-gray-700">{userData.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="text-gray-400 w-5 h-5" />
            <div>
              <p className="text-xs text-gray-500">Joining Date</p>
              <p className="text-gray-700">{userData.joiningDate}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Lock className="text-gray-400 w-5 h-5" />
            <div>
              <p className="text-xs text-gray-500">Password</p>
              <p className="text-gray-700">{userData.password}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start mt-4 md:mt-0">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 !rounded-lg hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;