import React from "react";
import { FaFaceSadCry } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function SearchNoResults({ query, type }) {
  const navigate = useNavigate();

  const typeLabel =
    type === "products"
      ? "products"
      : type === "brands"
      ? "brands"
      : type === "models"
      ? "models"
      : "anything";

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <FaFaceSadCry size={96} className="text-gray-400 mb-4 pulse" />
      
      <h2 className="text-2xl font-semibold font-['JetBrains_Mono'] tracking-wide">
        No results found
      </h2>
      
      <p className="mt-2 text-gray-500 font-bold font-['JetBrains_Mono']">
        We couldn't find any {typeLabel} for “{query}”
      </p>

      <button
        onClick={() => navigate(-1)}
        className="btn btn-dark px-4 py-2 rounded-pill bounce mt-5 !font-[poppins]"
      >
        ← Back
      </button>
    </div>
  );
}
