import 'zone.js';
import { createAngularMFEBootstrap } from '@mfe/angular-shared';
import { AppModule } from './app.module';

window.DashboardLandingPageMFE = createAngularMFEBootstrap(
  'Dashboard Landing Page MFE',
  AppModule,
  'app-root'
);

console.log('Dashboard Landing Page MFE initialized');
