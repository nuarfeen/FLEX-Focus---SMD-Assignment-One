# FLEX Focus — SMD Assignment 1

**Student:** Arfeen Dildar  
**Registration No.:** 22I-2645  
**Course:** Software for Mobile Devices (SMD)

## Problem
Students often have attendance, marks, and assignment deadlines scattered across different places. FLEX Focus provides one mobile-first view of academic progress, warns about low attendance, and turns upcoming work into actionable tasks.

## Main features
- **Dashboard:** semester snapshot, average marks/attendance, open-task count, and a personalised insight card that names the most at-risk course.
- **Two `react-native-chart-kit` charts:** line chart (marks trend, the last point and the "+X% this term" badge are computed from live data) and bar chart (attendance by course).
- **Design:** ink + chalk palette with a "highlighter" yellow accent. Bricolage Grotesque (display), DM Sans (body), DM Mono (numbers/labels). Attendance bars carry a marker at the 75% target.
- **Attendance entry:** Present / Absent once per course per day, with Undo. Shows "Attend next N classes" when at risk and "Can miss N classes" when safe.
- **Attendance model:** based on `attended / held`; the app calculates the percentage and the exact number of classes needed to reach the 75% target.
- **Courses:** search, All / On track / At risk filters, sorting (lowest attendance, highest marks), progress bars, and a "Mark present" action.
- **Course detail:** teacher, next class, recommendation, topics, and a "Record today's attendance" action.
- **Planner:** add tasks with title, due (Today / Tomorrow / This week / Next week), course, and priority; toggle completion; sort by priority; remaining-task counter.
- **Application states:** empty search result, empty task list, "nothing pending" state, inline validation error (title < 3 characters), `maxLength` limits, at-risk vs on-track colours, completed tasks.
- **Navigation:** no side/bottom bars and no navigation library. Views are switched with a `screen` state and conditional rendering.

## Project structure
```
App.js                  state (courses, tasks, screen) + view switching
src/data.js             ATTENDANCE_TARGET, courses, tasks, past assessments
src/utils.js            getAttendance, isAtRisk, getClassesNeeded, sorts, helpers
src/theme.js            colours and chart config
src/components/         Header, Pill, ThresholdBar, StatCard, StatusChip, AttendanceActions, Highlight, TaskRow, CourseCard
src/screens/            Dashboard, Courses, CourseDetail, Planner
```

## Setup
```bash
npm install
npx expo start
```
Scan the QR code with Expo Go, press `a` for an Android emulator, or `w` for web.

## React and JavaScript concepts demonstrated
- **Components and props:** reusable `Pill`, `StatCard`, `ProgressBar`, `TaskRow`, `CourseCard` receive data and callbacks (`course`, `task`, `onToggle`, `onMarkPresent`).
- **State:** `App` holds shared data (`courses`, `tasks`, `screen`); each screen keeps its own UI state (query, filter, sort, form fields). Updates are immutable (`map` + spread).
- **Derived data:** `useMemo` filters/sorts the course list; helper functions compute attendance and classes needed.
- **Events:** `onPress`, `onChangeText`, `onSubmitEditing`.
- **Conditional rendering:** active screen, form visibility, empty states, warning vs on-track messages.
- **Array methods:** `map`, `filter`, `reduce`, `find`, `sort`.

## Viva talking points
1. `courses` and `tasks` arrays in `src/data.js` generate all cards, charts and lists.
2. Attendance = `attended / held`; the target is one constant, `ATTENDANCE_TARGET` (change it in `src/data.js` and the whole app updates).
3. `getClassesNeeded` solves `(a + n) / (h + n) >= 0.75` for `n` with `Math.ceil`.
4. Lifting state up: `App` owns `courses`, so "Mark present" on any screen updates the dashboard and charts.
5. Validation and empty states: planner title check, empty search result, no tasks.
6. Live-change ideas: change the threshold, add a course object, change the sort in `SORTS`, add a filter.
