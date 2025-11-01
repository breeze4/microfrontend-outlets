import { useCallback } from 'react';
import type { NavigationPath } from '@mfe/types';

/**
 * Custom hook for MFE navigation using the global navigateTo function
 *
 * @returns A navigation function that prevents default link behavior and uses window.navigateTo
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const navigate = useNavigate();
 *
 *   return (
 *     <a href="/dashboard" onClick={(e) => navigate('/dashboard', e)}>
 *       Go to Dashboard
 *     </a>
 *   );
 * }
 * ```
 */
export function useNavigate() {
  return useCallback((path: NavigationPath, e?: React.MouseEvent) => {
    e?.preventDefault();
    if (window.navigateTo) {
      window.navigateTo(path);
    } else {
      console.error('navigateTo function not available');
    }
  }, []);
}
