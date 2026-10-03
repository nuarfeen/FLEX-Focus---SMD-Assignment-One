import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

// One cell of the summary strip.
export default function StatCard({ label, value, helper, last }) {
  return (
    <View style={[styles.cell, !last && styles.divider]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.helper}>{helper}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cell: { flex: 1, paddingHorizontal: 14, paddingVertical: 14 },
  divider: { borderRightWidth: 1, borderRightColor: colors.line },
  label: { color: colors.muted, fontSize: 10, fontFamily: fonts.mono, textTransform: 'uppercase', letterSpacing: 0.8 },
  value: { color: colors.ink, fontSize: 26, fontFamily: fonts.display, marginTop: 4 },
  helper: { color: colors.muted, fontSize: 11, fontFamily: fonts.body, marginTop: 2 },
});
