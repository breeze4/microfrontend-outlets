import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header';

let root = null;

window.HeaderMFE = {
  mount: function(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      root = ReactDOM.createRoot(element);
      root.render(<Header />);
      console.log('Header MFE mounted to', elementId);
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
    console.log('Header MFE unmounted from', elementId);
  }
};

console.log('Header MFE registered on window object');
