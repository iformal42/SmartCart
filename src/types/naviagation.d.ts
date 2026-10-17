import { Product } from '../../types/product';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: {
    product: Product;
  };
};
