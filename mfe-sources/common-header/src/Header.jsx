import React from 'react';
import './Header.css';

function Header() {
  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (window.navigateTo) {
      window.navigateTo(path);
    } else {
      console.error('navigateTo function not available');
    }
  };

  return (
    <header className="mfe-header">
      <div className="header-content">
        <h1 className="header-title">MFE App Shell</h1>
        <nav className="header-nav">
          <a
            href="/dashboard"
            className="nav-link"
            onClick={(e) => handleNavClick(e, '/dashboard')}
          >
            Dashboard
          </a>
          <a
            href="/hotlists"
            className="nav-link"
            onClick={(e) => handleNavClick(e, '/hotlists')}
          >
            Hotlists
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
