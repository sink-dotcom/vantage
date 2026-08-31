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

export function isRising(points: number[]) {
  return (points.at(-1) ?? 0) >= (points[0] ?? 0);
}

/* ---------- 360 feedback ---------- */

export type FeedbackCycle = {
  id: string;
  clientId: string;
  title: string;
  window: string;
  invited: number;
  responded: number;
  state: "collecting" | "review" | "shared";
  themes: { label: string; score: number; delta: number }[];
};

export const feedbackCycles: FeedbackCycle[] = [
  {
    id: "f1",
    clientId: "maya-okonkwo",
    title: "Mid-programme 360",
    window: "Closes in 4 days",
    invited: 9,
    responded: 7,
    state: "collecting",
    themes: [
      { label: "Clarity of direction", score: 82, delta: 11 },
      { label: "Executive presence", score: 74, delta: 16 },
      { label: "Listening", score: 68, delta: 3 },
    ],
  },
  {
    id: "f2",
    clientId: "daniel-reyes",
    title: "Baseline 360",
    window: "Closed 2 Aug",
    invited: 8,
    responded: 8,
    state: "review",
    themes: [
      { label: "Delegation", score: 41, delta: -6 },
      { label: "Responsiveness", score: 88, delta: 2 },
      { label: "Strategic focus", score: 55, delta: 4 },
    ],
  },
  {
    id: "f3",
    clientId: "aisha-benali",
    title: "Closing 360",
    window: "Shared 18 Aug",
    invited: 10,
    responded: 9,
    state: "shared",
    themes: [
      { label: "Influence", score: 91, delta: 22 },
      { label: "Craft leadership", score: 87, delta: 14 },
      { label: "Boundary setting", score: 79, delta: 18 },
    ],
  },
];

/* ---------- Intake pipeline ---------- */

export type IntakeStage = "enquiry" | "chemistry" | "contracting" | "onboarding";

export type IntakeRecord = {
  id: string;
  name: string;
  initials: string;
  role: string;
  company: string;
  stage: IntakeStage;
  owner: string;
  waiting: string;
  next: string;
};

export const intakeStages: { key: IntakeStage; label: string }[] = [
  { key: "enquiry", label: "Enquiry" },
  { key: "chemistry", label: "Chemistry call" },
  { key: "contracting", label: "Contracting" },
  { key: "onboarding", label: "Onboarding" },
];

export const intake: IntakeRecord[] = [
  { id: "i1", name: "Lena Fischer", initials: "LF", role: "COO", company: "Halden", stage: "enquiry", owner: "Elena", waiting: "2d", next: "Send intro pack" },
  { id: "i2", name: "Rui Alves", initials: "RA", role: "Head of Eng", company: "Trellis", stage: "enquiry", owner: "Elena", waiting: "5d", next: "Qualify budget" },
  { id: "i3", name: "Sofia Marchetti", initials: "SM", role: "CMO", company: "Verado", stage: "chemistry", owner: "Elena", waiting: "1d", next: "Call Wed 11:00" },
  { id: "i4", name: "Jonah Pike", initials: "JP", role: "VP Sales", company: "Nordhall", stage: "contracting", owner: "Elena", waiting: "3d", next: "Sponsor sign-off" },
  { id: "i5", name: "Grant Whitmore", initials: "GW", role: "Director", company: "Ashcroft", stage: "onboarding", owner: "Elena", waiting: "1d", next: "Baseline debrief Mon" },
  { id: "i6", name: "Amara Diallo", initials: "AD", role: "GM", company: "Lumen", stage: "onboarding", owner: "Elena", waiting: "4d", next: "Goal-setting workshop" },
];

/* ---------- Session logs ---------- */

export type LogEntry = {
  id: string;
  clientId: string;
  title: string;
  date: string;
  duration: string;
  mode: "Video" | "In person" | "Call";
  summary: string;
  actions: string[];
  mood: "energised" | "steady" | "strained";
};

export const logs: LogEntry[] = [
  {
    id: "l1",
    clientId: "maya-okonkwo",
    title: "Stakeholder mapping",
    date: "28 Aug",
    duration: "60m",
    mode: "Video",
    summary: "Mapped nine board stakeholders to three narrative outcomes. Maya led the reframe unprompted.",
    actions: ["Draft board memo", "Dry run with CFO"],
    mood: "energised",
  },
  {
    id: "l2",
    clientId: "priya-nair",
    title: "Conflict patterns",
    date: "27 Aug",
    duration: "50m",
    mode: "Video",
    summary: "Surfaced avoidance loop with two direct reports. Agreed a scripted opener for hard conversations.",
    actions: ["Run first review", "Log reaction notes"],
    mood: "steady",
  },
  {
    id: "l3",
    clientId: "daniel-reyes",
    title: "Calendar audit",
    date: "26 Aug",
    duration: "50m",
    mode: "Call",
    summary: "62% of the week sits in reactive support calls. Handover trial designed but not yet started.",
    actions: ["Publish handover plan", "Block two deep-work mornings"],
    mood: "strained",
  },
  {
    id: "l4",
    clientId: "aisha-benali",
    title: "Sustain planning",
    date: "22 Aug",
    duration: "60m",
    mode: "In person",
    summary: "Council charter published. Focus shifting to what holds after the engagement ends.",
    actions: ["Name a council chair"],
    mood: "energised",
  },
];

/* ---------- Playbook ---------- */

export type PlaybookItem = {
  id: string;
  title: string;
  kind: "Exercise" | "Framework" | "Assessment" | "Template";
  duration: string;
  useCase: string;
  used: number;
};

export const playbook: PlaybookItem[] = [
  { id: "p1", title: "Three-outcome narrative", kind: "Framework", duration: "30m", useCase: "Executive presence", used: 14 },
  { id: "p2", title: "Calendar reality audit", kind: "Exercise", duration: "45m", useCase: "Delegation & focus", used: 11 },
  { id: "p3", title: "Hard conversation opener", kind: "Template", duration: "15m", useCase: "Difficult feedback", used: 9 },
  { id: "p4", title: "Stakeholder heat map", kind: "Exercise", duration: "40m", useCase: "Influence", used: 8 },
  { id: "p5", title: "Values ladder", kind: "Assessment", duration: "25m", useCase: "Intake & baseline", used: 17 },
  { id: "p6", title: "Sustain plan canvas", kind: "Template", duration: "35m", useCase: "Closing engagements", used: 6 },
];
