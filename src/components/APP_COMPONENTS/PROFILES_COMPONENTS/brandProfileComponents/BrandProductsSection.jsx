// src/components/APP_COMPONENTS/profilesComponents/brandProfileComponents/BrandProductsSection.jsx
import React from 'react';
import ProductCard from '../../../../components/ProductCard'; 
import mockProducts from '../../../../data/mockAppProducts'; // Import mock data

const BrandProductsSection = ({ brandName }) => {
  //Filter Products by BrandName
const filteredProducts = mockProducts.filter(
  (product) =>
    product.brand.toLowerCase().trim() === brandName.toLowerCase().trim()
);
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Products</h2>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 py-8 text-center">No products available for this brand.</p>
      )}
    </div>
  );
};

export default BrandProductsSection;