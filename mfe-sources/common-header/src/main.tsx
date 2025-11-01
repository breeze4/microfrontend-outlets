import ReactDOM from 'react-dom/client';
import type { MFELifecycle } from '@mfe/types';
import Header from './Header';

let root: ReactDOM.Root | null = null;

const HeaderMFE: MFELifecycle = {
  mount(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      root = ReactDOM.createRoot(element);
      root.render(<Header />);
      console.log('Header MFE mounted to', elementId);
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
    console.log('Header MFE unmounted from', elementId);
  }
};

window.HeaderMFE = HeaderMFE;

console.log('Header MFE registered on window object');
