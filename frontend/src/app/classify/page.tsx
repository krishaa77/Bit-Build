"use client";
import { useState } from "react";

export default function ClassifyPage() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        category: "Plastic",
        confidence: 94.2,
        recyclable: "YES",
        handling: "Send to plastic recycling stream. Rinse before recycling."
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{padding: '40px', backgroundColor: '#f8fafc'}}>
      <h1 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b'}}>AI Waste Classification</h1>
      
      <div style={{backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImage(URL.createObjectURL(file));
          }}
          style={{marginBottom: '20px'}}
        />
        
        {image && (
          <div>
            <img src={image} style={{width: '100%', maxWidth: '400px', borderRadius: '8px', marginBottom: '15px'}} />
            <button
              onClick={handleAnalyze}
              disabled={loading}
              style={{
                backgroundColor: loading ? '#94a3b8' : '#059669',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                width: '100%'
              }}
            >
              {loading ? "🤖 AI Analyzing..." : "🔍 Analyze with AI"}
            </button>
          </div>
        )}

        {result && (
          <div style={{marginTop: '30px', padding: '20px', backgroundColor: '#ecfdf5', border: '2px solid #10b981', borderRadius: '8px'}}>
            <h2 style={{color: '#065f46', fontSize: '24px', marginBottom: '15px'}}>✅ {result.category}</h2>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px'}}>
              <div style={{padding: '10px', backgroundColor: 'white', borderRadius: '6px'}}>
                <div style={{fontSize: '12px', color: '#6b7280'}}>Confidence</div>
                <div style={{fontSize: '20px', fontWeight: 'bold', color: '#065f46'}}>{result.confidence}%</div>
              </div>
              <div style={{padding: '10px', backgroundColor: 'white', borderRadius: '6px'}}>
                <div style={{fontSize: '12px', color: '#6b7280'}}>Recyclable</div>
                <div style={{fontSize: '20px', fontWeight: 'bold', color: '#065f46'}}>{result.recyclable}</div>
              </div>
            </div>
            <div style={{padding: '15px', backgroundColor: '#fef3c7', borderRadius: '6px', borderLeft: '4px solid #f59e0b'}}>
              <div style={{fontWeight: 'bold', color: '#92400e', marginBottom: '5px'}}>📋 Handling Instructions</div>
              <div style={{color: '#78350f'}}>{result.handling}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
