import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import Highlight from '../components/Highlight';
import StatCard from '../components/StatCard';
import TaskRow from '../components/TaskRow';
import ThresholdBar from '../components/ThresholdBar';
import { ATTENDANCE_TARGET, pastAssessments } from '../data';
import { chartConfig, colors, fonts } from '../theme';
import { average, getAttendance, getClassesNeeded, isAtRisk, plural } from '../utils';

const chartWidth = Math.min(Dimensions.get('window').width - 40, 390);

export default function Dashboard({ courses, tasks, onToggleTask, onOpenCourse, onGoPlanner }) {
  const averageAttendance = average(courses.map(getAttendance));
  const averageMarks = average(courses.map((c) => c.marks));
  const atRisk = courses.filter(isAtRisk);
  const openTasks = tasks.filter((task) => !task.done);
  const worst = [...atRisk].sort((a, b) => getAttendance(a) - getAttendance(b))[0];

  const trendLabels = [...pastAssessments.map((a) => a.label), 'Now'];
  const trendScores = [...pastAssessments.map((a) => a.score), averageMarks];
  const change = averageMarks - trendScores[0];

  return (
    <>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>TODAY'S FOCUS</Text>
        {worst ? (
          <Text style={styles.headline}><Highlight>{worst.code}</Highlight> needs {plural(getClassesNeeded(worst), 'more class', 'more classes')} to reach {ATTENDANCE_TARGET}%.</Text>
        ) : (
          <Text style={styles.headline}>Every course is <Highlight>on track</Highlight>. Keep it steady.</Text>
        )}
        <Text style={styles.heroCopy}>
          {atRisk.length ? `${plural(atRisk.length, 'course')} ${atRisk.length === 1 ? 'is' : 'are'} below the ${ATTENDANCE_TARGET}% attendance target.` : `All courses are above ${ATTENDANCE_TARGET}%. Use the planner to stay ahead.`}
        </Text>
        <Pressable style={styles.heroButton} onPress={() => (worst ? onOpenCourse(worst) : onGoPlanner())} accessibilityRole="button">
          <Text style={styles.heroButtonText}>{worst ? `Open ${worst.code}  →` : 'Open planner  →'}</Text>
        </Pressable>
      </View>

      <View style={styles.strip}>
        <StatCard label="Attendance" value={`${averageAttendance}%`} helper={averageAttendance < ATTENDANCE_TARGET ? 'needs attention' : 'on track'} />
        <StatCard label="Avg. marks" value={`${averageMarks}%`} helper={`${change >= 0 ? '+' : ''}${change}% this term`} />
        <StatCard label="Open tasks" value={openTasks.length} helper={openTasks.length ? 'to complete' : 'all done'} last />
      </View>

      <Text style={styles.section}>Attendance vs {ATTENDANCE_TARGET}% target</Text>
      <View style={styles.card}>
        {courses.map((course, index) => {
          const attendance = getAttendance(course);
          const risk = isAtRisk(course);
          return (
            <Pressable key={course.id} onPress={() => onOpenCourse(course)} style={[styles.barRow, index > 0 && styles.barRowBorder]} accessibilityRole="button">
              <View style={styles.barHead}>
                <Text style={styles.barCode}>{course.code}</Text>
                <Text style={[styles.barValue, { color: risk ? colors.alert : colors.ink }]}>{attendance}%</Text>
              </View>
              <ThresholdBar value={attendance} color={risk ? colors.alert : colors.action} showLabel={index === courses.length - 1} />
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.section}>Marks trend</Text>
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Average across assessments</Text>
        <LineChart data={{ labels: trendLabels, datasets: [{ data: trendScores }] }} width={chartWidth} height={190} yAxisSuffix="%" chartConfig={chartConfig} bezier withDots />
      </View>

      <Text style={styles.section}>Attendance by course</Text>
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Percentage per course</Text>
        <BarChart data={{ labels: courses.map((c) => c.code), datasets: [{ data: courses.map(getAttendance) }] }} width={chartWidth} height={190} yAxisSuffix="%" fromZero chartConfig={chartConfig} showValuesOnTopOfBars />
      </View>

      <Text style={styles.section}>Next actions</Text>
      {openTasks.length === 0
        ? <View style={styles.empty}><Text style={styles.emptyTitle}>Nothing pending</Text><Text style={styles.emptyCopy}>Add a task in the planner when something comes up.</Text></View>
        : openTasks.slice(0, 2).map((task) => <TaskRow key={task.id} task={task} onToggle={() => onToggleTask(task.id)} />)}
    </>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: colors.ink, borderRadius: 24, padding: 22, marginBottom: 14 },
  eyebrow: { color: colors.highlight, fontFamily: fonts.monoBold, fontSize: 11, letterSpacing: 1.4 },
  headline: { color: '#FFFFFF', fontFamily: fonts.display, fontSize: 28, lineHeight: 38, marginTop: 12 },
  heroCopy: { color: '#B9BBD9', fontFamily: fonts.body, fontSize: 13, lineHeight: 19, marginTop: 10 },
  heroButton: { alignSelf: 'flex-start', backgroundColor: colors.highlight, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 11, marginTop: 16 },
  heroButtonText: { color: colors.ink, fontFamily: fonts.bodyBold, fontSize: 13 },
  strip: { flexDirection: 'row', backgroundColor: colors.paper, borderRadius: 20, marginBottom: 22 },
  section: { color: colors.ink, fontFamily: fonts.displayMid, fontSize: 20, marginBottom: 10, marginTop: 4 },
  card: { backgroundColor: colors.paper, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6, marginBottom: 22 },
  barRow: { paddingVertical: 12 },
  barRowBorder: { borderTopWidth: 1, borderTopColor: colors.canvas },
  barHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  barCode: { color: colors.ink, fontFamily: fonts.monoBold, fontSize: 13, letterSpacing: 1 },
  barValue: { fontFamily: fonts.display, fontSize: 18 },
  chartCard: { backgroundColor: colors.paper, borderRadius: 20, paddingTop: 16, paddingBottom: 8, marginBottom: 22, overflow: 'hidden' },
  chartTitle: { color: colors.muted, fontFamily: fonts.mono, fontSize: 11, paddingHorizontal: 16, marginBottom: 6 },
  empty: { alignItems: 'center', backgroundColor: colors.paper, borderRadius: 18, padding: 24 },
  emptyTitle: { color: colors.ink, fontFamily: fonts.displayMid, fontSize: 17 },
  emptyCopy: { color: colors.muted, fontFamily: fonts.body, marginTop: 5, textAlign: 'center' },
});
