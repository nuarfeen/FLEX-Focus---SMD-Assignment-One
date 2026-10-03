import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { BricolageGrotesque_700Bold, BricolageGrotesque_800ExtraBold } from '@expo-google-fonts/bricolage-grotesque';
import { DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { DMMono_400Regular, DMMono_500Medium } from '@expo-google-fonts/dm-mono';
import Header from './src/components/Header';
import Courses from './src/screens/Courses';
import CourseDetail from './src/screens/CourseDetail';
import Dashboard from './src/screens/Dashboard';
import Planner from './src/screens/Planner';
import { initialCourses, initialTasks } from './src/data';
import { colors } from './src/theme';
import { todayKey } from './src/utils';

const SCREENS = ['Dashboard', 'Courses', 'Planner'];

// App owns the shared data (courses, tasks) and which view is visible.
// Views are switched with conditional rendering - no navigation library.
export default function App() {
  const [fontsLoaded] = useFonts({ BricolageGrotesque_700Bold, BricolageGrotesque_800ExtraBold, DMSans_400Regular, DMSans_700Bold, DMMono_400Regular, DMMono_500Medium });
  const [courses, setCourses] = useState(initialCourses);
  const [tasks, setTasks] = useState(initialTasks);
  const [screen, setScreen] = useState('Dashboard');
  const [detailId, setDetailId] = useState(null);
  const [courseView, setCourseView] = useState({ query: '', filter: 'All', sort: 'Default' });

  if (!fontsLoaded) return <SafeAreaView style={styles.safe} />;

  const detailCourse = courses.find((course) => course.id === detailId);
  const updateCourse = (id, change) => setCourses((current) => current.map((course) => (course.id === id ? change(course) : course)));

  // One attendance entry per course per day; Undo reverses it so the entry can be corrected.
  const markAttendance = (id, status) => updateCourse(id, (course) => (
    course.log && course.log.date === todayKey()
      ? course
      : { ...course, attended: course.attended + (status === 'present' ? 1 : 0), held: course.held + 1, log: { date: todayKey(), status } }
  ));
  const undoAttendance = (id) => updateCourse(id, (course) => (
    course.log && course.log.date === todayKey()
      ? { ...course, attended: course.attended - (course.log.status === 'present' ? 1 : 0), held: course.held - 1, log: null }
      : course
  ));

  const toggleTask = (id) => setTasks((current) => current.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  const addTask = (task) => setTasks((current) => [task, ...current]);
  const openCourse = (course) => { setDetailId(typeof course === 'string' ? course : course.id); setScreen('Course detail'); };
  const changeScreen = (name) => { setDetailId(null); setScreen(name); };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.canvas} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <Header screens={SCREENS} active={screen === 'Course detail' ? 'Courses' : screen} onChange={changeScreen} />

        {screen === 'Dashboard' && <Dashboard courses={courses} tasks={tasks} onToggleTask={toggleTask} onOpenCourse={openCourse} onGoPlanner={() => changeScreen('Planner')} />}
        {screen === 'Courses' && <Courses courses={courses} view={courseView} onViewChange={setCourseView} onOpenCourse={openCourse} onMark={markAttendance} onUndo={undoAttendance} />}
        {screen === 'Course detail' && detailCourse && <CourseDetail course={detailCourse} onBack={() => changeScreen('Courses')} onMark={(status) => markAttendance(detailCourse.id, status)} onUndo={() => undoAttendance(detailCourse.id)} />}
        {screen === 'Planner' && <Planner courses={courses} tasks={tasks} onToggleTask={toggleTask} onAddTask={addTask} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  container: { padding: 20, paddingBottom: 42 },
});
