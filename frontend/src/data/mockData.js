export const stats = [
  { label: 'Open tasks', value: '148', change: '+12%', tone: 'primary' },
  { label: 'Active members', value: '32', change: '+4', tone: 'success' },
  { label: 'Pending reviews', value: '18', change: '-3', tone: 'warning' },
  { label: 'Velocity', value: '91%', change: '+8%', tone: 'secondary' },
];

export const boardColumns = [
  {
    title: 'Backlog',
    count: 4,
    cards: [
      { title: 'Audit workspace invite flow', meta: 'Auth', priority: 'High' },
      { title: 'Draft onboarding checklist', meta: 'Growth', priority: 'Medium' },
      { title: 'Map notification preferences', meta: 'Platform', priority: 'Low' },
    ],
  },
  {
    title: 'In progress',
    count: 3,
    cards: [
      { title: 'Feature redesign exploration', meta: 'Design', priority: 'High' },
      { title: 'Realtime activity stream', meta: 'Realtime', priority: 'Medium' },
    ],
  },
  {
    title: 'Review',
    count: 2,
    cards: [
      { title: 'Workspace analytics panel', meta: 'Insights', priority: 'Medium' },
      { title: 'Member role matrix', meta: 'Admin', priority: 'High' },
    ],
  },
  {
    title: 'Done',
    count: 7,
    cards: [
      { title: 'Project shell navigation', meta: 'Frontend', priority: 'Low' },
      { title: 'Team presence chips', meta: 'Realtime', priority: 'Low' },
    ],
  },
];

export const members = [
  { name: 'Maya Chen', role: 'Workspace Admin', status: 'Online' },
  { name: 'Jordan Patel', role: 'Product Lead', status: 'Reviewing' },
  { name: 'Ari Novak', role: 'Designer', status: 'Focus' },
  { name: 'Sam Rivera', role: 'Engineer', status: 'Online' },
];

export const messages = [
  { author: 'Ari', body: 'Updated the roadmap cards to reflect the revised onboarding scope.', time: '09:18' },
  { author: 'Jordan', body: 'Great. Can we tag the realtime items before standup?', time: '09:22' },
  { author: 'Maya', body: 'Already queued. I also pinned the analytics review.', time: '09:26' },
];
