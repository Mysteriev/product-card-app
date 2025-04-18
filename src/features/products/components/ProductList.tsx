import React from 'react';
import { Product } from '../types';
import ProductCard from '../../../components/ProductCard/ProductCard';
import styles from './ProductList.module.css'; // Create this file

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className={styles.listContainer}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
