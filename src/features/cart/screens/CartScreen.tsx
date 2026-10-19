import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../../../shared/components/cart.slice';
import AppText from '../../../shared/components/AppText';
import { RootStackParamList } from '../../../types/naviagation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_NAMES } from '../../app/constants/route.constant';
import {
  moderateScale,
  moderateVerticalScale,
} from '../../app/scripts/scaling';

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => navigation.navigate(ROUTE_NAMES.Checkout)}
      >
        <AppText fontSize={16} style={styles.checkoutButtonText}>
          Proceed to Checkout
        </AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  list: {
    padding: moderateScale(16),
  },
  card: {
    flexDirection: 'row',
    padding: moderateScale(12),
    marginBottom: moderateVerticalScale(12),
    borderRadius: moderateScale(12),
    backgroundColor: '#F8F8F8',
  },
  image: {
    width: moderateScale(100),
    height: moderateVerticalScale(110),
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(8),
  },
  details: {
    flex: 1,
    marginLeft: moderateScale(12),
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    color: '#171717',
  },
  price: {
    fontWeight: '700',
    marginTop: moderateVerticalScale(8),
    color: '#171717',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateVerticalScale(12),
    gap: moderateScale(10),
  },
  quantityButton: {
    width: moderateScale(30),
    height: moderateVerticalScale(30),
    borderRadius: moderateScale(8),
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
    padding: moderateScale(20),
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
    marginTop: moderateVerticalScale(8),
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
    marginTop: moderateVerticalScale(8),
    color: '#777777',
  },
  checkoutButton: {
    backgroundColor: '#171717',
    paddingVertical: moderateVerticalScale(16),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginTop: moderateVerticalScale(20),
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
