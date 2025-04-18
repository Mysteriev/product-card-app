import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../features/products/types';
import { useAppDispatch } from '../../app/hooks';
import { deleteProduct, toggleLike } from '../../features/products/productSlice';
import styles from './ProductCard.module.css'; // We'll create this CSS file

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    if (window.confirm(`Are you sure you want to delete "${product.title}"?`)) {
      dispatch(deleteProduct(product.id));
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking like
    dispatch(toggleLike(product.id));
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <img src={product.thumbnail} alt={product.title} className={styles.thumbnail} />
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        {/* Truncate description using CSS */}
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
      </div>
      <div className={styles.actions}>
        <button
          onClick={handleLike}
          className={`${styles.iconButton} ${product.isLiked ? styles.liked : ''}`}
          aria-label={product.isLiked ? 'Unlike' : 'Like'}
        >
          ❤️ {/* Simple heart emoji, replace with SVG icon if desired */}
        </button>
        <button
          onClick={handleDelete}
          className={styles.iconButton}
          aria-label="Delete"
        >
          🗑️ {/* Simple trash emoji */}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
