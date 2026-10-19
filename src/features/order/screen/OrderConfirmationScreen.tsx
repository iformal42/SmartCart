import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppText from '../../../shared/components/AppText';
import { RootStackParamList } from '../../../types/naviagation';
import { ROUTE_NAMES } from '../../app/constants/route.constant';
import {
  moderateScale,
  moderateVerticalScale,
} from '../../app/scripts/scaling';

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTE_NAMES.OrderConfirmation
>;

export default function OrderConfirmationScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <AppText fontSize={48}>✓</AppText>

      <AppText fontSize={24} style={styles.title}>
        Order placed successfully!
      </AppText>

      <AppText fontSize={15} style={styles.subtitle}>
        Thank you for shopping with SmartCart.
      </AppText>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('ProductList')}
      >
        <AppText fontSize={16} style={styles.buttonText}>
          Continue Shopping
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(24),
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
    marginTop: moderateVerticalScale(16),
  },
  subtitle: {
    color: '#777777',
    textAlign: 'center',
    marginTop: moderateVerticalScale(10),
  },
  button: {
    backgroundColor: '#171717',
    paddingVertical: moderateVerticalScale(16),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginTop: moderateVerticalScale(28),
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
