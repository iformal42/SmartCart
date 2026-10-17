import { apiClient } from '../../../services/api/client';
import { Product, ProductsResponse } from '../../../types/product';

const PAGE_SIZE = 10;

export const productsService = {
  async getProducts(skip = 0, limit = PAGE_SIZE): Promise<ProductsResponse> {
    const response = await apiClient.get<ProductsResponse>('/products', {
      params: { limit, skip },
    });

    return response.data;
  },

  async getProduct(id: number): Promise<Product> {
    const response = await apiClient.get<Product>(`/products/${id}`);

    return response.data;
  },
};
