// src/context/DiscountContext.jsx
import { createContext, useContext, useState, useMemo } from "react";

const DiscountContext = createContext();

export const DiscountProvider = ({ children }) => {
  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      discount: "10% Off on New Arrivals",
      status: "active",
      startDate: "2025-09-01",
      endDate: "2025-09-10",
    },
    {
      id: 2,
      discount: "20% Off on Bags",
      status: "inactive",
      startDate: "2025-09-05",
      endDate: "2025-09-15",
    },
    {
      id: 3,
      discount: "Free Shipping on Orders Above 5000 LE",
      status: "active",
      startDate: "2025-09-01",
      endDate: null,
    },
    {
      id: 4,
      discount: "Buy 1 Get 1 Free Accessories",
      status: "active",
      startDate: null,
      endDate: "2025-09-30",
    },
    {
      id: 5,
      discount: "15% Off for New Customers",
      status: "inactive",
      startDate: null,
      endDate: null,
    },
  ]);

  const addDiscount = (newDiscount) => {
    setDiscounts([...discounts, { id: Date.now(), ...newDiscount }]);
  };

  const editDiscount = (id, updatedDiscount) => {
    setDiscounts(
      discounts.map((d) => (d.id === id ? { ...d, ...updatedDiscount } : d))
    );
  };

  const deleteDiscount = (id) => {
    setDiscounts(discounts.filter((d) => d.id !== id));
  };

  const stats = useMemo(() => {
    const active = discounts.filter((d) => d.status === "active").length;
    const inactive = discounts.filter((d) => d.status === "inactive").length;
    return {
      total: discounts.length,
      active,
      inactive,
    };
  }, [discounts]);

  return (
    <DiscountContext.Provider
      value={{ discounts, addDiscount, editDiscount, deleteDiscount, stats }}
    >
      {children}
    </DiscountContext.Provider>
  );
};

export const useDiscounts = () => useContext(DiscountContext);
