import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <main class="landing-page">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 100%;
    }
    .landing-page {
      flex: 1;
      background: #f8f9fa;
      min-height: 100%;
    }
  `]
})
export class AppComponent {}
