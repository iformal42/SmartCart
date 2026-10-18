import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../../shared/components/cart.slice';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}

interface OrdersState {
  items: Order[];
}

const initialState: OrdersState = {
  items: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.items.unshift(action.payload);
    },
  },
});

export const { addOrder } = ordersSlice.actions;
const ordersReducer = ordersSlice.reducer;
export default ordersReducer;
