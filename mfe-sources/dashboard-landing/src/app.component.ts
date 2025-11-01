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
    .landing-page {
      flex: 1;
      background: #f8f9fa;
    }
  `]
})
export class AppComponent {}
