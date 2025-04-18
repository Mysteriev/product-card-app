import React from 'react';
import styles from './LoadingSpinner.module.css'; // Create basic CSS for spinner

const LoadingSpinner: React.FC = () => {
  return <div className={styles.spinner}>Loading...</div>;
};



export default LoadingSpinner;
