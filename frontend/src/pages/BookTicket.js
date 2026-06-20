import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiCalendar, FiUsers, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

const routes = [
  { id: 1, from: 'Lagos', to: 'Abuja', price: 8500, duration: '6 hrs', departure: '7:00 AM', available: 45 },
  { id: 2, from: 'Lagos', to: 'Port Harcourt', price: 7000, duration: '5 hrs', departure: '8:00 AM', available: 30 },
  { id: 3, from: 'Abuja', to: 'Kano', price: 5500, duration: '4 hrs', departure: '9:00 AM', available: 50 },
  { id: 4, from: 'Lagos', to: 'Ibadan', price: 3000, duration: '2 hrs', departure: '6:00 AM', available: 55 },
  { id: 5, from: 'Abuja', to: 'Enugu', price: 6000, duration: '5 hrs', departure: '10:00 AM', available: 40 },
  { id: 6, from: 'Port Harcourt', to: 'Calabar', price: 4500, duration: '3 hrs', departure: '11:00 AM', available: 35 },
];

export default function BookTicket() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [form, setForm] = useState({ passengerName: '', email: '', phone: '', date: '', seats: 1 });

  const handleSelectRoute = (route) => {
    setSelectedRoute(route);
    setStep(2);
  };

  const handleContinue = () => {
    if (!form.passengerName || !form.email || !form.phone || !form.date) {
      toast.error('Please fill all fields'); return;
    }
    navigate('/payment', { state: { booking: { ...form, ...selectedRoute, amount: selectedRoute.price * form.seats } } });
  };

  return (
    <div className="page">
      <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Book a Ticket</h2>
      <p style={{ color: '#7b8db0', marginBottom: '2rem' }}>Select your route and fill in your details</p>

      {/* Steps */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        {['Select Route', 'Passenger Details'].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: step > i ? '#00c853' : step === i + 1 ? '#00c853' : '#1e2d45',
              display: 'grid', placeItems: 'center',
              fontSize: '0.8rem', fontWeight: 700, color: '#fff',
            }}>{i + 1}</div>
            <span style={{ fontSize: '0.85rem', color: step === i + 1 ? '#00c853' : '#7b8db0', fontWeight: step === i + 1 ? 600 : 400 }}>{s}</span>
            {i < 1 && <FiArrowRight size={14} color="#1e2d45" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {routes.map(route => (
            <div key={route.id} className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }}
              onClick={() => handleSelectRoute(route)}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#00c853'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1e2d45'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <FiMapPin color="#00c853" />
                  <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{route.from}</span>
                  <span style={{ color: '#7b8db0' }}>→</span>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{route.to}</span>
                </div>
                <span style={{ color: '#00c853', fontWeight: 800, fontSize: '1.2rem' }}>₦{route.price.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.82rem', color: '#7b8db0' }}>
                <span>🕐 {route.duration}</span>
                <span>🚌 {route.departure}</span>
                <span>💺 {route.available} seats left</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {step === 2 && selectedRoute && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Passenger Details</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input placeholder="e.g. Chinonso Ojeri" value={form.passengerName} onChange={e => setForm({ ...form, passengerName: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="e.g. chinonso@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input placeholder="e.g. 08012345678" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Travel Date</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Number of Seats</label>
              <select value={form.seats} onChange={e => setForm({ ...form, seats: parseInt(e.target.value) })}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} seat{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className="btn-outline" onClick={() => setStep(1)}>Back</button>
              <button className="btn-primary" onClick={handleContinue}>Continue to Payment</button>
            </div>
          </div>

          <div className="card" style={{ height: 'fit-content' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Trip Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #1e2d45' }}>
              <span style={{ color: '#7b8db0' }}>Route</span>
              <span style={{ fontWeight: 600 }}>{selectedRoute.from} → {selectedRoute.to}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: '#7b8db0' }}>Departure</span>
              <span>{selectedRoute.departure}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: '#7b8db0' }}>Duration</span>
              <span>{selectedRoute.duration}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: '#7b8db0' }}>Seats</span>
              <span>{form.seats}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #1e2d45' }}>
              <span style={{ fontWeight: 700 }}>Total</span>
              <span style={{ color: '#00c853', fontWeight: 800, fontSize: '1.2rem' }}>₦{(selectedRoute.price * form.seats).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}