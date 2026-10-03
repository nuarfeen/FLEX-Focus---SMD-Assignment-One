import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AttendanceActions from '../components/AttendanceActions';
import StatusChip from '../components/StatusChip';
import ThresholdBar from '../components/ThresholdBar';
import { ATTENDANCE_TARGET } from '../data';
import { colors, fonts } from '../theme';
import { getAttendance, getClassesNeeded, getClassesSkippable, isAtRisk, plural } from '../utils';

function Stat({ value, label }) {
  return <View style={styles.stat}><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>;
}

export default function CourseDetail({ course, onBack, onMark, onUndo }) {
  const attendance = getAttendance(course);
  const risk = isAtRisk(course);
  return (
    <>
      <Pressable onPress={onBack} style={styles.backButton} accessibilityRole="button"><Text style={styles.back}>‹  All courses</Text></Pressable>

      <View style={[styles.hero, { backgroundColor: course.color }]}>
        <Text style={styles.heroCode}>{course.code}</Text>
        <Text style={styles.heroTitle}>{course.name}</Text>
        <Text style={styles.heroTeacher}>{course.teacher}</Text>
      </View>

      <View style={styles.stats}>
        <Stat value={`${attendance}%`} label="ATTENDANCE" />
        <Stat value={`${course.marks}%`} label="MARKS" />
        <Stat value={`${course.attended}/${course.held}`} label="CLASSES" />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>What to do next</Text>
        <StatusChip course={course} />
        <Text style={styles.cardCopy}>
          {risk
            ? `Attend the next ${plural(getClassesNeeded(course), 'class', 'classes')} without missing any to reach ${ATTENDANCE_TARGET}%.`
            : `You are ${attendance - ATTENDANCE_TARGET}% above the target and can miss ${plural(getClassesSkippable(course), 'class', 'classes')} before dropping below ${ATTENDANCE_TARGET}%.`}
        </Text>
        <ThresholdBar value={attendance} color={risk ? colors.alert : colors.action} />
        <View style={{ height: 16 }} />
        <AttendanceActions course={course} onMark={onMark} onUndo={onUndo} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Next class</Text>
        <Text style={styles.nextClass}>{course.room}</Text>
        <Text style={styles.cardCopy}>Suggested focus: {course.next}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Topics covered</Text>
        {course.topics.map((topic) => <View style={styles.topicRow} key={topic}><Text style={styles.topicCheck}>✓</Text><Text style={styles.topicText}>{topic}</Text></View>)}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: { alignSelf: 'flex-start', backgroundColor: colors.paper, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 9, marginBottom: 14 },
  back: { color: colors.ink, fontFamily: fonts.bodyBold, fontSize: 13 },
  hero: { borderRadius: 24, padding: 22, marginBottom: 14 },
  heroCode: { color: 'rgba(255,255,255,0.8)', fontFamily: fonts.monoBold, fontSize: 12, letterSpacing: 1.4 },
  heroTitle: { color: '#FFFFFF', fontFamily: fonts.display, fontSize: 28, lineHeight: 32, marginTop: 8 },
  heroTeacher: { color: 'rgba(255,255,255,0.85)', fontFamily: fonts.body, fontSize: 14, marginTop: 8 },
  stats: { flexDirection: 'row', backgroundColor: colors.paper, borderRadius: 20, paddingVertical: 16, marginBottom: 14 },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { color: colors.ink, fontFamily: fonts.display, fontSize: 24 },
  statLabel: { color: colors.muted, fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1, marginTop: 3 },
  card: { backgroundColor: colors.paper, borderRadius: 20, padding: 16, marginBottom: 12 },
  cardTitle: { color: colors.ink, fontFamily: fonts.displayMid, fontSize: 18, marginBottom: 10 },
  cardCopy: { color: colors.muted, fontFamily: fonts.body, fontSize: 13, lineHeight: 20, marginTop: 10 },
  nextClass: { color: colors.action, fontFamily: fonts.bodyBold, fontSize: 15, marginBottom: 4 },
  topicRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  topicCheck: { color: colors.safe, fontFamily: fonts.bodyBold, marginRight: 10 },
  topicText: { color: colors.ink, fontFamily: fonts.body, fontSize: 14 },
});
