export type Status = "on-track" | "at-risk" | "stalled" | "new";

export type Client = {
  id: string;
  name: string;
  initials: string;
  role: string;
  company: string;
  focus: string;
  status: Status;
  progress: number;
  sessionsDone: number;
  sessionsTotal: number;
  nextSession: string;
  lastNote: string;
  engagementTrend: number[];
  tags: string[];
  since: string;
};

export type Session = {
  id: string;
  clientId: string;
  title: string;
  day: string;
  time: string;
  duration: string;
  mode: "Video" | "In person" | "Call";
  state: "upcoming" | "today" | "done";
};

export type Goal = {
  id: string;
  clientId: string;
  title: string;
  horizon: string;
  progress: number;
  status: Status;
  milestones: { label: string; done: boolean }[];
};

export type ActivityItem = {
  id: string;
  clientId: string;
  kind: "note" | "session" | "goal" | "message";
  text: string;
  when: string;
};

export const clients: Client[] = [
  {
    id: "maya-okonkwo",
    name: "Maya Okonkwo",
    initials: "MO",
    role: "VP Product",
    company: "Northwind",
    focus: "Executive presence",
    status: "on-track",
    progress: 78,
    sessionsDone: 11,
    sessionsTotal: 14,
    nextSession: "Tomorrow, 09:30",
    lastNote: "Reframed board narrative around three outcomes instead of nine metrics.",
    engagementTrend: [42, 51, 48, 60, 66, 71, 78],
    tags: ["Leadership", "Comms"],
    since: "Jan 2026",
  },
  {
    id: "daniel-reyes",
    name: "Daniel Reyes",
    initials: "DR",
    role: "Founder",
    company: "Kestrel Labs",
    focus: "Delegation & focus",
    status: "at-risk",
    progress: 41,
    sessionsDone: 6,
    sessionsTotal: 12,
    nextSession: "Thu, 14:00",
    lastNote: "Still taking every customer call personally. Agreed to a two-week handover trial.",
    engagementTrend: [70, 64, 58, 52, 47, 44, 41],
    tags: ["Founder", "Burnout"],
    since: "Feb 2026",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    initials: "PN",
    role: "Director of Eng",
    company: "Halcyon",
    focus: "Difficult conversations",
    status: "on-track",
    progress: 64,
    sessionsDone: 8,
    sessionsTotal: 12,
    nextSession: "Today, 16:00",
    lastNote: "Ran the performance conversation script; reported it landed without defensiveness.",
    engagementTrend: [30, 38, 44, 49, 55, 60, 64],
    tags: ["Feedback", "Teams"],
    since: "Mar 2026",
  },
  {
    id: "tomas-lindqvist",
    name: "Tomas Lindqvist",
    initials: "TL",
    role: "COO",
    company: "Fairline",
    focus: "Strategic prioritisation",
    status: "stalled",
    progress: 22,
    sessionsDone: 3,
    sessionsTotal: 10,
    nextSession: "Unscheduled",
    lastNote: "Two consecutive reschedules. Sponsor check-in needed before next block.",
    engagementTrend: [55, 48, 40, 33, 28, 24, 22],
    tags: ["Ops", "Sponsor risk"],
    since: "Apr 2026",
  },
  {
    id: "aisha-benali",
    name: "Aisha Benali",
    initials: "AB",
    role: "Head of Design",
    company: "Lumen",
    focus: "Influence without authority",
    status: "on-track",
    progress: 88,
    sessionsDone: 13,
    sessionsTotal: 14,
    nextSession: "Fri, 11:00",
    lastNote: "Design council proposal accepted. Closing session should focus on sustaining it.",
    engagementTrend: [50, 58, 66, 72, 79, 84, 88],
    tags: ["Design", "Stakeholders"],
    since: "Dec 2025",
  },
  {
    id: "grant-whitmore",
    name: "Grant Whitmore",
    initials: "GW",
    role: "Sales Lead",
    company: "Orbit",
    focus: "Team turnaround",
    status: "new",
    progress: 8,
    sessionsDone: 1,
    sessionsTotal: 10,
    nextSession: "Mon, 08:30",
    lastNote: "Intake complete. Baseline 360 scheduled to return next week.",
    engagementTrend: [0, 0, 0, 2, 4, 6, 8],
    tags: ["Onboarding"],
    since: "Aug 2026",
  },
];

export const sessions: Session[] = [
  { id: "s1", clientId: "priya-nair", title: "Feedback rehearsal", day: "Today", time: "16:00", duration: "50m", mode: "Video", state: "today" },
  { id: "s2", clientId: "maya-okonkwo", title: "Board narrative review", day: "Tomorrow", time: "09:30", duration: "60m", mode: "Video", state: "upcoming" },
  { id: "s3", clientId: "daniel-reyes", title: "Delegation checkpoint", day: "Thu", time: "14:00", duration: "50m", mode: "Call", state: "upcoming" },
  { id: "s4", clientId: "aisha-benali", title: "Closing & sustain plan", day: "Fri", time: "11:00", duration: "60m", mode: "In person", state: "upcoming" },
  { id: "s5", clientId: "grant-whitmore", title: "Baseline debrief", day: "Mon", time: "08:30", duration: "50m", mode: "Video", state: "upcoming" },
  { id: "s6", clientId: "maya-okonkwo", title: "Stakeholder mapping", day: "Last Thu", time: "09:30", duration: "60m", mode: "Video", state: "done" },
  { id: "s7", clientId: "priya-nair", title: "Conflict patterns", day: "Last Wed", time: "16:00", duration: "50m", mode: "Video", state: "done" },
  { id: "s8", clientId: "daniel-reyes", title: "Calendar audit", day: "Last Tue", time: "14:00", duration: "50m", mode: "Call", state: "done" },
];

export const goals: Goal[] = [
  {
    id: "g1",
    clientId: "maya-okonkwo",
    title: "Lead the quarterly board review unaided",
    horizon: "Q4 2026",
    progress: 72,
    status: "on-track",
    milestones: [
      { label: "Narrative drafted", done: true },
      { label: "Dry run with CFO", done: true },
      { label: "Live board session", done: false },
    ],
  },
  {
    id: "g2",
    clientId: "daniel-reyes",
    title: "Hand off customer support ownership",
    horizon: "Oct 2026",
    progress: 35,
    status: "at-risk",
    milestones: [
      { label: "Map current load", done: true },
      { label: "Hire support lead", done: false },
      { label: "Two-week no-escalation streak", done: false },
    ],
  },
  {
    id: "g3",
    clientId: "priya-nair",
    title: "Run all performance reviews personally",
    horizon: "Nov 2026",
    progress: 60,
    status: "on-track",
    milestones: [
      { label: "Script built", done: true },
      { label: "First three reviews", done: true },
      { label: "Full cycle complete", done: false },
    ],
  },
  {
    id: "g4",
    clientId: "tomas-lindqvist",
    title: "Cut active initiatives from 14 to 6",
    horizon: "Dec 2026",
    progress: 18,
    status: "stalled",
    milestones: [
      { label: "Initiative inventory", done: true },
      { label: "Sponsor alignment", done: false },
      { label: "Sunset plan signed", done: false },
    ],
  },
  {
    id: "g5",
    clientId: "aisha-benali",
    title: "Establish a standing design council",
    horizon: "Sep 2026",
    progress: 90,
    status: "on-track",
    milestones: [
      { label: "Proposal accepted", done: true },
      { label: "Charter published", done: true },
      { label: "Third meeting held", done: false },
    ],
  },
];

export const activity: ActivityItem[] = [
  { id: "a1", clientId: "aisha-benali", kind: "goal", text: "marked “Charter published” complete", when: "20m ago" },
  { id: "a2", clientId: "priya-nair", kind: "message", text: "sent a pre-session reflection", when: "1h ago" },
  { id: "a3", clientId: "daniel-reyes", kind: "note", text: "flagged a second reschedule this month", when: "3h ago" },
  { id: "a4", clientId: "maya-okonkwo", kind: "session", text: "completed “Stakeholder mapping”", when: "Yesterday" },
  { id: "a5", clientId: "grant-whitmore", kind: "note", text: "intake questionnaire received", when: "Yesterday" },
  { id: "a6", clientId: "tomas-lindqvist", kind: "session", text: "cancelled “Prioritisation block”", when: "2d ago" },
];

export const statusLabel: Record<Status, string> = {
  "on-track": "On track",
  "at-risk": "At risk",
  stalled: "Stalled",
  new: "New",
};

export const statusClass: Record<Status, string> = {
  "on-track": "bg-success/12 text-success border-success/25",
  "at-risk": "bg-ember/12 text-ember border-ember/25",
  stalled: "bg-rose/12 text-rose border-rose/25",
  new: "bg-info/12 text-info border-info/25",
};

export function getClient(id: string) {
  return clients.find((c) => c.id === id);
}

export const practiceStats = {
  activeClients: clients.length,
  hoursThisWeek: 7.5,
  utilisation: 82,
  retention: 94,
  revenueMonth: 18400,
  revenueTrend: [11200, 12800, 12100, 14600, 15900, 17200, 18400],
  weeklyLoad: [
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 3.5 },
    { day: "Wed", hours: 1 },
    { day: "Thu", hours: 4 },
    { day: "Fri", hours: 2.5 },
    { day: "Sat", hours: 0 },
    { day: "Sun", hours: 0 },
  ],
};
