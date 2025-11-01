import React, { ComponentType } from 'react';
import ReactDOM from 'react-dom/client';
import type { MFELifecycle } from '@mfe/types';

/**
 * Creates mount and unmount functions for a React MFE
 *
 * @param mfeName - Display name for logging
 * @param Component - React component to mount
 * @returns MFELifecycle object with mount and unmount methods
 *
 * @example
 * ```tsx
 * import { createMFEBootstrap } from '@mfe/react-shared';
 * import Header from './Header';
 *
 * window.HeaderMFE = createMFEBootstrap('Header MFE', Header);
 * ```
 */
export function createMFEBootstrap<P = {}>(
  mfeName: string,
  Component: ComponentType<P>
): MFELifecycle {
  let root: ReactDOM.Root | null = null;

  return {
    mount(elementId: string) {
      const element = document.getElementById(elementId);
      if (element) {
        // Clear any existing content
        element.innerHTML = '';
        root = ReactDOM.createRoot(element);
        root.render(<Component />);
        console.log(`${mfeName} mounted to`, elementId);
      }
    },

    unmount(elementId: string) {
      if (root) {
        root.unmount();
        root = null;
      }
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = '';
      }
      console.log(`${mfeName} unmounted from`, elementId);
    }
  };
}
