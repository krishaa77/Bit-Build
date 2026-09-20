"use client";
import { useState } from "react";

export default function PriorityPage() {
  // Hardcoded sample data for the demo
  const allBins = [
    {
      bin_id: "B014",
      location_name: "Central Market, Zone A",
      fill_percentage: 95,
      waste_type: "Organic",
      capacity_kg: 120,
      hours_to_overflow: 2.5,
      priority_score: 94.5,
      priority_level: "CRITICAL",
      recommended_action: "Collect immediately - overflow imminent & high odor risk"
    },
    {
      bin_id: "B007",
      location_name: "Tech Park Main Entrance",
      fill_percentage: 88,
      waste_type: "Plastic",
      capacity_kg: 150,
      hours_to_overflow: 4.0,
      priority_score: 87.2,
      priority_level: "CRITICAL",
      recommended_action: "Schedule collection within 4 hours - high recyclable value"
    },
    {
      bin_id: "B021",
      location_name: "City Hospital Rear",
      fill_percentage: 72,
      waste_type: "Paper",
      capacity_kg: 100,
      hours_to_overflow: 12.0,
      priority_score: 72.0,
      priority_level: "HIGH",
      recommended_action: "Plan for next scheduled route - weather sensitive"
    },
    {
      bin_id: "B003",
      location_name: "Residential Block 4",
      fill_percentage: 55,
      waste_type: "Metal",
      capacity_kg: 120,
      hours_to_overflow: 24.0,
      priority_score: 48.5,
      priority_level: "MEDIUM",
      recommended_action: "Monitor - stable waste type, no immediate action needed"
    },
    {
      bin_id: "B009",
      location_name: "Community Park West",
      fill_percentage: 25,
      waste_type: "Glass",
      capacity_kg: 150,
      hours_to_overflow: 72.0,
      priority_score: 22.0,
      priority_level: "LOW",
      recommended_action: "Routine check during weekly cycle"
    }
  ];

  const [filter, setFilter] = useState("ALL");

  const filteredBins = filter === "ALL" 
    ? allBins 
    : allBins.filter(b => b.priority_level === filter);

  const getLevelColor = (level: string) => {
    switch(level) {
      case "CRITICAL": return { backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5' };
      case "HIGH": return { backgroundColor: '#ffedd5', color: '#ea580c', border: '1px solid #fdba74' };
      case "MEDIUM": return { backgroundColor: '#fef9c3', color: '#ca8a04', border: '1px solid #fde047' };
      default: return { backgroundColor: '#dcfce7', color: '#16a34a', border: '1px solid #86efac' };
    }
  };

  const getFillBarColor = (fill: number) => {
    if (fill > 80) return '#ef4444';
    if (fill > 60) return '#f97316';
    if (fill > 40) return '#eab308';
    return '#22c55e';
  };

  return (
    <div style={{padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <div>
          <h1 style={{fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0}}>
            Smart Collection Priority
          </h1>
          <p style={{fontSize: '14px', color: '#64748b', marginTop: '5px'}}>
            AI-powered bin collection scheduling based on real-time data
          </p>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#64748b'}}>
          <span>Last sync: just now</span>
          <button style={{
            padding: '6px 12px',
            backgroundColor: '#0f172a',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '12px',
            cursor: 'pointer'
          }}>
            Refresh
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '25px'}}>
        <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #fee2e2'}}>
          <div style={{fontSize: '13px', color: '#64748b', marginBottom: '8px'}}>Critical</div>
          <div style={{fontSize: '32px', fontWeight: 'bold', color: '#dc2626'}}>
            {allBins.filter(b => b.priority_level === "CRITICAL").length}
          </div>
        </div>
        <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #ffedd5'}}>
          <div style={{fontSize: '13px', color: '#64748b', marginBottom: '8px'}}>High Priority</div>
          <div style={{fontSize: '32px', fontWeight: 'bold', color: '#ea580c'}}>
            {allBins.filter(b => b.priority_level === "HIGH").length}
          </div>
        </div>
        <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #fef9c3'}}>
          <div style={{fontSize: '13px', color: '#64748b', marginBottom: '8px'}}>Medium</div>
          <div style={{fontSize: '32px', fontWeight: 'bold', color: '#ca8a04'}}>
            {allBins.filter(b => b.priority_level === "MEDIUM").length}
          </div>
        </div>
        <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #dcfce7'}}>
          <div style={{fontSize: '13px', color: '#64748b', marginBottom: '8px'}}>Low</div>
          <div style={{fontSize: '32px', fontWeight: 'bold', color: '#16a34a'}}>
            {allBins.filter(b => b.priority_level === "LOW").length}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div style={{backgroundColor: 'white', padding: '15px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px'}}>
        <span style={{fontSize: '14px', color: '#475569', fontWeight: '500'}}>Filter by Priority:</span>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          style={{padding: '6px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px'}}
        >
          <option value="ALL">All Levels</option>
          <option value="CRITICAL">Critical</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      {/* Table */}
      <div style={{backgroundColor: 'white', borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden'}}>
        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px'}}>
            <thead>
              <tr style={{backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0'}}>
                <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: '#475569'}}>Bin ID</th>
                <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: '#475569'}}>Location</th>
                <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: '#475569'}}>Fill %</th>
                <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: '#475569'}}>Overflow In</th>
                <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: '#475569'}}>Waste Type</th>
                <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: '#475569'}}>Score</th>
                <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: '#475569'}}>Priority</th>
                <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: '#475569'}}>Action Required</th>
              </tr>
            </thead>
            <tbody>
              {filteredBins.map((bin) => (
                <tr key={bin.bin_id} style={{borderBottom: '1px solid #f1f5f9'}}>
                  <td style={{padding: '12px 15px', fontFamily: 'monospace', fontWeight: '600', color: '#1e293b'}}>{bin.bin_id}</td>
                  <td style={{padding: '12px 15px', color: '#475569'}}>{bin.location_name}</td>
                  <td style={{padding: '12px 15px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <div style={{width: '60px', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden'}}>
                        <div style={{width: `${bin.fill_percentage}%`, height: '100%', backgroundColor: getFillBarColor(bin.fill_percentage)}} />
                      </div>
                      <span style={{fontWeight: '500', color: '#1e293b'}}>{bin.fill_percentage}%</span>
                    </div>
                  </td>
                  <td style={{padding: '12px 15px', fontWeight: '500', color: bin.hours_to_overflow < 12 ? '#dc2626' : '#475569'}}>
                    {bin.hours_to_overflow < 24 ? `${bin.hours_to_overflow}h` : `${Math.round(bin.hours_to_overflow / 24)}d`}
                  </td>
                  <td style={{padding: '12px 15px', color: '#475569'}}>{bin.waste_type}</td>
                  <td style={{padding: '12px 15px', fontWeight: 'bold', color: '#1e293b'}}>{bin.priority_score}</td>
                  <td style={{padding: '12px 15px'}}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: '700',
                      ...getLevelColor(bin.priority_level)
                    }}>
                      {bin.priority_level}
                    </span>
                  </td>
                  <td style={{padding: '12px 15px', fontSize: '12px', color: '#64748b', maxWidth: '250px'}}>{bin.recommended_action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{textAlign: 'right', marginTop: '10px', fontSize: '12px', color: '#94a3b8'}}>
        Total bins: {filteredBins.length} | Showing: {filteredBins.length}
      </div>
    </div>
  );
}