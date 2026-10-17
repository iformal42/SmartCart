import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Product } from '../../../types/product';

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
          <Text style={styles.heart}>{isWishlisted ? '♥' : '♡'}</Text>
        </Pressable>
      </View>

      <View style={styles.details}>
        <Text style={styles.category} numberOfLines={1}>
          {product.category}
        </Text>

        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <View style={styles.ratingRow}>
          <Text style={styles.rating}>★ {product.rating.toFixed(1)}</Text>
          <Text style={styles.stock}>
            {product.stock > 0 ? 'In stock' : 'Out of stock'}
          </Text>
        </View>

        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
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
    fontSize: 21,
    color: '#E24C62',
  },
  details: {
    padding: 10,
  },
  category: {
    fontSize: 11,
    color: '#777777',
    textTransform: 'capitalize',
  },
  title: {
    minHeight: 38,
    marginTop: 5,
    fontSize: 14,
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
    fontSize: 10,
    color: '#39805A',
  },
  price: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: '700',
    color: '#171717',
  },
});
