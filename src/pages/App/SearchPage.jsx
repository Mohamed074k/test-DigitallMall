// src/pages/SearchPage.jsx
import React, { useEffect, useMemo, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import SearchHeader from "../../components/APP_COMPONENTS/searhResultsComponents/SearchHeader";
import SearchBar from "../../components/APP_COMPONENTS/searhResultsComponents/SearchBar";
import SearchEmpty from "../../components/APP_COMPONENTS/searhResultsComponents/SearchEmpty";
import SearchNoResults from "../../components/APP_COMPONENTS/searhResultsComponents/SearchNoResults";
import SearchResults from "../../components/APP_COMPONENTS/searhResultsComponents/SearchResults";

import { useBrandProducts } from "../../context/brandContext/BrandProductsContext";
import { BrandContext } from "../../context/superAdminContext/BrandContext";
import { ModelContext } from "../../context/superAdminContext/ModelContext";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const executedQuery = searchParams.get("query") || "";
  const typeParam = searchParams.get("type") || "products";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const [input, setInput] = useState(executedQuery);

  useEffect(() => {
    setInput(executedQuery);
  }, [executedQuery]);

      // Scroll to top when view changes
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    
  const {
    products = [],
    productsPerPage = 32,
    loading: productsLoading,
  } = useBrandProducts();
  const { brands = [], loading: brandsLoading } = useContext(BrandContext);
  const { models = [], loading: modelsLoading } = useContext(ModelContext);

  const handleSubmit = () => {
    const params = {};
    if (input.trim() !== "") params.query = input.trim();
    params.type = typeParam;
    params.page = "1";
    setSearchParams(params);
  };

  const allResults = useMemo(() => {
    if (!executedQuery) return [];

    const q = executedQuery.toLowerCase();

    if (typeParam === "products") {
      return products.filter((p) => (p.name || "").toLowerCase().includes(q));
    } else if (typeParam === "brands") {
      return brands.filter((b) => (b.name || "").toLowerCase().includes(q));
    } else if (typeParam === "models") {
      return models.filter((m) => (m.name || "").toLowerCase().includes(q));
    }
    return [];
  }, [executedQuery, typeParam, products, brands, models]);

  const perPage = typeParam === "products" ? productsPerPage || 32 : 12;
  const totalPages = Math.max(1, Math.ceil(allResults.length / perPage));
  const currentPage = Math.min(Math.max(pageParam || 1, 1), totalPages);

  const paginatedItems = allResults.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const goToPage = (p) => {
    const params = {};
    if (executedQuery.trim() !== "") params.query = executedQuery;
    params.type = typeParam;
    params.page = String(p);
    setSearchParams(params);
  };

  const loading = productsLoading || brandsLoading || modelsLoading;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SearchHeader />

      <SearchBar
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onClear={() => setInput("")}
        onSubmit={handleSubmit}
      />

      <main className="max-w-7xl mx-auto px-6 mt-12">
        {executedQuery === "" && <SearchEmpty />}

        {executedQuery !== "" && allResults.length === 0 && (
          <SearchNoResults query={executedQuery} type={typeParam}/>
        )}

        {executedQuery !== "" && allResults.length > 0 && (
          <>
            <SearchResults
              type={typeParam}
              items={paginatedItems}
              query={executedQuery}
              onTypeChange={(newType) => {
                const params = {};
                if (executedQuery.trim() !== "") params.query = executedQuery;
                params.type = newType;
                params.page = "1";
                setSearchParams(params);
              }}
            />
          </>
        )}
      </main>
    </div>
  );
}
