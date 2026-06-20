import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiTruck, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/book', label: 'Book Ticket' },
    { path: '/tickets', label: 'My Tickets' },
    { path: '/tracking', label: 'Track Bus' },
    { path: '/admin', label: 'Admin' },
  ];

  return (
    <nav style={{
      background: '#111827',
      borderBottom: '1px solid #1e2d45',
      padding: '1rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #00c853, #00897b)',
            display: 'grid', placeItems: 'center',
          }}>
            <FiTruck size={22} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '1rem', color: '#f0f4ff' }}>Mitchelle</div>
            <div style={{ fontSize: '0.65rem', color: '#7b8db0' }}>Transportation LTD</div>
          </div>
        </Link>

        <div style={{ display: 'flex', gap: '0.3rem' }} className="nav-links">
          {links.map(link => (
            <Link key={link.path} to={link.path} style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 500,
              background: location.pathname === link.path ? 'rgba(0,200,83,0.15)' : 'transparent',
              color: location.pathname === link.path ? '#00c853' : '#7b8db0',
              transition: 'all 0.2s',
            }}>
              {link.label}
            </Link>
          ))}
        </div>

        <Link to="/book" style={{
          background: 'linear-gradient(135deg, #00c853, #00897b)',
          color: '#fff', textDecoration: 'none',
          padding: '0.6rem 1.4rem', borderRadius: '10px',
          fontSize: '0.85rem', fontWeight: 600,
        }}>
          Book Now
        </Link>
      </div>
    </nav>
  );
}