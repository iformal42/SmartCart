import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import type { Product } from '../../../types/product';
import AppText from '../../../shared/components/AppText';
import {
  moderateScale,
  moderateVerticalScale,
} from '../../app/scripts/scaling';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted?: boolean;
  variant?: 'grid' | 'horizontal';
}

function ProductCard({
  product,
  onPress,
  onToggleWishlist,
  isWishlisted = false,
  variant = 'grid',
}: ProductCardProps) {
  const handlePress = () => {
    onPress(product);
  };

  const handleWishlist = () => {
    onToggleWishlist(product);
  };

  return (
    <Pressable
      style={[
        styles.card,
        variant === 'grid' ? styles.gridCard : styles.horizontalCard,
      ]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`View ${product.title}`}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="contain"
        />

        <Pressable
          onPress={handleWishlist}
          style={styles.wishlistButton}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={
            isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'
          }
        >
          <AppText style={styles.heart} fontSize={21}>
            {isWishlisted ? '♥' : '♡'}
          </AppText>
        </Pressable>
      </View>

      <View style={styles.details}>
        <AppText style={styles.category} numberOfLines={1} fontSize={11}>
          {product.category}
        </AppText>

        <AppText style={styles.title} numberOfLines={2} fontSize={14}>
          {product.title}
        </AppText>

        <View style={styles.ratingRow}>
          <AppText style={styles.rating} fontSize={12}>
            ★ {product.rating.toFixed(1)}
          </AppText>
          <AppText style={styles.stock} fontSize={10}>
            {product.stock > 0 ? 'In stock' : 'Out of stock'}
          </AppText>
        </View>

        <AppText style={styles.price}>${product.price.toFixed(2)}</AppText>
      </View>
    </Pressable>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(14),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  gridCard: {
    flex: 1,
    margin: moderateScale(6),
  },

  horizontalCard: {
    width: moderateScale(190),
    marginRight: moderateScale(12),
  },
  imageContainer: {
    height: moderateVerticalScale(155),
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '85%',
    height: '85%',
  },
  wishlistButton: {
    position: 'absolute',
    top: moderateVerticalScale(8),
    right: moderateScale(8),
    width: moderateScale(34),
    height: moderateVerticalScale(34),
    borderRadius: moderateScale(17),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: {
    color: '#E24C62',
  },
  details: {
    padding: moderateScale(10),
  },
  category: {
    color: '#777777',
    textTransform: 'capitalize',
  },
  title: {
    minHeight: moderateVerticalScale(38),
    marginTop: moderateVerticalScale(5),
    fontWeight: '600',
    color: '#202020',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateVerticalScale(7),
  },
  rating: {
    color: '#A56A00',
    fontSize: 12,
    fontWeight: '600',
  },
  stock: {
    color: '#39805A',
  },
  price: {
    marginTop: moderateVerticalScale(8),
    fontWeight: '700',
    color: '#171717',
  },
});
