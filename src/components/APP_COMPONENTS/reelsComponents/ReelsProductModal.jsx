// src/components/APP_COMPONENTS/reelsComponents/ReelsProductModal.jsx
import React, { useState, useEffect } from "react";
import { X, ShoppingCart } from "lucide-react";

const ReelsProductModal = ({ 
  isOpen, 
  onClose, 
  reel, 
  linkedProducts = [],
  onProductClick 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Delay to trigger animation
      setTimeout(() => setIsVisible(true), 10);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleProductClick = (productId) => {
    if (onProductClick) {
      onProductClick(productId);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div 
        className={`w-full max-w-md bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              Products from this Reel
            </h3>
            {reel && (
              <p className="text-sm text-gray-600">
                by {reel.userName || reel.brand}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Products List */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(70vh - 80px)' }}>
          {linkedProducts.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600">No products available for this reel</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {linkedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="bg- border border-gray-200 rounded-lg  shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/150x150/e5e7eb/6b7280?text=${encodeURIComponent(product.name?.charAt(0) || 'P')}`;
                      }}
                    />
                  </div>

                  {/* Product Name */}
                  <h6 className="font-medium px-2 text-gray-900 text-sm mb-2 line-clamp-2 leading-tight">
                    {product.name}
                  </h6>

                  {/* Product Price */}
                  <div className="mb-3">
                    {product.discount ? (
                      <div className="flex flex-col">
                        <span className="text-sm px-2 font-semibold text-gray-900">
                          {(product.price * (1 - product.discount / 100)).toFixed(2)} EGP
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs px-2 text-gray-500 line-through">
                            {product.price?.toFixed(2)} EGP
                          </span>
                          <span className="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded">
                            -{product.discount}%
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm font-semibold text-gray-900">
                        {product.price?.toFixed(2) || '0.00'} EGP
                      </span>
                    )}
                  </div>

                  {/* Buy Now Button */}
                  <button
                    onClick={() => handleProductClick(product.id)}
                    disabled={product.stock === 0}
                    className={`w-full  py-2 px-3 !rounded-lg text-sm font-medium transition-colors ${
                      product.stock === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    {product.stock === 0 ? 'Sold Out' : 'Buy Now'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Optional: Add reel info at bottom */}
        {reel && (
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-600 text-center">
              {reel.description}
            </p>
            {reel.hashtags && reel.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2 justify-center">
                {reel.hashtags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {reel.hashtags.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{reel.hashtags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReelsProductModal;
