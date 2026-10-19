import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AppText from '../../../shared/components/AppText';
import {
  moderateScale,
  moderateVerticalScale,
} from '../../app/scripts/scaling';

function ProductCategory({
  selectedCategory,
  setSelectedCategory,
  categories,
}: {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  categories: string[];
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categories}
    >
      <TouchableOpacity
        style={[
          styles.categoryButton,
          selectedCategory === null && styles.selectedCategory,
        ]}
        onPress={() => setSelectedCategory(null)}
      >
        <AppText fontSize={13} style={styles.categoryButtonText}>
          All
        </AppText>
      </TouchableOpacity>

      {categories.map(category => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.selectedCategory,
          ]}
          onPress={() => setSelectedCategory(category)}
        >
          <AppText fontSize={13} style={styles.categoryButtonText}>
            {category}
          </AppText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categories: {
    paddingHorizontal: moderateScale(16),
    marginBottom: moderateVerticalScale(28),
    gap: moderateScale(8),
  },
  categoryButton: {
    height: moderateVerticalScale(32),
    paddingHorizontal: moderateScale(12),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  selectedCategory: {
    backgroundColor: '#E5E5E5',
    borderColor: '#171717',
  },
  categoryButtonText: {},
});

export default React.memo(ProductCategory);
