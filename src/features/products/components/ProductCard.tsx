import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import type { Product } from '../../../types/product';
import AppText from '../../../shared/components/AppText';

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
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  gridCard: {
    flex: 1,
    margin: 6,
  },

  horizontalCard: {
    width: 190,
    marginRight: 12,
  },
  imageContainer: {
    height: 155,
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
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: {
    color: '#E24C62',
  },
  details: {
    padding: 10,
  },
  category: {
    color: '#777777',
    textTransform: 'capitalize',
  },
  title: {
    minHeight: 38,
    marginTop: 5,
    fontWeight: '600',
    color: '#202020',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 7,
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
    marginTop: 8,
    fontWeight: '700',
    color: '#171717',
  },
});
