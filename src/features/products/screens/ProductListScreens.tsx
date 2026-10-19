import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
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
import {
  moderateScale,
  moderateVerticalScale,
} from '../../app/scripts/scaling';

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
  const [sortBy, setSortBy] = useState('default');
  const [inStockOnly, setInStockOnly] = useState(false);

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

  const filteredProducts = displayedProducts
    .filter(product => !inStockOnly || product.stock > 0)
    .sort((a, b) => {
      switch (sortBy) {
        case 'priceLow':
          return a.price - b.price;
        case 'priceHigh':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

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
            gap: moderateScale(10),
          },
          !searching && { marginRight: moderateScale(40) },
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
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { label: 'Default', value: 'default' },
            { label: 'Price: Low', value: 'priceLow' },
            { label: 'Price: High', value: 'priceHigh' },
            { label: 'Top Rated', value: 'rating' },
          ].map(option => (
            <Pressable
              key={option.value}
              style={[
                styles.filterButton,
                sortBy === option.value && styles.activeFilter,
              ]}
              onPress={() => setSortBy(option.value)}
            >
              <AppText fontSize={12}>{option.label}</AppText>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Pressable
        style={styles.stockFilter}
        onPress={() => setInStockOnly(!inStockOnly)}
      >
        <AppText fontSize={13}>{inStockOnly ? '☑' : '☐'} In Stock Only</AppText>
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: moderateScale(18),
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
        data={filteredProducts}
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
        onEndReached={
          !searchQuery.trim() && !selectedCategory
            ? handleEndReached
            : undefined
        }
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
    paddingHorizontal: moderateScale(18),
    paddingTop: moderateVerticalScale(14),
    paddingBottom: moderateVerticalScale(16),
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
    marginTop: moderateVerticalScale(5),
  },
  count: {
    fontSize: 12,
    color: '#777777',
  },
  list: {
    paddingHorizontal: moderateScale(10),
    paddingBottom: moderateVerticalScale(20),
  },
  row: {
    alignItems: 'stretch',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateVerticalScale(50),
  },
  footer: {
    paddingVertical: moderateVerticalScale(10),
  },
  retry: {
    marginTop: moderateVerticalScale(12),
    color: '#2563EB',
    fontWeight: '600',
  },
  cartButton: {
    color: '#2563EB',
    fontWeight: '600',
    alignSelf: 'flex-end',
    marginRight: moderateScale(18),
    marginVertical: moderateVerticalScale(10),
  },
  headerButton: {
    paddingVertical: moderateVerticalScale(8),
    paddingHorizontal: moderateScale(12),
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: moderateScale(8),
  },
  headerButtonText: {
    color: '#171717',
    fontWeight: '600',
  },
  searchInput: {
    height: moderateVerticalScale(46),
    flex: 1,
    marginLeft: moderateScale(10),
    marginBottom: moderateVerticalScale(12),
    paddingHorizontal: moderateScale(14),
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: moderateScale(10),
    color: '#171717',
  },
  loader: {
    flex: 0,
    marginRight: moderateScale(10),
    justifyContent: 'center',
  },
  filterRow: {
    paddingHorizontal: moderateScale(16),
    marginBottom: moderateVerticalScale(10),
  },
  filterButton: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateVerticalScale(9),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginRight: moderateScale(8),
  },
  activeFilter: {
    backgroundColor: '#E5E5E5',
    borderColor: '#171717',
  },
  stockFilter: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateVerticalScale(12),
  },
});
