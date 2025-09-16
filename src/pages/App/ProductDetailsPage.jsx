// src/pages/App/ProductDetailsPage.jsx
import React, {useEffect} from 'react';
import ProductDetails from '../../components/APP_COMPONENTS/productDetailsComponents/ProductDetails';
import BrandInfo from '../../components/APP_COMPONENTS/productDetailsComponents/BrandInfo';
import CustomerReviews from '../../components/APP_COMPONENTS/productDetailsComponents/CustomerReviews';
import { useParams } from 'react-router-dom';
import products from '../../data/mockAppProducts';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id) || {};

    // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <ProductDetails />
      
      {/* Brand Info Section */}
      <div className="container mx-auto px-4">
        {product.brand && product.brandLogo && product.brandDescription && (
          <div className="mt-8">
            <BrandInfo 
              brand={product.brand} 
              brandLogo={product.brandLogo} 
              brandDescription={product.brandDescription}
            />
          </div>
        )}
        
        {/* Customer Reviews Section */}
        <div className="mt-12">
          <CustomerReviews />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;