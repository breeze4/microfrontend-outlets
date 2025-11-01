import { createMFEBootstrap } from '@mfe/react-shared';
import Sidebar from './Sidebar';

window.DashboardSidebarMFE = createMFEBootstrap('Dashboard Sidebar MFE', Sidebar);

console.log('Dashboard Sidebar MFE registered on window object');
