import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ProductFormData } from '../types';
import styles from './ProductForm.module.css'; // Create this file

interface ProductFormProps {
  onSubmit: SubmitHandler<ProductFormData>;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductFormData>();

  const handleFormSubmit: SubmitHandler<ProductFormData> = (data) => {
    // Convert price to number before submitting
    const formDataWithNumberPrice = {
        ...data,
        price: Number(data.price) // Ensure price is a number
    };
    onSubmit(formDataWithNumberPrice);
    reset(); // Clear form after submission
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Product Title</label>
        <input
          id="title"
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={4}
          {...register('description', {
            required: 'Description is required',
            minLength: { value: 10, message: 'Description must be at least 10 characters' }
          })}
        />
        {errors.description && <p className={styles.error}>{errors.description.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          step="0.01" // Allow decimals
          {...register('price', {
            required: 'Price is required',
            valueAsNumber: true, // Treat value as number
            min: { value: 0.01, message: 'Price must be positive' }
          })}
        />
        {errors.price && <p className={styles.error}>{errors.price.message}</p>}
      </div>

       <div className={styles.formGroup}>
        <label htmlFor="thumbnail">Image URL (Optional)</label>
        <input
          id="thumbnail"
          type="url"
          {...register('thumbnail', {
             pattern: {
                 value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i,
                 message: "Please enter a valid image URL (http/https ending in .png, .jpg, etc.)"
             }
          })}
        />
         {errors.thumbnail && <p className={styles.error}>{errors.thumbnail.message}</p>}
      </div>

      <button type="submit" className={styles.submitButton}>Create Product</button>
    </form>
  );
};

export default ProductForm;
