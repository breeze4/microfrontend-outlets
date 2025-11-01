import React from 'react';
import ReactDOM from 'react-dom/client';
import Sidebar from './Sidebar';

let root = null;

window.HotlistsSidebarMFE = {
  mount: function(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      root = ReactDOM.createRoot(element);
      root.render(<Sidebar />);
      console.log('Hotlists Sidebar MFE mounted to', elementId);
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
    console.log('Hotlists Sidebar MFE unmounted from', elementId);
  }
};

console.log('Hotlists Sidebar MFE registered on window object');
