import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../app/hooks';
import { addProduct } from '../features/products/productSlice';
import { ProductFormData } from '../features/products/types';
import ProductForm from '../features/products/components/ProductForm';

const CreateProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateProduct: SubmitHandler<ProductFormData> = (data) => {
    dispatch(addProduct(data)); // Dispatch the prepared action
    navigate('/products'); // Redirect to product list after creation
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create New Product</h2>
      <ProductForm onSubmit={handleCreateProduct} />
    </div>
  );
};

export default CreateProductPage;
