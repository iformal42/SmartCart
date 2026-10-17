import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/slices/product.slice';
import wishlistReducer from '../features/products/slices/whitelists.slice';
import cartReducer from '../shared/components/cart.slice';
export const store = configureStore({
  reducer: {
    products: productsReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
