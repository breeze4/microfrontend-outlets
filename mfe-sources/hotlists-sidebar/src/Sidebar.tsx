import React, { useState, useEffect } from 'react';
import { useNavigate } from '@mfe/react-shared';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const menuItems = [
    { label: 'Dashboard', href: '/hotlists/' },
    { label: 'Defects', href: '/hotlists/defects' },
    { label: 'Test Cases', href: '/hotlists/tests' },
    { label: 'Metrics', href: '/hotlists/metrics' },
    { label: 'Reports', href: '/hotlists/reports' }
  ];

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const isActive = (href: string) => {
    return currentPath === href;
  };

  return (
    <aside className="mfe-sidebar hotlists">
      <h3 className="sidebar-title">Hotlists</h3>
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              <a
                href={item.href}
                className={`menu-link ${isActive(item.href) ? 'active' : ''}`}
                onClick={(e) => navigate(item.href, e)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
