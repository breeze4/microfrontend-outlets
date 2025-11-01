import { Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  template: `
    <div style="padding: 2rem;">
      <h2>Customers</h2>
      <p>Manage customer information and accounts</p>
      <div style="margin-top: 2rem; background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e5e7eb;">
        <h3 style="margin-bottom: 1rem;">Customer Directory</h3>
        <div style="display: grid; gap: 1rem;">
          <div style="padding: 1rem; background: #f9fafb; border-radius: 6px; display: flex; justify-content: space-between;">
            <div>
              <strong>John Doe</strong><br/>
              <span style="color: #666; font-size: 0.9rem;">john.doe@example.com</span>
            </div>
            <span style="color: #22c55e; font-weight: 500;">Active</span>
          </div>
          <div style="padding: 1rem; background: #f9fafb; border-radius: 6px; display: flex; justify-content: space-between;">
            <div>
              <strong>Jane Smith</strong><br/>
              <span style="color: #666; font-size: 0.9rem;">jane.smith@example.com</span>
            </div>
            <span style="color: #22c55e; font-weight: 500;">Active</span>
          </div>
          <div style="padding: 1rem; background: #f9fafb; border-radius: 6px; display: flex; justify-content: space-between;">
            <div>
              <strong>Bob Johnson</strong><br/>
              <span style="color: #666; font-size: 0.9rem;">bob.johnson@example.com</span>
            </div>
            <span style="color: #22c55e; font-weight: 500;">Active</span>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true
})
export class CustomersComponent {}
