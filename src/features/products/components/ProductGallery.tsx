import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, View, Dimensions } from 'react-native';
import { Product } from '../../../types/product';
import AppText from '../../../shared/components/AppText';
import {
  moderateScale,
  moderateVerticalScale,
} from '../../app/scripts/scaling';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const images = product.images?.length ? product.images : [product.thumbnail];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(uri, index) => `${uri}-${index}`}
        onMomentumScrollEnd={event => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / SCREEN_WIDTH,
          );
          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      />

      <View style={styles.indicators}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      <AppText style={styles.imageCount} fontSize={12}>
        {activeIndex + 1} / {images.length}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH - moderateScale(40),
    height: moderateVerticalScale(280),
    backgroundColor: '#F7F7F7',
    borderRadius: moderateScale(16),
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: moderateVerticalScale(12),
    gap: moderateScale(6),
  },
  dot: {
    width: moderateScale(6),
    height: moderateVerticalScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: '#D4D4D4',
  },
  activeDot: {
    width: moderateScale(18),
    backgroundColor: '#171717',
  },
  imageCount: {
    textAlign: 'center',
    color: '#777777',
    marginTop: moderateVerticalScale(8),
  },
});
