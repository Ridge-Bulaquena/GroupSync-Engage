
export interface Participant {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface SynchronyData {
  matrix: number[][];
  labels: string[];
  timestamp: string;
}

export interface Metric {
  label: string;
  value: string | number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

export interface InsightReport {
  summary: string;
  cohesionScore: number;
  anomalies: string[];
  recommendations: string[];
}

export enum AnalysisView {
  DASHBOARD = 'DASHBOARD',
  BRAIN_3D = 'BRAIN_3D',
  CONNECTIVITY = 'CONNECTIVITY',
  NETWORK = 'NETWORK',
  INTELLIGENCE = 'INTELLIGENCE',
  REPOSITORY = 'REPOSITORY'
}

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  description?: string;
}
