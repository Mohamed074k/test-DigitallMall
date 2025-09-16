import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  X,
  ChevronsLeft,
  PlusCircle,
} from "lucide-react";
import { useBrandReels } from "../../../context/brandContext/BrandReelsContext";
import AddReelModal from "../../../components/BRANDS_ADMIN_COMPONENTS/reelManageComponents/AddReelModal";
import EditReelModal from "../../../components/BRANDS_ADMIN_COMPONENTS/reelManageComponents/EditReelModal";

const ReelsManagementBrand = () => {
  const {
    reels,
    loading,
    error,
    currentReels,
    currentPage,
    totalPages,
    paginate,
    filterReels,
    addReel,
    updateReel,
    deleteReel,
  } = useBrandReels();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    status: "all",
  });
  const [filteredReels, setFilteredReels] = useState(currentReels);
  const [expandedActions, setExpandedActions] = useState({});
  const [selectedReelDetails, setSelectedReelDetails] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editReel, setEditReel] = useState(null);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [showAddModal, showEditModal, selectedReelDetails]);

  // Filter reels based on search and filters
  useEffect(() => {
    const filtered = filterReels({
      searchTerm,
      status: selectedFilters.status,
    });
    setFilteredReels(filtered.slice((currentPage - 1) * 10, currentPage * 10));
  }, [reels, searchTerm, selectedFilters, currentPage, filterReels]);

  const toggleActions = (reelId) => {
    setExpandedActions((prev) => {
      // Close all other menus when opening a new one
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      
      return {
        ...newState,
        [reelId]: !prev[reelId],
      };
    });
  };

  const closeAllActions = () => {
    setExpandedActions({});
  };

  const handleAction = async (action, reelId, reelData, actionName) => {
    const actionMessages = {
      edit: {
        title: "Edit Reel",
        text: "Are you sure you want to edit this reel?",
        confirmButtonText: "Yes, Edit",
        successMessage: "Reel updated successfully!",
      },
      delete: {
        title: "Delete Reel",
        text: "Are you sure you want to delete this reel? This action cannot be undone.",
        confirmButtonText: "Yes, Delete",
        successMessage: "Reel deleted successfully!",
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
          case "edit":
            success = await action(reelId, reelData);
            break;
          case "delete":
            success = await action(reelId);
            break;
          default:
            return;
        }
        if (success) {
          toast.success(successMessage);
          closeAllActions();
          if (actionName === "edit" || actionName === "delete") {
            setEditReel(null);
            setShowEditModal(false);
          }
        } else {
          toast.error(`Failed to ${actionName} reel`);
        }
      } catch (err) {
        toast.error(`Error: ${err.message}`);
      }
    }
  };

  const handleViewDetails = (reel) => {
    setSelectedReelDetails(reel);
    setShowAddModal(false);
    setShowEditModal(false);
    closeAllActions();
  };

  const handleAddReel = async (newReel) => {
    try {
      const success = await addReel(newReel);
      if (success) {
        toast.success("Reel added successfully!");
        setShowAddModal(false);
      } else {
        toast.error("Failed to add reel");
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "text-green-600 bg-green-100";
      case "Inactive":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;

  return (
    <div className="mt-6 font-[poppins]">
      {/* Add Reel Modal */}
      <AddReelModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddReel}
      />

      {/* Edit Reel Modal */}
      <EditReelModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditReel(null);
          closeAllActions();
        }}
        onSave={(reel) => handleAction(updateReel, reel.id, reel, "edit")}
        reelData={editReel}
      />

      {selectedReelDetails ? (
        <div className="animate-slide-in-right">
          {/* Back Button */}
          <button
            onClick={() => {
              setSelectedReelDetails(null);
              setShowAddModal(false);
              setShowEditModal(false);
              closeAllActions();
            }}
            className="flex gap-2 mb-4 !bg-gray-300 hover:!bg-gray-400 duration-300 text-gray-800 px-4 py-2 !rounded-md"
          >
            <ChevronsLeft />
            Back to Reels
          </button>

          {/* Reel Details */}
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow p-6 w-full md:w-2/3">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Reel Details -{" "}
                {selectedReelDetails.description.substring(0, 20)}...
              </h2>
              <div className="space-y-4 font-[poppins]">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Thumbnail
                  </label>
                  <img
                    src={selectedReelDetails.thumbnail}
                    alt="Reel thumbnail"
                    className="h-32 w-32 object-contain mx-auto mb-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Video
                  </label>
                  <video
                    src={selectedReelDetails.videoUrl}
                    controls
                    className="w-1/2 max-h-96 object-contain"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedReelDetails.description}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Hashtags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedReelDetails.hashtags.map((tag, index) => (
                      <span key={index} className="text-sm text-blue-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Linked Products
                  </label>
                  <ul className="list-disc pl-5">
                    {selectedReelDetails.linkedProducts.map((prod, index) => (
                      <li key={index} className="text-sm text-gray-900">
                        {prod}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      selectedReelDetails.status
                    )}`}
                  >
                    {selectedReelDetails.status}
                  </span>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    Analytics
                  </h4>
                  <div className="bg-gray-50 p-3 rounded space-y-1">
                    <p className="text-sm text-gray-900">
                      Views: {selectedReelDetails.analytics.views}
                    </p>
                    <p className="text-sm text-gray-900">
                      Likes: {selectedReelDetails.analytics.likes}
                    </p>
                    <p className="text-sm text-gray-900">
                      Shares: {selectedReelDetails.analytics.shares}
                    </p>
                    <p className="text-sm text-gray-900">
                      Purchases: {selectedReelDetails.analytics.purchases}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setEditReel(selectedReelDetails);
                      setShowEditModal(true);
                      closeAllActions();
                    }}
                    className="px-4 py-2 text-sm font-medium bg-black text-white border-transparent  !rounded-md"
                  >
                    Edit Reel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="flex items-center text-xl lg:text-3xl font-semibold text-gray-900/50">
              <Eye size={22} className="text-gray-900/30 mt-1 animate-bounce" />
              <span className="text-gray-900 pl-4">My</span>
              &nbsp;Reels
            </p>
            <button
              onClick={() => {
                setShowAddModal(true);
                closeAllActions();
              }}
              className="flex items-center px-4 py-2 bg-black text-white !rounded-md sm:w-auto w-full"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add New Reel
            </button>
          </div>

          {/* Filters and Search */}
          <div className="bg-gray-100/50 rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search reels by description or hashtags..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 md:flex-none md:w-56">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer shadow-md"
                  value={selectedFilters.status}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-5 gap-4 font-semibold bg-gray-100 p-4 rounded-t-lg text-center text-gray-700">
            <div>Description</div>
            <div>Products</div>
            <div>Views</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {/* Reels List */}
          <div className="divide-y border rounded-b-lg">
            {filteredReels.map((reel) => (
              <div
                key={reel.id}
                className="grid lg:grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50 transition-all"
              >
                {/* Desktop Layout */}

                <div className="hidden lg:block text-center font-medium text-gray-500/90 text-sm">
                  {reel.description}
                </div>
                <div className="hidden lg:block text-center text-gray-600">
                  {reel.linkedProducts.length} products
                </div>
                <div className="hidden lg:block text-center text-gray-600">
                  {reel.analytics.views}
                </div>
                <div className="hidden lg:block text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      reel.status
                    )}`}
                  >
                    {reel.status}
                  </span>
                </div>
                <div className="hidden lg:flex justify-center gap-3 relative">
                  <button
                    onClick={() => toggleActions(reel.id)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {expandedActions[reel.id] ? (
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
                  {expandedActions[reel.id] && (
                    <div className="absolute right-28 top-3 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        <button
                          onClick={() => handleViewDetails(reel)}
                          className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            setEditReel({
                              ...reel,
                              linkedProducts: reel.linkedProducts || [],
                            });
                            setShowEditModal(true);
                            closeAllActions();
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleAction(deleteReel, reel.id, null, "delete")
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
                <div className="lg:hidden flex items-start space-x-4 text-sm relative">
                  <div className="flex-1 space-y-4">
                    <div>
                      <span className="font-semibold text-gray-600">
                        Description:
                      </span>{" "}
                      <span className="block max-w-[70%] break-words">
                        {reel.description}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-600">
                        Products:
                      </span>{" "}
                      {reel.linkedProducts.length}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-600">
                        Views:
                      </span>{" "}
                      {reel.analytics.views}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-600">
                        Status:
                      </span>{" "}
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(
                          reel.status
                        )}`}
                      >
                        {reel.status}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0">
                    <button
                      onClick={() => toggleActions(reel.id)}
                      className="p-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      {expandedActions[reel.id] ? (
                        <X className="w-5 h-5" />
                      ) : (
                        <MoreVertical className="w-5 h-5" />
                      )}
                    </button>
                    {expandedActions[reel.id] && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          <button
                            onClick={() => handleViewDetails(reel)}
                            className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </button>
                          <button
                            onClick={() => {
                              setEditReel(reel);
                              setShowEditModal(true);
                              closeAllActions();
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleAction(deleteReel, reel.id, null, "delete")
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
      )}
    </div>
  );
};

export default ReelsManagementBrand;