// BrandOrdersContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { mockOrders } from '../../data/mockOrders'; // Adjust the path if needed

const BrandOrderContext = createContext();

export const BrandOrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  // Load mock data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setOrders(mockOrders); // Assuming mockOrders contains brand-specific orders
      } catch (err) {
        setError('Failed to fetch orders');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Update order status
  const updateOrderStatus = async (orderId, status, statusType) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, [statusType]: status } : order
        )
      );
      
      return true;
    } catch (err) {
      console.error('Failed to update order status:', err);
      return false;
    }
  };

  // Process refund
  const processRefund = async (orderId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId 
            ? { 
                ...order, 
                paymentStatus: 'Refunded',
                shippingStatus: 'Refunded'
              } 
            : order
        )
      );
      
      return true;
    } catch (err) {
      console.error('Failed to process refund:', err);
      return false;
    }
  };

  // Filter orders
  const filterOrders = (filters) => {
    let filtered = orders;
    
    if (filters.paymentStatus && filters.paymentStatus !== 'all') {
      filtered = filtered.filter(order => order.paymentStatus === filters.paymentStatus);
    }
    
    if (filters.shippingStatus && filters.shippingStatus !== 'all') {
      filtered = filtered.filter(order => order.shippingStatus === filters.shippingStatus);
    }
    
    if (filters.searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        order.userName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        order.brandName.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // View order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  return (
    <BrandOrderContext.Provider
      value={{
        orders,
        loading,
        error,
        selectedOrder,
        showOrderModal,
        setShowOrderModal,
        currentOrders,
        currentPage,
        ordersPerPage,
        totalPages,
        paginate,
        updateOrderStatus,
        processRefund,
        filterOrders,
        viewOrderDetails
      }}
    >
      {children}
    </BrandOrderContext.Provider>
  );
};

export const useBrandOrders = () => {
  const context = useContext(BrandOrderContext);
  if (!context) {
    throw new Error('useBrandOrders must be used within a BrandOrdersProvider');
  }
  return context;
};