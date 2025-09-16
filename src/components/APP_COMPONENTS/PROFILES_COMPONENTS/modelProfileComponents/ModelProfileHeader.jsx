// src/components/APP_COMPONENTS/PROFILES_COMPONENTS/modelProfileComponents/ModelProfileHeader.jsx
import React from 'react';
import { Share, UserPlus, UserCheck, MapPin, Instagram, Twitter, Heart } from 'lucide-react';
import { useModelProfile } from '../../../../context/AppContext/AppModelProfileContext';

const ModelProfileHeader = () => {
  const { model, loading, toggleFollow, toggleFavorite } = useModelProfile();

  if (loading || !model) {
    return (
      <div className="bg-white rounded-lg p-6 animate-pulse w-full max-w-xl">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-4 md:gap-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-3 text-center md:text-left">
              <div className="h-8 bg-gray-200 rounded w-48 mx-auto md:mx-0"></div>
              <div className="h-4 bg-gray-200 rounded w-full md:w-3/4 mx-auto md:mx-0"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="h-4 bg-gray-200 rounded mx-auto md:mx-0 w-16"></div>
            <div className="h-4 bg-gray-200 rounded mx-auto md:mx-0 w-16"></div>
            <div className="h-4 bg-gray-200 rounded mx-auto md:mx-0 w-16"></div>
          </div>
          <div className="flex flex-row gap-3 justify-center md:justify-start">
            <div className="h-11 bg-gray-200 rounded-lg w-[70%] md:w-32"></div>
            <div className="h-11 bg-gray-200 rounded-lg w-[30%] md:w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-4 md:gap-6">
          <img
            src={model.avatar || "/images/placeholder.png"}
            alt={model.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white"
          />
          <div className="flex-1 space-y-3 text-center md:!text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {model.name}
            </h1>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {model.bio || "No bio available."}
            </p>

            {/* Model Details */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-3">
              {model.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{model.location}</span>
                </div>
              )}
              {model.age && (
                <span>{model.age} years old</span>
              )}
              {model.height && (
                <span>{model.height}</span>
              )}
            </div>

  
            {/* Social Media Links */}
            {model.socialMedia && (
              <div className="flex flex-col md:flex-row items-center space-x-4 mt-4">
                {model.socialMedia.instagram && (
                  <a
                    href={`https://instagram.com/${model.socialMedia.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    <span className="text-sm">{model.socialMedia.instagram}</span>
                  </a>
                )}
                {model.socialMedia.twitter && (
                  <a
                    href={`https://twitter.com/${model.socialMedia.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                    <span className="text-sm">{model.socialMedia.twitter}</span>
                  </a>
                )}
              </div>
            )}

            {/* Stats Row (Desktop) */}
            <div className="hidden md:grid grid-cols-3 gap-3 pt-4">
              <StatItem label="Followers" value={model.followers.toLocaleString()} />
              <StatItem label="Videos" value={model.videosCount} />
              <StatItem label="Likes" value={model.likes.toLocaleString()} />
            </div>
          </div>
        </div>

        {/* Stats Row (Mobile) */}
        <div className="grid grid-cols-3 gap-3 md:hidden">
          <StatItem label="Followers" value={model.followers.toLocaleString()} />
          <StatItem label="Videos" value={model.videosCount} />
          <StatItem label="Likes" value={model.likes.toLocaleString()} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-3 justify-center md:justify-start">
          <button
            onClick={toggleFollow}
            className={`px-6 py-2.5 !rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 w-[50%] md:w-auto min-w-[120px] ${
              model.isFollowing
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {model.isFollowing ? (
              <>
                <UserCheck className="w-4 h-4" />
                <span>Following</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Follow</span>
              </>
            )}
          </button>

           {/* Share Button */}
                <button className="!px-0 md:!px-6 py-2.5 border border-gray-300 !rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 w-[25%] md:w-auto min-w-[10px]">
                  <Share className="w-4 h-4" />
                  <span className="hidden md:inline">Share</span>
                </button>

             <button
            onClick={toggleFavorite}
            className={`px-0 py-0 !rounded-lg font-medium transition-colors flex items-center justify-center  ${
              model.isFavorited
                ? 'bg-transparent text-red-500 hover:bg-red-600'
                : ' text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Heart className={` ${model.isFavorited ? 'fill-current' : ''}`} />
            <span className="hidden md:inline">{model.isFavorited ? '' : ''}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value }) => (
  <div className="text-center md:text-left p-2 bg-gray-50 rounded-lg">
    <div className="text-lg font-bold text-gray-900">{value}</div>
    <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
  </div>
);

export default ModelProfileHeader;