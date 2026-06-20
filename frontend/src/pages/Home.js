import React from 'react';
import { Link } from 'react-router-dom';
import { FiTruck, FiShield, FiClock, FiMapPin, FiStar } from 'react-icons/fi';

export default function Home() {
  const routes = [
    { from: 'Lagos', to: 'Abuja', price: '₦8,500', duration: '6 hrs', departure: '7:00 AM' },
    { from: 'Lagos', to: 'Port Harcourt', price: '₦7,000', duration: '5 hrs', departure: '8:00 AM' },
    { from: 'Abuja', to: 'Kano', price: '₦5,500', duration: '4 hrs', departure: '9:00 AM' },
    { from: 'Lagos', to: 'Ibadan', price: '₦3,000', duration: '2 hrs', departure: '6:00 AM' },
    { from: 'Abuja', to: 'Enugu', price: '₦6,000', duration: '5 hrs', departure: '10:00 AM' },
    { from: 'Port Harcourt', to: 'Calabar', price: '₦4,500', duration: '3 hrs', departure: '11:00 AM' },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, #0d1f3c 100%)',
        padding: '5rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid #1e2d45',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(0,200,83,0.08) 0%, transparent 70%)',
        }} />
        <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(0,200,83,0.1)', border: '1px solid rgba(0,200,83,0.3)',
            padding: '0.4rem 1rem', borderRadius: '20px', marginBottom: '1.5rem',
          }}>
            <FiTruck size={14} color="#00c853" />
            <span style={{ fontSize: '0.8rem', color: '#00c853', fontWeight: 500 }}>Nigeria's Most Trusted Bus Service</span>
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>
            Travel Smarter<br />
            <span style={{ color: '#00c853' }}>Arrive Safer</span>
          </h1>
          <p style={{ color: '#7b8db0', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Book your bus tickets online in seconds. Comfortable rides, affordable prices, and real time tracking across Nigeria.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book" style={{
              background: 'linear-gradient(135deg, #00c853, #00897b)',
              color: '#fff', textDecoration: 'none',
              padding: '1rem 2.5rem', borderRadius: '12px',
              fontSize: '1rem', fontWeight: 700,
            }}>
              Book a Ticket
            </Link>
            <Link to="/tracking" style={{
              background: 'transparent', color: '#f0f4ff',
              textDecoration: 'none', border: '1px solid #1e2d45',
              padding: '1rem 2.5rem', borderRadius: '12px',
              fontSize: '1rem', fontWeight: 600,
            }}>
              Track My Bus
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: '#111827', borderBottom: '1px solid #1e2d45', padding: '2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
          {[
            { number: '50,000+', label: 'Happy Passengers' },
            { number: '20+', label: 'Routes Covered' },
            { number: '99%', label: 'On Time Arrival' },
            { number: '24/7', label: 'Customer Support' },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#00c853', fontFamily: 'Space Grotesk' }}>{stat.number}</div>
              <div style={{ fontSize: '0.85rem', color: '#7b8db0', marginTop: '0.3rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Routes */}
      <div className="page">
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Popular Routes</h2>
        <p style={{ color: '#7b8db0', marginBottom: '2rem' }}>Book your seat on our most traveled routes</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {routes.map((route, i) => (
            <div key={i} className="card" style={{ transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FiMapPin size={14} color="#00c853" />
                  <span style={{ fontWeight: 700, fontSize: '1rem' }}>{route.from}</span>
                  <span style={{ color: '#7b8db0' }}>→</span>
                  <span style={{ fontWeight: 700, fontSize: '1rem' }}>{route.to}</span>
                </div>
                <span style={{ color: '#00c853', fontWeight: 800, fontFamily: 'Space Grotesk', fontSize: '1.1rem' }}>{route.price}</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: '#7b8db0' }}>
                  <FiClock size={12} />
                  <span>{route.duration}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: '#7b8db0' }}>
                  <FiTruck size={12} />
                  <span>Departs {route.departure}</span>
                </div>
              </div>
              <Link to="/book" style={{
                display: 'block', textAlign: 'center',
                background: 'rgba(0,200,83,0.1)', color: '#00c853',
                textDecoration: 'none', padding: '0.6rem',
                borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600,
                border: '1px solid rgba(0,200,83,0.2)',
              }}>
                Book This Route
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ background: '#111827', borderTop: '1px solid #1e2d45', padding: '4rem 2rem', marginTop: '3rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Why Choose Mitchelle?</h2>
          <p style={{ color: '#7b8db0', marginBottom: '3rem' }}>We put your comfort and safety first on every journey</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              { icon: <FiShield size={28} color="#00c853" />, title: 'Safe and Secure', desc: 'All our buses are regularly inspected and our drivers are professionally trained for your safety.' },
              { icon: <FiClock size={28} color="#00c853" />, title: 'Always On Time', desc: 'We pride ourselves on punctuality. 99% of our buses arrive on time, every time.' },
              { icon: <FiStar size={28} color="#00c853" />, title: 'Premium Comfort', desc: 'Enjoy comfortable seats, air conditioning, and a smooth ride to your destination.' },
            ].map((feature, i) => (
              <div key={i} style={{ padding: '2rem', background: '#1a2235', borderRadius: '16px', border: '1px solid #1e2d45' }}>
                <div style={{ marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>{feature.title}</h3>
                <p style={{ color: '#7b8db0', fontSize: '0.9rem', lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#0a0e1a', borderTop: '1px solid #1e2d45', padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: '#7b8db0', fontSize: '0.85rem' }}>
          © 2026 Mitchelle Transportation LTD. All rights reserved. Safe travels across Nigeria.
        </p>
      </div>
    </div>
  );
}