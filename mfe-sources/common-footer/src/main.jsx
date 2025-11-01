import React from 'react';
import ReactDOM from 'react-dom/client';
import Footer from './Footer';

let root = null;

window.FooterMFE = {
  mount: function(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      root = ReactDOM.createRoot(element);
      root.render(<Footer />);
      console.log('Footer MFE mounted to', elementId);
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
    console.log('Footer MFE unmounted from', elementId);
  }
};

console.log('Footer MFE registered on window object');
