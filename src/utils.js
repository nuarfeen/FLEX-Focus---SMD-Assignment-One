import { ATTENDANCE_TARGET, PRIORITIES } from './data';

const ratio = (course) => (course.attended / course.held) * 100;

export const getAttendance = (course) => Math.round(ratio(course));
export const isAtRisk = (course) => ratio(course) < ATTENDANCE_TARGET;

// Smallest n with (attended + n) / (held + n) >= target, if every upcoming class is attended.
export const getClassesNeeded = (course) => {
  if (!isAtRisk(course)) return 0;
  return Math.ceil((ATTENDANCE_TARGET * course.held - 100 * course.attended) / (100 - ATTENDANCE_TARGET));
};

// Largest n with attended / (held + n) >= target, i.e. classes that can be missed safely.
export const getClassesSkippable = (course) => {
  if (isAtRisk(course)) return 0;
  return Math.max(0, Math.floor((100 * course.attended) / ATTENDANCE_TARGET - course.held));
};

export const average = (list) => Math.round(list.reduce((sum, value) => sum + value, 0) / list.length);

export const plural = (count, word, many = `${word}s`) => `${count} ${count === 1 ? word : many}`;

export const todayKey = () => new Date().toDateString();

export const SORTS = {
  Default: null,
  'Lowest attendance': (a, b) => getAttendance(a) - getAttendance(b),
  'Highest marks': (a, b) => b.marks - a.marks,
};

export const byPriority = (a, b) => PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority);
