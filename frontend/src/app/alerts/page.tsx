"use client";
import { useState } from "react";

export default function AlertsPage() {
  // Hardcoded sample data for the demo
  const alerts = [
    {
      alert_id: "ALT-001",
      type: "OVERFLOW_RISK",
      severity: "CRITICAL",
      bin_id: "B014",
      location: "Central Market, Zone A",
      timestamp: new Date().toISOString(),
      description: "Bin B014 is predicted to overflow in 2.5 hours due to high waste generation rate.",
      recommended_action: "Schedule immediate collection dispatch.",
      resolved: false
    },
    {
      alert_id: "ALT-002",
      type: "HIGH_FILL",
      severity: "CRITICAL",
      bin_id: "B007",
      location: "Tech Park Main Entrance",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      description: "Bin B007 current fill level has reached 95%. Capacity limit exceeded.",
      recommended_action: "Prioritize for the next available vehicle route.",
      resolved: false
    },
    {
      alert_id: "ALT-003",
      type: "HIGH_FILL",
      severity: "HIGH",
      bin_id: "B021",
      location: "City Hospital Rear",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      description: "Bin B021 fill level is at 88%. Approaching critical threshold.",
      recommended_action: "Add to today's collection schedule.",
      resolved: false
    },
    {
      alert_id: "ALT-004",
      type: "UNUSUAL_WASTE",
      severity: "MEDIUM",
      bin_id: "ZONE-3",
      location: "Commercial Zone 3",
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      description: "Zone 3 is generating 35% more waste than its historical weekend average.",
      recommended_action: "Monitor closely and consider increasing collection frequency.",
      resolved: false
    }
  ];

  const summary = {
    critical: alerts.filter(a => a.severity === "CRITICAL").length,
    high: alerts.filter(a => a.severity === "HIGH").length,
    medium: alerts.filter(a => a.severity === "MEDIUM").length,
    total: alerts.length
  };

  const getSeverityStyle = (severity: string) => {
    switch(severity) {
      case "CRITICAL": return { backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5' };
      case "HIGH": return { backgroundColor: '#ffedd5', color: '#ea580c', border: '1px solid #fdba74' };
      case "MEDIUM": return { backgroundColor: '#fef9c3', color: '#ca8a04', border: '1px solid #fde047' };
      default: return { backgroundColor: '#e0f2fe', color: '#0284c7', border: '1px solid #7dd3fc' };
    }
  };

  return (
    <div style={{padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh'}}>
      <h1 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '25px', color: '#1e293b'}}>
        🚨 Alerts & Notifications
      </h1>

      {/* Summary Cards */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '25px'}}>
        <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '2px solid #fee2e2'}}>
          <div style={{fontSize: '12px', color: '#991b1b', fontWeight: '600', marginBottom: '5px'}}>Critical Alerts</div>
          <div style={{fontSize: '32px', fontWeight: 'bold', color: '#dc2626'}}>{summary.critical}</div>
        </div>
        <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '2px solid #ffedd5'}}>
          <div style={{fontSize: '12px', color: '#c2410c', fontWeight: '600', marginBottom: '5px'}}>High Priority</div>
          <div style={{fontSize: '32px', fontWeight: 'bold', color: '#ea580c'}}>{summary.high}</div>
        </div>
        <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '2px solid #fef9c3'}}>
          <div style={{fontSize: '12px', color: '#a16207', fontWeight: '600', marginBottom: '5px'}}>Medium</div>
          <div style={{fontSize: '32px', fontWeight: 'bold', color: '#ca8a04'}}>{summary.medium}</div>
        </div>
        <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '2px solid #e0e7ff'}}>
          <div style={{fontSize: '12px', color: '#3730a3', fontWeight: '600', marginBottom: '5px'}}>Total Alerts</div>
          <div style={{fontSize: '32px', fontWeight: 'bold', color: '#4f46e5'}}>{summary.total}</div>
        </div>
      </div>

      {/* Alerts List */}
      <div style={{backgroundColor: 'white', borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden'}}>
        <div style={{padding: '15px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0'}}>
          <h2 style={{fontWeight: '600', fontSize: '16px', color: '#334155', margin: 0}}>Active System Alerts</h2>
        </div>
        
        {alerts.map((alert) => (
          <div key={alert.alert_id} style={{
            padding: '20px',
            borderBottom: '1px solid #f1f5f9',
            backgroundColor: alert.severity === 'CRITICAL' ? '#fef2f2' : 'white'
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
              <div style={{flex: 1}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px'}}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: '700',
                    ...getSeverityStyle(alert.severity)
                  }}>
                    {alert.severity}
                  </span>
                  <span style={{fontSize: '12px', color: '#64748b', fontWeight: '500'}}>{alert.type.replace('_', ' ')}</span>
                </div>
                
                <h3 style={{fontWeight: '600', fontSize: '15px', marginBottom: '5px', color: '#1e293b'}}>
                  {alert.bin_id} - {alert.location}
                </h3>
                
                <p style={{fontSize: '13px', color: '#475569', marginBottom: '10px', lineHeight: '1.5'}}>
                  {alert.description}
                </p>
                
                <div style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '6px',
                  border: '1px solid #bbf7d0',
                  fontSize: '12px',
                  color: '#166534',
                  fontWeight: '500'
                }}>
                  💡 {alert.recommended_action}
                </div>
              </div>
              
              <div style={{fontSize: '11px', color: '#94a3b8', textAlign: 'right', minWidth: '80px'}}>
                {new Date(alert.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                <br />
                {new Date(alert.timestamp).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}