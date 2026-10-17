import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../types/product';

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const exists = state.items.some(item => item.id === product.id);

      if (exists) {
        state.items = state.items.filter(item => item.id !== product.id);
      } else {
        state.items.push(product);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
const wishlistReducer = wishlistSlice.reducer;
export default wishlistReducer;
