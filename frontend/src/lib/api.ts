const API_BASE = "http://localhost:8000";

export const api = {
  dashboard: async () => {
    const res = await fetch(`${API_BASE}/dashboard`);
    return res.json();
  },
  bins: async () => {
    const res = await fetch(`${API_BASE}/bins`);
    const data = await res.json();
    return data.data || data; // This safely handles {"data": [...]} or just [...]
  },
  getBin: async (id: string) => {
    const res = await fetch(`${API_BASE}/bins/${id}`);
    const data = await res.json();
    return data.data || data;
  },
  vehicles: async () => {
    const res = await fetch(`${API_BASE}/vehicles`);
    const data = await res.json();
    return data.data || data;
  },
  predictFill: async (binId: string) => {
    const res = await fetch(`${API_BASE}/predict-fill/${binId}`);
    return res.json();
  },
};