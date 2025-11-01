import { Type, NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import type { MFELifecycle } from '@mfe/types';

/**
 * Creates mount and unmount functions for an Angular MFE
 *
 * @param mfeName - Display name for logging
 * @param moduleType - Angular module class to bootstrap
 * @param componentSelector - HTML selector for the root component (default: 'app-root')
 * @returns MFELifecycle object with mount and unmount methods
 *
 * @example
 * ```typescript
 * import { createAngularMFEBootstrap } from '@mfe/angular-shared';
 * import { AppModule } from './app.module';
 *
 * window.DashboardLandingPageMFE = createAngularMFEBootstrap(
 *   'Dashboard Landing Page MFE',
 *   AppModule
 * );
 * ```
 */
export function createAngularMFEBootstrap<T>(
  mfeName: string,
  moduleType: Type<T>,
  componentSelector: string = 'app-root'
): MFELifecycle {
  let moduleRef: NgModuleRef<T> | null = null;

  return {
    mount(elementId: string) {
      const element = document.getElementById(elementId);
      if (element) {
        const appRoot = document.createElement(componentSelector);
        element.appendChild(appRoot);

        platformBrowserDynamic()
          .bootstrapModule(moduleType)
          .then(ref => {
            moduleRef = ref;
            console.log(`${mfeName} mounted to`, elementId);
          })
          .catch(err => console.error(err));
      }
    },

    unmount(elementId: string) {
      if (moduleRef) {
        moduleRef.destroy();
        moduleRef = null;
      }
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = '';
      }
      console.log(`${mfeName} unmounted from`, elementId);
    }
  };
}
