import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  TextInput,
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
import { productsService } from '../services/product.service';
import ProductCategory from '../components/ProductCategory';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

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
  useEffect(() => {
    const query = searchQuery.trim();

    if (!query) {
      setSearchResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setSearching(true);
        const result = await productsService.searchProducts(query);
        setSearchResults(result.products);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    if (!selectedCategory) {
      setCategoryProducts([]);
      return;
    }

    async function loadCategoryProducts() {
      setLoadingCategory(true);

      try {
        const result = await productsService.getProductsByCategory(
          selectedCategory!,
        );

        setCategoryProducts(result.products);
      } catch (error) {
        console.error('Failed to load category products:', error);
        setCategoryProducts([]);
      } finally {
        setLoadingCategory(false);
      }
    }
    loadCategoryProducts();
  }, [selectedCategory, setCategoryProducts, setLoadingCategory]);

  useEffect(() => {
    productsService
      .getCategories()
      .then(setCategories)
      .catch(error => console.error('Failed to load categories:', error));
  }, []);

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

  const displayedProducts = searchQuery.trim()
    ? searchResults
    : selectedCategory
    ? categoryProducts
    : products;

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
      <View
        style={[
          {
            flexDirection: 'row',
            gap: 10,
          },
          !searching && { marginRight: 40 },
        ]}
      >
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search products..."
          style={styles.searchInput}
        />
        {searching && (
          <Loader size="small" message="" containerStyle={styles.loader} />
        )}
      </View>
      <ProductCategory
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 18,
        }}
      >
        <Pressable
          onPress={() => navigation.navigate(ROUTE_NAMES.OrderHistory)}
          style={styles.headerButton}
        >
          <AppText fontSize={13} style={styles.headerButtonText}>
            My Orders
          </AppText>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(ROUTE_NAMES.Cart)}>
          <AppText fontSize={16} style={styles.cartButton}>
            🛒 ({cartItemCount})
          </AppText>
        </Pressable>
      </View>
      {loadingCategory && (
        <Loader size="small" message="" containerStyle={styles.loader} />
      )}
      <FlatList
        data={displayedProducts}
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
  headerButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
  },
  headerButtonText: {
    color: '#171717',
    fontWeight: '600',
  },
  searchInput: {
    height: 46,
    flex: 1,
    marginLeft: 10,
    marginBottom: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    color: '#171717',
  },
  loader: {
    flex: 0,
    marginRight: 10,
    justifyContent: 'center',
  },
});
