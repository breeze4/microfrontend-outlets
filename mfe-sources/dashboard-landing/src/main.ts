import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { NgModuleRef } from '@angular/core';

let moduleRef: NgModuleRef<AppModule> | null = null;


declare global {
  interface Window {
    DashboardLandingPageMFE: {
      mount: (elementId: string) => void;
      unmount: (elementId: string) => void;
    };
  }
}

window.DashboardLandingPageMFE = {
  mount: function(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      // Create app root element
      const appRoot = document.createElement('app-root');
      element.appendChild(appRoot);

      platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .then(ref => {
          moduleRef = ref;
          console.log('Dashboard Landing Page MFE mounted to', elementId);
        })
        .catch(err => console.error(err));
    }
  },

  unmount: function(elementId: string) {
    if (moduleRef) {
      moduleRef.destroy();
      moduleRef = null;
    }
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = '';
    }
    console.log('Dashboard Landing Page MFE unmounted from', elementId);
  }
};

console.log('Dashboard Landing Page MFE initialized');
