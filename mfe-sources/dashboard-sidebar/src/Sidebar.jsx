import React from 'react';
import { useNavigate } from '@mfe/react-shared';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Claims', href: '/dashboard/claims' },
    { label: 'Policies', href: '/dashboard/policies' },
    { label: 'Customers', href: '/dashboard/customers' },
    { label: 'Reports', href: '/dashboard/reports' }
  ];

  return (
    <aside className="mfe-sidebar">
      <h3 className="sidebar-title">Dashboard</h3>
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              <a
                href={item.href}
                className="menu-link"
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
