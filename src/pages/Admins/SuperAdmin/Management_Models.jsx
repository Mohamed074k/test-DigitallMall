import React, { useState, useContext, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { ModelContext } from "../../../context/superAdminContext/ModelContext";
import Swal from "sweetalert2";
import ModelList from "../../../components/SUPER_ADMIN_COMPONENTS/ModelsComponents/ModelList";
import ModelDetailsModal from "../../../components/SUPER_ADMIN_COMPONENTS/ModelsComponents/ModelDetailsModal";
import EditCommissionModal from "../../../components/SUPER_ADMIN_COMPONENTS/ModelsComponents/EditCommissionModal";
import StatsCards from "../../../components/SUPER_ADMIN_COMPONENTS/DiscountsComponents/StatsCards";

const Management_Models = () => {
  const {
    models,
    loading,
    error,
    approveModel,
    rejectModel,
    suspendModel,
    unsuspendModel,
    deleteModel,
    editCommission,
  } = useContext(ModelContext);

  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModel, setSelectedModel] = useState(null);
  const [editingModel, setEditingModel] = useState(null);

  const stats = useMemo(() => {
    const total = models.length;
    const active = models.filter((m) => m.status === "Active").length;
    const pending = models.filter((m) => m.status === "Pending").length;
    const suspended = models.filter((m) => m.status === "Suspended").length;
    return { total, active, pending, suspended };
  }, [models]);

  const filteredModels = models
    .filter((model) => filter === "All" || model.status === filter)
    .filter(
      (model) =>
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.bio.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleAction = async (action, model) => {
    const result = await Swal.fire({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Model?`,
      text: `Are you sure you want to ${action} ${model.name}?`,
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
            await approveModel(model.id);
            break;
          case "reject":
            await rejectModel(model.id);
            break;
          case "suspend":
            await suspendModel(model.id);
            break;
          case "unsuspend":
            await unsuspendModel(model.id);
            break;
          case "delete":
            await deleteModel(model.id);
            break;
          default:
            break;
        }
        Swal.fire("Success!", `Model has been ${action}ed.`, "success");
      } catch (error) {
        Swal.fire("Error!", `Failed to ${action} model.`, "error");
      }
    }
  };

  const handleSaveCommission = (modelId, commission) => {
    editCommission(modelId, commission);
    setEditingModel(null);
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
        <StatsCards title="Total Models" stats={stats.total} />
        <StatsCards title="Active Models" stats={stats.active} />
        <StatsCards title="Pending Models" stats={stats.pending} />
        <StatsCards title="Suspended Models" stats={stats.suspended} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search models by name, location, or bio..."
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

      <ModelList
        models={filteredModels}
        handleApproveModel={(model) => handleAction("approve", model)}
        handleRejectModel={(model) => handleAction("reject", model)}
        handleSuspendModel={(model) => handleAction("suspend", model)}
        handleUnsuspendModel={(model) => handleAction("unsuspend", model)}
        handleDeleteModel={(model) => handleAction("delete", model)}
        handleEditCommission={setEditingModel}
        handleViewDetails={setSelectedModel}
      />

      <ModelDetailsModal model={selectedModel} onClose={() => setSelectedModel(null)} />
      <EditCommissionModal
        model={editingModel}
        onSave={handleSaveCommission}
        onClose={() => setEditingModel(null)}
      />
    </div>
  );
};

export default Management_Models;