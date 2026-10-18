import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { ordersStorage } from '../services/ordersStorage.service';
import { setOrders } from '../slices/orders.slice';

export function useOrdersPersistence() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.order.items);
  const isLoaded = useRef(false);

  useEffect(() => {
    let mounted = true;

    async function loadOrders() {
      try {
        const savedItems = await ordersStorage.load();

        if (mounted) {
          dispatch(setOrders(savedItems));
        }
      } catch (error) {
        console.error('Failed to load orders:', error);
      } finally {
        if (mounted) {
          isLoaded.current = true;
        }
      }
    }

    loadOrders();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isLoaded.current) {
      return;
    }

    ordersStorage.save(items).catch(error => {
      console.error('Failed to save orders:', error);
    });
  }, [items]);
}
