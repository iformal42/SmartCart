import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { useWishlistPersistence } from '../products/hooks/useWishlistPersistence';
import { useCartPersistence } from '../cart/hooks/useCartPersistence';
import NetworkBanner from './components/NetworkBanner';

function AppProvider() {
  useWishlistPersistence();
  useCartPersistence();
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <NavigationContainer>
        <NetworkBanner />

        <RootNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default AppProvider;
