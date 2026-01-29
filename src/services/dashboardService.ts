import api from "@/lib/axios";

export interface DashboardStats {
  totalProperties: number;
  activeLeads: number;
  closedDeals: number;
  revenue: number;
}

export interface GraphData {
  name: string;
  value: number;
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  user: string;
  timestamp: string;
}

export const dashboardService = {
  getStats: async () => {
    const response = await api.get<DashboardStats>("/dashboard/stats");
    return response.data;
  },

  getGraphData: async () => {
    const response = await api.get<GraphData[]>("/dashboard/graph");
    return response.data;
  },

  getActivity: async () => {
    const response = await api.get<Activity[]>("/dashboard/activity");
    return response.data;
  },
};
