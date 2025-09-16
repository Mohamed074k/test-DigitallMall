// src/components/reelsComponents/ReelsProductDetails.jsx - ROBUST PRODUCT DETAILS
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Heart, Star, ArrowLeft, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import products from "../../../data/mockAppProducts";
import { useFavourite } from "../../../context/AppContext/FavouriteContext";
import { useCart } from "../../../context/AppContext/CartContext";
import { mockReels } from "../../../data/mockReels";

const ReelsProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  
  // Extract reelId and productIds from URL parameters - WITH ERROR HANDLING
  const urlParams = new URLSearchParams(location.search);
  const reelId = urlParams.get('reelId') || '';
  const productIdsString = urlParams.get('productIds') || '';
  
  // Parse product IDs safely
  const productIds = productIdsString 
    ? productIdsString.split(',').filter(id => id && id.trim() !== '')
    : [];
  
  // Get the reel data from mockReels
  const reel = mockReels.find(r => r.id === reelId) || null;
  
  // Get all product details for the linked products - SAFER FILTERING
  const linkedProducts = productIds
    .map(pid => {
      const product = products.find(p => p.id === pid);
      if (!product) {
        console.warn(`Product with ID ${pid} not found in mockProducts`);
      }
      return product;
    })
    .filter(p => p !== undefined && p !== null); // Filter out any undefined/null products
  
  // If no products found but we have productIds, show warning
  if (productIds.length > 0 && linkedProducts.length === 0 && process.env.NODE_ENV === 'development') {
    console.warn('All product IDs not found in mockProducts:', productIds);
  }
  
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  const { favourites, addToFavourites, removeFromFavourites } = useFavourite();
  const { addToCart } = useCart();
  
  // Get current product based on selected index
  const currentProduct = linkedProducts.length > 0 ? linkedProducts[selectedProductIndex] : {};
  
  // Get additional images for current product
  const additionalImages = currentProduct.subimages || [currentProduct.image];
  const sizes = currentProduct.sizes || ["S", "M", "L", "XL"];
  const colors = currentProduct.colors || ["Black", "White", "Blue", "Red"];
  const subcategories = currentProduct.subcategories || [
    "Casual",
    "Sportswear",
    "Formal",
  ];
  
  const isFavorited = favourites.some((item) => item.id === currentProduct.id);
  
  // Set initial product image when component mounts or product changes
  useEffect(() => {
    if (additionalImages.length > 0) {
      setSelectedImageIndex(0);
    }
    // Reset selections when product changes
    setSelectedSize("");
    setSelectedColor("");
    setQuantity(1);
  }, [currentProduct.id, additionalImages]);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const reviews = {
    rating: 4.5,
    count: currentProduct.reviewCount || 0,
  };
  
  const toggleFavorite = () => {
    if (isFavorited) removeFromFavourites(currentProduct.id);
    else addToFavourites(currentProduct);
  };
  
  const handleAddToCart = () => {
    // Check if size is required but not selected
    if (sizes.length > 1 && !selectedSize) {
      return;
    }
    
    // Check if color is required but not selected
    if (colors.length > 1 && !selectedColor) {
      return;
    }
    
    // Check if quantity exceeds stock
    if (quantity > currentProduct.stock) {
      toast.error(`Cannot add more than ${currentProduct.stock} items!`);
      return;
    }
    
    // Add the product to cart
    addToCart(currentProduct, quantity, selectedSize, selectedColor);
  };

  const handleIncrementQuantity = () => {
    if (quantity < currentProduct.stock) {
      setQuantity(prev => prev + 1);
    } else {
      toast.error(`Cannot add more than ${currentProduct.stock} items!`);
    }
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const discountedPrice = currentProduct.discount
    ? (currentProduct.price * (1 - currentProduct.discount / 100)).toFixed(2)
    : currentProduct.price;
  
  // Handle product navigation
  const handleNextProduct = () => {
    if (linkedProducts.length > 1) {
      setSelectedProductIndex((prev) => 
        (prev + 1) % linkedProducts.length
      );
    }
  };
  
  const handlePrevProduct = () => {
    if (linkedProducts.length > 1) {
      setSelectedProductIndex((prev) => 
        (prev - 1 + linkedProducts.length) % linkedProducts.length
      );
    }
  };
  
  // Back to Reels button handler
  const handleBackToReels = () => {
    navigate(-1);
  };
  
  // Show loading state while waiting for data
  if (!reelId && !productIdsString) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }
  
  // If no products found, show error message
  if (linkedProducts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 items-center justify-center p-8">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">No Products Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn't find any products associated with this reel.
            {productIds.length > 0 && ` Product IDs provided: ${productIds.join(', ')}`}
          </p>
          <button
            onClick={handleBackToReels}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Reels
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={handleBackToReels}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Reels</span>
          </button>
        </div>
        
        {/* Reel Header */}
        {reel && (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold text-red-800">
              Products from "{reel.userName}'s" Reel
            </h2>
            <p className="text-sm text-gray-600 mt-1">{reel.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {reel.hashtags.map((tag, index) => (
                <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Product Navigation Controls */}
         
        {linkedProducts.length > 1 && (
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handlePrevProduct}
              disabled={linkedProducts.length <= 1}
              className={`flex items-center gap-2 px-4 py-2 !rounded-lg border shadow-md ${
                linkedProducts.length <= 1
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous 
            </button>
            
            <div className="text-sm text-gray-600">
              {selectedProductIndex + 1} of {linkedProducts.length}
            </div>
            
            <button
              onClick={handleNextProduct}
              disabled={linkedProducts.length <= 1}
              className={`flex items-center gap-2 px-4 py-2 !rounded-lg border shadow-md ${
                linkedProducts.length <= 1
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next 
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        )}

        {/* Main Product Display */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Image Gallery */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg">
              <img
                src={currentProduct.image}
                alt={currentProduct.name || "Product"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Sub-images grid - 3 per row on mobile, horizontal scroll on larger screens */}
            <div className="grid grid-cols-3 gap-2 mt-4 md:flex md:gap-2 md:overflow-x-auto md:pb-2">
              {additionalImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImageIndex(index);
                  }}
                  className={`flex-shrink-0 w-full aspect-square rounded-md overflow-hidden border-2 md:w-[80px] md:h-[80px] ${
                    selectedImageIndex === index
                      ? "border-black"
                      : "border-gray-200"
                  } hover:border-black transition-colors`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <h1 className="text-2xl md:text-3xl font-bold text-black">
              {currentProduct.name || "Product Name"}
            </h1>

            {currentProduct.brand && (
              <p className="text-lg text-gray-500 font-medium">
                by {currentProduct.brand}
              </p>
            )}

            <p className="text-base text-gray-600 leading-relaxed">
              {currentProduct.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </p>

            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(reviews.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {reviews.rating} ({reviews.count} reviews)
              </span>
            </div>

            {/* Size Selection */}
            {sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-800">Sizes</h3>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 text-sm border rounded-md transition-colors ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:bg-black hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-800">Colors</h3>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 text-sm border rounded-md transition-colors ${
                        selectedColor === color
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:bg-black hover:text-white"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-800">Quantity</h3>
              <div className="flex items-center mt-2">
                <button
                  onClick={handleDecrementQuantity}
                  disabled={quantity <= 1}
                  className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="px-4 py-1 border-t border-b border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrementQuantity}
                  disabled={quantity >= currentProduct.stock}
                  className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
              {quantity >= currentProduct.stock && currentProduct.stock > 0 && (
                <p className="text-red-500 text-xs mt-1">
                  Maximum quantity reached ({currentProduct.stock} available)
                </p>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center gap-2">
                {currentProduct.discount ? (
                  <>
                    <span className="text-xl font-semibold text-black">
                      {discountedPrice} EGP
                    </span>
                    <span className="text-base text-gray-500 line-through">
                      {currentProduct.price?.toFixed(2) || "0.00"} EGP
                    </span>
                    <span className="text-sm text-green-600">
                      {currentProduct.discount}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-semibold text-black">
                    {currentProduct.price?.toFixed(2) || "0.00"} EGP
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 mt-2">
                {currentProduct.stock > 0
                  ? `In Stock: ${currentProduct.stock}`
                  : "Out of Stock"}
              </p>

              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-800">Category</h3>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {currentProduct.category && (
                    <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-md font-medium">
                      {currentProduct.category}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-medium text-gray-800 mt-3">
                  Subcategories
                </h3>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {subcategories.map((category) => (
                    <span
                      key={category}
                      className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-md"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={
                    currentProduct.stock === 0 || 
                    (sizes.length > 1 && !selectedSize) ||
                    (colors.length > 1 && !selectedColor) ||
                    quantity > currentProduct.stock
                  }
                  className={`flex-1 py-2 px-4 text-sm font-medium text-white !rounded-lg flex items-center justify-center gap-2 ${
                    currentProduct.stock === 0 || 
                    (sizes.length > 1 && !selectedSize) ||
                    (colors.length > 1 && !selectedColor) ||
                    quantity > currentProduct.stock
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-indigo-700"
                  } transition-colors`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {sizes.length > 1 && !selectedSize
                    ? "Select Size"
                    : colors.length > 1 && !selectedColor
                    ? "Select Color"
                    : quantity > currentProduct.stock
                    ? "Exceeds Stock"
                    : "Add to Cart"}
                </button>
                <button
                  onClick={toggleFavorite}
                  className="p-2 rounded-md bg-transparent"
                  aria-label={
                    isFavorited ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorited
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product List Sidebar (Mobile Only) */}
        <div className="md:hidden mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Other Products in this Reel</h3>
          <div className="space-y-3">
            {linkedProducts.map((product, index) => (
              <button
                key={product.id}
                onClick={() => setSelectedProductIndex(index)}
                className={`w-full text-left p-3 border rounded-lg flex items-center gap-3 ${
                  selectedProductIndex === index 
                    ? "border-black bg-gray-50" 
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800 truncate">{product.name}</h4>
                  <p className="text-sm text-gray-600 truncate">
                    {product.brand} • {product.discount ? `${discountedPrice} EGP` : `${product.price} EGP`}
                  </p>
                </div>
                {selectedProductIndex === index && (
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Product List Sidebar (Desktop Only) */}
        <div className="hidden md:block mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Other Products in this Reel</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {linkedProducts.map((product, index) => (
              <button
                key={product.id}
                onClick={() => setSelectedProductIndex(index)}
                className={`p-4 border rounded-lg flex flex-col items-start gap-3 hover:bg-gray-50 transition-colors ${
                  selectedProductIndex === index 
                    ? "border-black bg-gray-50" 
                    : "border-gray-200"
                }`}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-32 object-cover rounded"
                />
                <h4 className="font-medium text-gray-800 text-sm">{product.name}</h4>
                {product.brand && (
                  <p className="text-xs text-gray-600">by {product.brand}</p>
                )}
                <div className="flex items-center gap-1">
                  {product.discount ? (
                    <>
                      <span className="text-sm font-semibold text-black">
                        {discountedPrice} EGP
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        {product.price?.toFixed(2)} EGP
                      </span>
                      <span className="text-xs text-green-600">
                        {product.discount}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-semibold text-black">
                      {product.price?.toFixed(2)} EGP
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600">
                  {product.stock > 0 
                    ? `In Stock: ${product.stock}` 
                    : "Out of Stock"}
                </p>
                {selectedProductIndex === index && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Currently Viewing
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReelsProductDetails;