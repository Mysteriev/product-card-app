import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchProducts,
  selectFilteredProducts,
  selectProductsStatus,
  selectProductsError,
} from '../features/products/productSlice';
import ProductList from '../features/products/components/ProductList';
import ProductFilter from '../features/products/components/ProductFilter';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const ProductListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectFilteredProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    // Fetch products only if they haven't been fetched yet (status is 'idle')
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <LoadingSpinner />;
  } else if (status === 'succeeded') {
    content = <ProductList products={products} />;
  } else if (status === 'failed') {
    content = <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;
  }

  return (
    <div>
      <ProductFilter />
      {content}
    </div>
  );
};

export default ProductListPage;
