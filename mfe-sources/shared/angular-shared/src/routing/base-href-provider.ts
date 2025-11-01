import { APP_BASE_HREF } from '@angular/common';

/**
 * Creates an APP_BASE_HREF provider for Angular Router
 *
 * @param basePath - The base path for the application (e.g., '/dashboard')
 * @returns Provider object for use in NgModule providers array
 *
 * @example
 * ```typescript
 * import { createBaseHrefProvider } from '@mfe/angular-shared';
 *
 * @NgModule({
 *   providers: [
 *     createBaseHrefProvider('/dashboard')
 *   ]
 * })
 * export class AppModule {}
 * ```
 */
export function createBaseHrefProvider(basePath: string) {
  return { provide: APP_BASE_HREF, useValue: basePath };
}
