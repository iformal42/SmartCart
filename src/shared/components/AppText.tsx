import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
type AppTextProps = TextProps & {
  children: React.ReactNode;
};

function AppText({ children, style, ...props }: AppTextProps) {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#000000',
  },
});

export default AppText;
