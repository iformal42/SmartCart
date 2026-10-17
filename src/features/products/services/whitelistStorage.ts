import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../../../types/product';

const WISHLIST_KEY = '@smartcart/wishlist';

export const wishlistStorage = {
  async load(): Promise<Product[]> {
    const stored = await AsyncStorage.getItem(WISHLIST_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      throw new Error('Invalid saved wishlist data');
    }

    return parsed as Product[];
  },

  async save(products: Product[]): Promise<void> {
    await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(products));
  },
};
