// src/pages/App/Cart.jsx
import React, {useEffect} from 'react';
import { useCart } from '../../context/AppContext/CartContext';
import CartItems from '../../components/APP_COMPONENTS/cartComponents/CartItems';
import OrderSummary from '../../components/APP_COMPONENTS/cartComponents/OrderSummary';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CartPage = () => {
  const { cartItems } = useCart();
  
  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/" 
            className="flex items-center !no-underline gap-2 !text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
            <Link
              to="/"
              className="inline-block bg-black !no-underline text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors animate-bounce"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow">
              <CartItems />
            </div>
            <div className="lg:w-80 flex-shrink-0">
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;