import React, { createContext, useState, useEffect } from "react";
import { mockUsers } from "../../data/mockUsers";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

   const fetchUsers = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      
      setUsers(mockUsers);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Block user
  const blockUser = async (id) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
 
      
      setUsers(users.map((user) => (user.id === id ? { ...user, status: "Blocked" } : user)));
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw to handle in component
    }
  };

  // Unblock user
  const unblockUser = async (id) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
 
      
      setUsers(users.map((user) => (user.id === id ? { ...user, status: "Active" } : user)));
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw to handle in component
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
 
      
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw to handle in component
    }
  };

  // Reset password
  const resetPassword = async (id) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
 
      return { success: true, message: "Password reset successfully" };
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw to handle in component
    }
  };

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        fetchUsers,
        blockUser,
        unblockUser,
        deleteUser,
        resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

