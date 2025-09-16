import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import products from '../../../data/mockAppProducts';

const ProductsList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">All Products</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          const discountedPrice = product.discount
            ? (product.price * (1 - product.discount / 100)).toFixed(2)
            : product.price;

          return (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Product Image */}
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                )}
                <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Brand */}
                <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                
                {/* Product Name */}
                <Link to={`/product/${product.id}`} className="!no-underline">
                  <h3 className="text-lg font-semibold text-black hover:text-gray-600 transition-colors mb-2">
                    {product.name}
                  </h3>
                </Link>

                {/* Description (truncated) */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Category */}
                <div className="mb-3">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>

                {/* Subcategories */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {product.subcategories.slice(0, 2).map((subcategory, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {subcategory}
                      </span>
                    ))}
                    {product.subcategories.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{product.subcategories.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Available Sizes:</p>
                  <div className="flex flex-wrap gap-1">
                    {product.sizes.slice(0, 4).map((size, index) => (
                      <span
                        key={index}
                        className="text-xs border border-gray-300 px-2 py-1 rounded"
                      >
                        {size}
                      </span>
                    ))}
                    {product.sizes.length > 4 && (
                      <span className="text-xs text-gray-500">
                        +{product.sizes.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Reviews */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">
                    ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-600">
                      {discountedPrice} EGP
                    </span>
                    {product.discount && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.price.toFixed(2)} EGP
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    Stock: {product.stock}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="flex-1 text-center py-2 px-4 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors !no-underline"
                  >
                    View Details
                  </Link>
                  <button
                    disabled={product.stock === 0}
                    className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                      product.stock === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsList;
