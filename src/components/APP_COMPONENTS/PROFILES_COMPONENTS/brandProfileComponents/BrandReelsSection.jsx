// src/components/APP_COMPONENTS/profilesComponents/brandProfileComponents/BrandReelsSection.jsx
import React, { useState } from 'react';
import { Heart, Eye, Calendar, Share2, ShoppingBag } from 'lucide-react';

const BrandReelsSection = ({ reels }) => {
  const [selectedReel, setSelectedReel] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleReelClick = (reel) => {
    setSelectedReel(reel);
    // In a real app, this would open a modal or navigate to reel detail page
    console.log('Reel clicked:', reel);
  };

  const handleShare = (e, reel) => {
    e.stopPropagation();
    // In a real app, this would open share options
    console.log('Share reel:', reel);
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Reels</h2>
      {reels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="rounded-lg overflow-hidden bg-black aspect-video group cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => handleReelClick(reel)}
            >
              <div className="relative">
                <video
                  src={reel.videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  poster={reel.thumbnail}
                />
                
                {/* Always visible analytics bar */}
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-3">
                  <div className="flex items-center justify-between text-white text-xs">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 bg-black/50 px-2 py-1 rounded-full">
                        <Eye className="w-3 h-3" />
                        <span>{formatNumber(reel.analytics.views)}</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-black/50 px-2 py-1 rounded-full">
                        <Heart className="w-3 h-3" />
                        <span>{formatNumber(reel.analytics.likes)}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleShare(e, reel)}
                      className="bg-black/50 p-1 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <Share2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Hover overlay with more details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                      {reel.title}
                    </h3>
                    <p className="text-xs text-gray-200 mb-3 line-clamp-2">
                      {reel.description}
                    </p>
                    
                    {/* Detailed analytics */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Views:</span>
                        <span className="font-medium">{formatNumber(reel.analytics.views)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Likes:</span>
                        <span className="font-medium">{formatNumber(reel.analytics.likes)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Shares:</span>
                        <span className="font-medium">{formatNumber(reel.analytics.shares)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Purchases:</span>
                        <span className="font-medium">{formatNumber(reel.analytics.purchases)}</span>
                      </div>
                    </div>

                    {/* Date and hashtags */}
                    <div className="mt-3 pt-3 border-t border-gray-600">
                      <div className="flex items-center justify-between text-xs text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(reel.date)}</span>
                        </div>
                        {reel.linkedProducts && reel.linkedProducts.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <ShoppingBag className="w-3 h-3" />
                            <span>{reel.linkedProducts.length} products</span>
                          </div>
                        )}
                      </div>
                      {reel.hashtags && reel.hashtags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {reel.hashtags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="text-xs bg-white/20 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">No reels available yet</p>
          <p className="text-gray-400 text-sm mt-1">Check back later for new content</p>
        </div>
      )}
    </div>
  );
};

export default BrandReelsSection;