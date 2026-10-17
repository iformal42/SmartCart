import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function AppProvider() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text>App Provider Component</Text>
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
