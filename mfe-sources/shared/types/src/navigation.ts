/**
 * Type for navigation paths
 */
export type NavigationPath = string;

/**
 * Navigation helper function type
 */
export interface NavigationHelper {
  (path: NavigationPath): void;
}
