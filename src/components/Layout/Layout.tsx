import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Layout.module.css'; // Create this file

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <nav className={styles.navbar}>
        <NavLink
          to="/products"
          className={({ isActive }) => isActive ? styles.activeLink : styles.link}
        >
          Product List
        </NavLink>
        <NavLink
          to="/create-product"
          className={({ isActive }) => isActive ? styles.activeLink : styles.link}
        >
          Create Product
        </NavLink>
      </nav>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
