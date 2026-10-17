import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../../types/product';

interface ProductsState {
  items: Product[];
  total: number;
  skip: number;
  limit: number;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  total: 0,
  skip: 0,
  limit: 10,
  loading: false,
  loadingMore: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,

  reducers: {
    fetchStarted: (state, action: PayloadAction<{ skip: number }>) => {
      state.error = null;

      if (action.payload.skip === 0) {
        state.loading = true;
      } else {
        state.loadingMore = true;
      }
    },

    fetchSucceeded: (
      state,
      action: PayloadAction<{
        products: Product[];
        total: number;
        skip: number;
        limit: number;
      }>,
    ) => {
      const { products, total, skip, limit } = action.payload;

      if (skip === 0) {
        state.items = products;
      } else {
        for (const product of products) {
          const exists = state.items.some(item => item.id === product.id);

          if (!exists) {
            state.items.push(product);
          }
        }
      }

      state.total = total;
      state.skip = skip;
      state.limit = limit;
      state.loading = false;
      state.loadingMore = false;
    },

    fetchFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.loadingMore = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStarted, fetchSucceeded, fetchFailed } =
  productsSlice.actions;

const productsReducer = productsSlice.reducer;

export default productsReducer;
