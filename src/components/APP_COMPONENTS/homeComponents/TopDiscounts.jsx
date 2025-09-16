import React from 'react';
import ProductCard from '../../ProductCard';
import products from '../../../data/mockAppProducts';
import { motion, AnimatePresence } from 'framer-motion';

const TopDiscounts = () => {
  // Sort products by discount (descending) and take top 6
  const topDiscountProducts = [...products]
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
    >
      <AnimatePresence>
        {topDiscountProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TopDiscounts;