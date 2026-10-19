import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { font } from '../../features/app/scripts/scaling';
type AppTextProps = TextProps & {
  children: React.ReactNode;
  fontSize?: number;
};

function AppText({ children, style, fontSize = 16, ...props }: AppTextProps) {
  return (
    <Text style={[styles.text, { fontSize: font(fontSize) }, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#000000',
  },
});

export default AppText;
