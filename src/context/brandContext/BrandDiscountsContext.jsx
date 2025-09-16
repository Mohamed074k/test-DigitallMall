import { createContext, useState, useContext, useEffect, useMemo } from "react";
import { mockDiscounts, mockPromoCodes } from "../../data/mockDiscounts";
import { useBrandProducts } from "./BrandProductsContext";

const BrandDiscountContext = createContext();

export const BrandDiscountProvider = ({ children }) => {
  const { products } = useBrandProducts(); // 🟢 نجيب المنتجات الحقيقية
  const [discounts, setDiscounts] = useState([]);
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load mock data
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setDiscounts(mockDiscounts);
      setPromoCodes(mockPromoCodes);
      setLoading(false);
    };

    fetchData();
  }, []);

  // ✅ Helper: Get products linked to discount
  const getDiscountProducts = (discountId) => {
    const discount = discounts.find((d) => d.id === discountId);
    if (!discount) return { type: "none", items: [] };
    const matched = products.filter((p) => discount.productsIds.includes(p.id));

    // لو مفيش ولا منتج مطابق
    if (matched.length === 0 || !discount.productsIds || discount.productsIds.length === 0) {
      return { type: "none", items: [] };
    }

    // لو عدد الماتشات = عدد كل المنتجات → All
    if (matched.length === products.length) {
      return { type: "all", items: products };
    }

    // منتجات محددة
    return { type: "some", items: matched };
  };

  // ===== DISCOUNTS =====
  const addDiscount = (newDiscount) => {
    setDiscounts((prev) => [
      ...prev,
      { id: Date.now(), productsIds: [], ...newDiscount },
    ]);
  };

  const editDiscount = (id, updatedDiscount) => {
    setDiscounts((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              ...updatedDiscount,
              productsIds: updatedDiscount.productsIds ?? d.productsIds,
            }
          : d
      )
    );
  };

  const deleteDiscount = (id) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== id));
  };

  // ===== PROMO CODES =====
  const addPromoCode = (newPromo) => {
    setPromoCodes((prev) => [
      ...prev,
      { id: Date.now(), usedCount: 0, ...newPromo },
    ]);
  };

  const editPromoCode = (id, updatedPromo) => {
    setPromoCodes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedPromo } : p))
    );
  };

  const deletePromoCode = (id) => {
    setPromoCodes((prev) => prev.filter((p) => p.id !== id));
  };

  // ===== STATS =====
  const discountStats = useMemo(() => {
    const active = discounts.filter((d) => d.status === "active").length;
    const inactive = discounts.filter((d) => d.status === "inactive").length;
    return {
      total: discounts.length,
      active,
      inactive,
    };
  }, [discounts]);

  const promoStats = useMemo(() => {
    const active = promoCodes.filter((p) => p.status === "active").length;
    const inactive = promoCodes.filter((p) => p.status === "inactive").length;
    const totalUsed = promoCodes.reduce((sum, p) => sum + p.usedCount, 0);
    return {
      total: promoCodes.length,
      active,
      inactive,
      totalUsed,
    };
  }, [promoCodes]);

  return (
    <BrandDiscountContext.Provider
      value={{
        loading,
        discounts,
        promoCodes,
        addDiscount,
        editDiscount,
        deleteDiscount,
        addPromoCode,
        editPromoCode,
        deletePromoCode,
        discountStats,
        promoStats,
        getDiscountProducts,
      }}
    >
      {children}
    </BrandDiscountContext.Provider>
  );
};

export const useBrandDiscountContext = () => {
  const context = useContext(BrandDiscountContext);
  if (!context) {
    throw new Error("useBrand must be used within a BrandProvider");
  }
  return context;
};
