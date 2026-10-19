import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AppText from '../../../shared/components/AppText';
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
    paddingHorizontal: 16,
    marginBottom: 28,
    gap: 8,
  },
  categoryButton: {
    height: 32,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  selectedCategory: {
    backgroundColor: '#E5E5E5',
    borderColor: '#171717',
  },
  categoryButtonText: {
    // padding: 10,s
    // alignSelf: 'center',
  },
});

export default React.memo(ProductCategory);
