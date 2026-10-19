import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import AppText from '../../../shared/components/AppText';
import { addOrder } from '../slices/orders.slice';
import { clearCart } from '../../../shared/components/cart.slice';
import { RootStackParamList } from '../../../types/naviagation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_NAMES } from '../../app/constants/route.constant';
import {
  moderateScale,
  moderateVerticalScale,
} from '../../app/scripts/scaling';

export default function CheckoutScreen() {
  const items = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      return;
    }

    dispatch(
      addOrder({
        id: `ORD-${Date.now()}`,
        items: items.map(item => ({
          ...item,
          product: { ...item.product },
        })),
        total: subtotal,
        createdAt: new Date().toISOString(),
      }),
    );

    dispatch(clearCart());
    navigation.replace(ROUTE_NAMES.OrderConfirmation);
  };

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <AppText fontSize={18}>Your cart is empty.</AppText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppText fontSize={22} style={styles.heading}>
        Order Summary
      </AppText>

      {items.map(item => (
        <View key={item.product.id} style={styles.row}>
          <AppText fontSize={14} style={styles.product}>
            {item.product.title} × {item.quantity}
          </AppText>

          <AppText fontSize={14}>
            ${(item.product.price * item.quantity).toFixed(2)}
          </AppText>
        </View>
      ))}

      <View style={styles.totalRow}>
        <AppText fontSize={18} style={styles.totalLabel}>
          Total
        </AppText>
        <AppText fontSize={22} style={styles.total}>
          ${subtotal.toFixed(2)}
        </AppText>
      </View>

      <Pressable style={styles.button} onPress={handlePlaceOrder}>
        <AppText fontSize={16} style={styles.buttonText}>
          Place Order
        </AppText>
      </Pressable>

      <AppText fontSize={12} style={styles.note}>
        Demo checkout only. No real payment will be processed.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: moderateScale(20),
  },
  heading: {
    fontWeight: '700',
    marginBottom: moderateVerticalScale(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateVerticalScale(16),
    gap: moderateScale(12),
  },
  product: {
    flex: 1,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: moderateVerticalScale(18),
    marginTop: moderateVerticalScale(8),
  },
  totalLabel: {
    fontWeight: '600',
  },
  total: {
    fontWeight: '800',
  },
  button: {
    backgroundColor: '#171717',
    paddingVertical: moderateVerticalScale(16),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginTop: moderateVerticalScale(28),
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  note: {
    color: '#777777',
    textAlign: 'center',
    marginTop: moderateVerticalScale(12),
  },
});
