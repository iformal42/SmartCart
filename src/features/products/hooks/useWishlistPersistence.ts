import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { wishlistStorage } from '../services/whitelistStorage';
import { setWishlist } from '../slices/whitelists.slice';

export function useWishlistPersistence() {
  const dispatch = useAppDispatch();

  const wishlist = useAppSelector(state => state.wishlist.items);

  const isLoaded = useRef(false);

  useEffect(() => {
    let mounted = true;

    async function loadWishlist() {
      try {
        const products = await wishlistStorage.load();

        if (mounted) {
          dispatch(setWishlist(products));
        }
      } catch (error) {
        console.error('Failed to load wishlist:', error);
      } finally {
        if (mounted) {
          isLoaded.current = true;
        }
      }
    }

    loadWishlist();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isLoaded.current) {
      return;
    }

    wishlistStorage.save(wishlist).catch(error => {
      console.error('Failed to save wishlist:', error);
    });
  }, [wishlist]);
}
