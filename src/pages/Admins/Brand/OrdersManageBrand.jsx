import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  Search,
  Eye,
  RefreshCw,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MoreVertical,
  X,
  ChevronsLeft,
  DollarSign,
} from "lucide-react";
import { useBrandOrders } from "../../../context/brandContext/BrandOrdersContext";
 
const OrdersManagementBrand = () => {
  const {
    orders,
    loading,
    error,
    currentOrders,
    selectedOrder,
    showOrderModal,
    setShowOrderModal,
    currentPage,
    totalPages,
    paginate,
    updateOrderStatus,
    processRefund,
    filterOrders,
    viewOrderDetails,
  } = useBrandOrders();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    paymentStatus: "all",
    shippingStatus: "all",
  });
  const [filteredOrders, setFilteredOrders] = useState(currentOrders);
  const [expandedActions, setExpandedActions] = useState({});
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedOrderDetails]);

  // Filter orders based on search and filters
  useEffect(() => {
    const filtered = filterOrders({
      searchTerm,
      paymentStatus: selectedFilters.paymentStatus,
      shippingStatus: selectedFilters.shippingStatus,
    });
    setFilteredOrders(filtered.slice((currentPage - 1) * 10, currentPage * 10));
  }, [orders, searchTerm, selectedFilters, currentPage, filterOrders]);

  

   const toggleActions = (orderId) => {
    setExpandedActions((prev) => {
      // Close all other menus when opening a new one
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      
      return {
        ...newState,
        [orderId]: !prev[orderId],
      };
    });
  };

  const closeAllActions = () => {
    setExpandedActions({});
  };

  const getStatusColor = (status, type) => {
    if (type === "payment") {
      switch (status) {
        case "Paid":
          return "text-green-600 bg-green-100";
        case "Pending":
          return "text-yellow-600 bg-yellow-100";
        case "COD":
          return "text-blue-600 bg-blue-100";
        case "Refunded":
          return "text-purple-600 bg-purple-100";
        default:
          return "text-gray-600 bg-gray-100";
      }
    } else {
      switch (status) {
        case "Delivered":
          return "text-green-600 bg-green-100";
        case "Shipped":
          return "text-blue-600 bg-blue-100";
        case "Pending":
          return "text-orange-600 bg-yellow-100";
        case "Cancelled":
          return "text-red-600 bg-red-100";
        default:
          return "text-gray-600 bg-gray-100";
      }
    }
  };

  const getStatusIcon = (status, type) => {
    if (type === "payment") {
      switch (status) {
        case "Paid":
          return <CheckCircle className="w-4 h-4" />;
        case "Pending":
          return <Clock className="w-4 h-4" />;
        case "COD":
          return <DollarSign className="w-4 h-4" />;
        case "Refunded":
          return <RefreshCw className="w-4 h-4" />;
        default:
          return <AlertCircle className="w-4 h-4" />;
      }
    } else {
      switch (status) {
        case "Delivered":
          return <CheckCircle className="w-4 h-4" />;
        case "Shipped":
          return <Truck className="w-4 h-4" />;
        case "Pending":
          return <Clock className="w-4 h-4" />;
        case "Cancelled":
          return <XCircle className="w-4 h-4" />;
        default:
          return <AlertCircle className="w-4 h-4" />;
      }
    }
  };

  const handleAction = async (action, orderId, actionName) => {
    const actionMessages = {
      markShipped: {
        title: "Mark as Shipped",
        text: "Are you sure you want to mark this order as shipped?",
        confirmButtonText: "Yes, Mark Shipped",
        successMessage: "Order marked as shipped!",
      },
      refund: {
        title: "Process Refund",
        text: "Are you sure you want to process a refund for this order?",
        confirmButtonText: "Yes, Refund",
        successMessage: "Refund processed successfully!",
      },
    };

    const { title, text, confirmButtonText, successMessage } =
      actionMessages[actionName];

    const result = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
    });

    if (result.isConfirmed) {
      try {
        let success;
        switch (actionName) {
          case "markShipped":
            success = await updateOrderStatus(orderId, "Shipped", "shippingStatus");
            break;
          case "refund":
            success = await processRefund(orderId);
            break;
          default:
            return;
        }
        if (success) {
          toast.success(successMessage);
          setExpandedActions((prev) => ({ ...prev, [orderId]: false }));
        } else {
          toast.error(`Failed to ${actionName} order`);
        }
      } catch (err) {
        toast.error(`Error: ${err.message}`);
      }
    }
  };

  const handleViewDetails = (order) => {
    viewOrderDetails(order);
    setSelectedOrderDetails(order);
        closeAllActions();
  };

  return (
    <div className="mt-6 font-[poppins]">
      {!selectedOrderDetails ? (
        <>
          {/* Header */}
          <div className="mb-6">
            <p className="flex items-center text-3xl font-semibold text-gray-900/50">
              <Eye
                size={22}
                className="text-gray-900/30 mt-1 animate-bounce"
              />
              <span className="text-gray-900 pl-4">Orders</span>
              &nbsp;Management
            </p>
          </div>

          {/* Filters and Search */}
          <div className="bg-gray-100/50 rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  />
                  <input
                    type="text"
                    placeholder="Search orders by ID, customer, or brand..."
                    className="w-full lg:w-xl pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:w-auto">
                <select
                  className="w-full sm:w-56 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedFilters.paymentStatus}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      paymentStatus: e.target.value,
                    }))
                  }
                >
                  <option value="all">All Payment Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="COD">COD</option>
                  <option value="Refunded">Refunded</option>
                </select>
                <select
                  className="w-full sm:w-56 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedFilters.shippingStatus}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      shippingStatus: e.target.value,
                    }))
                  }
                >
                  <option value="all">All Shipping Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-7 gap-4 font-semibold bg-gray-100 p-4 rounded-t-lg text-center text-gray-700">
            <div>Order</div>
            <div>Customer</div>
            <div>Products</div>
            <div>Amount</div>
            <div>Payment</div>
            <div>Shipping</div>
            <div>Actions</div>
          </div>

          {/* Orders List */}
          <div className="divide-y border rounded-b-lg">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="grid lg:grid-cols-7 gap-4 p-4 items-center hover:bg-gray-50 transition-all"
              >
                {/* Desktop Layout */}
                <div className="hidden lg:block text-center">
                  <div className="font-medium text-gray-900">{order.id}</div>
                  <div className="text-sm text-gray-500">{order.orderDate}</div>
                </div>
                <div className="hidden lg:block text-center">
                  <div className="font-semibold text-gray-600">{order.userName}</div>
                  <div className="text-sm text-gray-500">{order.userEmail}</div>
                </div>
                <div className="hidden lg:block text-center text-gray-600">
                  {order.items.map((item) => item.name).join(", ")}
                </div>
                <div className="hidden lg:block text-center">
                  <div className="font-medium text-gray-900">
                    ${order.totalAmount.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.items.length} item(s)
                  </div>
                </div>
                <div className="hidden lg:block text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      order.paymentStatus,
                      "payment"
                    )}`}
                  >
                    {getStatusIcon(order.paymentStatus, "payment")}
                    <span className="ml-1">{order.paymentStatus}</span>
                  </span>
                </div>
                <div className="hidden lg:block text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      order.shippingStatus,
                      "shipping"
                    )}`}
                  >
                    {getStatusIcon(order.shippingStatus, "shipping")}
                    <span className="ml-1">{order.shippingStatus}</span>
                  </span>
                </div>
                <div className="hidden lg:flex justify-center gap-3 relative">
                  <button
                    onClick={() => toggleActions(order.id)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {expandedActions[order.id] ? (
                      <>
                        <X className="w-4 h-4 mr-2" />
                        Close
                      </>
                    ) : (
                      <>
                        <MoreVertical className="w-4 h-4 mr-2" />
                        Actions
                      </>
                    )}
                  </button>
                  {expandedActions[order.id] && (
                    <div className="absolute right-28 top-3 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                        {order.shippingStatus === "Pending" && (
                          <button
                            onClick={() =>
                              handleAction(
                                updateOrderStatus,
                                order.id,
                                "markShipped"
                              )
                            }
                            className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                          >
                            <Truck className="w-4 h-4 mr-2" />
                            Mark Shipped
                          </button>
                        )}
                        {order.paymentStatus === "Paid" && (
                          <button
                            onClick={() =>
                              handleAction(processRefund, order.id, "refund")
                            }
                            className="w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 flex items-center"
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refund
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden space-y-3 text-sm relative">
                  <div className=" absolute top-0 right-0">
                    <button
                      onClick={() => toggleActions(order.id)}
                      className="p-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      {expandedActions[order.id] ? (
                        <X className="w-5 h-5" />
                      ) : (
                        <MoreVertical className="w-5 h-5" />
                      )}
                    </button>
                    {expandedActions[order.id] && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          <button
                            onClick={() => handleViewDetails(order)}
                            className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </button>
                          {order.shippingStatus === "Pending" && (
                            <button
                              onClick={() =>
                                handleAction(
                                  updateOrderStatus,
                                  order.id,
                                  "markShipped"
                                )
                              }
                              className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                            >
                              <Truck className="w-4 h-4 mr-2" />
                              Mark Shipped
                            </button>
                          )}
                          {order.paymentStatus === "Paid" && (
                            <button
                              onClick={() =>
                                handleAction(processRefund, order.id, "refund")
                              }
                              className="w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 flex items-center"
                            >
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Refund
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Order:</span>{" "}
                    {order.id}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Date:</span>{" "}
                    {order.orderDate}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Customer:</span>{" "}
                    {order.userName} ({order.userEmail})
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Products:</span>{" "}
                    {order.items.map((item) => item.name).join(", ")}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Amount:</span>{" "}
                    ${order.totalAmount.toFixed(2)} ({order.items.length} items)
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Payment:</span>{" "}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(
                        order.paymentStatus,
                        "payment"
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Shipping:</span>{" "}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(
                        order.shippingStatus,
                        "shipping"
                      )}`}
                    >
                      {order.shippingStatus}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => paginate(page)}
                      className={`px-3 py-2 text-sm font-medium border border-gray-300 ${
                        currentPage === page
                          ? "text-white bg-blue-600"
                          : "text-gray-500 bg-white hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      ) : (
        <div className="animate-slide-in-right">
          {/* Back Button */}
          <button
            onClick={() => {
              setSelectedOrderDetails(null);
              setShowOrderModal(false);
            }}
            className="flex gap-2 mb-4 !bg-gray-300 hover:!bg-gray-400 duration-300 text-gray-800 px-4 py-2 !rounded-md"
          >
            <ChevronsLeft />
            Back to Orders
          </button>

          {/* Details View */}
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow p-6 w-full md:w-2/3">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Order Details - {selectedOrderDetails.id}
              </h2>
              <div className="space-y-4 font-[poppins]">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Order Date
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedOrderDetails.orderDate}
                  </p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    Customer Information
                  </h4>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-900">
                      {selectedOrderDetails.userName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedOrderDetails.userEmail}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    Shipping Address
                  </h4>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-900">
                      {selectedOrderDetails.shippingAddress.street}
                    </p>
                    <p className="text-sm text-gray-900">
                      {selectedOrderDetails.shippingAddress.city},{" "}
                      {selectedOrderDetails.shippingAddress.state}{" "}
                      {selectedOrderDetails.shippingAddress.zipCode}
                    </p>
                    <p className="text-sm text-gray-900">
                      {selectedOrderDetails.shippingAddress.country}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    Order Items
                  </h4>
                  <div className="space-y-2">
                    {selectedOrderDetails.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded"
                      >
                        <div className="flex items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    Total Amount
                  </h4>
                  <p className="text-sm font-semibold text-gray-900">
                    ${selectedOrderDetails.totalAmount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    Payment Information
                  </h4>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-900">
                      Status: {selectedOrderDetails.paymentStatus}
                    </p>
                    <p className="text-sm text-gray-600">
                      Method: {selectedOrderDetails.paymentMethod}
                    </p>
                    {selectedOrderDetails.paymentReference && (
                      <p className="text-sm text-gray-600">
                        Ref: {selectedOrderDetails.paymentReference}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    Shipping Information
                  </h4>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-900">
                      Status: {selectedOrderDetails.shippingStatus}
                    </p>
                    {selectedOrderDetails.trackingNumber && (
                      <p className="text-sm text-gray-600">
                        Tracking: {selectedOrderDetails.trackingNumber}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      Est. Delivery: {selectedOrderDetails.estimatedDelivery}
                    </p>
                  </div>
                </div>
                {selectedOrderDetails.notes && (
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-2">
                      Notes
                    </h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      {selectedOrderDetails.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagementBrand;