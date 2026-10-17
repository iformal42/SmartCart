import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Product } from '../../../types/product';
import ProductCard from '../components/ProductCard';

export const products: Product[] = [
  {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    description:
      'A popular mascara known for its volumizing and lengthening effects.',
    category: 'beauty',
    price: 9.99,
    discountPercentage: 10.48,
    rating: 2.56,
    stock: 99,
    brand: 'Essence',
    thumbnail:
      'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
    ],
  },
  {
    id: 2,
    title: 'Eyeshadow Palette with Mirror',
    description: 'A versatile eyeshadow palette with a built-in mirror.',
    category: 'beauty',
    price: 19.99,
    discountPercentage: 18.19,
    rating: 2.86,
    stock: 34,
    brand: 'Glamour Beauty',
    thumbnail:
      'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp',
    ],
  },
  {
    id: 3,
    title: 'Powder Canister',
    description:
      'A finely milled setting powder designed to set makeup and control shine.',
    category: 'beauty',
    price: 14.99,
    discountPercentage: 9.84,
    rating: 4.64,
    stock: 89,
    brand: 'Velvet Touch',
    thumbnail:
      'https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp',
    ],
  },
  {
    id: 4,
    title: 'Red Lipstick',
    description: 'A classic red lipstick with a creamy, pigmented finish.',
    category: 'beauty',
    price: 12.99,
    discountPercentage: 12.16,
    rating: 4.36,
    stock: 91,
    brand: 'Chic Cosmetics',
    thumbnail:
      'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp',
    ],
  },
  {
    id: 5,
    title: 'Red Nail Polish',
    description: 'A rich, glossy red nail polish with a quick-drying formula.',
    category: 'beauty',
    price: 8.99,
    discountPercentage: 11.44,
    rating: 4.32,
    stock: 79,
    brand: 'Nail Couture',
    thumbnail:
      'https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp',
    ],
  },
  {
    id: 6,
    title: 'Calvin Klein CK One',
    description: 'A classic unisex fragrance with a fresh and clean scent.',
    category: 'fragrances',
    price: 49.99,
    discountPercentage: 1.89,
    rating: 4.37,
    stock: 29,
    brand: 'Calvin Klein',
    thumbnail:
      'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp',
      'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/2.webp',
      'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/3.webp',
    ],
  },
  {
    id: 7,
    title: 'Chanel Coco Noir Eau De',
    description:
      'An elegant fragrance featuring grapefruit, rose, and sandalwood notes.',
    category: 'fragrances',
    price: 129.99,
    discountPercentage: 16.51,
    rating: 4.26,
    stock: 58,
    brand: 'Chanel',
    thumbnail:
      'https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp',
      'https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/2.webp',
      'https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/3.webp',
    ],
  },
  {
    id: 8,
    title: "Dior J'adore",
    description:
      'A luxurious floral fragrance with ylang-ylang, rose, and jasmine.',
    category: 'fragrances',
    price: 89.99,
    discountPercentage: 14.72,
    rating: 3.8,
    stock: 98,
    brand: 'Dior',
    thumbnail:
      "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp",
    images: [
      "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/1.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/2.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/3.webp",
    ],
  },
  {
    id: 9,
    title: 'Dolce Shine Eau de',
    description:
      'A vibrant fruity fragrance featuring mango, jasmine, and blonde woods.',
    category: 'fragrances',
    price: 69.99,
    discountPercentage: 0.62,
    rating: 3.96,
    stock: 4,
    brand: 'Dolce & Gabbana',
    thumbnail:
      'https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/1.webp',
      'https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/2.webp',
      'https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/3.webp',
    ],
  },
  {
    id: 10,
    title: 'Gucci Bloom Eau de',
    description:
      'A floral fragrance featuring tuberose, jasmine, and Rangoon creeper.',
    category: 'fragrances',
    price: 79.99,
    discountPercentage: 14.39,
    rating: 2.74,
    stock: 91,
    brand: 'Gucci',
    thumbnail:
      'https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/1.webp',
      'https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/2.webp',
      'https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/3.webp',
    ],
  },
];

export default function ProductListScreen() {
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
        // isWishlisted={wishlistedIds.includes(item.id)}
      />
    ),
    [],
  );

  const keyExtractor = useCallback((item: Product) => String(item.id), []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>SMARTCART</Text>
          <Text style={styles.heading}>Discover products</Text>
        </View>

        <Text style={styles.count}>
          {products.length} / {10}
        </Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
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
});
