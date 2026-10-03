// Static app data. The UI (cards, charts, lists) is generated from these arrays.
export const ATTENDANCE_TARGET = 75;

export const PRIORITIES = ['High', 'Medium', 'Low'];
export const DUE_OPTIONS = ['Today', 'Tomorrow', 'This week', 'Next week'];

export const initialCourses = [
  { id: 'smd', code: 'SMD', name: 'Software for Mobile Devices', teacher: 'Dr. Hina Malik', room: 'Lab 2 • Mon 10:00 AM', attended: 18, held: 22, marks: 86, color: '#5B5CE2', topics: ['React Native components', 'State and props', 'Data-driven UI'], next: 'Build dashboard interaction' },
  { id: 'web', code: 'WEB', name: 'Web Engineering', teacher: 'Sir Hamza Khan', room: 'Room C-204 • Tue 11:30 AM', attended: 14, held: 19, marks: 78, color: '#16A085', topics: ['REST APIs', 'Authentication', 'Deployment basics'], next: 'Read API security notes' },
  { id: 'is', code: 'IS', name: 'Information Security', teacher: 'Dr. Farah Ahmed', room: 'Room B-110 • Wed 09:00 AM', attended: 20, held: 22, marks: 88, color: '#F39C12', topics: ['Threat modelling', 'Access control', 'Secure design'], next: 'Prepare quiz examples' },
  { id: 'se', code: 'SE', name: 'Software Engineering', teacher: 'Sir Ali Raza', room: 'Room A-302 • Thu 01:00 PM', attended: 13, held: 19, marks: 72, color: '#E15B64', topics: ['Requirements', 'Agile planning', 'Architecture diagrams'], next: 'Review sprint backlog' },
];

export const initialTasks = [
  { id: 1, title: 'SMD Assignment 1', course: 'SMD', due: 'Tomorrow', priority: 'High', done: false },
  { id: 2, title: 'Security quiz preparation', course: 'IS', due: '07 Oct', priority: 'Medium', done: false },
  { id: 3, title: 'Web Engineering reading', course: 'WEB', due: '10 Oct', priority: 'Low', done: true },
  { id: 4, title: 'SE sprint backlog review', course: 'SE', due: '12 Oct', priority: 'Medium', done: false },
];

// Past assessment averages; the "Current" point is computed from live course marks.
export const pastAssessments = [
  { label: 'Quiz 1', score: 62 },
  { label: 'Mid', score: 70 },
  { label: 'Quiz 2', score: 76 },
  { label: 'Project', score: 82 },
];
