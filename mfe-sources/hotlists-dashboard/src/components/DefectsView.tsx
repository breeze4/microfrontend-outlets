import React from 'react';

function DefectsView() {
  const defects = [
    { id: 'DEF-001', title: 'Login page crashes on submit', severity: 'Critical', status: 'Open' },
    { id: 'DEF-002', title: 'Payment form validation error', severity: 'High', status: 'In Progress' },
    { id: 'DEF-003', title: 'Dashboard loading slowly', severity: 'Medium', status: 'Open' },
    { id: 'DEF-004', title: 'Export button not working', severity: 'High', status: 'In Progress' }
  ];

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critical': return '#ef4444';
      case 'High': return '#f59e0b';
      case 'Medium': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Defects</h2>
      <p>Critical defects requiring attention</p>
      <div style={{ marginTop: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ marginBottom: '1rem' }}>Active Defects</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {defects.map(defect => (
            <div key={defect.id} style={{ padding: '1rem', background: '#f9fafb', borderRadius: '6px', borderLeft: `4px solid ${getSeverityColor(defect.severity)}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong>{defect.id}</strong>
                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '500', background: '#e5e7eb' }}>
                  {defect.status}
                </span>
              </div>
              <div>{defect.title}</div>
              <div style={{ marginTop: '0.5rem', color: getSeverityColor(defect.severity), fontWeight: '500', fontSize: '0.9rem' }}>
                {defect.severity}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DefectsView;
