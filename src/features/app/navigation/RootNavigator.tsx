import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../../products/screens/ProductListScreens';
import { RootStackParamList } from '../../../types/naviagation';
import { ROUTE_NAMES } from '../constants/route.constant';
import ProductDetailsScreen from '../../products/screens/ProductDetailsScreen';
import CartScreen from '../../cart/screens/CartScreen';
import CheckoutScreen from '../../order/screen/CheckoutScreen';
import OrderConfirmationScreen from '../../order/screen/OrderConfirmationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTE_NAMES.ProductList}
        component={ProductListScreen}
        options={{ title: 'Discover Products' }}
      />

      <Stack.Screen
        name={ROUTE_NAMES.ProductDetails}
        component={ProductDetailsScreen}
        options={{ title: 'Product Details' }}
      />
      <Stack.Screen
        name={ROUTE_NAMES.Cart}
        component={CartScreen}
        options={{ title: 'My Cart' }}
      />
      <Stack.Screen
        name={ROUTE_NAMES.Checkout}
        component={CheckoutScreen}
        options={{ title: 'Checkout' }}
      />
      <Stack.Screen
        name={ROUTE_NAMES.OrderConfirmation}
        component={OrderConfirmationScreen}
        options={{ title: 'Order Confirmation' }}
      />
    </Stack.Navigator>
  );
}
