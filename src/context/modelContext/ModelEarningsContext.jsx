import { createContext, useContext, useState } from "react";

// Create the context
const ModelEarningsContext = createContext();

// Initial earnings state
const initialState = {
  totalCommissions: 0,
  pendingAmounts: 0,
  paidAmounts: 0,
  earningsBreakdown: [],
  requestedPayouts: [],
};

// Context provider
export function ModelEarningsProvider({ children }) {
  const [earnings, setEarnings] = useState(initialState);

  // Mock data for earnings breakdown and payouts (replace with API calls)
  const fetchEarnings = async (month, year) => {
    // Simulate API call to fetch filtered earnings
    const mockEarnings = [
      {
        id: 1,
        submissionDate: "2025-09-01",
        type: "Reel",
        amount: 150.0,
        status: "Paid",
      },
      {
        id: 2,
        submissionDate: "2025-08-20",
        type: "Product",
        amount: 200.0,
        status: "Pending",
      },
      {
        id: 3,
        submissionDate: "2025-07-15",
        type: "Ad",
        amount: 300.0,
        status: "Paid",
      },
      {
        id: 4,
        submissionDate: "2025-06-10",
        type: "Collab",
        amount: 400.0,
        status: "Paid",
      },
      {
        id: 5,
        submissionDate: "2025-08-20",
        type: "Product",
        amount: 800.0,
        status: "Pending",
      },
      {
        id: 6,
        submissionDate: "2025-07-15",
        type: "Ad",
        amount: 500.0,
        status: "Paid",
      },
    ].filter((earning) => {
      const date = new Date(earning.submissionDate);
      return (
        (!month || date.getMonth() + 1 === parseInt(month)) &&
        (!year || date.getFullYear() === parseInt(year))
      );
    });

    const totalCommissions = mockEarnings.reduce((sum, e) => sum + e.amount, 0);
    const pendingAmounts = mockEarnings.reduce(
      (sum, e) => sum + (e.status === "Pending" ? e.amount : 0),
      0
    );
    const paidAmounts = mockEarnings.reduce(
      (sum, e) => sum + (e.status === "Paid" ? e.amount : 0),
      0
    );

    setEarnings((prev) => ({
      ...prev,
      totalCommissions,
      pendingAmounts,
      paidAmounts,
      earningsBreakdown: mockEarnings,
    }));

    return mockEarnings;
  };

  // Function to filter earnings by month and year
  const filterEarnings = async (month, year) => {
    const filtered = await fetchEarnings(month, year);
    return filtered;
  };

  // Function to request a payout
  const requestPayout = async (amount, method) => {
    try {
      // Simulate API call to request payout
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newPayout = {
        id: earnings.requestedPayouts.length + 1,
        requestDate: new Date().toISOString().split("T")[0],
        amount,
        method,
        status: "Pending",
      };
      setEarnings((prev) => ({
        ...prev,
        requestedPayouts: [...prev.requestedPayouts, newPayout],
        pendingAmounts: prev.pendingAmounts + amount,
      }));
      return true;
    } catch (error) {
      return false;
    }
  };

  // Function to delete a payout
  const deletePayout = async (payout) => {
    try {
      // Simulate API call to delete payout
      await new Promise((resolve) => setTimeout(resolve, 500));
      setEarnings((prev) => ({
        ...prev,
        requestedPayouts: prev.requestedPayouts.filter(
          (p) => p.id !== payout.id
        ),
        pendingAmounts:
          prev.pendingAmounts -
          (payout.status === "Pending" ? payout.amount : 0),
      }));
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <ModelEarningsContext.Provider
      value={{
        totalCommissions: earnings.totalCommissions,
        pendingAmounts: earnings.pendingAmounts,
        paidAmounts: earnings.paidAmounts,
        earningsBreakdown: earnings.earningsBreakdown,
        requestedPayouts: earnings.requestedPayouts,
        filterEarnings,
        requestPayout,
        deletePayout,
      }}
    >
      {children}
    </ModelEarningsContext.Provider>
  );
}

// Custom hook to use the context
export function useModelEarnings() {
  const context = useContext(ModelEarningsContext);
  if (!context) {
    throw new Error(
      "useModelEarnings must be used within a ModelEarningsProvider"
    );
  }
  return context;
}
