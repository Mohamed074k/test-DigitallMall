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
import { useBrandProducts } from "../../../context/brandContext/BrandProductsContext";
import AddProductModal from "../../../components/BRANDS_ADMIN_COMPONENTS/productManageCompnents/AddProductModal";
import EditProductModal from "../../../components/BRANDS_ADMIN_COMPONENTS/productManageCompnents/EditProductModal";

const ProductsManageBrand = () => {
  const {
    products,
    loading,
    error,
    currentProducts,
    currentPage,
    totalPages,
    paginate,
    filterProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useBrandProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    category: "all",
    stockStatus: "all",
    status: "all",
  });
  const [filteredProducts, setFilteredProducts] = useState(currentProducts);
  const [expandedActions, setExpandedActions] = useState({});
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [showAddModal, showEditModal, selectedProductDetails]);

  // Filter products based on search and filters
  useEffect(() => {
    const filtered = filterProducts({
      searchTerm,
      category: selectedFilters.category,
      stockStatus: selectedFilters.stockStatus,
      status: selectedFilters.status,
     });
    setFilteredProducts(
      filtered?.slice((currentPage - 1) * 10, currentPage * 10)
    );
  }, [products, searchTerm, selectedFilters, currentPage, filterProducts]);

  const toggleActions = (productId) => {
    setExpandedActions((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  

  const handleAction = async (action, productId, productData, actionName) => {
    const actionMessages = {
      edit: {
        title: "Edit Product",
        text: "Are you sure you want to edit this product?",
        confirmButtonText: "Yes, Edit",
        successMessage: "Product updated successfully!",
      },
      delete: {
        title: "Delete Product",
        text: "Are you sure you want to delete this product? This action cannot be undone.",
        confirmButtonText: "Yes, Delete",
        successMessage: "Product deleted successfully!",
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
            success = await action(productId, productData);
            break;
          case "delete":
            success = await action(productId);
            break;
          default:
            return;
        }
        if (success) {
          toast.success(successMessage);
          setExpandedActions((prev) => ({ ...prev, [productId]: false }));
          if (actionName === "edit" || actionName === "delete") {
            setEditProduct(null);
            setShowEditModal(false);
          }
        } else {
          toast.error(`Failed to ${actionName} product`);
        }
      } catch (err) {
        toast.error(`Error: ${err.message}`);
      }
    }
  };

  const handleViewDetails = (product) => {
    setSelectedProductDetails(product);
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const success = await addProduct(newProduct);
      if (success) {
        toast.success("Product added successfully!");
        setShowAddModal(false);
      } else {
        toast.error("Failed to add product");
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
      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddProduct}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditProduct(null);
        }}
        onSave={(product) =>
          handleAction(updateProduct, product.id, product, "edit")
        }
        productData={editProduct}
      />

      {selectedProductDetails ? (
        <div className="animate-slide-in-right">
          {/* Back Button */}
          <button
            onClick={() => {
              setSelectedProductDetails(null);
              setShowAddModal(false);
              setShowEditModal(false);
            }}
            className="flex gap-2 mb-4 !bg-gray-300 hover:!bg-gray-400 duration-300 text-gray-800 px-4 py-2 !rounded-md"
          >
            <ChevronsLeft />
            Back to Products
          </button>

          {/* Product Details */}
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow p-6 w-full md:w-2/3">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Product Details - {selectedProductDetails.name}
              </h2>
              <div className="space-y-4 font-[poppins]">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Image
                  </label>
                  <img
                    src={selectedProductDetails.image}
                    alt={selectedProductDetails.name}
                    className="h-32 w-32 object-contain rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedProductDetails.name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <p className="text-sm text-gray-900">
                    ${parseFloat(selectedProductDetails.price).toFixed(2)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stock
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedProductDetails.stock > 0
                      ? `${selectedProductDetails.stock} In Stock`
                      : "Out of Stock"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedProductDetails.category}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      selectedProductDetails.status
                    )}`}
                  >
                    {selectedProductDetails.status}
                  </span>
                </div>
                {selectedProductDetails.description && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      {selectedProductDetails.description}
                    </p>
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setEditProduct(selectedProductDetails);
                      setShowEditModal(true);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-black border border-transparent !rounded-md"
                  >
                    Edit Product
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
              &nbsp;Products
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-4 py-2 bg-black text-white !rounded-md sm:w-auto w-full"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add New Product
            </button>
          </div>

          {/* Filters and Search */}
          <div className="bg-gray-100/50 rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products by name..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer shadow-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <select
                  className="w-full sm:w-56 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer shadow-md"
                  value={selectedFilters.category}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                >
                  <option value="all">All Categories</option>
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Hoodies">Hoodies</option>
                  <option value="Caps">Caps</option>
                  <option value="Mugs">Mugs</option>
                </select>
                <select
                  className="w-full sm:w-56 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer shadow-md"
                  value={selectedFilters.stockStatus}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      stockStatus: e.target.value,
                    }))
                  }
                >
                  <option value="all">All Stock Status</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
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
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-6 gap-4 font-semibold bg-gray-100 p-4 rounded-t-lg text-center text-gray-700">
            <div>Image</div>
            <div>Name</div>
            <div>Price</div>
            <div>Stock</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {/* Products List */}
          <div className="divide-y border rounded-b-lg">
            {filteredProducts?.map((product) => (
              <div
                key={product.id}
                className="grid lg:grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50 transition-all"
              >
                {/* Desktop Layout */}
                <div className="hidden lg:block text-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-16 object-contain mx-auto rounded"
                  />
                </div>
                <div className="hidden lg:block text-center font-medium text-gray-900">
                  {product.name}
                </div>
                <div className="hidden lg:block text-center text-gray-600">
                  ${parseFloat(product.price).toFixed(2)}
                </div>
                <div className="hidden lg:block text-center text-gray-600">
                  {product.stock > 0
                    ? `${product.stock} In Stock`
                    : "Out of Stock"}
                </div>
                <div className="hidden lg:block text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      product.status
                    )}`}
                  >
                    {product.status}
                  </span>
                </div>
                <div className="hidden lg:flex justify-center gap-3 relative">
                  <button
                    onClick={() => toggleActions(product.id)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {expandedActions[product.id] ? (
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
                  {expandedActions[product.id] && (
                    <div className="absolute right-28 top-3 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        <button
                          onClick={() => handleViewDetails(product)}
                          className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            setEditProduct(product);
                            setShowEditModal(true);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleAction(
                              deleteProduct,
                              product.id,
                              null,
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
                      onClick={() => toggleActions(product.id)}
                      className="p-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      {expandedActions[product.id] ? (
                        <X className="w-5 h-5" />
                      ) : (
                        <MoreVertical className="w-5 h-5" />
                      )}
                    </button>
                    {expandedActions[product.id] && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          <button
                            onClick={() => handleViewDetails(product)}
                            className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </button>
                          <button
                            onClick={() => {
                              setEditProduct(product);
                              setShowEditModal(true);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleAction(
                                deleteProduct,
                                product.id,
                                null,
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
                  <div className="flex justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 object-contain rounded"
                    />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Name:</span>{" "}
                    {product.name}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Price:</span>{" "}
                    ${parseFloat(product.price).toFixed(2)}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Stock:</span>{" "}
                    {product.stock > 0
                      ? `${product.stock} In Stock`
                      : "Out of Stock"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Status:</span>{" "}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(
                        product.status
                      )}`}
                    >
                      {product.status}
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
                {Array.from({ length: totalPages }, (_, i) => i + 1)?.map(
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

export default ProductsManageBrand;
