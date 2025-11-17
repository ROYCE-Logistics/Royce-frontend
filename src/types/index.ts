export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoadSummary {
  id: string;
  pickup: string;
  delivery: string;
  driver?: string;
  truck?: string;
  status: 'Pending' | 'Assigned' | 'In-Transit' | 'Delivered' | 'Delayed';
  eta: string;
  rate: number;
}

export interface LoadDetail extends LoadSummary {
  customer: string;
  reference: string;
  mileage: number;
  pieces: number;
  statusHistory: { timestamp: string; status: string; note?: string }[];
}

export interface Driver {
  id: string;
  name: string;
  status: string;
  currentLoad?: string;
  lastLocation?: string;
  safetyScore: number;
}

export interface Truck {
  id: string;
  number: string;
  status: string;
  location: string;
  vin: string;
  nextMaintenance: string;
}

export interface Trailer {
  id: string;
  number: string;
  status: string;
  inspectionDue: string;
}

export interface Settlement {
  id: string;
  period: string;
  driver: string;
  total: number;
}

export interface KPIResponse {
  totalLoads: number;
  activeTrucks: number;
  onTimePercent: number;
  revenueToday: number;
}

export interface RevenueTrendPoint {
  date: string;
  revenue: number;
}

export interface AlertItem {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: string;
}

export interface ImportJob {
  id: string;
  type: string;
  createdAt: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
}
