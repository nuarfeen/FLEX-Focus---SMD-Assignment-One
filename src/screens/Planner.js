import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Pill from '../components/Pill';
import TaskRow from '../components/TaskRow';
import { DUE_OPTIONS, PRIORITIES } from '../data';
import { colors, fonts } from '../theme';
import { byPriority } from '../utils';

const MAX_TITLE = 60;

export default function Planner({ courses, tasks, onToggleTask, onAddTask }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState(courses[0].code);
  const [priority, setPriority] = useState('Medium');
  const [due, setDue] = useState(DUE_OPTIONS[1]);
  const [error, setError] = useState('');
  const [sortByPriority, setSortByPriority] = useState(false);

  const visibleTasks = sortByPriority ? [...tasks].sort(byPriority) : tasks;
  const remaining = tasks.filter((task) => !task.done).length;

  const save = () => {
    if (title.trim().length < 3) { setError('Enter a task with at least 3 characters.'); return; }
    onAddTask({ id: Date.now(), title: title.trim(), course, due, priority, done: false });
    setTitle(''); setError(''); setShowForm(false);
  };

  return (
    <>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Planner</Text>
          <Text style={styles.subtitle}>{remaining} of {tasks.length} tasks left.</Text>
        </View>
        <Pressable style={styles.addButton} onPress={() => setShowForm((value) => !value)} accessibilityRole="button" accessibilityLabel={showForm ? 'Close form' : 'Add task'}>
          <Text style={styles.addButtonText}>{showForm ? '×' : '+'}</Text>
        </Pressable>
      </View>

      {showForm && (
        <View style={styles.form}>
          <Text style={styles.formTitle}>New task</Text>
          <TextInput value={title} onChangeText={(text) => { setTitle(text); setError(''); }} placeholder="e.g. Revise SMD charts" placeholderTextColor="#9A9DB8" style={[styles.input, !!error && styles.inputError]} maxLength={MAX_TITLE} returnKeyType="done" onSubmitEditing={save} />
          {!!error && <Text style={styles.error}>{error}</Text>}
          <Text style={styles.counter}>{title.length}/{MAX_TITLE}</Text>
          <Text style={styles.label}>DUE</Text>
          <View style={styles.row}>{DUE_OPTIONS.map((d) => <Pill key={d} active={due === d} onPress={() => setDue(d)}>{d}</Pill>)}</View>
          <Text style={styles.label}>COURSE</Text>
          <View style={styles.row}>{courses.map((c) => <Pill key={c.code} active={course === c.code} onPress={() => setCourse(c.code)}>{c.code}</Pill>)}</View>
          <Text style={styles.label}>PRIORITY</Text>
          <View style={styles.row}>{PRIORITIES.map((p) => <Pill key={p} active={priority === p} onPress={() => setPriority(p)}>{p}</Pill>)}</View>
          <Pressable style={styles.primaryButton} onPress={save} accessibilityRole="button"><Text style={styles.primaryButtonText}>Save task</Text></Pressable>
        </View>
      )}

      <View style={styles.row}>
        <Pill active={sortByPriority} onPress={() => setSortByPriority((value) => !value)}>Sort by priority</Pill>
      </View>

      {visibleTasks.length === 0
        ? <View style={styles.empty}><Text style={styles.emptyTitle}>No tasks yet</Text><Text style={styles.emptyCopy}>Tap + to add your first study task.</Text></View>
        : visibleTasks.map((task) => <TaskRow key={task.id} task={task} onToggle={() => onToggleTask(task.id)} />)}

      <View style={styles.tip}>
        <Text style={styles.tipTitle}>FOCUS TIP</Text>
        <Text style={styles.tipCopy}>Start with one high-priority task. One finished step beats a long list.</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  title: { color: colors.ink, fontFamily: fonts.display, fontSize: 30 },
  subtitle: { color: colors.muted, fontFamily: fonts.body, fontSize: 14, marginTop: 4 },
  addButton: { backgroundColor: colors.highlight, width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: colors.ink, fontFamily: fonts.displayMid, fontSize: 28, lineHeight: 32 },
  form: { backgroundColor: colors.paper, borderRadius: 20, padding: 16, marginBottom: 16 },
  formTitle: { color: colors.ink, fontFamily: fonts.displayMid, fontSize: 18, marginBottom: 12 },
  input: { backgroundColor: colors.canvas, borderRadius: 12, paddingHorizontal: 13, paddingVertical: 12, color: colors.ink, fontFamily: fonts.body, fontSize: 14, marginBottom: 6, borderWidth: 1.5, borderColor: 'transparent' },
  inputError: { borderColor: colors.alert },
  error: { color: colors.alert, fontFamily: fonts.bodyBold, fontSize: 12, marginBottom: 4 },
  counter: { color: colors.muted, fontFamily: fonts.mono, fontSize: 10, textAlign: 'right', marginBottom: 10 },
  label: { color: colors.muted, fontFamily: fonts.monoBold, fontSize: 10, letterSpacing: 1.2, marginBottom: 8 },
  row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 14 },
  primaryButton: { backgroundColor: colors.ink, borderRadius: 12, alignItems: 'center', paddingVertical: 13, marginTop: 4 },
  primaryButtonText: { color: colors.paper, fontFamily: fonts.bodyBold, fontSize: 14 },
  empty: { alignItems: 'center', backgroundColor: colors.paper, borderRadius: 18, padding: 30 },
  emptyTitle: { color: colors.ink, fontFamily: fonts.displayMid, fontSize: 17 },
  emptyCopy: { color: colors.muted, fontFamily: fonts.body, marginTop: 5 },
  tip: { backgroundColor: colors.warnSoft, borderRadius: 18, padding: 16, marginTop: 8 },
  tipTitle: { color: '#8A6A00', fontFamily: fonts.monoBold, fontSize: 10, letterSpacing: 1.2 },
  tipCopy: { color: colors.ink, fontFamily: fonts.body, fontSize: 13, lineHeight: 19, marginTop: 6 },
});
