"use client";
import { useEffect, useRef } from "react";
import type { Bin, Vehicle } from "@/types";
import { statusColor } from "@/lib/utils";

let L: any = null;

async function loadLeaflet() {
  if (L) return L;
  const leaflet = (await import("leaflet")).default;
  if (typeof document !== "undefined" && !document.getElementById("leaflet-css")) {
    const link = document.createElement("link");
    link.id = "leaflet-css";
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
  }
  L = leaflet;
  return leaflet;
}

function makeBinIcon(status: string, leaflet: any) {
  const colorMap: Record<string, string> = {
    LOW: "#10b981", MEDIUM: "#f59e0b", HIGH: "#f97316", CRITICAL: "#e11d48",
  };
  const color = colorMap[status] ?? "#94a3b8";
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='28' height='40' viewBox='0 0 28 40'>
      <path d='M14 0 C6.3 0 0 6.3 0 14 C0 23 14 40 14 40 C14 40 28 23 28 14 C28 6.3 21.7 0 14 0 Z'
            fill='${color}' stroke='white' stroke-width='2'/>
      <circle cx='14' cy='14' r='5' fill='white'/>
    </svg>`;
  return leaflet.divIcon({
    html: svg,
    className: "",
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -36],
  });
}

function makeVehicleIcon(leaflet: any) {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'>
      <circle cx='15' cy='15' r='13' fill='#0f172a' stroke='white' stroke-width='2'/>
      <text x='15' y='20' text-anchor='middle' font-size='14' fill='white'>🚛</text>
    </svg>`;
  return leaflet.divIcon({
    html: svg,
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -12],
  });
}

interface Props {
  bins: Bin[];
  vehicles: Vehicle[];
  center?: [number, number];
  zoom?: number;
}

export default function BinMap({ bins, vehicles, center = [22.5643, 72.9288], zoom = 15 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const layersRef = useRef<any[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const leaflet = await loadLeaflet();
      if (cancelled || !ref.current) return;
      if (!mapRef.current) {
        mapRef.current = leaflet.map(ref.current, {
          center,
          zoom,
          zoomControl: true,
        });
        leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(mapRef.current);
      }
      layersRef.current.forEach((l) => l.remove());
      layersRef.current = [];

      bins.forEach((b) => {
        const marker = leaflet
          .marker([b.latitude, b.longitude], { icon: makeBinIcon(b.status, leaflet) })
          .addTo(mapRef.current);
        marker.bindPopup(`
          <div style="font-family:ui-sans-serif,system-ui;font-size:12px;min-width:180px">
            <div style="font-weight:600;margin-bottom:4px">${b.bin_id} · ${b.location_name}</div>
            <div>Fill: <b>${b.fill_percentage}%</b></div>
            <div>Capacity: ${b.capacity_kg} kg</div>
            <div>Type: ${b.waste_type}</div>
            <div style="margin-top:4px">
              <span style="display:inline-block;padding:2px 8px;border-radius:999px;
                background:${statusColor(b.status).bg};color:${statusColor(b.status).text};
                font-weight:600">${b.status}</span>
            </div>
          </div>
        `);
        layersRef.current.push(marker);
      });

      vehicles.forEach((v) => {
        const marker = leaflet
          .marker([v.latitude, v.longitude], { icon: makeVehicleIcon(leaflet) })
          .addTo(mapRef.current);
        marker.bindPopup(`
          <div style="font-family:ui-sans-serif,system-ui;font-size:12px;min-width:180px">
            <div style="font-weight:600;margin-bottom:4px">Vehicle ${v.vehicle_id}</div>
            <div>Load: ${v.current_load_kg} / ${v.capacity_kg} kg</div>
            <div>Status: <b>${v.status}</b></div>
          </div>
        `);
        layersRef.current.push(marker);
      });
    })();
    return () => { cancelled = true; };
  }, [bins, vehicles]);

  return <div ref={ref} className="w-full h-full min-h-[500px]" />;
}