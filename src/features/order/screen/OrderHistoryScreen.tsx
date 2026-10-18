import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useAppSelector } from '../../../hooks/hooks';
import AppText from '../../../shared/components/AppText';

export default function OrderHistoryScreen() {
  const orders = useAppSelector(state => state.order.items);

  if (orders.length === 0) {
    return (
      <View style={styles.empty}>
        <AppText fontSize={20}>No orders yet</AppText>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={orders}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <AppText fontSize={16} style={styles.orderId}>
            {item.id}
          </AppText>

          <AppText fontSize={13} style={styles.date}>
            {new Date(item.createdAt).toLocaleString()}
          </AppText>

          <AppText fontSize={14}>{item.items.length} product type(s)</AppText>

          <AppText fontSize={18} style={styles.total}>
            ${item.total.toFixed(2)}
          </AppText>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  orderId: {
    fontWeight: '700',
  },
  date: {
    color: '#777777',
    marginTop: 6,
    marginBottom: 12,
  },
  total: {
    fontWeight: '800',
    marginTop: 10,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
