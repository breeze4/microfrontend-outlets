import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './Dashboard';

let root = null;

window.HotlistsDashboardMFE = {
  mount: function(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      root = ReactDOM.createRoot(element);
      root.render(<Dashboard />);
      console.log('Hotlists Dashboard MFE mounted to', elementId);
    }
  },

  unmount: function(elementId) {
    if (root) {
      root.unmount();
      root = null;
    }
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = '';
    }
    console.log('Hotlists Dashboard MFE unmounted from', elementId);
  }
};

console.log('Hotlists Dashboard MFE registered on window object');
