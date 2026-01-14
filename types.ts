
export interface Student {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  score: number;
  math: number;
  rw: number;
  accuracy: number;
  growth: number; // percentage
  history: number[]; // for sparklines
  trend: 'up' | 'down' | 'stable';
  group: string;
}

export interface Competition {
  id: string;
  title: string;
  subject: string;
  status: 'Active' | 'Upcoming' | 'Finished';
  participants: number;
  progress: number; // percentage
  topScore: number;
  deadline: string;
}

export type ViewType = 'Dashboard' | 'Leaderboard' | 'Competitions' | 'Analytics' | 'Groups' | 'Subjects' | 'Profile';
