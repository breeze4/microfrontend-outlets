import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  template: `
    <div style="padding: 2rem;">
      <h2>Reports & Analytics</h2>
      <p>View detailed reports and analytics</p>
      <div style="margin-top: 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <div style="padding: 1.5rem; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
          <h3 style="color: #3b82f6; margin-bottom: 1rem;">Monthly Summary</h3>
          <p style="color: #666; margin-bottom: 0.5rem;">Total Claims: 147</p>
          <p style="color: #666; margin-bottom: 0.5rem;">Approved: 98</p>
          <p style="color: #666;">Pending: 49</p>
        </div>
        <div style="padding: 1.5rem; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
          <h3 style="color: #10b981; margin-bottom: 1rem;">Revenue Report</h3>
          <p style="color: #666; margin-bottom: 0.5rem;">Total Premium: $2.5M</p>
          <p style="color: #666; margin-bottom: 0.5rem;">Claims Paid: $1.2M</p>
          <p style="color: #666;">Net: $1.3M</p>
        </div>
        <div style="padding: 1.5rem; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
          <h3 style="color: #f59e0b; margin-bottom: 1rem;">Customer Metrics</h3>
          <p style="color: #666; margin-bottom: 0.5rem;">Active Policies: 1,234</p>
          <p style="color: #666; margin-bottom: 0.5rem;">New This Month: 45</p>
          <p style="color: #666;">Retention Rate: 94%</p>
        </div>
      </div>
    </div>
  `,
  standalone: true
})
export class ReportsComponent {}
