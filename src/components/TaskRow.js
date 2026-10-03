import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

const PRIORITY_STYLE = {
  High: { bg: colors.alertSoft, fg: '#C23B28' },
  Medium: { bg: colors.warnSoft, fg: '#8A6A00' },
  Low: { bg: colors.safeSoft, fg: '#0C7A4F' },
};

export default function TaskRow({ task, onToggle }) {
  const tone = PRIORITY_STYLE[task.priority];
  return (
    <Pressable onPress={onToggle} style={({ pressed }) => [styles.row, task.done && styles.rowDone, pressed && styles.pressed]} accessibilityRole="checkbox" accessibilityState={{ checked: task.done }}>
      <View style={[styles.check, task.done && styles.checkDone]}>{task.done && <Text style={styles.checkmark}>✓</Text>}</View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, task.done && styles.titleDone]}>{task.title}</Text>
        <Text style={styles.meta}>{task.course}  ·  due {task.due}</Text>
      </View>
      <View style={[styles.priority, { backgroundColor: tone.bg }]}>
        <Text style={[styles.priorityText, { color: tone.fg }]}>{task.priority}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { backgroundColor: colors.paper, borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  rowDone: { opacity: 0.55 },
  pressed: { transform: [{ scale: 0.99 }] },
  check: { height: 24, width: 24, borderRadius: 8, borderWidth: 2, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  checkDone: { backgroundColor: colors.highlight, borderColor: colors.ink },
  checkmark: { color: colors.ink, fontFamily: fonts.bodyBold, fontSize: 14 },
  title: { color: colors.ink, fontSize: 14, fontFamily: fonts.bodyBold },
  titleDone: { textDecorationLine: 'line-through' },
  meta: { color: colors.muted, fontSize: 11, fontFamily: fonts.mono, marginTop: 4 },
  priority: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5 },
  priorityText: { fontSize: 10, fontFamily: fonts.monoBold, textTransform: 'uppercase' },
});
