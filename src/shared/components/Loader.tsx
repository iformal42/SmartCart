import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  StyleProp,
} from 'react-native';
import AppText from './AppText';

interface LoaderProps {
  size?: 'small' | 'large';
  message?: string;
  containerStyle?: StyleProp<ViewStyle>;
}
function Loader({
  size = 'large',
  message = 'Loading...',
  containerStyle,
}: LoaderProps) {
  return (
    <View
      style={[
        size === 'small' ? styles.smallContainer : styles.container,
        containerStyle,
      ]}
    >
      <ActivityIndicator size={size} />
      <AppText>{message}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Loader;
