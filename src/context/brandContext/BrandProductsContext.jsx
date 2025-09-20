// src/context/BrandProductsContext.jsx
import { createContext, useState, useContext, useEffect, useMemo } from "react";
import mockProducts from "../../data/mockAppProducts"; // 👈 عدلت هنا

const BrandProductsContext = createContext();

export const BrandProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(32);

  const [filters, setFilters] = useState({
    category: "all",
    stockStatus: "all",
    status: "all",
    searchTerm: "",
    gender: "all",
    sizes: [],
    priceRange: [0, 500],
    discountOnly: false,
  });
  const [sortOption, setSortOption] = useState("popular");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Load mock data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setProducts(mockProducts);
      } catch (err) {
        setError("Failed to fetch products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.category))];
    return [...unique];
  }, [products]);

  // Apply filters + sorting
  const applyFiltersAndSort = (activeFilters, sort) => {
    let filtered = products;

    if (activeFilters.category !== "all")
      filtered = filtered.filter((p) => p.category === activeFilters.category);

    if (activeFilters.gender !== "all")
      filtered = filtered.filter(
        (p) =>
          (p.gender || "").toLowerCase() === activeFilters.gender.toLowerCase()
      );

    if (activeFilters.sizes.length > 0)
      filtered = filtered.filter((p) =>
        activeFilters.sizes.some((s) => (p.sizes || []).includes(s))
      );

    if (activeFilters.priceRange) {
      const [min, max] = activeFilters.priceRange;
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }

    if (activeFilters.discountOnly)
      filtered = filtered.filter((p) => p.discount);

    if (activeFilters.status !== "all")
      filtered = filtered.filter(
        (p) =>
          (p.status || "").toLowerCase() === activeFilters.status.toLowerCase()
      );

    if (activeFilters.stockStatus !== "all") {
      if (activeFilters.stockStatus === "inStock")
        filtered = filtered.filter((p) => p.stock > 0);
      else if (activeFilters.stockStatus === "outOfStock")
        filtered = filtered.filter((p) => p.stock === 0);
    }

    if (activeFilters.searchTerm)
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(activeFilters.searchTerm.toLowerCase())
      );

    // sorting
    if (sort === "priceHigh")
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    else if (sort === "priceLow")
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    else if (sort === "popular")
      filtered = [...filtered].sort((a, b) => b.sales - a.sales);

    setFilteredProducts(filtered);
  };

  // whenever products / filters / sortOption change -> re-run filters & reset page to 1
  useEffect(() => {
    if (products.length > 0) {
      applyFiltersAndSort(filters, sortOption);
      // setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, filters, sortOption]);

  // pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage)
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <BrandProductsContext.Provider
      value={{
        products,
        loading,
        error,
        currentProducts,
        currentPage,
        page: currentPage,
        productsPerPage,
        totalPages,
        paginate,
        filterProducts: (newFilters) =>
          setFilters((prev) => ({ ...prev, ...newFilters })),
        filters,
        setFilters,
        filteredProducts,
        sortOption,
        setSortOption,
        addProduct: async () => {},
        updateProduct: async () => {},
        deleteProduct: async () => {},
        categories,
      }}
    >
      {children}
    </BrandProductsContext.Provider>
  );
};

export const useBrandProducts = () => {
  const context = useContext(BrandProductsContext);
  if (!context) {
    throw new Error(
      "useBrandProducts must be used within a BrandProductsProvider"
    );
  }
  return context;
};
