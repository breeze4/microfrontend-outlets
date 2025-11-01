import React from 'react';

function TestsView() {
  const tests = [
    { id: 'TEST-101', name: 'User Authentication Flow', status: 'Passing', lastRun: '2 hours ago' },
    { id: 'TEST-102', name: 'Payment Processing', status: 'Failing', lastRun: '1 hour ago' },
    { id: 'TEST-103', name: 'Data Export Functionality', status: 'Failing', lastRun: '3 hours ago' },
    { id: 'TEST-104', name: 'Dashboard Load Performance', status: 'Passing', lastRun: '30 minutes ago' },
    { id: 'TEST-105', name: 'Email Notification System', status: 'Passing', lastRun: '1 hour ago' }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Test Cases</h2>
      <p>Automated test results and status</p>
      <div style={{ marginTop: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ marginBottom: '1rem' }}>Test Suite Status</h3>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {tests.map(test => (
            <div key={test.id} style={{ padding: '1rem', background: '#f9fafb', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{test.name}</div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                  {test.id} • Last run: {test.lastRun}
                </div>
              </div>
              <span style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                background: test.status === 'Passing' ? '#d4edda' : '#f8d7da',
                color: test.status === 'Passing' ? '#155724' : '#721c24'
              }}>
                {test.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestsView;
