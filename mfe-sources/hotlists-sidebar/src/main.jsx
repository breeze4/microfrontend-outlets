import { createMFEBootstrap } from '@mfe/react-shared';
import Sidebar from './Sidebar';

window.HotlistsSidebarMFE = createMFEBootstrap('Hotlists Sidebar MFE', Sidebar);

console.log('Hotlists Sidebar MFE registered on window object');
