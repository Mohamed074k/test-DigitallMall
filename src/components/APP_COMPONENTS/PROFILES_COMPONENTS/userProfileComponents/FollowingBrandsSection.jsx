// src/components/APP_COMPONENTS/profilesComponents/userProfileComponents/FollowingBrandsSection.jsx
import React from 'react';
import { Users, ExternalLink, UserX } from 'lucide-react';
import { Link } from 'react-router-dom';

const FollowingBrandsSection = ({ brands }) => {
  const handleUnfollow = (brandId) => {
    // Implement unfollow logic
    console.log('Unfollow brand:', brandId);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Following Brands</h3>
      
      {brands.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div key={brand.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">{brand.name}</h4>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{brand.followers.toLocaleString()} followers</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link
                  to={`/brand/${brand.slug}`}
                  className="flex-1 flex items-center !no-underline justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span> Profile</span>
                </Link>
                <button
                  onClick={() => handleUnfollow(brand.id)}
                  className="px-4 py-2 border border-gray-300 text-black !rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <UserX className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">You're not following any brands yet</p>
          <p className="text-gray-400 mt-2">Start exploring brands to follow!</p>
        </div>
      )}
    </div>
  );
};

export default FollowingBrandsSection;