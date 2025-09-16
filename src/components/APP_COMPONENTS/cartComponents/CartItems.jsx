// src/components/APP_COMPONENTS/cartComponents/CartItems.jsx
import React from 'react';
import { Trash2 } from 'lucide-react';
import { useCart } from '../../../context/AppContext/CartContext';

const CartItems = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-600">Add some items to your cart to get started</p>
      </div>
    );
  }

  // Calculate discounted price for an item
  const getDiscountedPrice = (item) => {
    if (item.discount) {
      return item.price * (1 - item.discount / 100);
    }
    return item.price;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-900">Item List</h2>
      </div>
      
      <div className="divide-y divide-gray-100">
        {cartItems.map((item) => {
          const discountedPrice = getDiscountedPrice(item);
          const finalPrice = discountedPrice * item.quantity;
          
          return (
            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="p-6">
              {/* Mobile Layout */}
              <div className="md:hidden">
                {/* Product Name */}
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    {item.brand && (
                      <p className="text-gray-600 text-sm mb-1">by {item.brand}</p>
                    )}
                    
                    {/* Show selected size and color */}
                    <div className="space-y-1 mb-3">
                      {item.selectedSize && (
                        <p className="text-gray-600 text-xs">
                          Size: <span className="font-medium uppercase">{item.selectedSize}</span>
                        </p>
                      )}
                      {item.selectedColor && (
                        <p className="text-gray-600 text-xs">
                          Color: <span className="font-medium capitalize">{item.selectedColor}</span>
                        </p>
                      )}
                    </div>
                    
                    {/* Bottom section with quantity controls and price */}
                    <div className="flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Price and delete button */}
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col items-end">
                          {item.discount > 0 && (
                            <span className="text-xs text-gray-500 line-through">
                              {(item.price * item.quantity).toFixed(2)} EGP
                            </span>
                          )}
                          <span className="font-semibold text-sm">
                            {finalPrice.toFixed(2)} EGP
                          </span>
                        </div>
                        
                        <button
                          className="text-red-600 hover:text-red-800 p-1"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Desktop Layout */}
              <div className="hidden md:flex items-center gap-4">
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  {item.brand && (
                    <p className="text-gray-600 text-sm mt-1">by {item.brand}</p>
                  )}
                  
                  {/* Show selected size and color */}
                  <div className="mt-2 space-y-1">
                    {item.selectedSize && (
                      <p className="text-gray-600 text-sm">
                        Size: <span className="font-medium uppercase">{item.selectedSize}</span>
                      </p>
                    )}
                    {item.selectedColor && (
                      <p className="text-gray-600 text-sm">
                        Color: <span className="font-medium capitalize">{item.selectedColor}</span>
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      {item.discount > 0 && (
                        <span className="text-sm text-gray-500 line-through">
                          {(item.price * item.quantity).toFixed(2)} EGP
                        </span>
                      )}
                      <span className="font-semibold">
                        {finalPrice.toFixed(2)} EGP
                      </span>
                    </div>
                    
                    <button
                      className="text-red-600 hover:text-red-800 p-2"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartItems;