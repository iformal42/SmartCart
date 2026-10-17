import { useCallback, useState } from 'react';
import { productsService } from '../services/product.service';
import {
  fetchFailed,
  fetchStarted,
  fetchSucceeded,
} from '../slices/product.slice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

const PAGE_SIZE = 10;

export function useProducts() {
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const { items, total, loading, loadingMore, error } = useAppSelector(
    state => state.products,
  );

  const fetchPage = useCallback(
    async (skip = 0, isRefresh = false) => {
      if ((loading || loadingMore) && !isRefresh) {
        return;
      }

      if (isRefresh) {
        setRefreshing(true);
      }

      dispatch(fetchStarted({ skip }));

      try {
        const result = await productsService.getProducts(skip, PAGE_SIZE);

        dispatch(
          fetchSucceeded({
            products: result.products,
            total: result.total,
            skip: result.skip,
            limit: result.limit,
          }),
        );
      } catch (err) {
        dispatch(
          fetchFailed(
            err instanceof Error ? err.message : 'Unable to load products',
          ),
        );
      } finally {
        if (isRefresh) {
          setRefreshing(false);
        }
      }
    },
    [dispatch, loading, loadingMore],
  );

  const loadProducts = useCallback(() => fetchPage(0), [fetchPage]);
  const refresh = useCallback(() => fetchPage(0, true), [fetchPage]);

  const loadMore = useCallback(
    () => fetchPage(items.length),
    [fetchPage, items.length],
  );

  return {
    items,
    total,
    loading,
    loadingMore,
    refreshing,
    error,
    hasMore: items.length < total,
    loadProducts,
    loadMore,
    refresh,
  };
}
