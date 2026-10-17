import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '../../../shared/components/cart.slice';

const CART_KEY = '@smartcart/cart';

export const cartStorage = {
  async load(): Promise<CartItem[]> {
    const stored = await AsyncStorage.getItem(CART_KEY);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored) as CartItem[];
  },

  async save(items: CartItem[]): Promise<void> {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
  },
};
