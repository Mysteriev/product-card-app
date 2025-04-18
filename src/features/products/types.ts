export interface Product {
    id: number | string; // API uses number, user-created might use string
    title: string;
    description: string;
    price: number;
    thumbnail: string; // Image URL
    isLiked: boolean;
    isUserCreated?: boolean; // Flag for user-added items
    // Add other fields from dummyjson if needed (e.g., rating, stock, brand)
    category?: string;
    brand?: string;
    rating?: number;
  }
  
  export type ProductFilterType = 'all' | 'liked';
  
  export interface ProductsState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    filter: ProductFilterType;
  }
  
  // Type for the form data when creating a product
  export interface ProductFormData {
      title: string;
      description: string;
      price: number;
      thumbnail: string; // Optional or provide a default
  }
  