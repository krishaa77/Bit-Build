const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`API error ${res.status} on ${path}`);
  return res.json();
}

export const api = {
  dashboard:     () => request<any>("/dashboard"),
  bins:          () => request<{ data: any[] }>("/bins").then(r => r.data),
  bin:  (id: string) => request<{ data: any }>(`/bins/${id}`).then(r => r.data),
  vehicles:      () => request<{ data: any[] }>("/vehicles").then(r => r.data),
  statistics:    () => request<any>("/waste-statistics"),
};