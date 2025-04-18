import { createSlice, createAsyncThunk, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { Product, ProductsState, ProductFilterType, ProductFormData } from './types';
import { RootState } from '../../app/store';

// --- Async Thunk for Fetching Products ---
interface FetchedProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    // Add other fields you might want from dummyjson
    category: string;
    brand: string;
    rating: number;
}

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            // Fetch only first 30 products for simplicity, add pagination later if needed
            const response = await fetch('https://dummyjson.com/products?limit=30');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: { products: FetchedProduct[] } = await response.json();
            // Add isLiked property to fetched products
            const productsWithLike: Product[] = data.products.map(p => ({
                ...p,
                isLiked: false, // Initialize isLiked to false
                isUserCreated: false,
            }));
            return productsWithLike;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch products');
        }
    }
);

// --- Initial State ---
const initialState: ProductsState = {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    filter: 'all', // 'all' | 'liked'
};

// --- Product Slice ---
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Action to add a product created by the user
        addProduct: {
            reducer(state, action: PayloadAction<Product>) {
                // Add to the beginning of the list
                state.items.unshift(action.payload);
            },
            // Prepare allows customizing the payload before it hits the reducer
            prepare(formData: ProductFormData) {
                return {
                    payload: {
                        // Generate a unique ID for user-created products
                        id: `user_${nanoid()}`, // Or use a UUID library
                        title: formData.title,
                        description: formData.description,
                        price: formData.price,
                        thumbnail: formData.thumbnail || 'https://via.placeholder.com/150/EEEEEE/808080?text=No+Image', // Default image
                        isLiked: false,
                        isUserCreated: true,
                    } as Product, // Assert type here
                };
            },
        },
        // Action to delete a product
        deleteProduct(state, action: PayloadAction<number | string>) {
            state.items = state.items.filter(product => product.id !== action.payload);
        },
        // Action to toggle the like status
        toggleLike(state, action: PayloadAction<number | string>) {
            const product = state.items.find(product => product.id === action.payload);
            if (product) {
                product.isLiked = !product.isLiked;
            }
        },
        // Action to set the filter
        setFilter(state, action: PayloadAction<ProductFilterType>) {
            state.filter = action.payload;
        },
        // Add editProduct reducer later if implementing the bonus
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                // Replace existing items only if the fetch is successful
                // Avoid merging if user has added/deleted items meanwhile
                // A more robust approach might merge based on IDs if needed
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ?? 'Unknown error occurred';
            });
    },
});

// --- Export Actions ---
export const { addProduct, deleteProduct, toggleLike, setFilter } = productsSlice.actions;

// --- Export Selectors ---
export const selectAllProducts = (state: RootState): Product[] => state.products.items;
export const selectProductsStatus = (state: RootState): ProductsState['status'] => state.products.status;
export const selectProductsError = (state: RootState): ProductsState['error'] => state.products.error;
export const selectProductFilter = (state: RootState): ProductFilterType => state.products.filter;

export const selectProductById = (state: RootState, productId: number | string | undefined): Product | undefined => {
    if (!productId) return undefined;
    // Handle potential type mismatch between URL param (string) and API ID (number)
    return state.products.items.find(product => String(product.id) === String(productId));
};

export const selectFilteredProducts = (state: RootState): Product[] => {
    const allProducts = state.products.items;
    const filter = state.products.filter;
    if (filter === 'liked') {
        return allProducts.filter(product => product.isLiked);
    }
    return allProducts; // 'all' filter
};


// --- Export Reducer ---
export default productsSlice.reducer;
