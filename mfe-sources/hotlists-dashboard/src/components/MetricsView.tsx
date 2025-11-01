import React from 'react';

function MetricsView() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Metrics</h2>
      <p>Quality metrics and trends</p>
      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ color: '#3b82f6', marginBottom: '1rem' }}>Defect Resolution Time</h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1e40af', marginBottom: '0.5rem' }}>2.5 days</div>
          <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>Average time to resolve</p>
        </div>
        <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>Test Pass Rate</h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#047857', marginBottom: '0.5rem' }}>87%</div>
          <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>Passing automated tests</p>
        </div>
        <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Code Coverage</h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#92400e', marginBottom: '0.5rem' }}>73%</div>
          <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>Lines of code covered</p>
        </div>
        <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>Defect Density</h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#6d28d9', marginBottom: '0.5rem' }}>0.8</div>
          <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>Defects per KLOC</p>
        </div>
      </div>
    </div>
  );
}

export default MetricsView;
