import { MFELifecycle } from './lifecycle';
import { NavigationHelper } from './navigation';

declare global {
  interface Window {
    navigateTo?: NavigationHelper;
    HeaderMFE?: MFELifecycle;
    FooterMFE?: MFELifecycle;
    DashboardSidebarMFE?: MFELifecycle;
    HotlistsSidebarMFE?: MFELifecycle;
    DashboardLandingPageMFE?: MFELifecycle;
    HotlistsDashboardMFE?: MFELifecycle;
  }
}

export {};
