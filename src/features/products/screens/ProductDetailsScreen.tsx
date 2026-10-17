import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/naviagation';
import { ROUTE_NAMES } from '../../app/constants/route.constant';
import AppText from '../../../shared/components/AppText';

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTE_NAMES.ProductDetails
>;

export default function ProductDetailsScreen({ route }: Props) {
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
        resizeMode="contain"
      />

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
      </View>

      <AppText style={styles.stock} fontSize={16}>
        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
      </AppText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 280,
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
  },
  category: {
    marginTop: 20,
    color: '#777777',
    textTransform: 'capitalize',
  },
  title: {
    fontWeight: '700',
    color: '#171717',
    marginTop: 8,
  },
  rating: {
    marginTop: 8,
    color: '#555555',
  },
  price: {
    fontWeight: '700',
    color: '#171717',
    marginTop: 12,
  },
  descriptionContainer: {
    marginTop: 24,
  },
  heading: {
    fontWeight: '700',
    color: '#171717',
    marginBottom: 8,
  },
  description: {
    lineHeight: 23,
    color: '#555555',
  },
  stock: {
    marginTop: 20,
    color: '#16803D',
    fontWeight: '600',
  },
});
