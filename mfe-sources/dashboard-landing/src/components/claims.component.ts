import { Component } from '@angular/core';

@Component({
  selector: 'app-claims',
  template: `
    <div style="padding: 2rem;">
      <h2>Claims Management</h2>
      <p>Manage and process insurance claims</p>
      <div style="margin-top: 2rem; background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e5e7eb;">
        <h3 style="margin-bottom: 1rem;">Recent Claims</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="padding: 1rem; background: #f9fafb; border-radius: 6px; border-left: 4px solid #3b82f6;">
            <strong>Claim #12345</strong> - Auto Accident - Status: Pending Review
          </div>
          <div style="padding: 1rem; background: #f9fafb; border-radius: 6px; border-left: 4px solid #22c55e;">
            <strong>Claim #12344</strong> - Property Damage - Status: Approved
          </div>
          <div style="padding: 1rem; background: #f9fafb; border-radius: 6px; border-left: 4px solid #f59e0b;">
            <strong>Claim #12343</strong> - Medical - Status: Under Investigation
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true
})
export class ClaimsComponent {}
