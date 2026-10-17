import React, { useCallback, useEffect } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { Product } from '../../../types/product';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import Loader from '../../../shared/components/Loader';
import AppText from '../../../shared/components/AppText';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { toggleWishlist } from '../slices/whitelists.slice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/naviagation';
import { ROUTE_NAMES } from '../../app/constants/route.constant';

export default function ProductListScreen() {
  const {
    items: products,
    total,
    loading,
    loadingMore,
    error,
    hasMore,
    loadProducts,
    loadMore,
    refresh,
  } = useProducts();
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const wishlistedIds = useAppSelector(state =>
    state.wishlist.items.map(product => product.id),
  );
  const cartItems = useAppSelector(state => state.cart.items);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleToggleWishlist = useCallback(
    (product: Product) => {
      dispatch(toggleWishlist(product));
    },
    [dispatch],
  );
  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        onPress={product => {
          navigation.navigate(ROUTE_NAMES.ProductDetails, { product });
        }}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={wishlistedIds.includes(item.id)}
      />
    ),
    [handleToggleWishlist, wishlistedIds, navigation],
  );

  const EmptyComponent = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <AppText>No products found</AppText>
      </View>
    );
  }, []);

  const handleEndReached = useCallback(() => {
    if (!loading && !loadingMore && hasMore) {
      loadMore();
    }
  }, [loading, loadingMore, hasMore, loadMore]);

  const keyExtractor = useCallback((item: Product) => String(item.id), []);

  useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
  }, [products.length, loadProducts]);

  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <AppText>Error loading products</AppText>
        <AppText style={styles.retry} onPress={loadProducts}>
          Retry
        </AppText>
      </View>
    );
  }
  if (loading && products.length === 0) {
    return <Loader message="Loading products..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <AppText style={styles.eyebrow}>SMARTCART</AppText>
          <AppText style={styles.heading}>Discover products</AppText>
        </View>

        <AppText style={styles.count}>
          {products.length} / {total} products
        </AppText>
      </View>
      <Pressable onPress={() => navigation.navigate(ROUTE_NAMES.Cart)}>
        <AppText fontSize={16} style={styles.cartButton}>
          Cart ({cartItemCount})
        </AppText>
      </Pressable>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        ListEmptyComponent={EmptyComponent}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refresh} />
        }
        ListFooterComponent={() =>
          loadingMore ? (
            <Loader size="small" message="" containerStyle={styles.footer} />
          ) : null
        }
        onEndReached={handleEndReached}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        removeClippedSubviews
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#777777',
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#171717',
    marginTop: 5,
  },
  count: {
    fontSize: 12,
    color: '#777777',
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  row: {
    alignItems: 'stretch',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  footer: {
    paddingVertical: 10,
  },
  retry: {
    marginTop: 12,
    color: '#2563EB',
    fontWeight: '600',
  },
  cartButton: {
    color: '#2563EB',
    fontWeight: '600',
    alignSelf: 'flex-end',
    marginRight: 18,
    marginVertical: 10,
  },
});
