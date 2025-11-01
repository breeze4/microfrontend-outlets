import { Component } from '@angular/core';

@Component({
  selector: 'app-policies',
  template: `
    <div style="padding: 2rem;">
      <h2>Policies Management</h2>
      <p>View and manage insurance policies</p>
      <div style="margin-top: 2rem; background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e5e7eb;">
        <h3 style="margin-bottom: 1rem;">Active Policies</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="padding: 1rem; background: #f0f9ff; border-radius: 6px;">
            <strong>Policy #AUTO-789</strong> - Auto Insurance - Premium: $1,200/year
          </div>
          <div style="padding: 1rem; background: #f0f9ff; border-radius: 6px;">
            <strong>Policy #HOME-456</strong> - Home Insurance - Premium: $800/year
          </div>
          <div style="padding: 1rem; background: #f0f9ff; border-radius: 6px;">
            <strong>Policy #LIFE-123</strong> - Life Insurance - Premium: $500/year
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true
})
export class PoliciesComponent {}
