import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';
import { getClassesNeeded, getClassesSkippable, isAtRisk, plural } from '../utils';

// Tells the student what to do next: attend N more classes, or how many they can safely miss.
export default function StatusChip({ course }) {
  const risk = isAtRisk(course);
  const text = risk
    ? `Attend next ${plural(getClassesNeeded(course), 'class', 'classes')}`
    : `Can miss ${plural(getClassesSkippable(course), 'class', 'classes')}`;
  return (
    <View style={[styles.chip, { backgroundColor: risk ? colors.alertSoft : colors.safeSoft }]}>
      <View style={[styles.dot, { backgroundColor: risk ? colors.alert : colors.safe }]} />
      <Text style={[styles.text, { color: risk ? '#C23B28' : '#0C7A4F' }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5, gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  text: { fontSize: 11, fontFamily: fonts.bodyBold },
});
