import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });

// Wordmark + a segmented control that switches views (state-driven, not a navigation bar).
export default function Header({ screens, active, onChange }) {
  return (
    <>
      <View style={styles.top}>
        <View>
          <Text style={styles.date}>{today.toUpperCase()}</Text>
          <Text style={styles.title}>Flex Focus</Text>
        </View>
        <View style={styles.avatar}><Text style={styles.avatarText}>AD</Text></View>
      </View>
      <View style={styles.segment}>
        {screens.map((item) => (
          <Pressable key={item} onPress={() => onChange(item)} style={[styles.option, active === item && styles.optionActive]} accessibilityRole="button" accessibilityState={{ selected: active === item }}>
            <Text style={[styles.optionText, active === item && styles.optionTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  date: { color: colors.muted, fontFamily: fonts.monoBold, fontSize: 11, letterSpacing: 1.2 },
  title: { color: colors.ink, fontFamily: fonts.display, fontSize: 32, marginTop: 2 },
  avatar: { backgroundColor: colors.highlight, height: 44, width: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.ink, fontFamily: fonts.displayMid, fontSize: 14 },
  segment: { flexDirection: 'row', backgroundColor: colors.paper, borderRadius: 16, padding: 4, marginBottom: 20 },
  option: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  optionActive: { backgroundColor: colors.ink },
  optionText: { color: colors.muted, fontFamily: fonts.bodyBold, fontSize: 13 },
  optionTextActive: { color: colors.paper },
});
