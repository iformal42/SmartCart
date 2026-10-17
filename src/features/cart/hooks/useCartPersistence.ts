import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { cartStorage } from '../service/cartStorage.service';
import { setCart } from '../../../shared/components/cart.slice';

export function useCartPersistence() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.cart.items);
  const isLoaded = useRef(false);

  useEffect(() => {
    let mounted = true;

    async function loadCart() {
      try {
        const savedItems = await cartStorage.load();

        if (mounted) {
          dispatch(setCart(savedItems));
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        if (mounted) {
          isLoaded.current = true;
        }
      }
    }

    loadCart();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isLoaded.current) {
      return;
    }

    cartStorage.save(items).catch(error => {
      console.error('Failed to save cart:', error);
    });
  }, [items]);
}
