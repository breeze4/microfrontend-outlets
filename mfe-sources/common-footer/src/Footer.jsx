import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mfe-footer">
      <div className="footer-content">
        <p className="footer-text">
          &copy; {currentYear} MFE App Shell. All rights reserved.
        </p>
        <div className="footer-links">
          <a href="/about" className="footer-link">About</a>
          <a href="/privacy" className="footer-link">Privacy</a>
          <a href="/terms" className="footer-link">Terms</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
