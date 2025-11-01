import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div style="padding: 2rem;">
      <h2>Dashboard Home</h2>
      <p>Welcome to the Dashboard. Select a menu item from the sidebar to get started.</p>
      <div style="margin-top: 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
        <div style="padding: 1.5rem; background: #f0f9ff; border-radius: 8px; border: 1px solid #0ea5e9;">
          <h3 style="color: #0ea5e9; margin-bottom: 0.5rem;">Quick Stats</h3>
          <p style="color: #666;">View your dashboard metrics and KPIs</p>
        </div>
        <div style="padding: 1.5rem; background: #f0fdf4; border-radius: 8px; border: 1px solid #22c55e;">
          <h3 style="color: #22c55e; margin-bottom: 0.5rem;">Recent Activity</h3>
          <p style="color: #666;">See your latest updates and changes</p>
        </div>
        <div style="padding: 1.5rem; background: #fef3c7; border-radius: 8px; border: 1px solid #f59e0b;">
          <h3 style="color: #f59e0b; margin-bottom: 0.5rem;">Alerts</h3>
          <p style="color: #666;">Important notifications and reminders</p>
        </div>
      </div>
    </div>
  `,
  standalone: true
})
export class HomeComponent {}
