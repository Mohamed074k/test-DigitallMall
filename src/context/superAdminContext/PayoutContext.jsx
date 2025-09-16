import React, { createContext, useState } from "react";
import { mockPayouts } from "../../data/mockPayouts";

export const PayoutContext = createContext();

export const PayoutProvider = ({ children }) => {
  const [payouts, setPayouts] = useState(mockPayouts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const approvePayout = async (payoutId) => {
    setLoading(true);
    try {
      setPayouts((prevPayouts) =>
        prevPayouts.map((payout) =>
          payout.id === payoutId ? { ...payout, status: "Approved" } : payout
        )
      );
    } catch (err) {
      setError("Failed to approve payout");
    } finally {
      setLoading(false);
    }
  };

  const rejectPayout = async (payoutId) => {
    setLoading(true);
    try {
      setPayouts((prevPayouts) =>
        prevPayouts.map((payout) =>
          payout.id === payoutId
            ? { ...payout, status: "Rejected", rejectedDate: new Date().toISOString().split("T")[0] }
            : payout
        )
      );
    } catch (err) {
      setError("Failed to reject payout");
    } finally {
      setLoading(false);
    }
  };

  const markAsPaidPayout = async (payoutId) => {
    setLoading(true);
    try {
      setPayouts((prevPayouts) =>
        prevPayouts.map((payout) =>
          payout.id === payoutId
            ? { ...payout, status: "Paid", paidDate: new Date().toISOString().split("T")[0] }
            : payout
        )
      );
    } catch (err) {
      setError("Failed to mark payout as paid");
    } finally {
      setLoading(false);
    }
  };

  const deletePayout = async (payoutId) => {
    setLoading(true);
    try {
      setPayouts((prevPayouts) => prevPayouts.filter((payout) => payout.id !== payoutId));
    } catch (err) {
      setError("Failed to delete payout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PayoutContext.Provider
      value={{
        payouts,
        loading,
        error,
        approvePayout,
        rejectPayout,
        markAsPaidPayout,
        deletePayout,
      }}
    >
      {children}
    </PayoutContext.Provider>
  );
};