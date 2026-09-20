export type BinStatus = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Bin {
  bin_id: string;
  location_name: string;
  latitude: number;
  longitude: number;
  capacity_kg: number;
  fill_percentage: number;
  waste_type: string;
  last_collection: string | null;
  status: BinStatus;
  created_at?: string;
}

export interface Vehicle {
  vehicle_id: string;
  capacity_kg: number;
  current_load_kg: number;
  latitude: number;
  longitude: number;
  status: "Available" | "Collecting" | "Returning" | "Offline";
}

export interface DashboardSummary {
  total_bins: number;
  critical_bins: number;
  high_priority_bins: number;
  medium_priority_bins: number;
  available_vehicles: number;
  total_waste_collected_kg: number;
  recycling_percentage: number;
  active_alerts: number;
}

export interface DashboardPayload {
  summary: DashboardSummary;
  waste_over_time: { date: string; quantity_kg: number }[];
  waste_by_type: { waste_type: string; quantity_kg: number }[];
  status_distribution: { status: string; count: number }[];
}