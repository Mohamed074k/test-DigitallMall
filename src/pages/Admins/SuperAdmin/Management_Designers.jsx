import React, { useState, useContext, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { DesignerContext } from "../../../context/superAdminContext/DesignerContext";
import Swal from "sweetalert2";
import DesignerList from "../../../components/SUPER_ADMIN_COMPONENTS/DesignersComponents/DesignerList";
import DesignerDetailsModal from "../../../components/SUPER_ADMIN_COMPONENTS/DesignersComponents/DesignerDetailsModal";
import StatsCards from "../../../components/SUPER_ADMIN_COMPONENTS/DiscountsComponents/StatsCards";

const Management_Designers = () => {
  const {
    designers,
    loading,
    error,
    approveDesigner,
    rejectDesigner,
    suspendDesigner,
    deleteDesigner,
  } = useContext(DesignerContext);

  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDesigner, setSelectedDesigner] = useState(null);

  const stats = useMemo(() => {
    const total = designers.length;
    const active = designers.filter((d) => d.status === "Active").length;
    const pending = designers.filter((d) => d.status === "Pending").length;
    const suspended = designers.filter((d) => d.status === "Suspended").length;
    return { total, active, pending, suspended };
  }, [designers]);

  const filteredDesigners = designers
    .filter((designer) => filter === "All" || designer.status === filter)
    .filter(
      (designer) =>
        designer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        designer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        designer.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleAction = async (action, designer) => {
    const result = await Swal.fire({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Designer?`,
      text: `Are you sure you want to ${action} ${designer.name}?`,
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
            await approveDesigner(designer.id);
            break;
          case "reject":
            await rejectDesigner(designer.id);
            break;
          case "suspend":
            await suspendDesigner(designer.id);
            break;
          case "delete":
            await deleteDesigner(designer.id);
            break;
          default:
            break;
        }
        Swal.fire("Success!", `Designer has been ${action}ed.`, "success");
      } catch (error) {
        Swal.fire("Error!", `Failed to ${action} designer.`, "error");
      }
    }
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center ">
        <StatsCards title="Total Designers" stats={stats.total} />
        <StatsCards title="Active Designers" stats={stats.active} />
        <StatsCards title="Pending Designers" stats={stats.pending} />
        <StatsCards title="Suspended Designers" stats={stats.suspended} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search designers by name, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full lg:w-xl pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <option value="Rejected">Rejected</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      <DesignerList
        designers={filteredDesigners}
        handleApproveDesigner={(designer) => handleAction("approve", designer)}
        handleRejectDesigner={(designer) => handleAction("reject", designer)}
        handleSuspendDesigner={(designer) => handleAction("suspend", designer)}
        handleDeleteDesigner={(designer) => handleAction("delete", designer)}
        handleViewDetails={setSelectedDesigner}
      />

      <DesignerDetailsModal
        designer={selectedDesigner}
        onClose={() => setSelectedDesigner(null)}
      />
    </div>
  );
};

export default Management_Designers;