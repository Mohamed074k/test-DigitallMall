// src/components/APP_COMPONENTS/cartComponents/OrderSummary.jsx
import React, { useState } from 'react';
import { useCart } from '../../../context/AppContext/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const OrderSummary = () => {
  const { cartItems, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Calculate discounted price for an item
  const getDiscountedPrice = (item) => {
    if (item.discount) {
      return item.price * (1 - item.discount / 100);
    }
    return item.price;
  };

  // Calculate subtotal with proper discount handling
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = getDiscountedPrice(item);
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = 30.0;
  const total = subtotal + shipping;
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      // Simulate API call or any async operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/checkout');
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="w-5 h-5 text-gray-700" />
        <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
      </div>
      
      <div className="space-y-4 mb-6">
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Products</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {cartItems.map((item) => {
              const discountedPrice = getDiscountedPrice(item);
              const finalPrice = discountedPrice * item.quantity;
              
              return (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex justify-between text-sm">
                  <div className="flex-1">
                    <p className="text-gray-900 truncate">{item.name}</p>
                    <p className="text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    {item.selectedSize && (
                      <p className="text-gray-500">
                        Size: {item.selectedSize}
                      </p>
                    )}
                    {item.selectedColor && (
                      <p className="text-gray-500">
                        Color: {item.selectedColor}
                      </p>
                    )}
                    <p className="text-gray-500">
                      Price: {discountedPrice.toFixed(2)} EGP each
                    </p>
                  </div>
                  <span className="font-medium text-gray-900 ml-2 whitespace-nowrap">
                    {finalPrice.toFixed(2)} EGP
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal ({totalItems} items)</span>
            <span className="font-medium">{subtotal.toFixed(2)} EGP</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">{shipping.toFixed(2)} EGP</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
            <span>Total</span>
            <span>{total.toFixed(2)} EGP</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className={`w-full bg-black text-white py-2 px-2 !rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2 ${
          isLoading ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Processing...</span>
          </>
        ) : 'Proceed to Checkout'}
      </button>
    </div>
  );
};

export default OrderSummary;