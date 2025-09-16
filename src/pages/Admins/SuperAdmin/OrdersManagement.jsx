import React, { useState, useEffect } from "react";
import { mockOrders } from "../../../data/mockOrders";
import {
  Search,
  Eye,
  Edit3,
  RefreshCw,
  DollarSign,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MoreVertical,
  X,
  ChevronsLeft,
} from "lucide-react";

const OrdersManagement = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    paymentStatus: "all",
    shippingStatus: "all",
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [expandedActions, setExpandedActions] = useState({});
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Filter orders based on search and filters
  useEffect(() => {
    let filtered = orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.brandName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPaymentFilter =
        selectedFilters.paymentStatus === "all" ||
        order.paymentStatus === selectedFilters.paymentStatus;

      const matchesShippingFilter =
        selectedFilters.shippingStatus === "all" ||
        order.shippingStatus === selectedFilters.shippingStatus;

      return matchesSearch && matchesPaymentFilter && matchesShippingFilter;
    });

    setFilteredOrders(filtered);
  }, [orders, searchTerm, selectedFilters]);

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

  const handleStatusUpdate = (orderId, newStatus, type) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, [type]: newStatus } : order
      )
    );
    setShowStatusModal(false);
    setEditingOrder(null);
    closeAllActions();
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
        default:
          return "text-gray-600 bg-gray-100";
      }
    } else {
      switch (status) {
        case "Delivered":
          return "text-green-600 bg-green-100";
        case "Shipped":
          return "text-blue-600 bg-blue-100";
        case "Processing":
          return "text-yellow-600 bg-yellow-100";
        case "Pending":
          return "text-orange-600 bg-orange-100";
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
        default:
          return <AlertCircle className="w-4 h-4" />;
      }
    } else {
      switch (status) {
        case "Delivered":
          return <CheckCircle className="w-4 h-4" />;
        case "Shipped":
          return <Truck className="w-4 h-4" />;
        case "Processing":
          return <Clock className="w-4 h-4" />;
        case "Pending":
          return <Clock className="w-4 h-4" />;
        case "Cancelled":
          return <XCircle className="w-4 h-4" />;
        default:
          return <AlertCircle className="w-4 h-4" />;
      }
    }
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
    closeAllActions();
  };

  const openStatusUpdate = (order) => {
    setEditingOrder(order);
    setShowStatusModal(true);
    closeAllActions();
  };

  const handleViewDetails = (order) => {
    setSelectedOrderDetails(order);
    closeAllActions();
  };

  return (
    <div className="p-0 sm:p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-none">
        {!selectedOrderDetails ? (
          <>
            {/* Filters and Search */}
            <div className="bg-gray-100/50 rounded-lg shadow p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search orders by ID, customer, or brand..."
                      className=" w-full lg:w-xl pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Filters */}
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
                    <option value="Delivered">Delivered</option>
                    <option value= "Shipped">Shipped</option>
                    <option value="Processing">Processing</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow font-[poppins]">
              {/* ✅ Desktop Table */}
              <div className="hidden lg:block ">
                <table className="min-w-full divide-y ">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Order",
                        "Customer",
                        "Brand",
                        "Amount",
                        "Payment",
                        "Shipping",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        {/* Order */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {order.id}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.orderDate}
                            </div>
                          </div>
                        </td>

                        {/* Customer */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {order.userName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.userEmail}
                            </div>
                          </div>
                        </td>

                        {/* Brand */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.brandName}
                        </td>

                        {/* Amount */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${order.totalAmount.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.items.length} item(s)
                          </div>
                        </td>

                        {/* Payment */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              order.paymentStatus,
                              "payment"
                            )}`}
                          >
                            {getStatusIcon(order.paymentStatus, "payment")}
                            <span className="ml-1">{order.paymentStatus}</span>
                          </span>
                        </td>

                        {/* Shipping */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              order.shippingStatus,
                              "shipping"
                            )}`}
                          >
                            {getStatusIcon(order.shippingStatus, "shipping")}
                            <span className="ml-1">{order.shippingStatus}</span>
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="relative">
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
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                <div className="py-1">
                                  <button
                                    onClick={() => handleViewDetails(order)}
                                    className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </button>
                                  <button
                                    onClick={() => openStatusUpdate(order)}
                                    className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                                  >
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Update Status
                                  </button>
                                  {order.paymentStatus === "Paid" && (
                                    <button 
                                      onClick={closeAllActions}
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ✅ Mobile Cards */}
              <div className="lg:hidden divide-y font-[poppins]">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="p-4 space-y-4 relative">
                    {/* Mobile Actions Button */}
                    <div className="sm:hidden absolute top-4 right-2">
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
                            <button
                              onClick={() => openStatusUpdate(order)}
                              className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                            >
                              <Edit3 className="w-4 h-4 mr-2" />
                              Update Status
                            </button>
                            {order.paymentStatus === "Paid" && (
                              <button 
                                onClick={closeAllActions}
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

                    {/* باقي بيانات الكارد */}
                    <div>
                      <p className="font-medium text-gray-900">
                        Order: {order.id}
                      </p>
                      <p className="text-sm text-gray-500">
                        Date: {order.orderDate}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-600">
                        Customer:{" "}
                      </span>
                      {order.userName} ({order.userEmail})
                    </div>
                    <div>
                      <span className="font-semibold text-gray-600">Brand: </span>
                      {order.brandName}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-600">Amount: </span>$
                      {order.totalAmount.toFixed(2)} ({order.items.length} items)
                    </div>
                    <div>
                      <span className="font-semibold text-gray-600">Payment: </span>
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
                      <span className="font-semibold text-gray-600">
                        Shipping:{" "}
                      </span>
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
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="animate-slide-in-right">
            {/* Back Button */}
            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="flex gap-2 mb-4 !bg-gray-300 hover:!bg-gray-400 duration-300 text-gray-800 px-4 py-2 !rounded-md"
            >
              <ChevronsLeft />
              Back to Orders
            </button>

            {/* Details View */}
            <div className="bg-white rounded-lg shadow p-6">
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
        )}

        {/* Modals wrapped in a fragment */}
        <>
          {/* Order Details Modal */}
          {showOrderModal && selectedOrder && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-10 lg:top-20 mx-auto p-4 lg:p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Order Details - {selectedOrder.id}
                    </h3>
                    <button
                      onClick={() => setShowOrderModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Order Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Order Date
                        </label>
                        <p className="text-sm text-gray-900">
                          {selectedOrder.orderDate}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Total Amount
                        </label>
                        <p className="text-sm font-semibold text-gray-900">
                          ${selectedOrder.totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-2">
                        Customer Information
                      </h4>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm text-gray-900">
                          {selectedOrder.userName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedOrder.userEmail}
                        </p>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-2">
                        Shipping Address
                      </h4>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm text-gray-900">
                          {selectedOrder.shippingAddress.street}
                        </p>
                        <p className="text-sm text-gray-900">
                          {selectedOrder.shippingAddress.city},{" "}
                          {selectedOrder.shippingAddress.state}{" "}
                          {selectedOrder.shippingAddress.zipCode}
                        </p>
                        <p className="text-sm text-gray-900">
                          {selectedOrder.shippingAddress.country}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-2">
                        Order Items
                      </h4>
                      <div className="space-y-2">
                        {selectedOrder.items.map((item) => (
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

                    {/* Payment & Shipping Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-2">
                          Payment Information
                        </h4>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm text-gray-900">
                            Status: {selectedOrder.paymentStatus}
                          </p>
                          <p className="text-sm text-gray-600">
                            Method: {selectedOrder.paymentMethod}
                          </p>
                          {selectedOrder.paymentReference && (
                            <p className="text-sm text-gray-600">
                              Ref: {selectedOrder.paymentReference}
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
                            Status: {selectedOrder.shippingStatus}
                          </p>
                          {selectedOrder.trackingNumber && (
                            <p className="text-sm text-gray-600">
                              Tracking: {selectedOrder.trackingNumber}
                            </p>
                          )}
                          <p className="text-sm text-gray-600">
                            Est. Delivery: {selectedOrder.estimatedDelivery}
                          </p>
                        </div>
                      </div>
                    </div>

                    {selectedOrder.notes && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-2">
                          Notes
                        </h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                          {selectedOrder.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Status Update Modal */}
          {showStatusModal && editingOrder && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-10 lg:top-20 mx-auto p-4 lg:p-5 border w-11/12 sm:w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Update Order Status
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Status
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={editingOrder.paymentStatus}
                        onChange={(e) =>
                          setEditingOrder((prev) => ({
                            ...prev,
                            paymentStatus: e.target.value,
                          }))
                        }
                      >
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="COD">COD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shipping Status
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={editingOrder.shippingStatus}
                        onChange={(e) =>
                          setEditingOrder((prev) => ({
                            ...prev,
                            shippingStatus: e.target.value,
                          }))
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={() => setShowStatusModal(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            editingOrder.id,
                            editingOrder.paymentStatus,
                            "paymentStatus"
                          )
                        }
                        className="px-4 py-2  text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                      >
                        Update Payment
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            editingOrder.id,
                            editingOrder.shippingStatus,
                            "shippingStatus"
                          )
                        }
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
                      >
                        Update Shipping
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default OrdersManagement;