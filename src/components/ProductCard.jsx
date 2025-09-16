import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import placeholder from "../assets/images/placeholder.png";
import { useFavourite } from "../context/AppContext/FavouriteContext";

const ProductCard = ({ product }) => {
  const { favourites, toggleFavourite } = useFavourite();
  const isFavorited = favourites.some((fav) => fav.id === product.id);

  const discountedPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price;

  const productUrl = `/product/${product.id}`;

  const handleToggleFavourite = () => {
    toggleFavourite(product);
  };

  return (
    <div className="relative rounded-lg flex flex-col mb-3 h-full bg-gray-50">
      {/* Image with Heart */}
      <div className="relative w-full shadow-md overflow-hidden rounded-lg">
        <Link to={productUrl} className="block">
          <img
            src={product.image || placeholder}
            alt={product.name}
            className="w-full h-56 md:h-64 object-cover rounded-lg"
          />
        </Link>
        {/* Favourite Icon */}
        <button
          onClick={handleToggleFavourite}
          className="absolute top-2 right-2 p-1 rounded-full bg-transparent"
          aria-label={
            isFavorited ? "Remove from favourites" : "Add to favourites"
          }
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isFavorited
                ? "fill-red-500 text-red-500"
                : "text-gray-600 hover:text-black"
            }`}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex flex-col mt-3 p-2 flex-grow">
        <Link to={productUrl} className="!no-underline">
          <h6 className="text-base font-semibold text-black line-clamp-2">
            {product.name}
          </h6>
        </Link>
        <p className="text-sm text-gray-500 mt-0 line-clamp-1">
          {product.brand}
        </p>

        <div className="mt-0 flex items-center justify-between">
          <div className="flex flex-col mb-3">
            <span className="text-md lg:text-lg font-bold text-red-600">
              {discountedPrice} EGP
            </span>
            {product.discount && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  {product.price.toFixed(2)} EGP
                </span>
                <span className="text-xs font-medium text-green-600">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>
        </div>

        <Link to={productUrl}>
          <div className="mt-0 flex items-center justify-between">
            <p className="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
              {product.stock > 0
                ? `In Stock: ${product.stock}`
                : "Out of Stock"}
            </p>
            <ShoppingCart className="w-5 h-5 text-gray-700 cursor-pointer hover:text-black hover:animate-bounce" />
          </div>
        </Link>

        <div className="mt-auto"></div>
      </div>
    </div>
  );
};

export default ProductCard;
