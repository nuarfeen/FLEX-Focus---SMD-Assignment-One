import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fonts } from '../theme';

export default function Pill({ children, active, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.pill, active && styles.pillActive, pressed && styles.pressed]} accessibilityRole="button" accessibilityState={{ selected: !!active }}>
      <Text style={[styles.text, active && styles.textActive]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: { borderRadius: 999, backgroundColor: colors.paper, borderWidth: 1.5, borderColor: colors.line, paddingHorizontal: 14, paddingVertical: 8 },
  pillActive: { backgroundColor: colors.ink, borderColor: colors.ink },
  pressed: { opacity: 0.7 },
  text: { color: colors.ink, fontSize: 12, fontFamily: fonts.bodyBold },
  textActive: { color: colors.paper },
});
