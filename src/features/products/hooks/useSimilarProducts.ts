import { useCallback, useEffect, useState } from 'react';
import { Product } from '../../../types/product';
import { productsService } from '../services/product.service';

export function useSimilarProducts(category: string, currentProductId: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSimilarProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await productsService.getSimilarProducts(
        category,
        currentProductId,
      );
      setProducts(result);
    } catch {
      setError('Unable to load similar products');
    } finally {
      setLoading(false);
    }
  }, [category, currentProductId]);

  useEffect(() => {
    fetchSimilarProducts();
  }, [fetchSimilarProducts]);

  return { products, loading, error, retry: fetchSimilarProducts };
}
