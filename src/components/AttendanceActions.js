import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';
import { todayKey } from '../utils';

// One attendance entry per course per day. After marking, the buttons turn into a status with Undo.
export default function AttendanceActions({ course, onMark, onUndo }) {
  const log = course.log && course.log.date === todayKey() ? course.log : null;

  if (log) {
    return (
      <View style={styles.row}>
        <View style={[styles.done, { backgroundColor: log.status === 'present' ? colors.safeSoft : colors.alertSoft }]}>
          <Text style={[styles.doneText, { color: log.status === 'present' ? '#0C7A4F' : '#C23B28' }]}>
            {log.status === 'present' ? '✓ Marked present today' : 'Marked absent today'}
          </Text>
        </View>
        <Pressable style={styles.undo} onPress={onUndo} accessibilityRole="button"><Text style={styles.undoText}>Undo</Text></Pressable>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <Pressable style={({ pressed }) => [styles.present, pressed && styles.pressed]} onPress={() => onMark('present')} accessibilityRole="button">
        <Text style={styles.presentText}>Present</Text>
      </Pressable>
      <Pressable style={({ pressed }) => [styles.absent, pressed && styles.pressed]} onPress={() => onMark('absent')} accessibilityRole="button">
        <Text style={styles.absentText}>Absent</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  pressed: { opacity: 0.7 },
  present: { flex: 1, backgroundColor: colors.ink, borderRadius: 12, paddingVertical: 11, alignItems: 'center' },
  presentText: { color: colors.paper, fontFamily: fonts.bodyBold, fontSize: 13 },
  absent: { flex: 1, borderWidth: 1.5, borderColor: colors.ink, borderRadius: 12, paddingVertical: 10, alignItems: 'center' },
  absentText: { color: colors.ink, fontFamily: fonts.bodyBold, fontSize: 13 },
  done: { flex: 1, borderRadius: 12, paddingVertical: 11, alignItems: 'center' },
  doneText: { fontFamily: fonts.bodyBold, fontSize: 13 },
  undo: { borderWidth: 1.5, borderColor: colors.line, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 16 },
  undoText: { color: colors.ink, fontFamily: fonts.bodyBold, fontSize: 13 },
});
