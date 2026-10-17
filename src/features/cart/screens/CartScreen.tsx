import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../../../shared/components/cart.slice';
import AppText from '../../../shared/components/AppText';

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.cart.items);

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <AppText fontSize={20} style={styles.emptyTitle}>
          Your cart is empty
        </AppText>
        <AppText fontSize={14} style={styles.emptySubtitle}>
          Add some products to get started.
        </AppText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => String(item.product.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.product.thumbnail }}
              style={styles.image}
              resizeMode="contain"
            />

            <View style={styles.details}>
              <AppText fontSize={15} style={styles.title} numberOfLines={2}>
                {item.product.title}
              </AppText>

              <AppText fontSize={16} style={styles.price}>
                ${item.product.price.toFixed(2)}
              </AppText>

              <View style={styles.quantityRow}>
                <Pressable
                  style={styles.quantityButton}
                  onPress={() => dispatch(decrementQuantity(item.product.id))}
                >
                  <AppText fontSize={18} style={styles.quantityButtonText}>
                    −
                  </AppText>
                </Pressable>

                <AppText fontSize={14} style={styles.quantity}>
                  {item.quantity}
                </AppText>

                <Pressable
                  style={[
                    styles.quantityButton,
                    item.quantity >= item.product.stock &&
                      styles.disabledButton,
                  ]}
                  disabled={item.quantity >= item.product.stock}
                  onPress={() => dispatch(incrementQuantity(item.product.id))}
                >
                  <AppText fontSize={18} style={styles.quantityButtonText}>
                    +
                  </AppText>
                </Pressable>

                <Pressable
                  onPress={() => dispatch(removeFromCart(item.product.id))}
                >
                  <AppText fontSize={12} style={styles.removeText}>
                    Remove
                  </AppText>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.summary}>
        <View style={styles.subtotalRow}>
          <AppText fontSize={17} style={styles.subtotalLabel}>
            Subtotal
          </AppText>
          <AppText fontSize={22} style={styles.subtotal}>
            ${subtotal.toFixed(2)}
          </AppText>
        </View>

        <AppText fontSize={12} style={styles.note}>
          Shipping and taxes calculated at checkout.
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
  },
  image: {
    width: 100,
    height: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    color: '#171717',
  },
  price: {
    fontWeight: '700',
    marginTop: 8,
    color: '#171717',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: '#171717',
  },
  quantity: {
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.35,
  },
  removeText: {
    color: '#DC2626',
    fontWeight: '600',
  },
  summary: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtotalLabel: {
    fontWeight: '600',
    color: '#171717',
  },
  subtotal: {
    fontWeight: '800',
    color: '#171717',
  },
  note: {
    marginTop: 8,
    color: '#777777',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  emptyTitle: {
    fontWeight: '700',
    color: '#171717',
  },
  emptySubtitle: {
    marginTop: 8,
    color: '#777777',
  },
});
