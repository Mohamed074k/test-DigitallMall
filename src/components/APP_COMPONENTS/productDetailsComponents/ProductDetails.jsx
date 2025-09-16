// src/components/APP_COMPONENTS/productDetailsComponents/ProductDetails.jsx
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Heart, Star, ArrowLeft, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import products from "../../../data/mockAppProducts";
import { useFavourite } from "../../../context/AppContext/FavouriteContext";
import { useCart } from "../../../context/AppContext/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id) || {};

  const [mainImage, setMainImage] = useState(product.image || "");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { favourites, addToFavourites, removeFromFavourites } = useFavourite();
  const { addToCart } = useCart();

  const additionalImages = product.subimages || [product.image];
  const sizes = product.sizes || ["S", "M", "L", "XL"];
  const colors = product.colors || ["Black", "White", "Blue", "Red"];
  const subcategories = product.subcategories || [
    "Casual",
    "Sportswear",
    "Formal",
  ];

  const isFavorited = favourites.some((item) => item.id === product.id);

  React.useEffect(() => {
    if (additionalImages.length > 0) {
      setMainImage(additionalImages[0]);
      setSelectedImageIndex(0);
    }
  }, [product.id, additionalImages]);

  const reviews = {
    rating: 4.5,
    count: product.reviewCount || 0,
  };

  const toggleFavorite = () => {
    if (isFavorited) removeFromFavourites(product.id);
    else addToFavourites(product);
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
    if (quantity > product.stock) {
      toast.error(`Cannot add more than ${product.stock} items!`);
      return;
    }
    
    // Add the product to cart
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleIncrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    } else {
      toast.error(`Cannot add more than ${product.stock} items!`);
    }
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const discountedPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Previous</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Image Gallery */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg">
              <img
                src={mainImage}
                alt={product.name || "Product"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Sub-images grid */}
            <div className="grid grid-cols-3 gap-2 mt-4 md:flex md:gap-2 md:overflow-x-auto md:pb-2">
              {additionalImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMainImage(img);
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
              {product.name || "Product Name"}
            </h1>

            {product.brand && (
              <p className="text-lg text-gray-500 font-medium">
                by {product.brand}
              </p>
            )}

            <p className="text-base text-gray-600 leading-relaxed">
              {product.description ||
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
                  disabled={quantity >= product.stock}
                  className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
              {quantity >= product.stock && product.stock > 0 && (
                <p className="text-red-500 text-xs mt-1">
                  Maximum quantity reached ({product.stock} available)
                </p>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center gap-2">
                {product.discount ? (
                  <>
                    <span className="text-xl font-semibold text-black">
                      {discountedPrice} EGP
                    </span>
                    <span className="text-base text-gray-500 line-through">
                      {product.price?.toFixed(2) || "0.00"} EGP
                    </span>
                    <span className="text-sm text-green-600">
                      {product.discount}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-semibold text-black">
                    {product.price?.toFixed(2) || "0.00"} EGP
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 mt-2">
                {product.stock > 0
                  ? `In Stock: ${product.stock}`
                  : "Out of Stock"}
              </p>

              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-800">Category</h3>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {product.category && (
                    <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-md font-medium">
                      {product.category}
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
                    product.stock === 0 || 
                    (sizes.length > 1 && !selectedSize) ||
                    (colors.length > 1 && !selectedColor) ||
                    quantity > product.stock
                  }
                  className={`flex-1 py-2 px-4 text-sm font-medium text-white !rounded-lg flex items-center justify-center gap-2 ${
                    product.stock === 0 || 
                    (sizes.length > 1 && !selectedSize) ||
                    (colors.length > 1 && !selectedColor) ||
                    quantity > product.stock
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-indigo-700"
                  } transition-colors`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {sizes.length > 1 && !selectedSize
                    ? "Select Size"
                    : colors.length > 1 && !selectedColor
                    ? "Select Color"
                    : quantity > product.stock
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
      </main>
    </div>
  );
};

export default ProductDetails;