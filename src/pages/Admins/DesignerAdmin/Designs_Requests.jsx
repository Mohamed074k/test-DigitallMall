import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  Search,
  Eye,
  MoreVertical,
  X,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Check,
  Trash2,
  ChevronsLeft,
} from "lucide-react";
import { useDesignRequests } from "../../../context/designerContext/DesignRequestContext";

const Designs_Requests = () => {
  const {
    designRequests,
    loading,
    error,
    filterRequests,
    viewRequestDetails,
    setShowRequestModal,
    showRequestModal,
    selectedRequest,
    approveRequest,
    rejectRequest,
    completeRequest,
    deleteRequest,
  } = useDesignRequests();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({ status: "all" });
  const [expandedActions, setExpandedActions] = useState({});
  const [selectedRequestDetails, setSelectedRequestDetails] = useState(null);

    // Scroll to top when view changes
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [selectedRequestDetails]);

  const filteredRequests = filterRequests({
    searchTerm,
    status: selectedFilters.status,
  });

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


  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-100";
      case "In Progress":
        return "text-blue-600 bg-blue-100";
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      case "Rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4" />;
      case "In Progress":
        return <Clock className="w-4 h-4" />;
      case "Pending":
        return <Clock className="w-4 h-4" />;
      case "Rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleAction = async (action, requestId, actionName) => {
    const actionMessages = {
      approve: {
        title: "Approve Request",
        text: "Are you sure you want to approve this design request?",
        confirmButtonText: "Yes, Approve",
        successMessage: "Design request approved!",
      },
      reject: {
        title: "Reject Request",
        text: "Are you sure you want to reject this design request?",
        confirmButtonText: "Yes, Reject",
        successMessage: "Design request rejected!",
      },
      complete: {
        title: "Complete Request",
        text: "Are you sure you want to mark this design request as completed?",
        confirmButtonText: "Yes, Complete",
        successMessage: "Design request completed!",
      },
      delete: {
        title: "Delete Request",
        text: "Are you sure you want to delete this design request? This action cannot be undone.",
        confirmButtonText: "Yes, Delete",
        successMessage: "Design request deleted!",
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
          case "approve":
            success = await approveRequest(requestId);
            break;
          case "reject":
            success = await rejectRequest(requestId);
            break;
          case "complete":
            success = await completeRequest(requestId);
            break;
          case "delete":
            success = await deleteRequest(requestId);
            break;
          default:
            return;
        }
        if (success) {
          toast.success(successMessage);
          closeAllActions();
        } else {
          toast.error(`Failed to ${actionName} request`);
        }
      } catch (err) {
        toast.error(`Error: ${err.message}`);
      }
    }
  };

  const handleViewDetails = (request) => {
    viewRequestDetails(request);
    setSelectedRequestDetails(request);
    closeAllActions();
  };

  return (
    <div className="mt-6 font-[poppins]">
      {!selectedRequestDetails ? (
        <>
          {/* Header */}

          <div className="mb-6">
            <p className="flex items-center text-3xl font-semibold text-gray-900/50">
              <Eye size={22} className="text-gray-900/30 mt-1 animate-bounce" />
              <span className="text-gray-900 pl-4">Designs</span>
              &nbsp;Requests
            </p>
          </div>

          {/* Filters and Search */}
          <div className="bg-gray-100/50 rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search requests by ID or customer..."
                    className="w-full lg:w-xl pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex flex-col sm:flex-row gap-4 sm:w-auto">
                <select
                  className="w-full sm:w-56 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedFilters.status}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                >
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-5 gap-4 font-semibold bg-gray-100 p-4 rounded-t-lg text-center text-gray-700">
            <div>Request ID</div>
            <div>Customer</div>
            <div>Request Date</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {/* Requests List */}
          <div className="divide-y border rounded-b-lg">
            {filteredRequests.map((request) => (
              <div
                key={request.requestId}
                className="grid lg:grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50 transition-all"
              >
                {/* Desktop Layout */}
                <div className="hidden lg:block text-center font-medium">
                  {request.requestId}
                </div>
                <div className="hidden lg:block text-center">
                  <div className="font-semibold text-gray-600">
                    {request.customerName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {request.customerEmail}
                  </div>
                </div>
                <div className="hidden lg:block text-center text-gray-600">
                  {request.requestDate}
                </div>

                <div className="hidden lg:block text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {getStatusIcon(request.status)}
                    <span className="ml-1">{request.status}</span>
                  </span>
                </div>
                <div className="hidden lg:flex justify-center gap-3 relative">
                  <button
                    onClick={() => toggleActions(request.requestId)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {expandedActions[request.requestId] ? (
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
                  {expandedActions[request.requestId] && (
                    <div className="absolute right-28 top-3 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        <button
                          onClick={() => handleViewDetails(request)}
                          className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                        {request.status === "Pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleAction(
                                  approveRequest,
                                  request.requestId,
                                  "approve"
                                )
                              }
                              className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleAction(
                                  rejectRequest,
                                  request.requestId,
                                  "reject"
                                )
                              }
                              className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </button>
                          </>
                        )}
                        {request.status === "In Progress" && (
                          <button
                            onClick={() =>
                              handleAction(
                                completeRequest,
                                request.requestId,
                                "complete"
                              )
                            }
                            className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Complete
                          </button>
                        )}
                        <button
                          onClick={() =>
                            handleAction(
                              deleteRequest,
                              request.requestId,
                              "delete"
                            )
                          }
                          className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden space-y-3 text-sm relative">
                  <div className="sm:hidden absolute top-0 right-0">
                    <button
                      onClick={() => toggleActions(request.requestId)}
                      className="p-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      {expandedActions[request.requestId] ? (
                        <X className="w-5 h-5" />
                      ) : (
                        <MoreVertical className="w-5 h-5" />
                      )}
                    </button>
                    {expandedActions[request.requestId] && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          <button
                            onClick={() => handleViewDetails(request)}
                            className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </button>
                          {request.status === "Pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleAction(
                                    approveRequest,
                                    request.requestId,
                                    "approve"
                                  )
                                }
                                className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                              >
                                <Check className="w-4 h-4 mr-2" />
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleAction(
                                    rejectRequest,
                                    request.requestId,
                                    "reject"
                                  )
                                }
                                className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </button>
                            </>
                          )}
                          {request.status === "In Progress" && (
                            <button
                              onClick={() =>
                                handleAction(
                                  completeRequest,
                                  request.requestId,
                                  "complete"
                                )
                              }
                              className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Complete
                            </button>
                          )}
                          <button
                            onClick={() =>
                              handleAction(
                                deleteRequest,
                                request.requestId,
                                "delete"
                              )
                            }
                            className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      Request:
                    </span>{" "}
                    {request.requestId}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      Customer:
                    </span>{" "}
                    {request.customerName} ({request.customerEmail})
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Date:</span>{" "}
                    {request.requestDate}
                  </div>

                  <div>
                    <span className="font-semibold text-gray-600">Status:</span>{" "}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="animate-slide-in-right">
          {/* Back Button */}
          <button
            onClick={() => {
              setSelectedRequestDetails(null);
              setShowRequestModal(false);
              closeAllActions();
            }}
            className="flex gap-2 mb-4 !bg-gray-300 hover:!bg-gray-400 duration-300 text-gray-800 px-4 py-2 !rounded-md"
          >
            <ChevronsLeft />
            Back to Requests
          </button>

          {/* Details View */}
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow p-6 w-full md:w-2/3 ">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Design Request Details - {selectedRequestDetails.requestId}
              </h2>
              <div className="space-y-4 font-[poppins]">
                {/* Request Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Request Date
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedRequestDetails.requestDate}
                  </p>
                </div>
                {/* Customer Info */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    Customer Information
                  </h4>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-900">
                      {selectedRequestDetails.customerName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedRequestDetails.customerEmail}
                    </p>
                  </div>
                </div>
                {/* T-Shirt Details */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    T-Shirt Details
                  </h4>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-900">
                      Color: {selectedRequestDetails.designDetails.color}
                    </p>
                    <p className="text-sm text-gray-900">
                      Style: {selectedRequestDetails.designDetails.style}
                    </p>
                    <p className="text-sm text-gray-900">
                      Size: {selectedRequestDetails.designDetails.size}
                    </p>
                  </div>
                </div>
                {/* Uploaded Image */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    Uploaded Image
                  </h4>
                  <img
                    src={selectedRequestDetails.designDetails.uploadedImage}
                    alt="Design"
                    className="w-full h-48 object-contain rounded"
                  />
                </div>
                {/* Customer Notes */}
                {selectedRequestDetails.designDetails.customerNotes && (
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-2">
                      Customer Notes
                    </h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      {selectedRequestDetails.designDetails.customerNotes}
                    </p>
                  </div>
                )}
                {/* Status */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    Status
                  </h4>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      selectedRequestDetails.status
                    )}`}
                  >
                    {getStatusIcon(selectedRequestDetails.status)}
                    <span className="ml-1">
                      {selectedRequestDetails.status}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Designs_Requests;
