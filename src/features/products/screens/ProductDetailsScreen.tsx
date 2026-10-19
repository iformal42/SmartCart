import React, { useCallback } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/naviagation';
import { ROUTE_NAMES } from '../../app/constants/route.constant';
import AppText from '../../../shared/components/AppText';
import ProductGallery from '../components/ProductGallery';
import Loader from '../../../shared/components/Loader';
import ProductCard from '../components/ProductCard';
import { useSimilarProducts } from '../hooks/useSimilarProducts';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { useNavigation } from '@react-navigation/native';
import { toggleWishlist } from '../slices/whitelists.slice';
import { Product } from '../../../types/product';
import { addToCart } from '../../../shared/components/cart.slice';
import {
  moderateScale,
  moderateVerticalScale,
} from '../../app/scripts/scaling';

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTE_NAMES.ProductDetails
>;

export default function ProductDetailsScreen({ route }: Props) {
  const { product } = route.params;
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const wishlistedIds = useAppSelector(state =>
    state.wishlist.items.map(product => product.id),
  );

  const handleToggleWishlist = useCallback(
    (product: Product) => {
      dispatch(toggleWishlist(product));
    },
    [dispatch],
  );
  const { products: similarProducts, loading: similarLoading } =
    useSimilarProducts(product.category, product.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProductGallery product={product} />

      <AppText style={styles.category}>{product.category}</AppText>
      <AppText style={styles.title} fontSize={24}>
        {product.title}
      </AppText>
      <AppText style={styles.rating} fontSize={15}>
        ★ {product.rating}
      </AppText>
      <AppText style={styles.price} fontSize={24}>
        ${product.price.toFixed(2)}
      </AppText>

      <View style={styles.descriptionContainer}>
        <AppText style={styles.heading} fontSize={18}>
          Description
        </AppText>
        <AppText style={styles.description} fontSize={15}>
          {product.description}
        </AppText>
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            product.stock <= 0 && { opacity: 0.5 },
          ]}
          onPress={handleAddToCart}
          disabled={product.stock <= 0}
        >
          <AppText style={styles.addToCartText} fontSize={16}>
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </AppText>
        </TouchableOpacity>
        <AppText style={styles.heading} fontSize={18}>
          Similar products
        </AppText>

        {similarLoading ? (
          <Loader size="small" message="" />
        ) : (
          <FlatList
            horizontal
            data={similarProducts}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <ProductCard
                variant="horizontal"
                product={item}
                onPress={() => {
                  navigation.push(ROUTE_NAMES.ProductDetails, {
                    product: item,
                  });
                }}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={wishlistedIds.includes(item.id)}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>

      <AppText style={styles.stock} fontSize={16}>
        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
      </AppText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(20),
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: moderateVerticalScale(280),
    backgroundColor: '#F7F7F7',
    borderRadius: moderateScale(16),
  },
  category: {
    marginTop: moderateVerticalScale(20),
    color: '#777777',
    textTransform: 'capitalize',
  },
  title: {
    fontWeight: '700',
    color: '#171717',
    marginTop: moderateVerticalScale(8),
  },
  rating: {
    marginTop: moderateVerticalScale(8),
    color: '#555555',
  },
  price: {
    fontWeight: '700',
    color: '#171717',
    marginTop: moderateVerticalScale(12),
  },
  descriptionContainer: {
    marginTop: moderateVerticalScale(24),
  },
  heading: {
    fontWeight: '700',
    color: '#171717',
    marginBottom: moderateVerticalScale(8),
  },
  description: {
    lineHeight: moderateVerticalScale(23),
    color: '#555555',
  },
  stock: {
    marginTop: moderateVerticalScale(20),
    color: '#16803D',
    fontWeight: '600',
  },
  addToCartButton: {
    backgroundColor: '#171717',
    paddingVertical: moderateVerticalScale(16),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginTop: moderateVerticalScale(20),
  },
  addToCartText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
