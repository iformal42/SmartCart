import { RootStackParamList } from '../../../types/naviagation';

export const ROUTE_NAMES: { [K in keyof RootStackParamList]: K } = {
  ProductList: 'ProductList',
  ProductDetails: 'ProductDetails',
};
