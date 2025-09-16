import React, { createContext, useContext, useState } from "react";

const BrandEarningsContext = createContext();

export function BrandEarningsProvider({ children }) {
  const [totalRevenue, setTotalRevenue] = useState(15000);
  const [pendingPayments, setPendingPayments] = useState(2000);
  const [commissionDeductions, setCommissionDeductions] = useState(1500);
  const [earningsBreakdown, setEarningsBreakdown] = useState([
    { id: "E001", submissionDate: "2025-09-01", name: "Product Sale", amount: 5000 },
    { id: "E002", submissionDate: "2025-08-15", name: "Service Fee", amount: 3000 },
  ]);
  const [requestedPayouts, setRequestedPayouts] = useState([
    { id: "P001", requestDate: "2025-09-01", amount: 1000, status: "Pending", method: "Bank Transfer" },
    { id: "P002", requestDate: "2025-08-20", amount: 500, status: "Approved", method: "Wallet" },
  ]);

  const requestPayout = async (amount, method) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (amount > totalRevenue - pendingPayments - commissionDeductions) {
            throw new Error("Insufficient available balance");
          }
          const newPayout = {
            id: `P${Date.now()}`,
            requestDate: new Date().toISOString().split("T")[0],
            amount,
            status: "Pending",
            method,
          };
          setRequestedPayouts((prev) => [...prev, newPayout]);
          setPendingPayments((prev) => prev + amount);
          console.log("Payout requested:", newPayout);
          resolve(true);
        } catch (error) {
          console.error("Payout request failed:", error.message);
          reject(error);
        }
      }, 500);
    });
  };

  const deletePayout = async (payout) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          setRequestedPayouts((prev) => prev.filter((p) => p.id !== payout.id));
          if (payout.status === "Pending") {
            setPendingPayments((prev) => prev - payout.amount);
          }
          console.log("Payout deleted:", payout);
          resolve(true);
        } catch (error) {
          console.error("Delete payout failed:", error.message);
          reject(error);
        }
      }, 500);
    });
  };

  const filterEarnings = async (month, year) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = earningsBreakdown.filter((earning) => {
          const date = new Date(earning.submissionDate);
          return (
            (!month || date.getMonth() + 1 === parseInt(month)) &&
            (!year || date.getFullYear() === parseInt(year))
          );
        });
        console.log("Filtered earnings:", filtered);
        resolve(filtered);
      }, 500);
    });
  };

  return (
    <BrandEarningsContext.Provider
      value={{
        totalRevenue,
        pendingPayments,
        commissionDeductions,
        earningsBreakdown,
        requestedPayouts,
        requestPayout,
        deletePayout,
        filterEarnings,
      }}
    >
      {children}
    </BrandEarningsContext.Provider>
  );
}

export const useBrandEarnings = () => {
  const context = useContext(BrandEarningsContext);
  if (!context) {
    throw new Error("useBrandEarnings must be used within a BrandEarningsProvider");
  }
  return context;
};

export default BrandEarningsContext;