import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order } from '../slices/orders.slice';

const ORDERS_KEY = '@smartcart/orders';

export const ordersStorage = {
  async load(): Promise<Order[]> {
    const stored = await AsyncStorage.getItem(ORDERS_KEY);
    return stored ? (JSON.parse(stored) as Order[]) : [];
  },

  async save(orders: Order[]): Promise<void> {
    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  },
};
