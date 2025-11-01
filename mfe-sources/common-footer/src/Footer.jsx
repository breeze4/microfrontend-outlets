import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (window.navigateTo) {
      window.navigateTo(path);
    } else {
      console.error('navigateTo function not available');
    }
  };

  return (
    <footer className="mfe-footer">
      <div className="footer-content">
        <p className="footer-text">
          &copy; {currentYear} MFE App Shell. All rights reserved.
        </p>
        <div className="footer-links">
          <a
            href="/about"
            className="footer-link"
            onClick={(e) => handleNavClick(e, '/about')}
          >
            About
          </a>
          <a
            href="/privacy"
            className="footer-link"
            onClick={(e) => handleNavClick(e, '/privacy')}
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="footer-link"
            onClick={(e) => handleNavClick(e, '/terms')}
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
