import React from 'react';
import './Dashboard.css';

function Dashboard() {
  const defects = [
    { id: 'DEF-2024-101', severity: 'Critical', status: 'Open', module: 'Authentication', assignedTo: 'John Doe' },
    { id: 'DEF-2024-102', severity: 'High', status: 'In Progress', module: 'Payment Gateway', assignedTo: 'Jane Smith' },
    { id: 'DEF-2024-103', severity: 'Medium', status: 'Open', module: 'User Profile', assignedTo: 'Mike Johnson' },
    { id: 'DEF-2024-104', severity: 'Low', status: 'Resolved', module: 'Dashboard', assignedTo: 'Sarah Williams' }
  ];

  const testMetrics = [
    { category: 'Unit Tests', total: 245, passed: 241, failed: 4, coverage: '92%' },
    { category: 'Integration Tests', total: 78, passed: 75, failed: 3, coverage: '85%' },
    { category: 'E2E Tests', total: 32, passed: 30, failed: 2, coverage: '78%' }
  ];

  return (
    <main className="hotlists-dashboard">
      <h2>Hotlists Dashboard</h2>
      <p className="subtitle">Hotlists metrics, defect tracking, and test results</p>

      <div className="metrics-grid">
        <div className="metric-card critical">
          <h3>Critical Defects</h3>
          <div className="metric-value">3</div>
          <p>Require immediate attention</p>
        </div>
        <div className="metric-card">
          <h3>Test Pass Rate</h3>
          <div className="metric-value">94.2%</div>
          <p>+2.1% from last sprint</p>
        </div>
        <div className="metric-card">
          <h3>Code Coverage</h3>
          <div className="metric-value">87%</div>
          <p>Target: 90%</p>
        </div>
      </div>

      <div className="content-grid">
        <div className="content-section">
          <h3>Active Defects</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Defect ID</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Module</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {defects.map((defect, index) => (
                <tr key={index}>
                  <td>{defect.id}</td>
                  <td>
                    <span className={`severity-badge severity-${defect.severity.toLowerCase()}`}>
                      {defect.severity}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge status-${defect.status.toLowerCase().replace(' ', '-')}`}>
                      {defect.status}
                    </span>
                  </td>
                  <td>{defect.module}</td>
                  <td>{defect.assignedTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="content-section">
          <h3>Test Suite Metrics</h3>
          <div className="test-metrics">
            {testMetrics.map((metric, index) => (
              <div key={index} className="test-metric-row">
                <div className="metric-header">
                  <strong>{metric.category}</strong>
                  <span className="coverage-badge">{metric.coverage}</span>
                </div>
                <div className="metric-stats">
                  <span className="stat">Total: {metric.total}</span>
                  <span className="stat passed">Passed: {metric.passed}</span>
                  <span className="stat failed">Failed: {metric.failed}</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(metric.passed / metric.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
