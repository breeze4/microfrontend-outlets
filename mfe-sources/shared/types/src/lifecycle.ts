/**
 * Interface for MFE lifecycle management
 */
export interface MFELifecycle {
  mount(elementId: string): void;
  unmount(elementId: string): void;
}

/**
 * Registry of all mounted MFEs
 */
export type MFERegistry = Record<string, MFELifecycle>;
