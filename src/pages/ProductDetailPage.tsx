import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectProductById } from '../features/products/productSlice';
import styles from './ProductDetailPage.module.css'; // Create this file

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get ID from URL
  const navigate = useNavigate();
  const product = useAppSelector((state) => selectProductById(state, id));

  if (!product) {
    // Handle case where product is not found (e.g., invalid ID or data not loaded)
    // You might want to fetch the specific product if not found, but for this
    // setup, we rely on the product being in the main list store.
    return (
        <div className={styles.container}>
            <h2>Product Not Found</h2>
            <p>The product you are looking for does not exist or hasn't been loaded.</p>
            <Link to="/products" className={styles.backButton}>Back to Product List</Link>
        </div>
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        &larr; Back to List
      </button>
      <h1 className={styles.title}>{product.title}</h1>
      <div className={styles.content}>
        <img src={product.thumbnail} alt={product.title} className={styles.image} />
        <div className={styles.details}>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>Price: ${product.price.toFixed(2)}</p>
          {/* Display other details if available */}
          {product.brand && <p>Brand: {product.brand}</p>}
          {product.category && <p>Category: {product.category}</p>}
          {product.rating && <p>Rating: {product.rating} / 5</p>}
          <p>Status: {product.isLiked ? '❤️ Liked' : 'Not Liked'}</p>
          {product.isUserCreated && <p><em>(User Added Product)</em></p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
