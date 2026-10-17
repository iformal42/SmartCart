import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;

      if (product.stock <= 0) {
        return;
      }

      const existingItem = state.items.find(
        item => item.product.id === product.id,
      );

      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({
          product,
          quantity: 1,
        });
      }
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        item => item.product.id !== action.payload,
      );
    },

    incrementQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(item => item.product.id === action.payload);

      if (item && item.quantity < item.product.stock) {
        item.quantity += 1;
      }
    },

    decrementQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(item => item.product.id === action.payload);

      if (!item) {
        return;
      }

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          cartItem => cartItem.product.id !== action.payload,
        );
      }
    },

    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  setCart,
  clearCart,
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
