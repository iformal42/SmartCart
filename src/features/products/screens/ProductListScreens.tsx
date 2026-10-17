import React, { useCallback, useEffect } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Product } from '../../../types/product';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import Loader from '../../../shared/components/Loader';
import AppText from '../../../shared/components/AppText';

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
  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        onPress={() => {
          console.log(`Pressed product: ${item.title}`);
        }}
        onToggleWishlist={(product: Product) => {
          console.log(` wishlist: ${product.title}`);
        }}
      />
    ),
    [],
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
});
