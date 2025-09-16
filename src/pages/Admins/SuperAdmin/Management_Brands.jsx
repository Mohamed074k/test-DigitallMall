import React, { useState, useContext, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { BrandContext } from "../../../context/superAdminContext/BrandContext";
import Swal from "sweetalert2";
import BrandList from "../../../components/SUPER_ADMIN_COMPONENTS/BrandsComponents/BrandList";
import BrandDetailsModal from "../../../components/SUPER_ADMIN_COMPONENTS/BrandsComponents/BrandDetailsModal";
import EditCommissionModal from "../../../components/SUPER_ADMIN_COMPONENTS/BrandsComponents/EditCommissionModal";
import StatsCards from "../../../components/SUPER_ADMIN_COMPONENTS/DiscountsComponents/StatsCards";

const Management_Brands = () => {
  const {
    brands,
    loading,
    error,
    approveBrand,
    rejectBrand,
    suspendBrand,
    unsuspendBrand,
    deleteBrand,
    editCommission,
  } = useContext(BrandContext);

  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);

  const stats = useMemo(() => {
    const total = brands.length;
    const active = brands.filter((b) => b.status === "Active").length;
    const pending = brands.filter((b) => b.status === "Pending").length;
    const suspended = brands.filter((b) => b.status === "Suspended").length;
    return { total, active, pending, suspended };
  }, [brands]);

  const filteredBrands = brands
    .filter((brand) => filter === "All" || brand.status === filter)
    .filter(
      (brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.info?.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleAction = async (action, brand, ...args) => {
    const result = await Swal.fire({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Brand?`,
      text: `Are you sure you want to ${action} ${brand.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
    });

    if (result.isConfirmed) {
      try {
        switch (action) {
          case "approve":
            await approveBrand(brand.id);
            break;
          case "reject":
            await rejectBrand(brand.id);
            break;
          case "suspend":
            await suspendBrand(brand.id);
            break;
          case "unsuspend":
            await unsuspendBrand(brand.id);
            break;
          case "delete":
            await deleteBrand(brand.id);
            break;
          default:
            break;
        }
        Swal.fire("Success!", `Brand has been ${action}ed.`, "success");
      } catch (error) {
        Swal.fire("Error!", `Failed to ${action} brand.`, "error");
      }
    }
  };

  const handleSaveCommission = (brandId, commission) => {
    editCommission(brandId, commission);
    setEditingBrand(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        <StatsCards title="Total Brands" stats={stats.total} />
        <StatsCards title="Active Brands" stats={stats.active} />
        <StatsCards title="Pending Brands" stats={stats.pending} />
        <StatsCards title="Suspended Brands" stats={stats.suspended} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search brands by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full lg:w-2xl pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="lg:w-48">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <BrandList
        brands={filteredBrands}
        handleApproveBrand={(brand) => handleAction("approve", brand)}
        handleRejectBrand={(brand) => handleAction("reject", brand)}
        handleSuspendBrand={(brand) => handleAction("suspend", brand)}
        handleUnsuspendBrand={(brand) => handleAction("unsuspend", brand)}
        handleDeleteBrand={(brand) => handleAction("delete", brand)}
        handleEditCommission={setEditingBrand}
        handleViewDetails={setSelectedBrand}
      />

      <BrandDetailsModal brand={selectedBrand} onClose={() => setSelectedBrand(null)} />
      <EditCommissionModal
        brand={editingBrand}
        onSave={handleSaveCommission}
        onClose={() => setEditingBrand(null)}
      />
    </div>
  );
};

export default Management_Brands;