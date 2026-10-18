import { Product } from '../../types/product';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: {
    product: Product;
  };
  Cart: undefined;
  Checkout: undefined;
  OrderConfirmation: undefined;
  OrderHistory: undefined;
};
