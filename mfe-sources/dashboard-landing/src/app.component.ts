import { Component } from '@angular/core';

interface Claim {
  id: string;
  type: string;
  status: string;
  amount: string;
  date: string;
}

interface Policy {
  id: string;
  holder: string;
  type: string;
  premium: string;
}

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <main class="landing-page">
      <h2>Dashboard Agent View</h2>
      <p class="subtitle">Overview of claims, policies, and customer activity</p>

      <div class="stats-grid">
        <div class="stat-card">
          <h3>Active Claims</h3>
          <div class="stat-value">24</div>
          <p>+3 from last week</p>
        </div>
        <div class="stat-card">
          <h3>Pending Approvals</h3>
          <div class="stat-value">8</div>
          <p>Requires attention</p>
        </div>
        <div class="stat-card">
          <h3>Total Policies</h3>
          <div class="stat-value">142</div>
          <p>Active policies</p>
        </div>
      </div>

      <div class="content-grid">
        <div class="content-section">
          <h3>Recent Claims</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>Claim ID</th>
                <th>Type</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let claim of claims">
                <td>{{claim.id}}</td>
                <td>{{claim.type}}</td>
                <td><span [class]="'status-badge status-' + claim.status.toLowerCase()">{{claim.status}}</span></td>
                <td>{{claim.amount}}</td>
                <td>{{claim.date}}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="content-section">
          <h3>Active Policies</h3>
          <div class="policy-cards">
            <div class="policy-card" *ngFor="let policy of policies">
              <div class="policy-header">
                <strong>{{policy.id}}</strong>
                <span class="policy-type">{{policy.type}}</span>
              </div>
              <p class="policy-holder">{{policy.holder}}</p>
              <p class="policy-premium">Premium: {{policy.premium}}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .landing-page {
      padding: 2rem;
      flex: 1;
      background: #f8f9fa;
    }

    h2 {
      margin: 0 0 0.5rem 0;
      color: #2c3e50;
      font-size: 2rem;
    }

    .subtitle {
      margin: 0 0 2rem 0;
      color: #7f8c8d;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .stat-card h3 {
      margin: 0 0 0.5rem 0;
      font-size: 0.9rem;
      color: #7f8c8d;
      font-weight: 500;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 0.25rem;
    }

    .stat-card p {
      margin: 0;
      font-size: 0.85rem;
      color: #95a5a6;
    }

    .content-grid {
      display: grid;
      gap: 1.5rem;
    }

    .content-section {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .content-section h3 {
      margin: 0 0 1rem 0;
      color: #2c3e50;
      font-size: 1.25rem;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th {
      text-align: left;
      padding: 0.75rem;
      background: #ecf0f1;
      color: #2c3e50;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .data-table td {
      padding: 0.75rem;
      border-bottom: 1px solid #ecf0f1;
      font-size: 0.9rem;
    }

    .data-table tbody tr:hover {
      background: #f8f9fa;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .status-pending {
      background: #fff3cd;
      color: #856404;
    }

    .status-approved {
      background: #d4edda;
      color: #155724;
    }

    .status-processing {
      background: #d1ecf1;
      color: #0c5460;
    }

    .policy-cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .policy-card {
      border: 1px solid #ecf0f1;
      border-radius: 6px;
      padding: 1rem;
      transition: box-shadow 0.2s;
    }

    .policy-card:hover {
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .policy-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .policy-type {
      background: #3498db;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
    }

    .policy-holder {
      margin: 0.5rem 0;
      color: #2c3e50;
    }

    .policy-premium {
      margin: 0;
      color: #7f8c8d;
      font-size: 0.9rem;
    }
  `]
})
export class AppComponent {
  claims: Claim[] = [
    { id: 'CLM-2024-001', type: 'Auto', status: 'Pending', amount: '$3,450', date: '2024-10-28' },
    { id: 'CLM-2024-002', type: 'Home', status: 'Approved', amount: '$12,200', date: '2024-10-27' },
    { id: 'CLM-2024-003', type: 'Life', status: 'Processing', amount: '$8,900', date: '2024-10-26' },
    { id: 'CLM-2024-004', type: 'Auto', status: 'Pending', amount: '$2,150', date: '2024-10-25' }
  ];

  policies: Policy[] = [
    { id: 'POL-45123', holder: 'John Smith', type: 'Auto', premium: '$1,200/year' },
    { id: 'POL-45124', holder: 'Sarah Johnson', type: 'Home', premium: '$2,400/year' },
    { id: 'POL-45125', holder: 'Mike Williams', type: 'Life', premium: '$800/year' },
    { id: 'POL-45126', holder: 'Emma Davis', type: 'Auto', premium: '$1,500/year' }
  ];
}
