"use client";
import { useState } from "react";

export default function AnalyticsPage() {
  const [stats] = useState({
    totalWaste: 2450,
    recyclingRate: 68,
    collectionEfficiency: 92,
    avgFillTime: 18
  });

  const wasteByType = [
    { type: "Plastic", percentage: 35, kg: 857 },
    { type: "Organic", percentage: 30, kg: 735 },
    { type: "Paper", percentage: 20, kg: 490 },
    { type: "Metal", percentage: 10, kg: 245 },
    { type: "Other", percentage: 5, kg: 123 }
  ];

  const weeklyData = [
    { day: "Mon", waste: 320 },
    { day: "Tue", waste: 380 },
    { day: "Wed", waste: 350 },
    { day: "Thu", waste: 420 },
    { day: "Fri", waste: 480 },
    { day: "Sat", waste: 310 },
    { day: "Sun", waste: 190 }
  ];

  return (
    <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '25px' }}>
        📊 Analytics & Insights
      </h1>

      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '25px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #ddd' }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Total Waste Collected</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#059669' }}>{stats.totalWaste} kg</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #ddd' }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Recycling Rate</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2563eb' }}>{stats.recyclingRate}%</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #ddd' }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Collection Efficiency</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#7c3aed' }}>{stats.collectionEfficiency}%</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #ddd' }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Avg Fill Time</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ea580c' }}>{stats.avgFillTime} hrs</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Waste by Type */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #ddd' }}>
          <h3 style={{ fontWeight: '600', marginBottom: '15px', fontSize: '16px' }}>Waste by Type</h3>
          {wasteByType.map(item => (
            <div key={item.type} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '13px' }}>
                <span style={{ fontWeight: '500' }}>{item.type}</span>
                <span style={{ color: '#666' }}>{item.kg} kg ({item.percentage}%)</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${item.percentage}%`,
                  height: '100%',
                  backgroundColor: item.type === 'Plastic' ? '#3b82f6' :
                    item.type === 'Organic' ? '#22c55e' :
                      item.type === 'Paper' ? '#eab308' :
                        item.type === 'Metal' ? '#ef4444' : '#6b7280'
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Trend */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #ddd' }}>
          <h3 style={{ fontWeight: '600', marginBottom: '15px', fontSize: '16px' }}>Weekly Waste Generation</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '200px', gap: '10px' }}>
            {weeklyData.map(day => (
              <div key={day.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{
                  width: '100%',
                  height: `${(day.waste / 500) * 150}px`,
                  backgroundColor: '#059669',
                  borderRadius: '4px 4px 0 0',
                  minHeight: '20px'
                }} />
                <div style={{ fontSize: '11px', marginTop: '8px', color: '#666' }}>{day.day}</div>
                <div style={{ fontSize: '10px', color: '#999' }}>{day.waste}kg</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #ddd' }}>
        <h3 style={{ fontWeight: '600', marginBottom: '15px', fontSize: '16px' }}>🤖 System Recommendations</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div style={{ padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <div style={{ fontWeight: '600', color: '#0369a1', marginBottom: '5px', fontSize: '13px' }}>Collection Priority</div>
            <div style={{ fontSize: '13px', color: '#0c4a6e' }}>Bin B014 should be collected within the next route cycle due to 95% fill level.</div>
          </div>
          <div style={{ padding: '15px', backgroundColor: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a' }}>
            <div style={{ fontWeight: '600', color: '#b45309', marginBottom: '5px', fontSize: '13px' }}>Zone Analysis</div>
            <div style={{ fontSize: '13px', color: '#92400e' }}>Zone 3 has 35% higher waste generation on weekends. Consider increased frequency.</div>
          </div>
          <div style={{ padding: '15px', backgroundColor: '#d1fae5', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
            <div style={{ fontWeight: '600', color: '#047857', marginBottom: '5px', fontSize: '13px' }}>Recycling Opportunity</div>
            <div style={{ fontSize: '13px', color: '#065f46' }}>Plastic waste increased 12% this week. Focus on plastic collection routes.</div>
          </div>
          <div style={{ padding: '15px', backgroundColor: '#f3e8ff', borderRadius: '8px', border: '1px solid #e9d5ff' }}>
            <div style={{ fontWeight: '600', color: '#7c3aed', marginBottom: '5px', fontSize: '13px' }}>Efficiency Tip</div>
            <div style={{ fontSize: '13px', color: '#6b21a8' }}>Route optimization could reduce fuel consumption by 18% this week.</div>
          </div>
        </div>
      </div>
    </div>
  );
}