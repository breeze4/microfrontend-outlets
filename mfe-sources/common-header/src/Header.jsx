import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="mfe-header">
      <div className="header-content">
        <h1 className="header-title">MFE App Shell</h1>
        <nav className="header-nav">
          <a href="/dashboard" className="nav-link">Dashboard</a>
          <a href="/hotlists" className="nav-link">Hotlists</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
