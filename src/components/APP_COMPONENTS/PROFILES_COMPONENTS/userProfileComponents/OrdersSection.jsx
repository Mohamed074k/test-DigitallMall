// src/components/APP_COMPONENTS/profilesComponents/userProfileComponents/OrdersSection.jsx
import React from 'react';

const OrdersSection = ({ orders }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Order History</h3>
      
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{order.id}</h4>
                  <p className="text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className="text-lg font-bold text-gray-900">{order.total.toFixed(2)} EGP</span>
                </div>
              </div>
              
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-700">{item.name} × {item.quantity}</span>
                    <span className="text-gray-900 font-medium">{(item.price * item.quantity).toFixed(2)} EGP</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="text-black hover:text-gray-700 font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No orders yet</p>
          <p className="text-gray-400 mt-2">Start shopping to see your order history!</p>
        </div>
      )}
    </div>
  );
};

export default OrdersSection;