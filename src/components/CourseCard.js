import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AttendanceActions from './AttendanceActions';
import StatusChip from './StatusChip';
import ThresholdBar from './ThresholdBar';
import { colors, fonts } from '../theme';
import { getAttendance, isAtRisk } from '../utils';

export default function CourseCard({ course, onOpen, onMark, onUndo }) {
  const attendance = getAttendance(course);
  const risk = isAtRisk(course);
  return (
    <View style={styles.card}>
      <View style={[styles.stripe, { backgroundColor: course.color }]} />
      <Pressable style={styles.body} onPress={onOpen} accessibilityRole="button" accessibilityLabel={`${course.name}, ${attendance}% attendance`}>
        <View style={styles.top}>
          <View style={{ flex: 1 }}>
            <Text style={styles.code}>{course.code}</Text>
            <Text style={styles.name}>{course.name}</Text>
            <Text style={styles.teacher}>{course.teacher}</Text>
          </View>
          <View style={styles.pct}>
            <Text style={[styles.attendance, { color: risk ? colors.alert : colors.ink }]}>{attendance}<Text style={styles.unit}>%</Text></Text>
          </View>
        </View>
        <ThresholdBar value={attendance} color={risk ? colors.alert : colors.action} />
        <View style={styles.meta}>
          <StatusChip course={course} />
          <Text style={styles.count}>{course.attended}/{course.held} classes  ·  {course.marks}% marks</Text>
        </View>
      </Pressable>
      <View style={styles.actions}><AttendanceActions course={course} onMark={onMark} onUndo={onUndo} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.paper, borderRadius: 20, marginBottom: 14, overflow: 'hidden' },
  stripe: { height: 5 },
  body: { padding: 16, paddingBottom: 12 },
  top: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  code: { color: colors.muted, fontFamily: fonts.monoBold, fontSize: 11, letterSpacing: 1.2 },
  name: { color: colors.ink, fontFamily: fonts.displayMid, fontSize: 18, lineHeight: 22, marginTop: 3 },
  teacher: { color: colors.muted, fontFamily: fonts.body, fontSize: 12, marginTop: 3 },
  pct: { alignItems: 'flex-end' },
  attendance: { fontFamily: fonts.display, fontSize: 36, lineHeight: 38 },
  unit: { fontSize: 16 },
  meta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, flexWrap: 'wrap', gap: 6 },
  count: { color: colors.muted, fontFamily: fonts.mono, fontSize: 10 },
  actions: { paddingHorizontal: 16, paddingBottom: 16 },
});
