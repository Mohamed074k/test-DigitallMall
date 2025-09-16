// src/components/ProductsGrid.jsx
import { useBrandProducts } from "../../../context/brandContext/BrandProductsContext";
import ProductCard from "../../ProductCard"; // 👈 استدعاء الكومبوننت

const ProductsGrid = ({ products }) => {
  const { loading, error } = useBrandProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} /> // 👈 هنا بدلنا البلوك كله
      ))}
    </div>
  );
};

export default ProductsGrid;
