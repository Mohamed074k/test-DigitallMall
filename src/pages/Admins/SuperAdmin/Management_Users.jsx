import React, { useState, useContext, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { UserContext } from "../../../context/superAdminContext/UserContext";
import Swal from "sweetalert2";
import UserList from "../../../components/SUPER_ADMIN_COMPONENTS/UsersComponents/UserList";
import UserDetailsModal from "../../../components/SUPER_ADMIN_COMPONENTS/UsersComponents/UserDetailsModal";
import StatsCards from "../../../components/SUPER_ADMIN_COMPONENTS/DiscountsComponents/StatsCards";

const Management_Users = () => {
  const {
    users,
    loading,
    error,
    blockUser,
    unblockUser,
    deleteUser,
    resetPassword,
  } = useContext(UserContext);

  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === "Active").length;
    const blocked = users.filter((u) => u.status === "Blocked").length;
    return { total, active, blocked };
  }, [users]);

  const filteredUsers = users
    .filter((user) => filter === "All" || user.status === filter)
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleAction = async (action, user) => {
    const result = await Swal.fire({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} User?`,
      text: `Are you sure you want to ${action} ${user.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
    });

    if (result.isConfirmed) {
      try {
        switch (action) {
          case "block":
            await blockUser(user.id);
            break;
          case "unblock":
            await unblockUser(user.id);
            break;
          case "delete":
            await deleteUser(user.id);
            break;
          case "reset password for":
            await resetPassword(user.id);
            break;
          default:
            break;
        }
        Swal.fire("Success!", `User has been ${action}ed.`, "success");
      } catch (error) {
        Swal.fire("Error!", `Failed to ${action} user.`, "error");
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-center">
        <StatsCards title="Total Users" stats={stats.total} />
        <StatsCards title="Active Users" stats={stats.active} />
        <StatsCards title="Blocked Users" stats={stats.blocked} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name, email, or location..."
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
              <option value="Blocked">Blocked</option>
            </select>
          </div>
        </div>
      </div>

      <UserList
        users={filteredUsers}
        handleBlockUser={(user) => handleAction("block", user)}
        handleUnblockUser={(user) => handleAction("unblock", user)}
        handleDeleteUser={(user) => handleAction("delete", user)}
        handleResetPassword={(user) => handleAction("reset password for", user)}
        handleViewDetails={setSelectedUser}
      />

      <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};

export default Management_Users;