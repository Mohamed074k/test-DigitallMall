// src/components/APP_COMPONENTS/productDetailsComponents/CustomerReviews.jsx
import React, { useState, useEffect } from 'react';
import { Star, ChevronDown } from 'lucide-react';
import AddReviewModal from './AddReviewModal';

const CustomerReviews = () => {
 
  // Mock reviews data
  const [reviews, setReviews] = useState([
    
    {
      id: 1,
      customerName: 'Ahmed Mohamed',
      date: '2023-10-15',
      rating: 5,
      reviewText: 'Absolutely love these sneakers! The comfort level is unmatched and they look great with all my outfits. Highly recommend to anyone looking for quality athletic wear.'
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      date: '2023-09-22',
      rating: 4,
      reviewText: 'Great product overall. The sizing is accurate and the material feels premium. Only minor issue was the delivery took a bit longer than expected.'
    },
    {
      id: 3,
      customerName: 'Mohamed Ali',
      date: '2023-11-05',
      rating: 5,
      reviewText: 'Best purchase I\'ve made this year! The quality exceeded my expectations and they\'re holding up well after regular use. Will definitely buy from this brand again.'
    },
    {
      id: 4,
      customerName: 'Fatima Hassan',
      date: '2023-08-17',
      rating: 3,
      reviewText: 'Decent product but not exceptional. The fit is okay but I expected better quality for the price. Good for occasional wear but not for heavy use.'
    },
    {
      id: 5,
      customerName: 'James Wilson',
      date: '2023-10-30',
      rating: 4,
      reviewText: 'Very satisfied with my purchase. The product arrived quickly and matches the description perfectly. Comfortable and stylish - exactly what I was looking for.'
    },
    {
      id: 6,
      customerName: 'Layla Mahmoud',
      date: '2023-09-12',
      rating: 5,
      reviewText: 'Outstanding quality! These have become my favorite shoes. The cushioning is perfect and they look fantastic. Worth every penny!'
    },
    {
      id: 7,
      customerName: 'Robert Chen',
      date: '2023-11-18',
      rating: 4,
      reviewText: 'Good value for money. The product is well-made and comfortable. Only reason I didn\'t give 5 stars is because the color faded slightly after a few washes.'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [filterRating, setFilterRating] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviewsPerPage = 3;

 

  // Filter reviews based on rating
  const filteredReviews = filterRating === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(filterRating));

  // Calculate pagination
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, startIndex + reviewsPerPage);

  // Reset to first page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterRating]);

  // Handle pagination
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleAddReview = (newReview) => {
    const reviewWithId = {
      ...newReview,
      id: reviews.length + 1
    };
    setReviews([reviewWithId, ...reviews]);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="w-full">
      {/* Header with title and Add Review button */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
  <h2 className="text-2xl font-bold text-black">Customer Reviews</h2>
  <button 
    onClick={() => setIsModalOpen(true)}
    className="w-1/2 self-end sm:w-auto px-4 py-2 bg-black text-white !rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-1"
  >
    <span className='text-white text-lg font-bold'>+</span> Add Review
  </button>
</div>


      {/* Filter by rating dropdown */}
      <div className="mb-6">
        <div className="relative inline-block w-48">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="appearance-none shadow-md w-full bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 text-gray-700 leading-tight"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {currentReviews.length > 0 ? (
          currentReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{review.customerName}</h4>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <div className="flex mb-3">
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No reviews found for this rating.
          </div>
        )}
      </div>

      {/* Pagination - Centered */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center mt-8 gap-4">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(startIndex + reviewsPerPage, filteredReviews.length)} of {filteredReviews.length} reviews
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 text-sm rounded-md border ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`w-10 h-10 rounded-md text-sm ${
                      currentPage === pageNumber
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 text-sm rounded-md border ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Add Review Modal */}
      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddReview}
      />
    </div>
  );
};

export default CustomerReviews;