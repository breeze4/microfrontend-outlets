import React from 'react';

function ReportsView() {
  const reports = [
    { name: 'Weekly Quality Summary', date: 'Oct 28, 2024', type: 'PDF' },
    { name: 'Test Execution Report', date: 'Oct 27, 2024', type: 'Excel' },
    { name: 'Defect Analysis Report', date: 'Oct 26, 2024', type: 'PDF' },
    { name: 'Code Coverage Report', date: 'Oct 25, 2024', type: 'HTML' }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Reports</h2>
      <p>Generated quality and test reports</p>
      <div style={{ marginTop: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ marginBottom: '1rem' }}>Recent Reports</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {reports.map((report, index) => (
            <div key={index} style={{ padding: '1rem', background: '#f9fafb', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{report.name}</div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{report.date}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '500', background: '#dbeafe', color: '#1e40af' }}>
                  {report.type}
                </span>
                <button style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', background: '#3b82f6', color: 'white', cursor: 'pointer', fontSize: '0.875rem' }}>
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReportsView;
