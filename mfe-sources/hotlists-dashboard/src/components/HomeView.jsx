import React from 'react';

function HomeView() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Hotlists Dashboard</h2>
      <p>Track and manage critical quality issues</p>
      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '8px', border: '1px solid #ef4444' }}>
          <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Critical Defects</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#991b1b' }}>12</div>
          <p style={{ color: '#666', margin: 0 }}>Requires immediate attention</p>
        </div>
        <div style={{ padding: '1.5rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b' }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>Test Failures</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#92400e' }}>8</div>
          <p style={{ color: '#666', margin: 0 }}>Failing test cases</p>
        </div>
        <div style={{ padding: '1.5rem', background: '#dbeafe', borderRadius: '8px', border: '1px solid #3b82f6' }}>
          <h3 style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>In Progress</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1e40af' }}>24</div>
          <p style={{ color: '#666', margin: 0 }}>Currently being worked on</p>
        </div>
      </div>
    </div>
  );
}

export default HomeView;
