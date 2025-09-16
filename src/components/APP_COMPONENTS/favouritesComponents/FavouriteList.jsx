// src/components/favourites/FavouriteList.jsx
import ProductCard from "../../ProductCard";

export const ModelCard = ({ model }) => (
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

export const BrandCard = ({ brand }) => (
  <div className="p-4 border rounded-lg shadow bg-white flex items-center gap-3">
    <img src={brand.logo} alt={brand.name} className="w-12 h-12 rounded-full" />
    <div>
      <h3 className="font-semibold">{brand.name}</h3>
      <p className="text-sm text-gray-500">{brand.info?.description}</p>
    </div>
  </div>
);

export default function FavouriteList({ type, items }) {
  if (type === "products") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  if (type === "brands") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    );
  }

  if (type === "models") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    );
  }

  return null;
}
