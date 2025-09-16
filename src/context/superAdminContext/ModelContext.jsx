import React, { createContext, useState, useEffect } from "react";
import { mockModels } from "../../data/mockModels";

export const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchModels = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setModels(mockModels);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Approve model
  const approveModel = async (id) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setModels(
        models.map((model) =>
          model.id === id ? { ...model, status: "Active" } : model
        )
      );
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw to handle in component
    }
  };

  // Reject model
  const rejectModel = async (id) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setModels(
        models.map((model) =>
          model.id === id ? { ...model, status: "Rejected" } : model
        )
      );
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw to handle in component
    }
  };

  // Suspend model
  const suspendModel = async (id) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setModels(
        models.map((model) =>
          model.id === id ? { ...model, status: "Suspended" } : model
        )
      );
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw to handle in component
    }
  };

  // Unsuspend model
  const unsuspendModel = async (id) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setModels(
        models.map((model) =>
          model.id === id ? { ...model, status: "Active" } : model
        )
      );
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw to handle in component
    }
  };

  // Delete model
  const deleteModel = async (id) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setModels(models.filter((model) => model.id !== id));
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw to handle in component
    }
  };

  // Edit commission
  const editCommission = async (id, commissionRate) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setModels(
        models.map((model) =>
          model.id === id ? { ...model, commissionRate } : model
        )
      );
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw to handle in component
    }
  };

  // Fetch models on mount
  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <ModelContext.Provider
      value={{
        models,
        loading,
        error,
        fetchModels,
        approveModel,
        rejectModel,
        suspendModel,
        unsuspendModel,
        deleteModel,
        editCommission,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};
