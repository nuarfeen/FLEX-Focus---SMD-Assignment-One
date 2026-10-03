import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ATTENDANCE_TARGET } from '../data';
import { colors, fonts } from '../theme';

// Progress bar with a marker at the attendance target, so "how far from safe" is visible at a glance.
export default function ThresholdBar({ value, color, showLabel = true }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.min(value, 100)}%`, backgroundColor: color }]} />
      </View>
      <View style={[styles.tick, { left: `${ATTENDANCE_TARGET}%` }]} />
      {showLabel && <Text style={[styles.label, { left: `${ATTENDANCE_TARGET}%` }]}>{ATTENDANCE_TARGET}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { height: 22, marginTop: 14, justifyContent: 'flex-start' },
  track: { backgroundColor: colors.canvas, height: 8, borderRadius: 4, overflow: 'hidden' },
  fill: { height: 8, borderRadius: 4 },
  tick: { position: 'absolute', top: -3, width: 2, height: 14, marginLeft: -1, backgroundColor: colors.ink, borderRadius: 1 },
  label: { position: 'absolute', top: 12, width: 24, marginLeft: -12, textAlign: 'center', fontFamily: fonts.mono, fontSize: 9, color: colors.muted },
});
