import React, { useMemo } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import CourseCard from '../components/CourseCard';
import Pill from '../components/Pill';
import { colors, fonts } from '../theme';
import { isAtRisk, SORTS } from '../utils';

const FILTERS = ['All', 'On track', 'At risk'];

// query/filter/sort live in App (`view`) so they survive opening a course and coming back.
export default function Courses({ courses, view, onViewChange, onOpenCourse, onMark, onUndo }) {
  const { query, filter, sort } = view;
  const setQuery = (value) => onViewChange({ ...view, query: value });
  const setFilter = (value) => onViewChange({ ...view, filter: value });
  const setSort = (value) => onViewChange({ ...view, sort: value });

  const visible = useMemo(() => {
    const text = query.trim().toLowerCase();
    const list = courses.filter((course) => {
      const matchesQuery = `${course.code} ${course.name}`.toLowerCase().includes(text);
      const matchesFilter = filter === 'All' || (filter === 'At risk') === isAtRisk(course);
      return matchesQuery && matchesFilter;
    });
    return SORTS[sort] ? [...list].sort(SORTS[sort]) : list;
  }, [courses, query, filter, sort]);

  return (
    <>
      <Text style={styles.title}>Courses</Text>
      <Text style={styles.subtitle}>Mark today's class, or open a course to see what to do next.</Text>
      <TextInput value={query} onChangeText={setQuery} placeholder="Search by code or name" placeholderTextColor="#9A9DB8" style={styles.search} autoCorrect={false} clearButtonMode="while-editing" returnKeyType="search" />
      <Text style={styles.label}>SHOW</Text>
      <View style={styles.row}>{FILTERS.map((item) => <Pill key={item} active={filter === item} onPress={() => setFilter(item)}>{item}</Pill>)}</View>
      <Text style={styles.label}>SORT BY</Text>
      <View style={styles.row}>{Object.keys(SORTS).map((item) => <Pill key={item} active={sort === item} onPress={() => setSort(item)}>{item}</Pill>)}</View>

      {visible.length === 0
        ? <View style={styles.empty}><Text style={styles.emptyTitle}>No courses match</Text><Text style={styles.emptyCopy}>Clear the search or set the filter to All.</Text></View>
        : visible.map((course) => <CourseCard key={course.id} course={course} onOpen={() => onOpenCourse(course.id)} onMark={(status) => onMark(course.id, status)} onUndo={() => onUndo(course.id)} />)}
    </>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.ink, fontFamily: fonts.display, fontSize: 30 },
  subtitle: { color: colors.muted, fontFamily: fonts.body, fontSize: 14, lineHeight: 20, marginTop: 4, marginBottom: 16 },
  search: { backgroundColor: colors.paper, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 13, color: colors.ink, fontFamily: fonts.body, fontSize: 14, marginBottom: 14 },
  label: { color: colors.muted, fontFamily: fonts.monoBold, fontSize: 10, letterSpacing: 1.2, marginBottom: 8 },
  row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 14 },
  empty: { alignItems: 'center', backgroundColor: colors.paper, borderRadius: 18, padding: 30, marginTop: 8 },
  emptyTitle: { color: colors.ink, fontFamily: fonts.displayMid, fontSize: 17 },
  emptyCopy: { color: colors.muted, fontFamily: fonts.body, marginTop: 5, textAlign: 'center' },
});
