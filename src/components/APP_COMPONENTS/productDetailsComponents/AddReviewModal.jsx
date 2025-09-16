// src/components/APP_COMPONENTS/productDetailsComponents/AddReviewModal.jsx
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const AddReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle modal open/close with transition
  useEffect(() => {
    if (isOpen) {
      // When opening, first set mounted to true, then after a tiny delay, set visible
      setIsMounted(true);
    } else {
      // When closing, set visible to false immediately, then unmount after transition
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 300); // Match the transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSubmit({
      rating,
      reviewText,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      customerName: 'Current User' // This would come from user context in real app
    });
    
    // Reset form
    setRating(0);
    setHoverRating(0);
    setReviewText('');
    setIsSubmitting(false);
    onClose();
  };

  const renderStars = (currentRating, interactive = true) => {
    return [...Array(5)].map((_, i) => {
      const starValue = i + 1;
      const isFilled = interactive 
        ? starValue <= (hoverRating || rating)
        : starValue <= currentRating;
      
      return (
        <button
          key={i}
          type={interactive ? "button" : undefined}
          onClick={interactive ? () => setRating(starValue) : undefined}
          onMouseEnter={interactive ? () => setHoverRating(starValue) : undefined}
          onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          className={`w-8 h-8 ${interactive ? 'cursor-pointer' : ''}`}
          disabled={!interactive}
        >
          <Star
            className={`w-8 h-8 ${
              isFilled
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      );
    });
  };

  if (!isMounted) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-all duration-300 ease-out ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div 
        className={`bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ease-out ${
          isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Add Your Review</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 !text-2xl font-bold focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm !shadow-md font-medium text-gray-700 mb-2">
                Your Rating
              </label>
              <div className="flex">
                {renderStars(rating, true)}
              </div>
              {rating > 0 && (
                <p className="mt-1 text-sm text-gray-500">
                  {rating} star{rating !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                id="review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black transition-colors duration-200"
                rows="4"
                placeholder="Share your experience with this product..."
                required
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 shadow-md text-sm font-medium text-gray-700 bg-white border border-gray-300 !rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={rating === 0 || isSubmitting}
                className={`px-4 py-2 text-sm font-medium text-white !rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200 ${
                  rating === 0 || isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-black hover:bg-gray-800'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  'Submit Review'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;