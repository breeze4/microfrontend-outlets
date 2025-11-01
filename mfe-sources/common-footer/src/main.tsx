import ReactDOM from 'react-dom/client';
import type { MFELifecycle } from '@mfe/types';
import Footer from './Footer';

let root: ReactDOM.Root | null = null;

const FooterMFE: MFELifecycle = {
  mount(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      root = ReactDOM.createRoot(element);
      root.render(<Footer />);
      console.log('Footer MFE mounted to', elementId);
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
    console.log('Footer MFE unmounted from', elementId);
  }
};

window.FooterMFE = FooterMFE;

console.log('Footer MFE registered on window object');
