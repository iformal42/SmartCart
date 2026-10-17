import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { useWishlistPersistence } from '../products/hooks/useWishlistPersistence';

function AppProvider() {
  useWishlistPersistence();
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <NavigationContainer>
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
