"use client";
import { useState } from "react";

export default function RoutesPage() {
  const vehicles = [
    { vehicle_id: "V001", capacity_kg: 1000, status: "Available" },
    { vehicle_id: "V002", capacity_kg: 1500, status: "Available" },
  ];

  const bins = [
    { bin_id: "B014", location_name: "Central Market", fill_percentage: 95, priority_level: "CRITICAL", estimated_waste_kg: 114 },
    { bin_id: "B007", location_name: "Tech Park", fill_percentage: 88, priority_level: "CRITICAL", estimated_waste_kg: 106 },
    { bin_id: "B021", location_name: "City Hospital", fill_percentage: 72, priority_level: "HIGH", estimated_waste_kg: 86 },
    { bin_id: "B003", location_name: "Residential Block", fill_percentage: 55, priority_level: "MEDIUM", estimated_waste_kg: 66 },
  ];

  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedBins, setSelectedBins] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const toggleBin = (binId: string) => {
    if (selectedBins.includes(binId)) {
      setSelectedBins(selectedBins.filter(id => id !== binId));
    } else {
      setSelectedBins([...selectedBins, binId]);
    }
  };

  const handleOptimize = () => {
    if (!selectedVehicle || selectedBins.length === 0) {
      alert("Please select vehicle and bins");
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const selectedBinData = bins.filter(b => selectedBins.includes(b.bin_id));
      const totalWaste = selectedBinData.reduce((sum, b) => sum + b.estimated_waste_kg, 0);
      const vehicle = vehicles.find(v => v.vehicle_id === selectedVehicle);
      const utilization = vehicle ? (totalWaste / vehicle.capacity_kg) * 100 : 0;
      
      setResult({
        vehicle: vehicle,
        route: selectedBinData,
        total_distance_km: (selectedBins.length * 2.3).toFixed(1),
        total_waste_kg: totalWaste,
        utilization_percentage: utilization.toFixed(1),
        estimated_time_hours: (selectedBins.length * 0.5).toFixed(1),
        stops_count: selectedBins.length
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{padding: '30px'}}>
      <h1 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '20px'}}>
        Vehicle Route Optimization
      </h1>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
        <div>
          <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #ddd', marginBottom: '15px'}}>
            <h3 style={{fontWeight: '600', marginBottom: '10px'}}>Select Vehicle</h3>
            <select 
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px'}}
            >
              <option value="">Choose vehicle...</option>
              {vehicles.map(v => (
                <option key={v.vehicle_id} value={v.vehicle_id}>
                  {v.vehicle_id} - {v.capacity_kg}kg ({v.status})
                </option>
              ))}
            </select>
          </div>

          <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #ddd', marginBottom: '15px'}}>
            <h3 style={{fontWeight: '600', marginBottom: '10px'}}>Select Bins ({selectedBins.length})</h3>
            {bins.map(bin => (
              <label key={bin.bin_id} style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', marginBottom: '5px', backgroundColor: '#f5f5f5', borderRadius: '6px', cursor: 'pointer'}}>
                <input
                  type="checkbox"
                  checked={selectedBins.includes(bin.bin_id)}
                  onChange={() => toggleBin(bin.bin_id)}
                />
                <div style={{flex: 1}}>
                  <div style={{fontWeight: '500'}}>{bin.bin_id}</div>
                  <div style={{fontSize: '12px', color: '#666'}}>{bin.location_name}</div>
                </div>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '10px',
                  fontSize: '10px',
                  fontWeight: '600',
                  backgroundColor: bin.priority_level === 'CRITICAL' ? '#fee2e2' : bin.priority_level === 'HIGH' ? '#ffedd5' : '#fef9c3',
                  color: bin.priority_level === 'CRITICAL' ? '#dc2626' : bin.priority_level === 'HIGH' ? '#ea580c' : '#a16207'
                }}>
                  {bin.priority_level}
                </span>
              </label>
            ))}
          </div>

          <button
            onClick={handleOptimize}
            disabled={loading || !selectedVehicle || selectedBins.length === 0}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: (!selectedVehicle || selectedBins.length === 0) ? '#999' : '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: (!selectedVehicle || selectedBins.length === 0) ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? "Optimizing..." : "Optimize Route"}
          </button>
        </div>

        <div>
          {!result ? (
            <div style={{
              backgroundColor: 'white',
              padding: '50px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              textAlign: 'center',
              color: '#999'
            }}>
              <div style={{fontSize: '50px', marginBottom: '15px'}}>🗺️</div>
              <p>Select vehicle and bins, then click "Optimize Route"</p>
            </div>
          ) : (
            <div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '15px'}}>
                <div style={{backgroundColor: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #ddd'}}>
                  <div style={{fontSize: '11px', color: '#666'}}>Distance</div>
                  <div style={{fontSize: '24px', fontWeight: 'bold', color: '#059669'}}>{result.total_distance_km} km</div>
                </div>
                <div style={{backgroundColor: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #ddd'}}>
                  <div style={{fontSize: '11px', color: '#666'}}>Waste</div>
                  <div style={{fontSize: '24px', fontWeight: 'bold', color: '#2563eb'}}>{result.total_waste_kg} kg</div>
                </div>
                <div style={{backgroundColor: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #ddd'}}>
                  <div style={{fontSize: '11px', color: '#666'}}>Capacity</div>
                  <div style={{fontSize: '24px', fontWeight: 'bold', color: '#7c3aed'}}>{result.utilization_percentage}%</div>
                </div>
                <div style={{backgroundColor: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #ddd'}}>
                  <div style={{fontSize: '11px', color: '#666'}}>Time</div>
                  <div style={{fontSize: '24px', fontWeight: 'bold', color: '#ea580c'}}>{result.estimated_time_hours}h</div>
                </div>
              </div>

              <div style={{backgroundColor: 'white', borderRadius: '10px', border: '1px solid #ddd', overflow: 'hidden'}}>
                <div style={{padding: '12px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd'}}>
                  <h3 style={{fontWeight: '600'}}>Optimized Route</h3>
                  <p style={{fontSize: '12px', color: '#666', marginTop: '3px'}}>
                    Vehicle: {result.vehicle?.vehicle_id} | {result.stops_count} stops
                  </p>
                </div>
                <div>
                  <div style={{padding: '12px', borderBottom: '1px solid #eee'}}>
                    <strong>🏭 Central Depot</strong>
                    <div style={{fontSize: '12px', color: '#666'}}>Start Point</div>
                  </div>
                  {result.route.map((stop: any, idx: number) => (
                    <div key={idx} style={{padding: '12px', borderBottom: '1px solid #eee'}}>
                      <strong>{stop.bin_id}</strong>
                      <div style={{fontSize: '12px', color: '#666'}}>{stop.location_name}</div>
                      <div style={{fontSize: '11px', color: '#999'}}>Waste: {stop.estimated_waste_kg}kg</div>
                    </div>
                  ))}
                  <div style={{padding: '12px', backgroundColor: '#f5f5f5'}}>
                    <strong>🏭 Central Depot</strong>
                    <div style={{fontSize: '12px', color: '#666'}}>End Point</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}