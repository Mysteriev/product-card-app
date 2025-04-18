import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setFilter, selectProductFilter } from '../productSlice';
import { ProductFilterType } from '../types';
import styles from './ProductFilter.module.css'; // Create this file

const ProductFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(selectProductFilter);

  const handleFilterChange = (filter: ProductFilterType) => {
    dispatch(setFilter(filter));
  };

  return (
    <div className={styles.filterContainer}>
      <button
        onClick={() => handleFilterChange('all')}
        disabled={currentFilter === 'all'}
        className={currentFilter === 'all' ? styles.active : ''}
      >
        All Products
      </button>
      <button
        onClick={() => handleFilterChange('liked')}
        disabled={currentFilter === 'liked'}
        className={currentFilter === 'liked' ? styles.active : ''}
      >
        Liked Products
      </button>
    </div>
  );
};

export default ProductFilter;