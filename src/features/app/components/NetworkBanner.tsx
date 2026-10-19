import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import AppText from '../../../shared/components/AppText';
import { moderateScale } from '../scripts/scaling';

const NetworkBanner = () => {
  const networkStatusRef = useRef<string | null>(null);
  const [isConnectionOn, setIsConnectionOn] = useState<boolean | null>(null);
  const { isConnected, isInternetReachable } = useNetInfo();
  const isOnline = isConnected && isInternetReachable;

  useEffect(() => {
    if (isOnline === null || isOnline === undefined) return;

    if (!isOnline) {
      if (networkStatusRef.current !== 'offline') {
        setIsConnectionOn(false);
      }
      networkStatusRef.current = 'offline';
      return;
    }

    if (networkStatusRef.current === 'offline') {
      setIsConnectionOn(true);
    }

    networkStatusRef.current = 'online';
  }, [isOnline]);

  if (isConnectionOn !== null) {
    return (
      <View style={[styles.banner, styles.offline]}>
        <AppText fontSize={13} style={styles.text}>
          {isConnectionOn === false
            ? "You're offline. Check your internet connection."
            : 'Back online'}
        </AppText>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  banner: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  offline: {
    backgroundColor: '#D32F2F',
  },
  online: {
    backgroundColor: '#2E7D32',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default NetworkBanner;
