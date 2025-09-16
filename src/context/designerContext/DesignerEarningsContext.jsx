import { createContext, useState, useEffect, useContext } from "react";

const DesignerEarningsContext = createContext();

export const EarningsProvider = ({ children }) => {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [currentCommission, setCurrentCommission] = useState(0);
  const [earningsBreakdown, setEarningsBreakdown] = useState([]);
  const [requestedPayouts, setRequestedPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load mock data
  useEffect(() => {
    const fetchEarningsData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setTotalEarnings(1250.75);
        setCurrentCommission(15);
        setEarningsBreakdown([
          { id: "DES-001", submissionDate: "2025-08-20", name: "T-Shirt A", price: 150.00 },
          { id: "DES-002", submissionDate: "2025-08-21", name: "Hoodie B", price: 200.50 },
          { id: "DES-003", submissionDate: "2025-08-22", name: "T-Shirt C", price: 175.25 },
        ]);
        setRequestedPayouts([
          { id: "PAY-001", requestDate: "2025-08-25", amount: 300.00, status: "Approved" },
          { id: "PAY-002", requestDate: "2025-08-26", amount: 200.00, status: "Pending" },
          { id: "PAY-003", requestDate: "2025-08-27", amount: 150.00, status: "Approved" },
        ]);
      } catch (err) {
        setError("Failed to fetch earnings data");
        console.error("Error fetching earnings data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEarningsData();
  }, []);

  // Request new payout
  const requestPayout = async (amount) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const newPayout = {
        id: `PAY-${Date.now()}`,
        requestDate: new Date().toISOString().split("T")[0],
        amount,
        status: "Pending",
      };
      setRequestedPayouts((prev) => [...prev, newPayout]);
      setCurrentCommission((prev) => prev );
      return true;
    } catch (err) {
      console.error("Failed to request payout:", err);
      return false;
    }
  };

  // Mark payout as paid
//   const markAsPaidPayout = async (payout) => {
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 300));
//       setRequestedPayouts((prev) =>
//         prev.map((p) => (p.id === payout.id ? { ...p, status: "Paid" } : p))
//       );
//       return true;
//     } catch (err) {
//       console.error("Failed to mark payout as paid:", err);
//       return false;
//     }
//   };

  // Delete payout
  const deletePayout = async (payout) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setRequestedPayouts((prev) => prev.filter((p) => p.id !== payout.id));
      return true;
    } catch (err) {
      console.error("Failed to delete payout:", err);
      return false;
    }
  };

  return (
    <DesignerEarningsContext.Provider
      value={{
        totalEarnings,
        currentCommission,
        earningsBreakdown,
        requestedPayouts,
        loading,
        error,
        requestPayout,
        // markAsPaidPayout,
        deletePayout,
      }}
    >
      {children}
    </DesignerEarningsContext.Provider>
  );
};

export const useEarnings = () => {
  const context = useContext(DesignerEarningsContext);
  if (!context) {
    throw new Error("useEarnings must be used within an EarningsProvider");
  }
  return context;
};