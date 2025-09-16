import ProductCard from "../../ProductCard";
import SearchTypeDropdown from "./SearchTypeDropdown";

const BrandCard = ({ brand }) => (
  <div className="p-4 border rounded-lg shadow bg-white flex items-center gap-3">
    <img src={brand.logo} alt={brand.name} className="w-12 h-12 rounded-full" />
    <div>
      <h3 className="font-semibold">{brand.name}</h3>
      <p className="text-sm text-gray-500">{brand.info?.description}</p>
    </div>
  </div>
);

const ModelCard = ({ model }) => (
  <div className="p-4 border rounded-lg shadow bg-white flex items-center gap-3">
    <img
      src={model.profilePic}
      alt={model.name}
      className="w-12 h-12 rounded-full"
    />
    <div>
      <h3 className="font-semibold">{model.name}</h3>
      <p className="text-sm text-gray-500">{model.bio}</p>
    </div>
  </div>
);

export default function SearchResults({ type, items, query, onTypeChange }) {
  const typeLabel =
    type === "products" ? "Products" : type === "brands" ? "Brands" : "Models";

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 !font-[poppins]">
        <h2 className="!text-lg md:!text-3xl !font-bold">
          {typeLabel} Results for{" "}
          <span className="text-gray-500">"{query}"</span>
        </h2>
        <SearchTypeDropdown value={type} onChange={onTypeChange} />
      </div>

      {/* Results */}
      {type === "products" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {type === "brands" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      )}

      {type === "models" && (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          {items.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      )}
    </div>
  );
}
